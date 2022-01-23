import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '../../../components/Tabs/TabPanel/TabPanel';
import TabProfiles from './TabsItem/TabProfiles';
import {MissionModel} from '../../../../core/models/mission/mission.model';
import TabBounty from './TabsItem/TabBounty';
import TabReview from './TabsItem/TabReview';
import TabBill from "./TabsItem/TabBills";
import TabConversation from "./TabsItem/TabConversation";
import TabDispute from "./TabsItem/TabDispute";

interface IPropsTabsMission {
    mission: MissionModel;
    setDate: (date: Date) => void;
}

const TabsMission: React.FC<IPropsTabsMission> = ({mission, setDate}) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Profiles"/>
                    <Tab label="Bounty"/>
                    <Tab label="Bill"/>
                    <Tab label="Review"/>
                    <Tab label="Conversation"/>
                    <Tab label="Dispute"/>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TabProfiles mission={mission}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TabBounty mission={mission} setDate={setDate}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TabBill mission={mission}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <TabReview mission={mission} setDate={setDate}/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <TabConversation mission={mission}/>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <TabDispute mission={mission}/>
            </TabPanel>
        </Box>
    );
}

export default TabsMission;
