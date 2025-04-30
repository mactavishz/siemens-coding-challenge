import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    // Frontend baseUrl - the frontend development server
    baseUrl: 'http://localhost:5173',
    supportFile: false,
    env: {
      // Backend API URL - the backend server
      apiUrl: 'http://localhost:3000'
    },
    video: false,
    screenshotOnRunFailure: true
  },
})