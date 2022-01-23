import React, {forwardRef} from 'react'
import {NavLink, NavLinkProps} from 'react-router-dom'
import {ListItem} from '@mui/material';

interface MenuItemComponentProps {
    className?: string
    link?: string | null
    onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

const MenuItemComponent: React.FC<MenuItemComponentProps> = ({
                                                                 className,
                                                                 onClick,
                                                                 link,
                                                                 children
                                                             }) => {

    // When ListItem has multiple items
    if (!link || typeof link !== 'string') {
        return (
            <ListItem
                button
                className={className}
                children={children}
                onClick={onClick}
            />
        )
    }

    // Return a ListItem with a link component
    return (
        <ListItem
            button
            className={className}
            children={children}
            component={forwardRef((props: NavLinkProps, ref) => <NavLink to={link} {...props} />)}
            to={link}
        />
    )
}

export default MenuItemComponent
