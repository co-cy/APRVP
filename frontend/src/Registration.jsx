import React, { useState } from 'react'
import { Box, TextField, Button } from "@material-ui/core"
import { Redirect, Link } from "react-router-dom"

export default function Registration() {
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const token = window.localStorage.getItem("token")
    if (token != null) {
        return <Redirect to='/search' />;
    }
    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleChangePhone = (event) => {
        setPhone(event.target.value)
    }
    const handleClickButton = (event) => {
        setRedirect(true)
    }
    if (redirect) {
        return <Redirect to='/login' />;
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
                type="tel"
                label="Номер телефона"
                value={phone}
                onChange={handleChangePhone}
                style={{ marginTop: 5 }}
            />

            <TextField
                type="password"
                label="Пароль"
                value={password}
                onChange={handleChangePassword}
                style={{ marginTop: 5 }}
            />

            <Button variant="outlined" color="primary" style={{ marginTop: 10 }} onClick={handleClickButton}>Зарегистрироваться</Button>
            <Button variant="link" color="secondary" style={{ marginTop: 10 }} component={Link} to="/login">Уже есть аккаунт</Button>

        </Box>
    )
}
