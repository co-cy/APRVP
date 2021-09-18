import React, { useState } from 'react'
import { Box, TextField, Button } from "@material-ui/core"
import { Redirect } from "react-router-dom"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const token = window.localStorage.getItem("token")
    const [redirect, setRedirect] = useState(false)
    if (token != null) {
        return <Redirect to='/search' />;
    }
    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleClickButton = async (event) => {
        const body = {
            "username": email,
            "password": password
        }
        const res = await fetch('https://aprvp.herokuapp.com/login', {
            mode: "no-cors",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })
        console.log(res)
        window.localStorage.setItem("token", res.token)
        setRedirect(true)
    }
    if (redirect) {
        return <Redirect to='/search' />;
    }
    return (
        <Box sx={{ height: "100vh", width: "100%", alignItems: "center", display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <TextField
                type="email"
                label="Email"
                value={email}
                onChange={handleChangeEmail}
                />
            
            <TextField
                type="password"
                label="Пароль"
                value={password}
                onChange={handleChangePassword}
                style={{ marginTop: 5 }}
            />

            <Button variant="outlined" color="primary" style={{ marginTop: 10 }} onClick={handleClickButton}>Войти</Button>
        </Box>
    )
}
