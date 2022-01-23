import {Button, TableCell} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import './ActionButtons.scss';

interface ActionButtonsProps {
    handleOpen: (model: any) => void;
    model: any;
    deleteItem: (id: string) => void;
}

const ActionButton: React.FC<ActionButtonsProps> = ({
                                                        handleOpen,
                                                        model,
                                                        deleteItem
                                                    }) => {

    return (
        <TableCell className="table-cell-action-buttons-tbody-item">
            <Button
                onClick={() => handleOpen(model)}
                className="action-button-tbody-item"
                variant="contained"
                startIcon={<CreateIcon/>}
            >
                Modify
            </Button>
            <Button
                onClick={() => deleteItem(model.id)}
                className="action-button-tbody-item"
                color="secondary"
                variant="contained"
                startIcon={<DeleteIcon/>}
            >
                Delete
            </Button>
        </TableCell>
    )
}

export default ActionButton;
