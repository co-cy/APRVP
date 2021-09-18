import React from 'react'
import { Box, Grid} from '@material-ui/core'
import Flippy, { FrontSide, BackSide } from 'react-flippy';


export default function Room({ room }) {
    return (
        <div>
            <Box sx={{ height: 300, width: "90%", margin: "auto" }}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    spacing={3}
                >
                    {room.passengers.map((pass, i) => (
                        <Grid item key={i} xs={3}>
                            <Flippy
                                flipOnHover={true} // default false
                                flipOnClick={false} // default false
                                flipDirection="vertical"
                                style={{ width: '100%', height: '300px' }} /// these are optional style, it is not necessary
                            >
                                <FrontSide
                                    style={{
                                        backgroundColor: '#fc2803',
                                    }}
                                >
                                    Занятое место
                                </FrontSide>
                                <BackSide
                                    style={{ backgroundColor: '#175852' }}>
                                    <ul>
                                        <li>Возраст: {pass.age}</li>
                                    </ul>
                                </BackSide>
                            </Flippy>
                        </Grid>
                    ))}
                    
                    {[...Array(4-room.passengers.length).keys()].map((i) => (
                        <Grid item xs={3} key={i}>
                            <Flippy
                                flipOnHover={true} // default false
                                flipOnClick={false} // default false
                                flipDirection="vertical"
                                style={{ width: '100%', height: '300px' }} /// these are optional style, it is not necessary
                            >
                                <FrontSide
                                    style={{
                                        backgroundColor: '#41669d',
                                    }}
                                >
                                    Свободное место
                                </FrontSide>
                                <BackSide
                                    style={{ backgroundColor: '#175852' }}>
                                    Тут кнопка типа занять
                                </BackSide>
                            </Flippy>
                        </Grid>
                    ))}

                </Grid>
            </Box>
        </div>
    )
}
