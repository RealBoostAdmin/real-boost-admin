import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import './HeadSection.scss';
import {useNavigate} from 'react-router';

interface IHeadSection {
    title: string;
    textButton?: string;
    handleOpen?: (model?: any) => void;
    setEdit?: (bool: boolean) => void;
    back?: boolean;
    redirect?: string;
    redirectText?: string;
}

const HeadSection: React.FC<IHeadSection> = ({
                                                 title,
                                                 textButton,
                                                 handleOpen,
                                                 setEdit,
                                                 back,
                                                 redirect,
                                                 redirectText
                                             }) => {
    const navigate = useNavigate();

    return (
        <Box
            className="head-section"
        >
            <h1>{title}</h1>
            {textButton &&
            <Button
                className="head-section-button"
                onClick={() => {
                    handleOpen()
                    if (setEdit) setEdit(false);
                }}>
                <AddIcon/> {textButton}
            </Button>
            }
            {back &&
            <Button
                className="head-section-button"
                onClick={() => navigate(-1)}
            >
                Retour
            </Button>
            }
            {redirect && redirectText &&
            <Button
                sx={{width: '150px'}}
                className="head-section-button"
                onClick={() => navigate(redirect)}
            >
                {redirectText}
            </Button>
            }
        </Box>
    )
}

export default HeadSection;
