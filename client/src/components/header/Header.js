import React from 'react';
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Home from '@material-ui/icons/Home';
import Info from '@material-ui/icons/Info';
import Class from '@material-ui/icons/Class';
import DateRange from '@material-ui/icons/DateRange';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Assessment from '@material-ui/icons/Assessment';
import Hidden from '@material-ui/core/Hidden';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import MythicAffixes from './MythicPlus/MythicAffixes';
import { ReactComponent as DiscordIcon } from '../icons/Discord-Logo-White.svg';
import { ReactComponent as ComplexityLogo } from '../icons/complexityMoose.svg';
import Discord from './Discord';
import AffixSchedule from './MythicPlus/AffixSchedule';
import RealmStatus from './RealmStatus';
import TokenPrice from './TokenPrice';
import Quotes from './Quotes';
import {Link as RouterLink} from 'react-router-dom';
import ClassInfo from './ClassInfo/ClassInfo';

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

    discordToggle =() => {
        this.setState(prevState => ({
            discordOpen: !prevState.discordOpen
        }));
    }

    affixesToggle =() => {
        this.setState(prevState => ({
            affixesOpen: !prevState.affixesOpen
        }));
    }

    render(){
        return(
            <Appbar position="sticky">
                <Toolbar variant={"dense"} style={{backgroundColor: "#121212"}}>
                    <Hidden lgUp>   {/* MOBILE/TABLET ONLY */}
                        <Grid container>
                            <Grid item xs={2}>
                                <IconButton onClick={() => this.drawerToggle()} >
                                    <MenuIcon style={{fontSize: 48}} />
                                </IconButton>
                            </Grid>
                            <Grid item xs={8} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                    <ComplexityLogo style={{height: "41px", width: "41px", padding: '2px'}} />
                                    <Typography variant="h4" align="center">Complexity</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton
                                    onClick={this.handleMenu}
                                    edge={'end'}
                                    disabled
                                >
                                    <AccountCircle style={{fontSize: 46}} />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Hidden>
                    <Hidden mdDown> {/* DESKTOP ONLY */}
                        <Grid container>
                            <Grid item xs={6} style={{display: "flex", justifyContent: "flex-start"}}>
                                <Quotes />
                            </Grid>
                            <Grid container spacing={2} item xs={6} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <Grid item xs={3} container spacing={2} style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
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
                                    size="small"
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
                    </Hidden>
                </Toolbar>
                <Hidden mdDown> {/* DESKTOP ONLY */}
                    <Toolbar>
                        <Grid container align-items={"center"}>
                            <Grid container item xs={2} zeroMinWidth style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                                <Grid item xs>
                                    <ComplexityLogo style={{height: "80px", width: "80px"}} />
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="h3">Complexity</Typography>
                                    <Typography variant="body1">Thunderlord | US</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={2} item xs={10} zeroMinWidth style={{display: "flex", justifyContent: "flex-end", alignItems: "center"}}>
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
                                        <Typography variant="h6">Raiders</Typography>
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
                                <Grid item style={{display: "flex", alignItems: "center", justifyContent: "flex-end"}}>
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
                    </Toolbar>
                    {/* <Toolbar variant={"dense"} style={{backgroundColor: "#121212"}}>
                    </Toolbar> */}
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
                        <ListItem button key="discord" onClick={() => this.discordToggle()}>
                            <ListItemIcon>
                                <DiscordIcon style={{width: "24px", height: "24px"}} />
                            </ListItemIcon>
                            <ListItemText primary="Discord" />
                        </ListItem>
                        <ListItem button key="simulations" component={RouterLink} to={"/simulations"}>
                            <ListItemIcon>
                                <Assessment />
                            </ListItemIcon>
                            <ListItemText primary="Simulations" />
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
                            
                                <MythicAffixes iconHW={30} iconSize={'small'}/>
                            
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
                <Discord discordOpen={this.state.discordOpen} discordToggle={this.discordToggle}/>
                <AffixSchedule scheduleOpen={this.state.affixesOpen} scheduleToggle={this.affixesToggle}/>
            </Appbar>
        )
    }
}

export default Header;