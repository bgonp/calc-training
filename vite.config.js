import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

const path = require('path')

export default defineConfig({
  css: {
    modules: {
      generateScopedName: function (name, filename) {
        const path = require('path')
        const file = path.basename(filename, '.module.css')
        const hash = Math.random().toString(36).slice(2, 8)

        return `${file}__${name}--${hash}`
      }
    }
  },
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
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  }
})
