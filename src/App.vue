<template>
  <div class="header-class">
    <a-row>
      <a-col :span="10"><p class="header-text">Desc</p></a-col>
      <a-col  :span="8"><p class="header-text">Value</p></a-col>
      <a-col  :span="4"><p class="header-text">Actions</p></a-col>
      <a-col  :span="2">
        <a-button 
          size="small" style="display:inline;vertical-align: middle;"
          :disabled="addDisabled"
          v-on:click="addObj">Add</a-button>
      </a-col>
    </a-row>
  </div>
  <ClipboardObject 
    v-for="(obj) in clipboardObjects" 
    :key="obj.uid"
    :uid-prop="obj.uid"
    :value-prop="obj.value" 
    :desc-prop="obj.desc" 
    @emitDelObj='delObj'
    @emitEditObj='editObj'
    @emitSave='saveObjs'
    ></ClipboardObject>
</template>

<script>
import 'ant-design-vue/dist/antd'
import ClipboardObject from './components/clipboard.vue'
import { v4 as uuidv4 } from 'uuid';
const axios = require('axios').default;
import { message } from 'ant-design-vue';

export default {
    name: "App",
    components: { ClipboardObject },
    data() {
      var clipboardObjects=new Array(0)
      var addDisabled=true
      return {
        clipboardObjects,
        addDisabled
      };
    },
    mounted() {
      document.title='ClickBoard by keynezzz'
      this.getObjs()
    },
    methods: {
      addObj() {
        this.clipboardObjects.push({
          uid:uuidv4(),
          desc:"",
          value:"",
        })
        this.saveAll()
      },
      saveAll() {
        const saving = message.loading('Saving...', 0);
        axios({
          method:'put',
          url: 'http://127.0.0.1:8000/api/clipboardObjects',
          data: this.clipboardObjects,
        }).then(function (resp){
          setTimeout(saving,200)
          if(resp.status==200){
            message.success('Save successful')
          } else {
            message.error('Save failed')
          }
        }).catch(function (err){
          setTimeout(saving,200)
          message.error(`${err.code}: ${err.message}, please refresh!`,0)
        })
      },
      delObj(uid) {
        this.clipboardObjects = this.clipboardObjects.filter(obj => obj.uid!=uid)
        this.saveAll()
      },
      editObj(uid,desc,value) {
        for(let obj of this.clipboardObjects){
          if (obj.uid===uid) {
            obj.desc=desc
            obj.value=value
            break
          }
        }
      },
      saveObjs(){
        this.saveAll()
      },
      getObjs() {
        const loading = message.loading('Loading...', 0);
        let that=this
        axios({
          method:'get',
          url: 'http://127.0.0.1:8000/api/clipboardObjects',
          timeout: 5000, // ms
        }).then(function (resp){
          if(resp.status==200){
            that.clipboardObjects = resp.data
            setTimeout(loading,200)
            that.addDisabled=false
            message.success('Loaded')
          } else {
            setTimeout(loading,200)
            message.error('Load from server failed, please refresh!',0)
          }
        }).catch(function (err){
          setTimeout(loading,200)
          message.error(`${err.code}: ${err.message}, please refresh!`,0)
        })
      }
    }
}
</script>

<style>
.header-class {
  line-height: 50px;
  vertical-align: middle;
}
.header-text {
  margin:0 0 0 10px;
  font-size: 24px;
}
</style>
