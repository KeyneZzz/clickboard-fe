<template>
  <div class="cb-class" style="margin-left:5px">
    <a-row>
      <a-col :span="10">
        <a-input v-on:change="editObj" v-model:value="desc"/>
      </a-col>
      <a-col :span="8">
        <a-input v-on:change="editObj" v-model:value="value"/>
      </a-col>
      <a-col :span="6" style="display:flex;">
        <div 
          style="display:inline;flex-grow:1">
          <a-button 
            type="primary" 
            v-on:click="copyValue" 
            data-clipboard-text="value" 
            size="large" 
            v-clipboard="value"
            block>Copy</a-button>
        </div>
        <div style="display:inline;float:right">
          <a-popconfirm
            title="Are you sure to save?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirmSave">
            <a-button 
              size="small" 
              class="small-button" 
              style="margin-left:6px;margin-right:3px">Save</a-button>
          </a-popconfirm>
          <a-popconfirm
            title="Are you sure delete this item?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="confirmDel">
            <a-button 
              type="primary" 
              danger 
              size="small" 
              class="small-button" 
              style="margin-left:3px;margin-right:6px">Del</a-button>
          </a-popconfirm>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import 'ant-design-vue/dist/antd'
import { defineComponent } from 'vue';
import { message } from 'ant-design-vue';

export default defineComponent({
  name: 'ClipboardObject',
  props: {
    uidProp:String,
    descProp:String,
    valueProp:String,
  },
  data() {
    var uid=''
    var desc=''
    var value=''
    return {
      uid,
      desc,
      value,
    };
  },
  mounted() {
    this.uid = this.uidProp
    this.desc = this.descProp
    this.value = this.valueProp
  },
  methods: {
    copyValue() {
      message.success(this.desc+' copied: '+this.value,2)
    },
    confirmSave() {
      this.$emit('emitSave')
    },
    confirmDel() {
      this.$emit('emitDelObj',this.uidProp)
    },
    editObj() {
      this.$emit('emitEditObj',this.uidProp,this.desc,this.value)
    }
  },
});


</script>

<style>
.cb-class {
  line-height: 40px;
  vertical-align: middle;
}
.small-button {
  display:inline;
}
</style>
