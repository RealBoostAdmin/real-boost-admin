import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import HeadSection from '../../../components/HeadSection/HeadSection';
import {UserModel} from '../../../../core/models/user/user.model';
import {getUser} from '../../../../core/service/user/user.service';
import {useParams} from "react-router";
import TabsUser from "../TabsUser/TabsUser";

const UserDetailsPage: React.FC = () => {
    const [user, setUser] = useState<UserModel>();
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const {userId} = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const {data, error} = await getUser(userId);
                error ? toast.error('Loading user has failed ! ') : setUser(data)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [date, setUser])

    return (
        <>
            <HeadSection title={`Detail of ${user?.username}`} back={true}/>
            {!loading && !!user && <TabsUser date={date} setDate={() => setDate(new Date())} user={user}/>}
        </>
    )
}

export default UserDetailsPage;
