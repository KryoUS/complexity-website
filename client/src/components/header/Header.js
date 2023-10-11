import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Button, Container, Divider, Drawer, Grid, Hidden, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import { Assessment, Computer, Class, DateRange, Group, Home, Info, Menu, AccountCircle, YouTube } from '@material-ui/icons';
import { ReactComponent as DiscordIcon } from '../icons/Discord-Logo-White.svg';
import { ReactComponent as TwitchIcon } from '../icons/twitch.svg';
import { ReactComponent as ComplexityLogo } from '../icons/complexityMoose.svg';
import AffixSchedule from './MythicPlus/AffixSchedule';
import ClassInfo from './ClassInfo/ClassInfo';
import Discord from './Discord';
import MythicAffixes from './MythicPlus/MythicAffixes';
import Quotes from './Quotes';
import RealmStatus from './RealmStatus';
import TokenPrice from './TokenPrice';

class Header extends React.Component {
    constructor() {
        super();

        this.state = {
            drawerOpen: false,
            discordOpen: false,
            affixesOpen: false,
            classDrawerOpen: false
        }
    }

    handleMenu = () => {
        return null
    }

    drawerToggle = () => {
        this.setState(prevState => ({
            drawerOpen: !prevState.drawerOpen
        }));
    }

    classDrawerToggle = () => {
        this.setState(prevState => ({
            classDrawerOpen: !prevState.classDrawerOpen
        }));
    }

    discordToggle = () => {
        this.setState(prevState => ({
            discordOpen: !prevState.discordOpen
        }));
    }

    affixesToggle = () => {
        this.setState(prevState => ({
            affixesOpen: !prevState.affixesOpen
        }));
    }

    render() {
        return (
            <AppBar position="sticky" style={{filter: 'drop-shadow(2px 2px 2px #000)'}}>
                <Toolbar variant={"dense"} style={{ backgroundColor: "#121212" }}>
                    <Hidden lgUp>   {/* MOBILE/TABLET ONLY */}
                        <Grid container alignItems='center'>
                            <Grid item xs={2}>
                                <IconButton onClick={() => this.drawerToggle()} >
                                    <Menu style={{ fontSize: 48 }} />
                                </IconButton>
                            </Grid>
                            <Grid item xs={8}>
                                <Grid container justifyContent='center' alignItems='center'>
                                    <Grid item>
                                        <ComplexityLogo height='60px' width='60px' />
                                    </Grid>
                                    <Grid item style={{ paddingBottom: '8px' }}>
                                        <Typography variant="h4">Complexity</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton
                                    onClick={this.handleMenu}
                                    edge={'end'}
                                    disabled
                                >
                                    <AccountCircle style={{ fontSize: 46 }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Hidden>
                    <Hidden mdDown> {/* DESKTOP ONLY */}
                        <Grid container>
                            <Grid item xs={6}>
                                <Quotes />
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={2} justifyContent='flex-end' alignItems='center'>
                                    <Grid item>
                                        <RealmStatus />
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="text"
                                            size="medium"
                                            onClick={() => this.classDrawerToggle()}
                                            startIcon={<Info />}>
                                            Class Info
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button
                                            variant="text"
                                            size="medium"
                                            onClick={() => this.affixesToggle()}
                                            startIcon={<DateRange />}>
                                            Mythic+ Affixes
                                        </Button>
                                        <MythicAffixes iconHW={16} iconSize={'small'} />
                                    </Grid>
                                    <Grid item>
                                        <TokenPrice />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Hidden>
                </Toolbar>
                <Hidden mdDown> {/* DESKTOP ONLY */}
                    <Toolbar>
                        <Grid container spacing={2} alignItems='center'>
                            <Grid item xs={2}>
                                <Grid container alignItems='center'>
                                    <Grid item>
                                        <ComplexityLogo height='60px' width='60px' />
                                    </Grid>
                                    <Grid item style={{ paddingBottom: '8px' }}>
                                        <Typography variant="h4">Complexity</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={10}>
                                <Grid container justifyContent='flex-end' alignItems='center'>
                                    <Grid item>
                                        <Button component={RouterLink} to={"/"} size="large">
                                            <Typography variant="h6">News</Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button component={RouterLink} to={"/about"} size="large">
                                            <Typography variant="h6">About</Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button size="large" disabled>
                                            <Typography variant="h6">Members</Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button component={RouterLink} to={"/simulations"} size="large">
                                            <Typography variant="h6">Simulations</Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button size="large" disabled>
                                            <Typography variant="h6">Statistics</Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button size="large" disabled>
                                            <Typography variant="h6">Twitch</Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button size="large" disabled>
                                            <Typography variant="h6">Youtube</Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button size="large" onClick={() => this.discordToggle()}>
                                            <Typography variant="h6">Discord</Typography>
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                    <IconButton
                                        onClick={this.handleMenu}
                                        edge={'end'}
                                        disabled
                                    >
                                        <AccountCircle style={{fontSize: 46}} />
                                    </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Hidden>
                <Drawer anchor="left" open={this.state.drawerOpen} onClose={this.drawerToggle} >
                    <List>
                        {/* MAKE PROGRAMATIC */}
                        <ListItem>
                            <RealmStatus />
                        </ListItem>
                        <Divider />
                        <ListItem button key="news" component={RouterLink} to={"/"}>
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText primary="News" />
                        </ListItem>
                        <ListItem button key="about" component={RouterLink} to={"/about"}>
                            <ListItemIcon>
                                <Info />
                            </ListItemIcon>
                            <ListItemText primary="About" />
                        </ListItem>
                        <ListItem button key="members" component={RouterLink} to={"/"} disabled>
                            <ListItemIcon>
                                <Group />
                            </ListItemIcon>
                            <ListItemText primary="Members" />
                        </ListItem>
                        <ListItem button key="simulations" component={RouterLink} to={"/simulations"}>
                            <ListItemIcon>
                                <Computer />
                            </ListItemIcon>
                            <ListItemText primary="Simulations" />
                        </ListItem>
                        <ListItem button key="statistics" component={RouterLink} to={"/"} disabled>
                            <ListItemIcon>
                                <Assessment />
                            </ListItemIcon>
                            <ListItemText primary="Statistics" />
                        </ListItem>
                        <ListItem button key="twitch" component={RouterLink} to={"/"} disabled>
                            <ListItemIcon>
                                <TwitchIcon style={{ fill: 'white', width: "24px", height: "24px" }} />
                            </ListItemIcon>
                            <ListItemText primary="Twitch" />
                        </ListItem>
                        <ListItem button key="youtube" component={RouterLink} to={"/"} disabled>
                            <ListItemIcon>
                                <YouTube />
                            </ListItemIcon>
                            <ListItemText primary="Youtube" />
                        </ListItem>
                        <ListItem button key="discord" onClick={() => this.discordToggle()}>
                            <ListItemIcon>
                                <DiscordIcon style={{ width: "24px", height: "24px" }} />
                            </ListItemIcon>
                            <ListItemText primary="Discord" />
                        </ListItem>
                        <Divider />
                        <ListItem button key="classInfo" onClick={() => this.classDrawerToggle()}>
                            <ListItemIcon>
                                <Class />
                            </ListItemIcon>
                            <ListItemText primary="Class Info" />
                        </ListItem>
                        <ListItem button key="mythicAffix" onClick={() => this.affixesToggle()}>
                            <ListItemIcon>
                                <DateRange />
                            </ListItemIcon>
                            <ListItemText primary="Mythic+ Affixes" />
                        </ListItem>
                        <ListItem>
                            <MythicAffixes iconHW={30} iconSize={'small'} />
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Container>
                                <TokenPrice />
                            </Container>
                        </ListItem>
                    </List>
                </Drawer>
                <Drawer
                    anchor="top"
                    open={this.state.classDrawerOpen}
                    onClose={this.classDrawerToggle}
                >
                    <ClassInfo />
                </Drawer>
                <Discord discordOpen={this.state.discordOpen} discordToggle={this.discordToggle} />
                <AffixSchedule scheduleOpen={this.state.affixesOpen} scheduleToggle={this.affixesToggle} />
            </AppBar>
        )
    }
}

export default Header;