import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        styleImport({
            libraryName: 'vant',
            esModule: true,
            resolveStyle: (name) => `${name}/style`,
        }),
    ],  
    server: {
        host: '127.0.0.1',
        // home
        // OCM
        // host: '172.29.0.120' ,
        port: 7003
    }
})