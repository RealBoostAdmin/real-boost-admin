import {useSelector} from 'react-redux';
import React from 'react';
import {Navigate, Outlet} from 'react-router';
import {IsAuthenticated} from '../../../../core/store/auth/auth.selector';

const Logged: React.FC = () => {
    const isAuthenticated = useSelector(IsAuthenticated);

    if (!isAuthenticated) return <Navigate to='/login'/>;

    return (
        <>
            <Outlet/>
        </>
    );
};

export default Logged;
