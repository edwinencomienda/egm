import cookies from 'vue-cookies'

const BASE_URL = 'http://localhost:8001'
const API_PREFIX = '/api/v1/'
const DOMAIN_URL = BASE_URL + API_PREFIX
const LOGIN_URL = DOMAIN_URL + 'auth/login'
const USER_URL = DOMAIN_URL + 'user/data'
const ACCESS_TOKEN = cookies.get('user_token_session')

export const env = {
  BASE_URL,
  API_PREFIX,
  DOMAIN_URL,
  LOGIN_URL,
  USER_URL,
  ACCESS_TOKEN
}
