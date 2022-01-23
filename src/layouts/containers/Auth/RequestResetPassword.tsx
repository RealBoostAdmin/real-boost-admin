import React from 'react';
import {useForm} from 'react-hook-form';
import {FormControl} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {PostUserModel} from '../../../core/models/user/user.model';
import {requestResetPasswordWithEmail} from '../../../core/service/auth/auth.service';
import {useNavigate} from 'react-router';
import Box from '@mui/material/Box';
import {makeStyles} from '@mui/styles';
import Typography from '@mui/material/Typography';
import ErrorInputForm from '../../components/Errors/ErrorInputForm/ErrorInputForm';

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const RequestResetPassword: React.FC = () => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;
    const navigate = useNavigate();

    const requestResetPassword = async (data: PostUserModel) => {
        const {error} = await requestResetPasswordWithEmail(data);
        error ? console.log('error request change password') : navigate(`/login`)
    };

    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                padding: '5rem 0',
                margin: '0 auto',
                marginTop: '8rem',
                width: '50%',
            }}
        >
            <Typography
                component="h1"
                variant="h5"
                align="center"
                sx={{
                    width: '50%',
                    margin: '0 auto'
                }}>
                Request the reset of your password
            </Typography>
            <form onSubmit={handleSubmit(requestResetPassword)} className={classes.form}>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input
                        type="email"
                        className="input-group"
                        name="email"
                        placeholder={'Your email'}
                        id="email-input"
                        {...register('email', {
                            required: 'This field is required !',
                            pattern: {value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'invalid email address'}
                        })}
                        error={!!errors.email}
                    />
                    {errors.email && <ErrorInputForm errorMessage={errors.email.message}/>}
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    Send
                </Button>
            </form>
        </Box>
    )
}

export default RequestResetPassword;
