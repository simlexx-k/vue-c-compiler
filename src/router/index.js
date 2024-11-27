import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Home.vue'
//import ToolsView from '../views/Tools.vue'
import CCodeShare from '../views/CCodeShare.vue'
import CCodeExecutor from '../components/CCodeExecutor.vue'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/c-code-share',
    name: 'CCodeShare',
    component: CCodeShare
    },
    {
    path: '/c-code-executor',
    name: 'CCodeExecutor',
    component: CCodeExecutor
    }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router 