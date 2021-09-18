import React, { useState } from "react"
import {
    Grid, FormControl, FormLabel,
    FormControlLabel, TextField, FormGroup,
    Select, Checkbox, MenuItem, Switch,
    InputLabel, Slider, Box, Typography, Button, CircularProgress,
    Snackbar, Container
} from "@material-ui/core"
import {Alert} from "@material-ui/lab"
import Carousel from 'react-material-ui-carousel'
import Room from "./Room"
import style from "./style.css"

function ButtonComponent(props) {
    const { onClick, loading } = props;
    return (
        <Button color="primary" variant="outlined" onClick={onClick} disabled={loading}>
            {loading && <CircularProgress size={30} />}
            {!loading && 'Искать'}
        </Button>
    );
}

function valuetext(value) {
    return `${value}`;
}

export default () => {
    const [isLoading, setIsLoading] = useState(false)
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
    const [open, setOpen] = useState(false)
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
    const handleChangeList = (event) => {
        setChaisedList(event.target.checked)
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    }

    const handleBook = (id, place) => {
        return async () => {
            let user = {
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
                "place_in_room": place
            }
            const res = await fetch('https://aprvp.herokuapp.com/room/' + id + '/add', {
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
            })
            console.log(id)
            setOpen(true)
            submit()
        }
    }

    const [goodList, setGoodList] = useState([])
    const [alternativeList, setAlternativeList] = useState([])
    const [chaisedList, setChaisedList] = useState(false)

    const submit = async () => {
        setIsLoading(true)
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
        console.log(json.good_list);
        setGoodList(json.good_list)
        setAlternativeList(json.alternative_list)
        setIsLoading(false)
    }
    return (
        <>
        <Container>
        <Grid
            container
            direction="row"
            justifyContent="center"
            spacing={3}
        >
            <Grid item md={6}>
                <Typography variant="h3" component="h2" align="center">О себе</Typography>
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
                    <Grid item md={4}>
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

                    <Grid item md={4}>
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
            <Grid item md={4}>
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
            <Grid item md={2}>
                <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <Typography variant="h3" component="h2" align="center">Поиск</Typography>
                    <ButtonComponent onClick={submit} loading={isLoading} />
                </Box>
            </Grid>
        </Grid>
        </Container>
        <Box sx={{ minHeight: 300, mt: 1 }}>
            {goodList.length === 0 && alternativeList.length === 0 ? <div></div> : (
                    <Box style={{ backgroundImage: "url(https://www.rzd.ru/api/media/resources/1736351)", padding: 10, color: "#fff"}}>
                        <FormControlLabel control={<Switch color="primary" checked={chaisedList} onChange={handleChangeList} />} label="Показать альтернативные места" />
                        {
                            chaisedList ? 
                                alternativeList.length === 0 ? <p>Нет вариантов</p> : (
                                    <Carousel autoPlay={false} animation="slide" navButtonsAlwaysVisible
                                        activeIndicatorIconButtonProps={{
                                            style: {
                                                color: '#E21A1A',
                                            }
                                        }}
                                    >
                                        {alternativeList.map((item) => <Room key={item.id_room} room={item} handleBook={handleBook}/>)}
                                    </Carousel>
                                ) :
                                goodList.length === 0 ? <p>Нет вариантов</p> : (
                                    <Carousel autoPlay={false} animation="slide" navButtonsAlwaysVisible
                                        activeIndicatorIconButtonProps={{
                                            style: {
                                                color: '#E21A1A',
                                            }
                                        }}
                                    >
                                        {goodList.map((item) => <Room key={item.id_room} room={item} handleBook={handleBook}/>)}
                                    </Carousel>
                            )
                        }
                </Box>)}
        </Box>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Место забронированно успешно
            </Alert>
        </Snackbar>
        </>
    )
}