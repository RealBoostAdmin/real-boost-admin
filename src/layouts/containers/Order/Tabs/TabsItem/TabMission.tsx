import React from 'react';
import HeadSection from '../../../../components/HeadSection/HeadSection';
import {MissionModel} from '../../../../../core/models/mission/mission.model';
import FormMission from '../../../Mission/Forms/FormMission';

interface IPropsTabMission {
    mission: MissionModel;
    setDate: (date: Date) => void;
}

const TabMission: React.FC<IPropsTabMission> = ({mission, setDate}) => {

    return (
        <>
            <HeadSection title={`Create mission for the order : ${mission.code}`}/>
            {<FormMission mission={mission} setDate={setDate}/>}
        </>
    )
}

export default TabMission;
