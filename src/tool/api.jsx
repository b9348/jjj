import service from './axios'

export const signUp = info => service.post('/index/register', info);
export const logIn = info => service.post('/index/login', info);
export const getMatchList = () => service.get('/match/get_match_list');
