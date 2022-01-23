import React from 'react';
import {useForm} from 'react-hook-form';
import {FormControl} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {PostUserModel} from '../../../core/models/user/user.model';
import {postSignIn} from '../../../core/service/auth/auth.service';
import {useNavigate} from 'react-router';
import Box from '@mui/material/Box';
import {makeStyles} from '@mui/styles';
import Typography from '@mui/material/Typography';
import ErrorInputForm from '../../components/Errors/ErrorInputForm/ErrorInputForm';
import {useDispatch} from "react-redux";
import {loginAuthState} from "../../../core/store/auth/auth.actions";
import {getUserByEmail} from "../../../core/service/user/user.service";
import {toast} from "react-toastify";

type LoginType = {
    email: string;
    password: string;
}

const useStyles = makeStyles(() => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}))

const Login: React.FC = () => {
    const classes = useStyles();
    const {register, formState, handleSubmit} = useForm<LoginType>({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signIn = async (data: PostUserModel) => {
        try {
            const {user, errorUser} = await getUserByEmail(data.email)
            if (errorUser) {
                toast.error('Error when trying to find the user with his email');
            } else {
                if (user && user.length === 1) await dispatch(loginAuthState({user: user[0]}));
                const {error} = await postSignIn(data);
                error
                    ? toast.error('Error when trying to log in with this email and password')
                    : navigate('/admin');
            }
        } catch (error) {
            console.log(error);
        }
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
            <Typography component="h1" variant="h5" align="center">Login</Typography>
            <form onSubmit={handleSubmit(signIn)} className={classes.form}>
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
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'invalid email address'
                            }
                        })}
                        error={!!errors.email}
                    />
                    {errors.email && <ErrorInputForm errorMessage={errors.email.message}/>}
                </FormControl>
                <FormControl variant={'outlined'} sx={{my: 2}}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                        type="password"
                        className="input-group"
                        name="password"
                        placeholder={'Your password'}
                        id="password-input"
                        {...register('password', {
                            required: 'This field is required !',
                            minLength: {value: 8, message: 'Minimum 8 caractères'},
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
                    Login
                </Button>
            </form>
        </Box>
    )
}

export default Login;
