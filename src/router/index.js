import { createRouter, createWebHashHistory,createWebHistory } from 'vue-router'
import Content from '../components/Content';
import Home from '../components/Home';
import Download from '../components/Download';
import Read from '../components/Read';
import Video from '../components/Video';
const routes = [
  {
    path: '/',
    component: Home
    
  },
  {
    path: '/Content',
    component: Content
  },
  {
    path: '/Download',
    component: Download
  },
  {
    path: '/Read',
    component: Read
  },
  
  {
    path: '/Video',
    component: Video
  },
  
]

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(),
  routes
})

export default router
