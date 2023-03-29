import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Unicon from 'vue-unicons'
import router from './routes'

import { uniLayerGroupMonochrome, uniCarWash, uniBars, uniTimes, uniHeart, uniAngleRightB, uniEnvelopeAlt, uniAlignLeft } from 'vue-unicons/dist/icons'

const app = createApp(App)
app.use(router)

Unicon.add([uniLayerGroupMonochrome, uniCarWash, uniBars, uniTimes, uniHeart, uniAngleRightB, uniEnvelopeAlt, uniAlignLeft])
app.use(Unicon)

app.mount('#app')
