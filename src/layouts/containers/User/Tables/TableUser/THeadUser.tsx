import React from 'react';
import {TableCell, TableHead, TableRow} from '@mui/material';

interface IColumnProps {
    id: string;
    label: string;
    minWidth?: string;
    align?: 'center';
}

const THeadUser: React.FC = () => {

    const listColumns: IColumnProps[] = [
        {id: 'email', label: 'Email', minWidth: '6rem', align: 'center'},
        {id: 'username', label: 'Username', minWidth: '6rem', align: 'center'},
        {id: 'avatar', label: 'Avatar', minWidth: '6rem', align: 'center'},
        {id: 'role', label: 'Role', minWidth: '6rem', align: 'center'},
        {id: 'translation', label: 'Translation', minWidth: '6rem', align: 'center'},
        {id: 'actions', label: 'Actions', minWidth: '10rem', align: 'center'}
    ];

    return (
        <TableHead>
            <TableRow>
                {listColumns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{minWidth: column.minWidth}}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default THeadUser;
