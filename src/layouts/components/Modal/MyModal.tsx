import {makeStyles} from '@mui/styles';
import {Modal, Theme} from '@mui/material';
import React from 'react';
import Box from '@mui/material/Box';

interface MyModalProps {
    handleClose: ((open: boolean) => void);
    open: boolean;
    children: any;
}

const useStyles = makeStyles((theme: Theme) => ({
    modalBox: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: '#f9f9f9',
        border: '2px solid #000',
        boxShadow: '24',
        padding: '2rem'

    },
}));

const MyModal: React.FC<MyModalProps> = ({
                                         handleClose,
                                         open,
                                         children
                                     }) => {
    const classes = useStyles();
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={classes.modalBox}>
                {children}
            </Box>
        </Modal>
    )
}

export default MyModal
