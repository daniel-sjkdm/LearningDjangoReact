import React from 'react';
import {
    Button,
    TextField,
    InputAdornment
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import auth from './../../auth';


const url = 'http://localhost:8000/accounts/register/';

// TODO: 
// [x] Validate input fields 
// [ ] Validate email address

const requiredFieldError = <p style={{
    fontSize: "12px",
    color: "red",
    position: "relative",
    // left: "60px",
    top: "-28px",
    marginBottom: "-40px"
}}> This field is required  </p>

const minimumLengthError = (value) => {
    return <p style={{
        fontSize: "12px",
        color: "red",
        position: "relative",
        left: "px",
        top: "-28px",
        marginBottom: "-40px"
    }}> This field can't have less than {value} characters  </p>
}

const maximumLengthError = (value) => {
    return <p style={{
        fontSize: "12px",
        color: "red",
        position: "relative",
        left: "px",
        top: "-28px",
        marginBottom: "-40px"
    }}> This field can't have more than {value} characters </p>
}

const invalidEmailError = <p style={{
        fontSize: "12px",
        color: "red",
        position: "relative",
        left: "px",
        top: "-28px",
        marginBottom: "-40px"
    }}> Invalid email address </p>

const Register = (props) => {
    const { register, handleSubmit, errors, control } = useForm();

    const onSubmit = (data) => {
        console.log(data)
        const user = auth.register({
            username: data.username,
            email: data.email,
            password: data.password1
        })
        console.log(user)
    }

    return (
        <div>
        <h2> User Registration </h2>
        <form method="post" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <TextField 
                error={errors.username ? true : false}
                name="username"
                type="text"
                label="username"
                variant="outlined"
                style={{
                    marginBottom: "20px",
                }}
                inputRef={register({
                    required: true,
                })}
            /> 
            {errors.username && errors.username.type === "required" && requiredFieldError}
            <br/>
            <TextField 
                error={errors.email ? true : false}
                name="email"
                type="text"
                label="email"
                variant="outlined"
                style={{
                    marginBottom: "20px",
                }}
                inputRef={register({
                    required: false,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                })}
            /> 
            {errors.email && errors.email.type === "pattern" && invalidEmailError}
            <br/>
            <TextField 
                error={errors.password1 ? true : false}
                name="password1"
                type="password"
                label="password1"
                variant="outlined"
                style={{
                    marginBottom: "20px",
                }}
                inputRef={register({
                    required: true, 
                    minLength: 8,
                    maxLength: 20,
                })}
            /> 
            {errors.password1 && errors.password1.type === "required" && requiredFieldError}
            {errors.password1 && errors.password1.type === "minLength" && minimumLengthError(8)}
            {errors.password1 && errors.password1.type === "maxLength" && maximumLengthError(20)}
            <br/>
            <TextField 
                error={errors.password2 ? true : false}
                name="password2"
                type="password"
                label="password2"
                variant="outlined"
                style={{
                    marginBottom: "20px",
                }}
                inputRef={register({
                    required: true,
                    minLength: 8, 
                    maxLength: 20,
                })}
            /> 
            {errors.password2 && errors.password2.type === "required" && requiredFieldError}
            {errors.password2 && errors.password2.type === "minLength" && minimumLengthError(8)}
            {errors.password2 && errors.password2.type === "maxLength" && maximumLengthError(20)}            
            <br/>
            <Button
                type="submit"
                variant="contained"
                color="primary">
                Submit
            </Button>
        </form>
        </div>
    )
}


export default Register;