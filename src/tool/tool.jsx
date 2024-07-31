import { useNavigate } from 'react-router-dom';

export const useGoto = () => {
    const navigate = useNavigate();

    return (url) => {
        navigate(url);
    };
};
