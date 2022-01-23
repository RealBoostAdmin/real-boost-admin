import React from 'react';
import HeadSection from '../../../../components/HeadSection/HeadSection';
import {UserModel} from '../../../../../core/models/user/user.model';
import FormAddress from '../../Forms/FormAddress';

interface IPropsTabAddress {
    user: UserModel;
    setDate: (date: Date) => void;
}

const TabAddress: React.FC<IPropsTabAddress> = ({user, setDate}) => {

    return (
        <>
            <HeadSection title={`Attribute address for ${user.username}`}/>
            {<FormAddress setDate={() => setDate(new Date())} user={user} edit={!!user.address}/>}
        </>
    )
}

export default TabAddress;
