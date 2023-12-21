import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/Login/refresh', {
            withCredentials: true,
            timeout: 15000
        });
        // const response = await axios.post('/Login/auth',
        //     { user:"user", pwd:"pwd" },
        //     {
        //         headers: { 'Content-Type': 'application/json' },
        //         withCredentials: true
        //     }
        //     );
        setAuth(prev => {
            console.log("------------------+++++++++++++++++++++"+response);
            console.log("------------------+++++++++++++++++++++"+JSON.stringify(prev));
            console.log("------------------+++++++++++++++++++++"+response);
            console.log("useRefreshToken++++++++++++++"+response.data.accessToken);
            return { 
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;