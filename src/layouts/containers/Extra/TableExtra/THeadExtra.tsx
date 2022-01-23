import React from 'react';
import {TableCell, TableHead, TableRow} from '@mui/material';

interface IColumnProps {
    id: string;
    label: string;
    minWidth?: string;
    align?: 'center';
}

const THeadExtra: React.FC = () => {

    const listColumns: IColumnProps[] = [
        {id: 'name', label: 'Name', minWidth: '6rem', align: 'center'},
        {id: 'amount', label: 'Amount', minWidth: '6rem', align: 'center'},
        {id: 'percent', label: 'Percent', minWidth: '6rem', align: 'center'},
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

export default THeadExtra;
