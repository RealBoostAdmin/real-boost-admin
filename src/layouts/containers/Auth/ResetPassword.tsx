import React from 'react';
import {useForm} from 'react-hook-form';
import {FormControl} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {resetPassword} from '../../../core/service/auth/auth.service';
import {useNavigate} from 'react-router';
import {useSelector} from 'react-redux';
import {AccessToken} from '../../../core/store/auth/auth.selector';
import Box from '@mui/material/Box';
import {makeStyles} from '@mui/styles';
import Typography from '@mui/material/Typography';
import ErrorInputForm from '../../components/Errors/ErrorInputForm/ErrorInputForm';
import {ResetPasswordAuthModel} from '../../../core/models/auth/auth.model';


const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const ResetPassword: React.FC = () => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;
    const navigate = useNavigate();
    const accessToken = useSelector(AccessToken);

    const resetMdp = async (data: ResetPasswordAuthModel) => {
        const {error} = await resetPassword({...data, accessToken});
        error ? console.log('error reset password') : navigate(`/admin`)
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
            <Typography component="h1" variant="h5" align="center">Reset Password</Typography>
            <form className={classes.form} onSubmit={handleSubmit(resetMdp)}>
                <FormControl variant={'outlined'} sx={{ my: 2}}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        type="password"
                        className="input-group"
                        name="password"
                        placeholder={'Your password'}
                        id="password-input"
                        {...register('password', {
                            required: 'This is required.',
                            minLength: {value: 8, message: 'Minimum 8 caractères'}
                        })}
                        error={!!errors.password}
                    />
                    {errors.password && <ErrorInputForm errorMessage={errors.password.message}/>}
                </FormControl>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting || !isValid}
                >
                    Reset password
                </Button>
            </form>
        </Box>
    )
}

export default ResetPassword;
