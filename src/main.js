import {createRouter, createWebHistory} from "vue-router";
import { createApp } from 'vue'
// import Vue from 'vue'
import App from './App.vue'
import BoardView from "@/views/BoardView";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegistationView";
import MeView from "@/views/MeView";
import {store} from "./store";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: BoardView},
        {path: '/login', component: LoginView},
        {path: '/register', component: RegisterView},
        {path: '/me', component: MeView}
    ]
})
//
// new Vue({
//     router,
//     store,
//     render: h => h(App),
// }).$mount('#app')

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
