import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import {Stack} from '@mui/material';
import './ErrorInputForm.scss';

interface IErrorInputForm {
    errorMessage: string;
}

const ErrorInputForm: React.FC<IErrorInputForm> = ({errorMessage}) => {

    return (
        <Stack className="error-input-form">
            <ErrorIcon className="alert-icon"/>
            <p className="alert-text">{errorMessage}</p>
        </Stack>
    )
}

export default ErrorInputForm;
