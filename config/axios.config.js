export const axiosConfig = {
    baseURL: process.env.API_ENDPOINT,
    timeout: 3600,
    headers: {
        'Authorization': 'Bearer ' + cookies.get('user_token_session')
    }
}