import React from 'react';
import MythicAffixes from '../header/MythicPlus/MythicAffixes';
import Discord from '../header/Discord';
import { Typography, Button, Container, Divider, Box, Paper } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link as RouterLink } from 'react-router-dom';
import { ReactComponent as ComplexityLogo } from '../icons/complexityMoose.svg';

export default class News extends React.Component {
    constructor() {
        super();

        this.state = {
            discordOpen: false,
        }
    }

    discordToggle = () => {
        this.setState(prevState => ({
            discordOpen: !prevState.discordOpen
        }));
    }

    render() {
        return (
            <Paper style={{ marginTop: '20px' }}>
                <Divider />
                <Container maxWidth={false}>
                    <Box sx={{ padding: 12 }}>
                        <Grid container>
                            <Grid xs container justifyContent='center' alignItems='center'>
                                <Grid>
                                    <MythicAffixes iconHW={32} iconSize={'medium'} />
                                </Grid>
                            </Grid>
                            <Grid xs container direction="column">
                                <Grid>
                                    <Typography variant="h6">NAVIGATION</Typography>
                                </Grid>
                                <Grid>
                                    <Button size="small" component={RouterLink} to={"/"}>
                                        <Typography variant="body1">News</Typography>
                                    </Button>
                                </Grid>
                                <Grid>
                                    <Button size="small" component={RouterLink} to={"/about"}>
                                        <Typography variant="body1">About</Typography>
                                    </Button>
                                </Grid>
                                <Grid>
                                    <Button size="small" component={RouterLink} to={"/members"} disabled>
                                        <Typography variant="body1">Members</Typography>
                                    </Button>
                                </Grid>
                                <Grid>
                                    <Button size="small" component={RouterLink} to={"/simulations"}>
                                        <Typography variant="body1">Simulations</Typography>
                                    </Button>
                                </Grid>
                                <Grid>
                                    <Button size="small" disabled>
                                        <Typography variant="body1">Statistics</Typography>
                                    </Button>
                                </Grid>
                                <Grid>
                                    <Button size="small" disabled>
                                        <Typography variant="body1">Twitch</Typography>
                                    </Button>
                                </Grid>
                                <Grid>
                                    <Button size="small" disabled>
                                        <Typography variant="body1">Youtube</Typography>
                                    </Button>
                                </Grid>
                                <Grid>
                                    <Button size="small" onClick={() => this.discordToggle()}>
                                        <Typography variant="body1">Discord</Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid xs container justifyContent='center' alignItems='center'>
                                <Grid>
                                    {/* DESKTOP ONLY */}
                                    <Container sx={{ display: { xs: 'none', sm: 'none', md: 'block', lg: 'block' } }}>
                                        <ComplexityLogo style={{ height: "200px", width: "200px" }} />
                                    </Container>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
                <Discord discordOpen={this.state.discordOpen} discordToggle={this.discordToggle} />
                <Divider style={{ marginTop: 12, marginBottom: 12 }} />
                <Container>
                    <Typography variant="caption" color="textSecondary">World of Warcraft and Blizzard Entertainment are trademarks or registered trademarks of Blizzard Entertainment, Inc. in the U.S. and/or other countries. All other trademarks are the property of their respective owners.</Typography>
                </Container>
            </Paper>
        )
    }
}