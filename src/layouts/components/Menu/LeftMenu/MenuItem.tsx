import React from 'react'
import MenuItemComponent from './MenuItemComponent'
import {Collapse, Divider, List, ListItemIcon, ListItemText, SvgIconProps, Theme} from '@mui/material';
import {makeStyles} from '@mui/styles';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface MenuItemPropTypes {
    name: string,
    link: string,
    icon: React.ReactElement<SvgIconProps>,
    items?: any[] | null
}

const useStyles = makeStyles((theme: Theme) => ({
        menuItem: {
            '&.active': {
                background: 'rgba(0, 0, 0, 0.08)',
                '& .MuiListItemIcon-root': {
                    color: '#fff',
                },
            },
        },
        menuItemIcon: {
            color: '#97c05c',
        },
    }),
)

const MenuItem: React.FC<MenuItemPropTypes> = ({
                                                   name,
                                                   link,
                                                   icon,
                                                   items
                                               }) => {
    const classes = useStyles()
    const isExpandable = items && items.length > 0
    const [open, setOpen] = React.useState(false)

    function handleClick() {
        setOpen(!open)
    }

    const MenuItemRoot = (
        <MenuItemComponent className={classes.menuItem} link={link} onClick={handleClick}>
            {/* Display an icon if any */}
            {!!icon && (
                <ListItemIcon className={classes.menuItemIcon}>
                    {icon}
                </ListItemIcon>
            )}
            <ListItemText primary={name} inset={!icon}/>
            {/* Display the expand menu if the item has children */}
            {isExpandable && !open && <ExpandMoreIcon/>}
            {isExpandable && open && <ExpandLessIcon/>}
        </MenuItemComponent>
    )

    const MenuItemChildren = isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider/>
            <List component="div" disablePadding>
                {items.map((item, index) => (
                    <MenuItem {...item} key={index}/>
                ))}
            </List>
            <Divider/>
        </Collapse>
    ) : null

    return (
        <>
            {MenuItemRoot}
            {MenuItemChildren}
        </>
    )
}

export default MenuItem
