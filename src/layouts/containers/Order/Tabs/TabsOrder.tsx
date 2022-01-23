import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '../../../components/Tabs/TabPanel/TabPanel';
import {OrderModel} from '../../../../core/models/order/order.model';
import TabMission from './TabsItem/TabMission';
import TabDiscount from './TabsItem/TabDiscount';
import TabVoucher from './TabsItem/TabVoucher';
import TabOptionsOfOrder from './TabsItem/TabOptionsOfOrder';
import TabExtrasOfOrder from "./TabsItem/TabExtrasOfOrder";
import TabOrderStates from "./TabsItem/TabOrderStates";

interface IPropsTabsOrder {
    order: OrderModel;
    setDate: (date: Date) => void;
}

const TabsOrder: React.FC<IPropsTabsOrder> = ({order, setDate}) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Mission"/>
                    <Tab label="Discount"/>
                    <Tab label="Voucher"/>
                    <Tab label="Extras"/>
                    <Tab label="Options"/>
                    <Tab label="Order states"/>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TabMission mission={order?.mission} setDate={setDate}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TabDiscount order={order} setDate={setDate}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TabVoucher order={order} setDate={setDate}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <TabExtrasOfOrder order={order}/>
            </TabPanel>
            <TabPanel value={value} index={4}>
                <TabOptionsOfOrder order={order}/>
            </TabPanel>
            <TabPanel value={value} index={5}>
                <TabOrderStates order={order}/>
            </TabPanel>
        </Box>
    );
}

export default TabsOrder;
