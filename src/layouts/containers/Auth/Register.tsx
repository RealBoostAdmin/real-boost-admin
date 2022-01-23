import React from 'react';
import {useForm} from 'react-hook-form';
import {FormControl} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import {PostUserModel} from '../../../core/models/user/user.model';
import {postSignUp} from '../../../core/service/auth/auth.service';
import {useNavigate} from 'react-router';
import ErrorInputForm from '../../components/Errors/ErrorInputForm/ErrorInputForm';

const Register: React.FC = () => {
    const {register, formState, handleSubmit} = useForm({mode: 'onChange'})
    const {isSubmitting, errors, isValid} = formState;
    const navigate = useNavigate();

    const signUp = async (data: PostUserModel) => {
        const {error} = await postSignUp(data);
        error ? console.log('error signing in') : navigate('/')
    };

    return (
        <form onSubmit={handleSubmit(signUp)}>
            <FormControl>
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
            <FormControl>
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
                Register
            </Button>
        </form>
    )
}

export default Register;
