import { useNavigate } from 'react-router-dom';

export const useGoto = () => {
    const navigate = useNavigate();

    return (url) => {
        navigate(url);
    };
};

export const getUrlParams = (url) => {
    const params = {};
    const parser = document.createElement('a');
    parser.href = url;

    // 解析查询字符串
    const queryParams = parser.search.substring(1).split('&');
    queryParams.forEach(param => {
        const [key, value] = param.split('=');
        params[decodeURIComponent(key)] = decodeURIComponent(value);
    });

    return params;
}