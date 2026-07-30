import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Notebook 数据源位于本仓库上层目录（项目根 learning-languages/），
  // 显式放开 dev server 的文件访问边界，使 `?raw` 导入可正常工作。
  server: {
    fs: {
      allow: ['..'],
    },
  },
})
