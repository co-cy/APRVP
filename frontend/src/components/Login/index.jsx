import { TextField, Box, Grid, Button } from '@material-ui/core';
import { h } from 'preact';
import style from'./style.css'

let Login = function() {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className={style.grid}
        >
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item xs={8}>
                        <TextField id="outlined-basic" label="Email" variant="outlined" type="email"/>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField id="outlined-basic" label="Пароль" variant="outlined" type="password"/>
                    </Grid>
                    <Grid item xs={8}>
                        <div className={style.center}>
                            <Button variant="contained">Войти</Button>
                        </div>
                    </Grid>
                </Grid>
            </Box>       
        </Grid>
    )
}

export default Login