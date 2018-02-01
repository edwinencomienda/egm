import cookies from 'vue-cookies'
export const axiosConfig = {
    baseURL: process.env.API_ENDPOINT,
    timeout: 3600,
    headers: {
        'Authorization': 'bearer ' + cookies.get('user_token_session')
    }
}