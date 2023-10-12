import {createRouter, createWebHistory} from "vue-router";
import { createApp } from 'vue'
import App from './App.vue'
import BoardView from "@/views/BoardView";
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegistationView";
import MeView from "@/views/MeView";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: BoardView},
        {path: '/login', component: LoginView},
        {path: '/register', component: RegisterView},
        {path: '/me', component: MeView}
    ]
})

createApp(App).use(router).mount('#app')
