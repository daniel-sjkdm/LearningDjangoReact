import React, { useState } from 'react';
import {
    Redirect
} from 'react-router-dom';
import {
    Button,
    TextField,
    InputAdornment
} from '@material-ui/core';
import {
    AccountCircle
} from '@material-ui/icons';
import LockIcon from '@material-ui/icons/Lock';
import auth from './../../auth';


const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }


    const handleFormSubmit = (event) => {
        event.preventDefault();
        auth.login(username, password);
        setIsAuthenticated(auth.isAuthenticated)
        console.log(isAuthenticated)
    }

    if (isAuthenticated) {
        return (
            <Redirect to="/" />
        )
    }

    return (
        <div>
            <h2> Login </h2>
            <form method="post" onSubmit={handleFormSubmit} autoComplete="off">
                <TextField
                    value={username}
                    onChange={handleUsernameChange}
                    label="Username"
                    variant="outlined"
                    InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<AccountCircle />
							</InputAdornment> 
						),
                    }}
                    style={{
                        marginBottom: "20px",
                    }}
                />
                <br/>
                <TextField
                    value={password}
                    type="password"
                    onChange={handlePasswordChange}
                    label="Password"
                    variant="outlined"
                    InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<LockIcon />
							</InputAdornment> 
						),
                    }}
                    style={{
                        marginBottom: "20px",
                    }}
                />
                <br/>
                <Button 
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Submit
                </Button>
            </form> 
        </div>
    )
}

export default Login;