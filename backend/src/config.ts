import dotenv from 'dotenv'

dotenv.config()

interface Config {
  port: number
  nodeEnv: string
  frontendUrls: string[]
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrls: process.env.FRONTEND_URLS
    ? process.env.FRONTEND_URLS.split(',')
    : ['http://localhost:5173'],
}

export default config
