import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import HeadSection from '../../../components/HeadSection/HeadSection';
import {useParams} from "react-router";
import {MissionModel} from "../../../../core/models/mission/mission.model";
import {getMission} from "../../../../core/service/mission/mission.service";
import TabsMission from "../TabsMission/TabsMission";

const MissionDetailsPage: React.FC = () => {
    const [mission, setMission] = useState<MissionModel>();
    const [loading, setLoading] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const {code} = useParams();

    useEffect(() => {
        const fetchMission = async () => {
            try {
                setLoading(true);
                const {data, error} = await getMission(code);
                error ? toast.error('Loading mission has failed ! ') : data && data.length === 1
                    ? setMission(data[0]) : toast.error('No missions found')
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchMission();
    }, [date, setMission])

    return (
        <>
            <HeadSection title={`Detail of ${mission?.code}`} back={true}/>
            {!loading && !!mission && <TabsMission mission={mission} setDate={setDate}/>}
        </>
    )
}

export default MissionDetailsPage;
