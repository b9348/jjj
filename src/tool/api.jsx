import service from './axios'

export const signUp = info => service.post('/index/register', info);
export const logIn = info => service.post('/index/login', info);
export const getMatchList = (match_name, today) => {
    let url = '/match/get_match_list';
    const params = {};

    if (match_name) {
        params.match_name = match_name;
    }
    if (today) {
        params.today = today;
    }

    if (Object.keys(params).length > 0) {
        const queryParams = new URLSearchParams(params).toString();
        url += `?${queryParams}`;
    }

    return service.get(url);
};
export const getMatch = ({match_id}) => {
    console.log(match_id);
    let url = '/match/getMatch';
    return service.get(`${url}?match_id=${match_id}`);
};

export const getMatchDetail = info => service.post(`/invest/getList`, info); 
