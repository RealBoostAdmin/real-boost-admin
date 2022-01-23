import React from 'react';
import {TableCell, TableHead, TableRow} from '@mui/material';

interface IColumnProps {
    id: string;
    label: string;
    width?: string;
    align?: 'center';
}

const THeadCountry: React.FC = () => {

    const listColumns: IColumnProps[] = [
        {id: 'name', label: 'Name', width: '50%', align: 'center'},
        {id: 'actions', label: 'Actions', width: '50%', align: 'center'},
    ];

    return (
        <TableHead>
            <TableRow>
                {listColumns.map((column) => (
                    <TableCell
                        key={column.id}
                        align={column.align}
                        style={{width: column.width}}
                    >
                        {column.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default THeadCountry;
