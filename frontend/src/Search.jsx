import React, { useState } from "react"
import {
    Grid, FormControl, FormLabel,
    FormControlLabel, TextField, FormGroup,
    Select, Checkbox, MenuItem,
    InputLabel, Slider, Box, Typography, Button
} from "@material-ui/core"
import style from "./style.css"

function valuetext(value) {
    return `${value}`;
}

export default () => {
    const [gender, setGender] = useState(1)
    const [age, setAge] = useState(18)
    const [communication, setCommunication] = useState(0)
    const [hasPet, setHasPet] = useState(false)
    const [hasGraft, setHasGraft] = useState(false)
    const [hasChild, setHasChild] = useState(false)
    const [isSmoking, setIsSmoking] = useState(false)
    const [preferences, setPreferences] = useState({
        "1": false,
        "2": false,
        "3": false,
        "4": false,
    })
    const { one, two, three, four } = preferences;
    const [neighborsAge, setNeighborsAge] = useState([20, 37])
    const [neighborsHasPet, setNeighborsHasPet] = useState(false)
    const [neighborsSmoking, setNeighborsSmoking] = useState(false)
    const [neighborsHasChild, setNeighborsHasChild] = useState(false)
    const handleChangeGender = (event) => {
        setGender(event.target.value)
    }
    const handleChangeAge = (event) => {
        setAge(parseInt(event.target.value === "" ? 0 : event.target.value))
    }
    const handleChangeCommunication = (event) => {
        setCommunication(event.target.value)
    }
    const handleChangePet = (event) => {
        setHasPet(event.target.checked)
    }
    const handleChangeNeighborsPet = (event) => {
        setNeighborsHasPet(event.target.checked)
    }
    const handleChangeNeighborsSmoking = (event) => {
        setNeighborsSmoking(event.target.checked)
    }
    const handleChangeNeighborsChild = (event) => {
        setNeighborsHasChild(event.target.checked)
    }
    const handleChangeGraft = (event) => {
        setHasGraft(event.target.checked)
    }
    const handleChangeChild = (event) => {
        setHasChild(event.target.checked)
    }
    const handleChangeSmoking = (event) => {
        setIsSmoking(event.target.checked)
    }
    const handleChangePreferences = (event) => {
        setPreferences({
            ...preferences,
            [event.target.name]: event.target.checked,
        })
    }
    const handleChangeNeighborsAge = (event, newDataValue) => {
        setNeighborsAge(newDataValue)
    }
    const submit = async () => {
        console.log('send')
        const body = {
            "gender": gender,
            "age": age,
            "communication": communication,
            "hasPet": hasPet,
            "hasGraft": hasGraft,
            "hasChild": hasChild,
            "smoking": isSmoking,
            "preferences": {
                "1": preferences['1'],
                "2": preferences['2'],
                "3": preferences['3'],
                "4": preferences['4'],
            },
            "neighborsAge": neighborsAge,
            "neighborsHasPet": neighborsHasPet,
            "neighborsSmoking": neighborsSmoking,
            "neighborsHasChild": neighborsHasChild,
        }
        console.log(body)
        const res = await fetch('https://aprvp.herokuapp.com/room/sorted', {
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })
        let json = await res.json();
        console.log(json)
    }
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            spacing={3}
        >
            <Grid item xs={6}>
                <Typography variant="h3" component="h2" align="center">Вы</Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    spacing={2}
                >
                    <Grid item xs={4}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            spacing={1}
                        >
                            <Grid item>
                                <FormControl fullWidth className={style.width}>
                                    <InputLabel id="demo-simple-select-label">Пол</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Общение"
                                        value={gender}
                                        onChange={handleChangeGender}
                                    >
                                        <MenuItem value={1}>Мужской</MenuItem>
                                        <MenuItem value={0}>Женский</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <TextField
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                                    label="Возраст"
                                    value={age}
                                    onChange={handleChangeAge}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth className={style.width}>
                                    <InputLabel id="demo-simple-select-label">Общение</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        label="Общение"
                                        value={communication}
                                        onChange={handleChangeCommunication}
                                    >
                                        <MenuItem value={1}>Хочу общаться</MenuItem>
                                        <MenuItem value={0} selected>Все равно</MenuItem>
                                        <MenuItem value={-1}>Не хочу общаться</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup>
                            <FormControlLabel control={
                                <Checkbox checked={hasPet} onChange={handleChangePet} />
                            } label="Везете домашнее животное" />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel control={
                                <Checkbox checked={hasGraft} onChange={handleChangeGraft} />
                            } label="Есть прививка от COVID-19" />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel control={
                                <Checkbox checked={hasChild} onChange={handleChangeChild} />
                            } label="Едет ли с вами ребенок" />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel control={
                                <Checkbox checked={isSmoking} onChange={handleChangeSmoking} />
                            } label="Курите ли вы" />
                        </FormGroup>
                    </Grid>

                    <Grid item xs={4}>
                        <FormGroup>
                            <FormLabel component="legend">Мои интересы</FormLabel>
                            <FormControlLabel control={<Checkbox checked={one} onChange={handleChangePreferences} />} label="Наука" name="1" />
                            <FormControlLabel control={<Checkbox checked={two} onChange={handleChangePreferences} />} label="Искусство" name="2" />
                            <FormControlLabel control={<Checkbox checked={three} onChange={handleChangePreferences} />} label="Спорт" name="3" />
                            <FormControlLabel control={<Checkbox checked={four} onChange={handleChangePreferences} />} label="Другое" name="4" />
                        </FormGroup>
                    </Grid>

                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="h3" component="h2" align="center">Соседи</Typography>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Box sx={{ width: 300 }}>
                            <Typography gutterBottom>Возраст соседей</Typography>
                            <Slider
                                getAriaLabel={() => 'Возраст'}
                                valueLabelDisplay="auto"
                                value={neighborsAge}
                                onChange={handleChangeNeighborsAge}
                                getAriaValueText={valuetext}
                                color="primary"
                                min={1} max={110}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox checked={neighborsHasPet} onChange={handleChangeNeighborsPet} />} label="Категорически против домашних животных" />
                            <FormControlLabel control={<Checkbox checked={neighborsSmoking} onChange={handleChangeNeighborsSmoking} />} label="Категорически против курящих" />
                            <FormControlLabel control={<Checkbox checked={neighborsHasChild} onChange={handleChangeNeighborsChild} />} label="Категорически против детей до двух лет" />
                        </FormGroup>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h3" component="h2" align="center">Поиск</Typography>
                <Button variant="outlined" onClick={submit}>Искать</Button>
            </Grid>

        </Grid>
    )
}