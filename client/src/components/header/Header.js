import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Button, Container, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Assessment, Computer, Class, DateRange, Group, Home, Info, Menu, AccountCircle, YouTube } from '@mui/icons-material';
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
            <AppBar position="sticky" style={{ filter: 'drop-shadow(0px 0px 5px #000)' }}>
                <Toolbar variant={"dense"} style={{ backgroundColor: "#121212" }}>
                    {/* MOBILE ONLY */}
                    <Grid container alignItems='center' justifyContent={'space-between'} sx={{ display: { sm: 'flex', md: 'none' }, width: '100%' }}>
                        <Grid xs={2}>
                            <IconButton onClick={() => this.drawerToggle()} >
                                <Menu style={{ fontSize: 48 }} />
                            </IconButton>
                        </Grid>
                        <Grid container justifyContent='center' alignItems='center' xs={8}>
                            <Grid>
                                <ComplexityLogo height='60px' width='60px' />
                            </Grid>
                            <Grid style={{ paddingBottom: '8px' }}>
                                <Typography variant="h4">Complexity</Typography>
                            </Grid>
                        </Grid>
                        <Grid xs={2}>
                            <IconButton
                                onClick={this.handleMenu}
                                edge={'end'}
                                disabled
                            >
                                <AccountCircle style={{ fontSize: 46 }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    {/* DESKTOP ONLY */}
                    <Grid container sx={{ display: { xs: 'none', sm: 'none', md: 'flex' }, width: '100%' }}>
                        <Grid xs={4} sm={4} md={4} lg={6} xl={6}>
                            <Quotes />
                        </Grid>
                        <Grid container xs={8} sm={8} md={8} lg={6} xl={6} justifyContent='flex-end' alignItems='center'>
                            <Grid>
                                <RealmStatus />
                            </Grid>
                            <Grid>
                                <Button
                                    variant="text"
                                    size="medium"
                                    onClick={() => this.classDrawerToggle()}
                                    startIcon={<Info />}>
                                    Class Info
                                </Button>
                            </Grid>
                            <Grid>
                                <Button
                                    variant="text"
                                    size="medium"
                                    onClick={() => this.affixesToggle()}
                                    startIcon={<DateRange />}>
                                    Mythic+ Affixes
                                </Button>
                                <MythicAffixes iconHW={16} iconSize={'small'} />
                            </Grid>
                            <Grid>
                                <TokenPrice />
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
                {/* DESKTOP ONLY */}
                <Toolbar sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }} style={{ backgroundColor: "#1A1A1A" }}>
                    <Grid container spacing={0} alignItems='center' sx={{ width: '100%' }}>
                        <Grid container xs={2} alignItems='center'>
                            <Grid>
                                <ComplexityLogo height='40px' width='40px' />
                            </Grid>
                            <Grid style={{ paddingBottom: '8px' }}>
                                <Typography variant="h5">Complexity</Typography>
                            </Grid>
                        </Grid>
                        <Grid container xs={10} justifyContent='flex-end' alignItems='center'>
                            <Grid>
                                <Button component={RouterLink} to={"/"} size="medium">
                                    <Typography variant="h6">News</Typography>
                                </Button>
                            </Grid>
                            <Grid>
                                <Button component={RouterLink} to={"/about"} size="medium">
                                    <Typography variant="h6">About</Typography>
                                </Button>
                            </Grid>
                            <Grid>
                                <Button size="medium" disabled>
                                    <Typography variant="h6">Members</Typography>
                                </Button>
                            </Grid>
                            <Grid>
                                <Button component={RouterLink} to={"/simulations"} size="medium">
                                    <Typography variant="h6">Simulations</Typography>
                                </Button>
                            </Grid>
                            <Grid>
                                <Button size="medium" disabled>
                                    <Typography variant="h6">Statistics</Typography>
                                </Button>
                            </Grid>
                            <Grid>
                                <Button size="medium" disabled>
                                    <Typography variant="h6">Twitch</Typography>
                                </Button>
                            </Grid>
                            <Grid>
                                <Button size="medium" disabled>
                                    <Typography variant="h6">Youtube</Typography>
                                </Button>
                            </Grid>
                            <Grid>
                                <Button size="medium" onClick={() => this.discordToggle()}>
                                    <Typography variant="h6">Discord</Typography>
                                </Button>
                            </Grid>
                            <Grid>
                                <IconButton
                                    onClick={this.handleMenu}
                                    edge={'end'}
                                    disabled
                                >
                                    <AccountCircle style={{ fontSize: 30 }} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
                <Drawer anchor="left" open={this.state.drawerOpen} onClose={this.drawerToggle} >
                    <List>
                        {/* MAKE PROGRAMATIC */}
                        <ListItem>
                            <RealmStatus />
                        </ListItem>
                        <Divider />
                        <ListItemButton key="news" component={RouterLink} to={"/"}>
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            <ListItemText primary="News" />
                        </ListItemButton>
                        <ListItemButton key="about" component={RouterLink} to={"/about"}>
                            <ListItemIcon>
                                <Info />
                            </ListItemIcon>
                            <ListItemText primary="About" />
                        </ListItemButton>
                        <ListItemButton key="members" component={RouterLink} to={"/"} disabled>
                            <ListItemIcon>
                                <Group />
                            </ListItemIcon>
                            <ListItemText primary="Members" />
                        </ListItemButton>
                        <ListItemButton key="simulations" component={RouterLink} to={"/simulations"}>
                            <ListItemIcon>
                                <Computer />
                            </ListItemIcon>
                            <ListItemText primary="Simulations" />
                        </ListItemButton>
                        <ListItemButton key="statistics" component={RouterLink} to={"/"} disabled>
                            <ListItemIcon>
                                <Assessment />
                            </ListItemIcon>
                            <ListItemText primary="Statistics" />
                        </ListItemButton>
                        <ListItemButton key="twitch" component={RouterLink} to={"/"} disabled>
                            <ListItemIcon>
                                <TwitchIcon style={{ fill: 'white', width: "24px", height: "24px" }} />
                            </ListItemIcon>
                            <ListItemText primary="Twitch" />
                        </ListItemButton>
                        <ListItemButton key="youtube" component={RouterLink} to={"/"} disabled>
                            <ListItemIcon>
                                <YouTube />
                            </ListItemIcon>
                            <ListItemText primary="Youtube" />
                        </ListItemButton>
                        <ListItemButton key="discord" onClick={() => this.discordToggle()}>
                            <ListItemIcon>
                                <DiscordIcon style={{ width: "24px", height: "24px" }} />
                            </ListItemIcon>
                            <ListItemText primary="Discord" />
                        </ListItemButton>
                        <Divider />
                        <ListItemButton key="classInfo" onClick={() => this.classDrawerToggle()}>
                            <ListItemIcon>
                                <Class />
                            </ListItemIcon>
                            <ListItemText primary="Class Info" />
                        </ListItemButton>
                        <ListItemButton key="mythicAffix" onClick={() => this.affixesToggle()}>
                            <ListItemIcon>
                                <DateRange />
                            </ListItemIcon>
                            <ListItemText primary="Mythic+ Affixes" />
                        </ListItemButton>
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
                    <ClassInfo drawer={this.classDrawerToggle} />
                </Drawer>
                <Discord discordOpen={this.state.discordOpen} discordToggle={this.discordToggle} />
                <AffixSchedule scheduleOpen={this.state.affixesOpen} scheduleToggle={this.affixesToggle} />
            </AppBar>
        )
    }
}

export default Header;