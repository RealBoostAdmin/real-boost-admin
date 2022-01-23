import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '../../../components/Tabs/TabPanel/TabPanel';
import {UserModel} from '../../../../core/models/user/user.model';
import TabAddress from './TabsItem/TabAddress';
import TabProfile from './TabsItem/TabProfile';

interface IPropsTabsUser {
    user: UserModel;
    date: Date;
    setDate: (date: Date) => void;
}

const TabsUser: React.FC<IPropsTabsUser> = ({user, date, setDate}) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Address"/>
                    <Tab label="Profile"/>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TabAddress setDate={() => setDate(new Date())} user={user}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TabProfile date={date} setDate={() => setDate(new Date())} user={user}/>
            </TabPanel>

        </Box>
    );
}

export default TabsUser;
