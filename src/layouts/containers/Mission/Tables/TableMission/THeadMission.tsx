import React from 'react';
import {TableCell, TableHead, TableRow} from '@mui/material';

interface IColumnProps {
    id: string;
    label: string;
    minWidth?: string;
    align?: 'center';
}

const THeadMission: React.FC = () => {

    const listColumns: IColumnProps[] = [
        {id: 'code', label: 'Code', minWidth: '6rem', align: 'center'},
        {id: 'state', label: 'State', minWidth: '6rem', align: 'center'},
        {id: 'currency', label: 'Currency', minWidth: '6rem', align: 'center'},
        {id: 'total', label: 'Total', minWidth: '6rem', align: 'center'},
        {id: 'username', label: 'Username', minWidth: '6rem', align: 'center'},
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

export default THeadMission;
