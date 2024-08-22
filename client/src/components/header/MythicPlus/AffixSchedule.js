import React from 'react';
//import axios from 'axios';
import Button from '@mui/material/Button';
import { Box, Container, Dialog, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import moment from 'moment';

let currentWeek = (moment().week() % 10 - 6); //Adjusted for DF: Season 4 based on a 10 week rotation predefined in the schedule variable

//Adjust for Sunday and Monday
if (moment().weekday() < 2) {
    //Set the current week to be last week if it is Sunday or Monday because of Tuesday reset
    if (currentWeek - 1 === 0) {
        //Avoid having a week 0 and set it to week 10 to emulate the last week of the rotation
        currentWeek = 10;
    } else {
        //Set the week to last week since Tuesday is reset and not Sunday or Monday
        currentWeek = currentWeek - 1;
    }
}

//TODO: This needs to be pulled from DB and not hard-coded
const affixes = {
    Fortified: {
        id: 10,
        icon: 'ability_toughness'
    },
    Tyrannical: {
        id: 9,
        icon: 'achievement_boss_archaedas'
    },
    Teeming: {
        id: 5,
        icon: 'spell_nature_massteleport'
    },
    Raging: {
        id: 6,
        icon: 'ability_warrior_focusedrage'
    },
    Bolstering: {
        id: 7,
        icon: 'ability_warrior_battleshout'
    },
    Sanguine: {
        id: 8,
        icon: 'spell_shadow_bloodboil'
    },
    Bursting: {
        id: 11,
        icon: 'ability_ironmaidens_whirlofblood'
    },
    Necrotic: {
        id: 4,
        icon: 'spell_deathknight_necroticplague'
    },
    Skittish: {
        id: 2,
        icon: 'spell_magic_lesserinvisibilty'
    },
    Volcanic: {
        id: 3,
        icon: 'spell_shaman_lavasurge'
    },
    Explosive: {
        id: 13,
        icon: 'spell_fire_felflamering_red'
    },
    Quaking: {
        id: 14,
        icon: 'spell_nature_earthquake'
    },
    Grievous: {
        id: 12,
        icon: 'ability_backstab'
    },
    Reaping: {
        id: 117,
        icon: 'ability_racial_embraceoftheloa_bwonsomdi'
    },
    Beguiling: {
        id: 119,
        icon: 'spell_shadow_mindshear'
    },
    Awakened: {
        id: 120,
        icon: 'trade_archaeology_nerubian_obelisk'
    },
    Prideful: {
        id: 121,
        icon: 'spell_animarevendreth_buff'
    },
    Inspiring: {
        id: 122,
        icon: 'spell_holy_prayerofspirit'
    },
    Spiteful: {
        id: 123,
        icon: 'spell_holy_prayerofshadowprotection'
    },
    Storming: {
        id: 124,
        icon: 'spell_nature_cyclone'
    },
    Tormented: {
        id: 128,
        icon: 'spell_animamaw_orb'
    },
    Encrypted: {
        id: 130,
        icon: 'spell_progenitor_orb'
    },
    Shrouded: {
        id: 131,
        icon: 'spell_shadow_nethercloak'
    },
    Thundering: {
        id: 132,
        icon: 'shaman_pvp_leaderclan'
    },
    Entangling: {
        id: 134,
        icon: 'inv_misc_root_01'
    },
    Afflicted: {
        id: 135,
        icon: 'spell_misc_emotionsad'
    },
    Incorporeal: {
        id: 136,
        icon: 'achievement_boss_anomalus'
    }    
}

const schedule = [
    {
        week: 1,
        baseAffix: 'Tyrannical',
        plusFive: 'Storming',
        plusTen: 'Raging'
    },
    {
        week: 2,
        baseAffix: 'Fortified',
        plusFive: 'Entangling',
        plusTen: 'Bolstering'
    },
    {
        week: 3,
        baseAffix: 'Tyrannical',
        plusFive: 'Incorporeal',
        plusTen: 'Spiteful'
    },
    {
        week: 4,
        baseAffix: 'Fortified',
        plusFive: 'Afflicted',
        plusTen: 'Raging'
    },
    {
        week: 5,
        baseAffix: 'Tyrannical',
        plusFive: 'Volcanic',
        plusTen: 'Sanguine'
    },
    {
        week: 6,
        baseAffix: 'Fortified',
        plusFive: 'Storming',
        plusTen: 'Bursting'
    },
    {
        week: 7,
        baseAffix: 'Tyrannical',
        plusFive: 'Afflicted',
        plusTen: 'Bolstering'
    },
    {
        week: 8,
        baseAffix: 'Fortified',
        plusFive: 'Incorporeal',
        plusTen: 'Sanguine'
    },
    {
        week: 9,
        baseAffix: 'Tyrannical',
        plusFive: 'Entangling',
        plusTen: 'Bursting'
    },
    {
        week: 10,
        baseAffix: 'Fortified',
        plusFive: 'Volcanic',
        plusTen: 'Spiteful'
    }
]

export default function AffixSchedule(props){
    return (
        <Dialog
        open={props.scheduleOpen}
        onClose={props.scheduleToggle}
        fullWidth={true}
        maxWidth={window.innerWidth < 600 ? false : 'sm'}
        
        >
            <Container>
                <Typography align='center' variant='h4' sx={{padding: 10}}>Mythic+ Starts September 17th</Typography>
                {/*
                <Grid container> 
                    <Grid xs={12} container justifyContent='space-between'>
                        <Grid xs={4}>
                            <Typography variant='h6'>+2</Typography>
                        </Grid>
                        <Grid xs={4}>
                            <Typography variant='h6'>+5</Typography>
                        </Grid>
                        <Grid xs={4}>
                            <Typography variant='h6'>+10</Typography>
                        </Grid>
                    </Grid>
                    {schedule.map(obj => {
                        const isCurrentWeek = currentWeek === obj.week;

                        return <Grid key={`affixWeek${obj.week}`} container xs={12} style={{backgroundColor: `${isCurrentWeek ? '#772CE8' : null}`, justifyContent: "space-between" }}> 
                            <Grid xs={4} > 
                                <Button 
                                variant="text" 
                                size="medium"
                                style={{color: isCurrentWeek ? 'black' : null, fontSize: window.innerWidth < 600 ? 10 : null}}
                                href={`https://wowhead.com/affix=${affixes[obj.baseAffix].id}`} 
                                data-wowhead={`affix=${affixes[obj.baseAffix].id}`}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                startIcon={
                                    <img
                                    style={{width: 24, height: 24}} 
                                    src={`https://render.worldofwarcraft.com/us/icons/56/${affixes[obj.baseAffix].icon}.jpg`} 
                                    alt={obj.baseAffix + ' Mythic Plus Affix'}
                                    onError={e => {
                                        e.target.src = 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg';
                                    }}
                                    />
                                }>
                                    {obj.baseAffix}
                                </Button>
                            </Grid>
                            <Grid xs={4} > 
                                <Button 
                                variant="text" 
                                size="medium"
                                style={{color: isCurrentWeek ? 'black' : null, fontSize: window.innerWidth < 600 ? 10 : null}}
                                href={`https://wowhead.com/affix=${affixes[obj.plusFive].id}`} 
                                data-wowhead={`affix=${affixes[obj.plusFive].id}`}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                startIcon={
                                    <img 
                                    style={{width: 24, height: 24}} 
                                    src={`https://render.worldofwarcraft.com/us/icons/56/${affixes[obj.plusFive].icon}.jpg`} 
                                    alt={obj.plusFive + ' Mythic Plus Affix'}
                                    onError={e => {
                                        e.target.src = 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg';
                                    }}
                                    />
                                }>
                                    {obj.plusFive}
                                </Button>
                            </Grid>
                            <Grid xs={4} > 
                                <Button 
                                variant="text" 
                                size="medium"
                                style={{color: isCurrentWeek ? 'black' : null, fontSize: window.innerWidth < 600 ? 10 : null}}
                                href={`https://wowhead.com/affix=${affixes[obj.plusTen].id}`} 
                                data-wowhead={`affix=${affixes[obj.plusTen].id}`}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                startIcon={
                                    <img 
                                    style={{width: 24, height: 24}} 
                                    src={`https://render.worldofwarcraft.com/us/icons/56/${affixes[obj.plusTen].icon}.jpg`} 
                                    alt={obj.plusTen + ' Mythic Plus Affix'}
                                    onError={e => {
                                        e.target.src = 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg';
                                    }}
                                    />
                                }>
                                    {obj.plusTen}
                                </Button>
                            </Grid>
                            {/* <Grid xs={3}>
                                <Button 
                                variant="text" 
                                size="small"
                                style={{color: isCurrentWeek ? 'black' : null, fontSize: window.innerWidth < 600 ? 10 : null}}
                                href={`https://wowhead.com/affix=${affixes[obj.type].id}`} 
                                data-wowhead={`affix=${affixes[obj.type].id}`}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                startIcon={
                                    <img 
                                    style={{width: 12, height: 12}} 
                                    src={`https://render.worldofwarcraft.com/us/icons/56/${affixes[obj.type].icon}.jpg`} 
                                    alt={obj.type + ' Mythic Plus Affix'}
                                    onError={e => {
                                        e.target.src = 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg';
                                    }}
                                    />
                                }>
                                    {obj.type}
                                </Button>
                            </Grid>
                        </Grid>
                </Grid>
                */}
            </Container>
        </Dialog>
    );
}
