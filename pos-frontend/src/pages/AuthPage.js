// src/pages/AuthPage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const error = useSelector((state) => state.error);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    useEffect(() => {
        if (error.id === 'LOGIN_FAIL') {
            // Handle login error
        }
    }, [error]);

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Login</Typography>
            {error.msg && <Alert severity="error">{error.msg}</Alert>}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
            </form>
        </Container>
    );
};

export default AuthPage;
