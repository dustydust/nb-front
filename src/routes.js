import {createRouter, createWebHashHistory} from 'vue-router'
import TheBotList from './components/TheBotList.vue'
import BotHelga from './bots/helga/BotHelga.vue'
import PageFeedback from './pages/PageFeedback.vue'
import PageAbout from './pages/PageAbout.vue'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: '/', component: TheBotList },
        { path: '/bots/helga', component: BotHelga },
        { path: '/feedback', component: PageFeedback },
        { path: '/about', component: PageAbout },
    ]
})

export default router