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
        // host: '192.168.0.104',
        host: '127.0.0.1',
        // OCM
        // host: '172.29.0.120' ,
        port: 3002
    }
})