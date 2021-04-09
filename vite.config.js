import path from 'path'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

import { generateScopedName } from './src/utils/build'

export default defineConfig({
  css: {
    modules: {
      generateScopedName: generateScopedName(),
    },
  },
  esbuild: {
    jsxInject: "import * as React from 'react'",
  },
  plugins: [
    reactRefresh(),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      constants: path.resolve(__dirname, 'src/constants'),
      contexts: path.resolve(__dirname, 'src/contexts'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      services: path.resolve(__dirname, 'src/services'),
      styles: path.resolve(__dirname, 'src/styles'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
})
