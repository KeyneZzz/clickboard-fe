import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import { VueClipboard } from '@soerenmartius/vue3-clipboard';

const app = createApp(App);

app.use(Antd).use(VueClipboard).mount('#app');