import React from 'react';
import HeadSection from '../../../../components/HeadSection/HeadSection';
import {MissionModel} from '../../../../../core/models/mission/mission.model';
import FormReview from '../../Forms/FormReview';

interface IPropsTabReview {
    mission: MissionModel;
    setDate: (date: Date) => void;
}

const TabReview: React.FC<IPropsTabReview> = ({mission, setDate}) => {

    return (
        <>
            <HeadSection title={`Attribute Review to the mission : ${mission.code}`}/>
            {<FormReview mission={mission} setDate={setDate}/>}
        </>
    )
}

export default TabReview;
