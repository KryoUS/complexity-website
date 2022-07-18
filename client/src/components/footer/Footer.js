import React from 'react';
import MythicAffixes from '../header/MythicPlus/MythicAffixes';
import Discord from '../header/Discord';
import { Grid, Typography, Button, Container, Divider, Box, Paper, Hidden } from '@material-ui/core';
import {Link as RouterLink} from 'react-router-dom';
import { ReactComponent as ComplexityLogo } from '../icons/complexityMoose.svg';

export default class News extends React.Component{
    constructor() {
        super();

        this.state = {
            discordOpen: false,
        }
    }

    discordToggle =() => {
        this.setState(prevState => ({
            discordOpen: !prevState.discordOpen
        }));
    }

    render(){
        return(
            <Paper style={{paddingBottom: 12}}>
                <Divider />
                <Container>
                    <Box sx={{padding: 12}}>
                        <Grid container>
                            <Grid item xs container justifyContent='center' alignItems='center'>
                                <Grid item>
                                    <MythicAffixes iconHW={32} iconSize={'medium'} />
                                </Grid>
                            </Grid>
                            <Grid item xs container direction="column">
                                <Grid item>
                                    <Typography variant="h6">NAVIGATION</Typography>
                                </Grid>
                                <Grid item>
                                    <Button size="small" component={RouterLink} to={"/"}>
                                        <Typography variant="body1">News</Typography>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button size="small" component={RouterLink} to={"/about"}>
                                        <Typography variant="body1">About</Typography>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button size="small" disabled>
                                        <Typography variant="body1">Raiders</Typography>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button size="small" disabled>
                                        <Typography variant="body1">Members</Typography>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button size="small" disabled>
                                        <Typography variant="body1">Simulations</Typography>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button size="small" disabled>
                                        <Typography variant="body1">Twitch</Typography>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button size="small" disabled>
                                        <Typography variant="body1">Youtube</Typography>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button size="small" onClick={() => this.discordToggle()}>
                                        <Typography variant="body1">Discord</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs container justifyContent='center' alignItems='center'>
                                <Grid item>
                                    <Hidden mdDown> {/* DESKTOP ONLY */}
                                        <ComplexityLogo style={{height: "200px"}} />
                                    </Hidden>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
                <Discord discordOpen={this.state.discordOpen} discordToggle={this.discordToggle}/>
                <Divider style={{marginTop: 12, marginBottom: 12}} />
                <Container>
                    <Typography variant="caption" color="textSecondary">World of Warcraft and Blizzard Entertainment are trademarks or registered trademarks of Blizzard Entertainment, Inc. in the U.S. and/or other countries. All other trademarks are the property of their respective owners.</Typography>
                </Container>
            </Paper>
        )
    }
}