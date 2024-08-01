// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 允许外部访问
    port: 5173, // 默认端口，你可以根据需要修改
  },
  css: {
    postcss: './postcss.config.js', // 指定 postcss 配置文件路径
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
});
