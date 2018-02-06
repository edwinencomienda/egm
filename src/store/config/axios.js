import http from 'axios'
import cookies from 'vue-cookies'
import { env } from './env'

export const axios = http.create({
  baseURL: env.DOMAIN_URL,
  headers: {
    'Authorization': 'Bearer ' + cookies.get('user_token_session')
  }
})
