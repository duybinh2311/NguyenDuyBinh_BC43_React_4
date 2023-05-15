import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'configStore/store': path.resolve(
        __dirname,
        './src/redux/configStore/store.jsx'
      ),
      components: path.resolve(__dirname, './src/components'),
      reducers: path.resolve(__dirname, './src/redux/reducers'),
      models: path.resolve(__dirname, './src/models'),
    },
  },
})
