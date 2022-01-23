import React from 'react';
import HeadSection from '../../../../components/HeadSection/HeadSection';
import {MissionModel} from '../../../../../core/models/mission/mission.model';
import FormBounty from '../../Forms/FormBounty';

interface IPropsTabBounty {
    mission: MissionModel;
    setDate: (date: Date) => void;
}

const TabBounty: React.FC<IPropsTabBounty> = ({mission, setDate}) => {

    return (
        <>
            <HeadSection title={`Attribute Bounty to the mission : ${mission.code}`}/>
            {mission && <FormBounty mission={mission} setDate={setDate}/>}
        </>
    )
}

export default TabBounty;
