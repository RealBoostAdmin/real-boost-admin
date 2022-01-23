import {Button, TableCell} from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import React from 'react';

interface IPropsEditRelationButton {
    model?: any
    editRelation: (model: any) => Promise<void>;
}

const EditRelationButton: React.FC<IPropsEditRelationButton> = ({
                                                                    model,
                                                                    editRelation
                                                                }) => {

    return (
        <TableCell className="table-cell-edit-relation-tbody-item">
            <Button
                onClick={() => editRelation(model ? model : null)}
                className="edit-relation-tbody-item"
                color="secondary"
                variant="contained"
                startIcon={<LinkIcon/>}
            />
        </TableCell>
    )
}

export default EditRelationButton;
