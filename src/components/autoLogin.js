import {Link, useNavigate, useLocation} from "react-router-dom"
import useAuth from '../hooks/useAuth';
const autoLogin = () => {
    const from = location.state?.from?.pathname || "/";
    const refresh = useRefreshToken();
    const { auth,setAuth } = useAuth();

    useEffect(() => {

        if(!auth?.accessToken)
        {
            const response = await refresh();
            const accessToken = response?.data?.data.accessToken;
            console.log("sonuc----------"+ JSON.stringify(response.data));
            const roles = response?.data?.data.roles;
            setAuth({   roles, accessToken });
            navigate(from, {replace: true});
        }
    })
}

export default autoLogin;