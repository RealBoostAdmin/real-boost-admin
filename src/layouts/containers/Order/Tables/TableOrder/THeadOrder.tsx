import React from 'react';
import {TableCell, TableHead, TableRow} from '@mui/material';

interface IColumnProps {
    id: string;
    label: string;
    minWidth?: string;
    align?: 'center';
}

const THeadOrder: React.FC = () => {

    const listColumns: IColumnProps[] = [
        {id: 'code', label: 'Code', minWidth: '6rem', align: 'center'},
        {id: 'amount', label: 'Amount', minWidth: '6rem', align: 'center'},
        {id: 'vat', label: 'VAT', minWidth: '6rem', align: 'center'},
        {id: 'currency', label: 'Currency', minWidth: '6rem', align: 'center'},
        {id: 'mission', label: 'Mission', minWidth: '6rem', align: 'center'},
        {id: 'product', label: 'Product', minWidth: '6rem', align: 'center'},
        {id: 'client', label: 'Client', minWidth: '6rem', align: 'center'},
        {id: 'discount', label: 'Discount', minWidth: '6rem', align: 'center'},
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

export default THeadOrder;
