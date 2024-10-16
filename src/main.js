import {createApp} from 'vue'
import routerFactory from '@/routers/index.js'
import i18nFactory from '@/utils/i18n/index.js'
import App from './App.vue'
import '@/assets/styles/main.scss'
import 'ant-design-vue/dist/reset.css'
import store from "@/store/store.js";


const app = createApp(App)

const i18n = i18nFactory()

app.use(store)
app.use(routerFactory(i18n.global))
app.use(i18n)

app.mount('#app')
