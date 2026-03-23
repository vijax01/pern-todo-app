import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
     server: {
          proxy: {
               '/messages': 'http://localhost:5000',
               '/save': 'http://localhost:5000',
               '/delete': 'http://localhost:5000',
               '/update': 'http://localhost:5000',
               '/toggleCheckbox': 'http://localhost:5000',
          },
     },
  plugins: [react(), tailwindcss()],
})
