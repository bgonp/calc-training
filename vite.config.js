import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

const path = require('path')

export default defineConfig({
  esbuild: {
    jsxInject: "import React from 'react'"
  },
  plugins: [
    reactRefresh()
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@styles': path.resolve(__dirname, 'src/styles/components'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  }
})
