import cookies from 'vue-cookies'

const BASE_URL = 'http://localhost:8001'
const API_PREFIX = cookies.get('api_path_prefix') ? '/' + cookies.get('api_path_prefix') : '/api/v1/'
const DOMAIN_URL = BASE_URL + API_PREFIX
const API_USER_DATA = DOMAIN_URL + 'data'
const API_USER_LOGIN = DOMAIN_URL + 'auth/login'
const ACCESS_TOKEN = cookies.get('user_token_session')

// function generate api end point
const buildApiEndpoint = (path) => {
  return DOMAIN_URL + path
}

export const env = {
  BASE_URL,
  DOMAIN_URL,
  API_USER_LOGIN,
  API_USER_DATA,
  ACCESS_TOKEN,
  buildApiEndpoint
}
