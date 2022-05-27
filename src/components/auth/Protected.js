import React, {useEffect, useState, useCallback} from 'react';
import { Navigate } from "react-router-dom";
import { getUserId, getUserById } from "../../services/users";

const Protected = ({ token, children, noClient, noOperador}) => {
    if (!token) {
        return <Navigate to="/" replace />;
    }

    const [userType, setUserType] = useState()
    const fetchUserData = useCallback(async () => {
        const userId = getUserId()
        const userData = await getUserById(userId)
        setUserType(userData.userType)
    }, [])

    useEffect(() => {
        fetchUserData()
        .catch(console.error);
    }, []);
    
    if ((noClient && userType == 'c') || (noOperador && userType == 'o')){
        return <Navigate to="/notallowed/" replace />;
    }

    return userType && children;
};
export default Protected;