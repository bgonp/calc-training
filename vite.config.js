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
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  }
})
