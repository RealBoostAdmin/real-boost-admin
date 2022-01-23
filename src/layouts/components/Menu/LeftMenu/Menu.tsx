import React from 'react'
import MenuItem from './MenuItem';
import {Divider, List, SvgIconProps, Theme, Typography} from '@mui/material';
import {makeStyles} from '@mui/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Box from '@mui/material/Box';

interface MenuItemProps {
    name: string,
    link?: string,
    icon?: React.ReactElement<SvgIconProps>,
    items?: any[]
}

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) => ({
        appMenu: {
            width: '100%',
        },
        navList: {
            width: drawerWidth,
        },
        menuItem: {
            width: drawerWidth,
        },
        menuItemIcon: {
            color: theme.palette.info.main,
        },
    }),
)

const menuItems: MenuItemProps[] = [
    {
        name: 'Dashboard',
        link: '/admin/',
        icon: <DashboardIcon/>,
    },

    {
        name: 'Games',
        link: '/admin/games',
        icon: <DashboardIcon/>,
    },
    {
        name: 'Products',
        link: '/admin/products',
        icon: <DashboardIcon/>,
    },
    {
        name: 'Questions',
        link: '/admin/questions',
        icon: <DashboardIcon/>,
    },
    {
        name: 'Options',
        link: '/admin/options',
        icon: <DashboardIcon/>,
    },
    {
        name: 'Extras',
        link: '/admin/extras',
        icon: <DashboardIcon/>,
    },
    {
        name: 'Discounts',
        link: '/admin/discounts',
        icon: <DashboardIcon/>,
    },
    {
        name: 'Users',
        link: '/admin/users',
        icon: <DashboardIcon/>,
    },
    {
        name: 'Orders',
        link: 'admin/orders',
        icon: <DashboardIcon/>,
    },
    {
        name: 'Missions',
        link: 'admin/missions',
        icon: <DashboardIcon/>,
    },
    {
        name: 'Configuration',
        icon: <DashboardIcon/>,
        items: [
            {
                name: 'Languages',
                link: '/admin/languages',
            },
            {
                name: 'Translations',
                link: '/admin/translations',
            },
            {
                name: 'Countries',
                link: '/admin/countries',
            },
        ]
    },
]

const Menu: React.FC = () => {
    const classes = useStyles()

    return (
        <>
            <Box
                m='0 auto'
                py={1.75}
            >
                <Typography>RealBoost</Typography>
            </Box>
            <Divider/>
            <List component="nav" className={classes.appMenu} disablePadding>
                {menuItems.map((item, index) => (
                    <MenuItem
                        name={item.name}
                        link={item.link}
                        icon={item.icon}
                        items={item.items ? item.items : null}
                        key={index}/>
                ))}
            </List>
        </>
    )
}

export default Menu
