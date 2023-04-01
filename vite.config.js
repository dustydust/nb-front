import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import commonjs from 'vite-plugin-commonjs'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // commonjs(/* options */),
        viteCommonjs()
    ],
    commonjsOptions: {
        transformMixedEsModules: true,
        exclude: [],
      },
})
