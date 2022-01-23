import {useSelector} from 'react-redux';
import React from 'react';
import {Navigate, Outlet} from 'react-router';
import {IsAuthenticated} from '../../../../core/store/auth/auth.selector';

const NotLogged: React.FC = () => {
    const isAuthenticated = useSelector(IsAuthenticated);

    if (isAuthenticated) return <Navigate to='/admin'/>;

    return (
        <>
            <Outlet/>
        </>
    );
};

export default NotLogged;
