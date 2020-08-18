import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button, 
    IconButton
} from '@material-ui/core';
// import {
//     MenuIcon
// } from '@material-ui/icons/Menu';
import {
    Link
} from 'react-router-dom';


const Navigation = (props) => {
    return (
        <div>
            <AppBar position="static">
            <Toolbar>
                <IconButton color="inherit" aria-label="menu">
                </IconButton>
                <Typography variant="h6">
                News
                </Typography>
                <Link to="/login">
                    <Button color="inherit">Login</Button>
                </Link>
                <Link to="/register">
                    <Button color="inherit">Register</Button>
                </Link>
                <Link to="/">
                    <Button color="inherit">Home</Button>
                </Link>
                <Link to="/posts">
                    <Button color="inherit">Posts</Button>
                </Link>
            </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navigation;