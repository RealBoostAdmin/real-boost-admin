import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import './HeaderFormModal.scss';

interface HeaderFormModalProps {
    title: string;
    handleClose?: () => void;
}

const HeaderFormModal: React.FC<HeaderFormModalProps> = ({
                                                             title,
                                                             handleClose
                                                         }) => {
    return (
        <>
            <Typography
                className="title-form-modal"
                id="modal-modal-title"
                variant="h6"
                component="h2">{title}
            </Typography>
            {handleClose &&
            <CloseIcon
                className="icon-close-form-modal"
                onClick={handleClose}
            />
            }
        </>
    )
}

export default HeaderFormModal;
