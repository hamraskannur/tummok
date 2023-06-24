import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Auth } from '../axios/axios';

function UserPublicRoute(props) {
    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            const data = await Auth()
            if (!data.status) {
                localStorage.clear()
                navigate('/login')
            }
        })()
    }, [])
    
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" />;
    }
    if (localStorage.getItem("token")) {
        return props.children;
    }
}

export default UserPublicRoute;