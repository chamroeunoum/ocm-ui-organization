import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import';
import path from 'path'

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
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@api': path.resolve(__dirname, './src/api'),
            '@components': path.resolve(__dirname, './src/components'),
            '@assets': path.resolve(__dirname, './src/assets'),
            '@classes': path.resolve(__dirname, './src/classes'),
            '@layouts': path.resolve(__dirname, './src/layouts'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@plugins': path.resolve(__dirname, './src/plugins')
        }
    },
    server: {
        host: '127.0.0.1',
        port: 3003
    }
})