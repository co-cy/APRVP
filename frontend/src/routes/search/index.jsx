import { h } from "preact";
import { useState } from "preact/hooks"
import { Grid, FormControl, FormLabel,
    FormControlLabel, TextField, FormGroup, 
    Select, Checkbox, MenuItem,
    InputLabel, Slider, Box, Typography, Button  } from "@material-ui/core"
import style from "./style.css"

function valuetext(value) {
    return `${value}`;
}

export default () => {
    const [value, setValue] = useState([20, 37])
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const [isHasPet, setIsHasPet] = useState(false)
    const [isHasGraft, setIsHasGraft] = useState(false)
    const [isHasChild, setIsHasChild] = useState(false)
    const [isSmoking, setIsSmoking] = useState(false)

    const [gender, setGender] = useState(false) //0 - man, 1 - woman
    const [age, setAge] = useState()
    const [communicate, setCommunicate] = useState() //1 - want, 0 - neutral, -1 - don't want

    const [isNotPets, setIsNotPets] = useState(false) //1 - категорически против
    const [isNotSmoking, setIsNotSmoking] = useState(false)

    const submit = () => {
        window.localStorage.setItem('isHasPet', isHasPet)
        window.localStorage.setItem('isHasGraft', isHasGraft)
        window.localStorage.setItem('isHasChild', isHasChild)
        window.localStorage.setItem('isSmoking', isSmoking)
        window.localStorage.setItem('gender', gender)
        window.localStorage.setItem('age', age)
        window.localStorage.setItem('communicate', communicate)
        window.localStorage.setItem('isNotPets', isNotPets)
        window.localStorage.setItem('isNotSmoking', isNotSmoking)
        window.localStorage.setItem('ageRange', value)
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            className={style.grid}
            spacing={3}
        >
            <Grid item xs={6}>
                <Typography variant="h3" component="h2" textAlign="center">Вы</Typography>
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
                            >
                                <MenuItem value={10}>Мужской</MenuItem>
                                <MenuItem value={20} selected>Женский</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                        <Grid item>
                        <TextField
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            label="Возраст"
                            variant="outlined"
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
                            >
                                <MenuItem value={10}>Хочу общаться</MenuItem>
                                <MenuItem value={20} selected>Все равно</MenuItem>
                                <MenuItem value={30}>Не хочу общаться</MenuItem>
                            </Select>
                        </FormControl>
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked/>} label="Везете домашнее животное" />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Есть прививка от COVID-19" />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Едет ли с вами ребенок" />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Курите ли вы" />
                        </FormGroup>
                    </Grid>

                    <Grid item xs={4}>
                        <FormGroup>
                            <FormLabel component="legend">Предпочтения в дороге</FormLabel>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Номер 1" />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Номер 2" />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Номер 3" />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Номер 4" />
                        </FormGroup>
                    </Grid>
                
                </Grid>
            </Grid>
            <Grid item xs={4}>
                <Typography variant="h3" component="h2" textAlign="center">Соседи</Typography>
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
                                value={value}
                                onChange={handleChange}
                                getAriaValueText={valuetext}
                                min={1} max={110}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Категорически против животных" />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Категорически против курения" />
                        </FormGroup>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="h3" component="h2" textAlign="center">Поиск</Typography>
                <Button variant="outlined" onClick={submit}>Искать</Button>
            </Grid>
            
            
            
            
            
            {/* <Grid item xs={4}>
                <FormGroup>
                    <FormLabel component="legend">Соседи</FormLabel>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Не хочу детей до 2х лет рядом" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Не хочу детей от 2х до 5ти лет рядом" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Не хочу детей от 5ти до 7ми лет рядом" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Не хочу детей от 7ми до 12ти лет рядом" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Не хочу подростков до 16ти рядом" />
                </FormGroup>
            </Grid> */}
            
            
        </Grid>
    )
}