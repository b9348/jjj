import service from './axios'

export const signUp = info => service.post('/register', info);
export const logIn = info => service.post('/login', info);
