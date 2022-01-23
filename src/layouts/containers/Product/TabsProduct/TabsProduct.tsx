import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '../../../components/Tabs/TabPanel/TabPanel';
import TabQuestions from './TabsItem/TabQuestions';
import {ProductModel} from '../../../../core/models/product/product.model';
import TabOptionsOfProduct from './TabsItem/TabOptionsOfProduct';

interface IPropsTabsProduct {
    product: ProductModel;
}

const TabsProduct: React.FC<IPropsTabsProduct> = ({product}) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Questions"/>
                    <Tab label="Options"/>
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TabQuestions product={product}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TabOptionsOfProduct product={product}/>
            </TabPanel>

        </Box>
    );
}

export default TabsProduct;
