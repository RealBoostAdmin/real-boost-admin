import React from 'react';
import {TableCell, TableHead, TableRow} from '@mui/material';

interface IColumnProps {
    id: string;
    label: string;
    width?: string;
    align?: 'center';
}

const THeadTranslation: React.FC = () => {

    const listColumns: IColumnProps[] = [
        {id: 'code', label: 'Code', width: '33%', align: 'center'},
        {id: 'flag', label: 'Flag', width: '33%', align: 'center'},
        {id: 'actions', label: 'Actions', width: '40%', align: 'center'},
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

export default THeadTranslation;
