import React from 'react';
//import axios from 'axios';
import Button from '@mui/material/Button';
import { Container, Dialog, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import moment from 'moment';

let currentWeek = (moment().week() % 10) + 1; //Adjusted +1 due to M+ Season not starting is cadence with the actual week of the year.

//Adjust for Tuesday through Saturday
if (moment().weekday() >= 2) {
    currentWeek = ((moment().week() + 1) % 10) + 1;
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
        plusFour: 'Storming',
        plusSeven: 'Raging'
    },
    {
        week: 2,
        baseAffix: 'Fortified',
        plusFour: 'Entangling',
        plusSeven: 'Bolstering'
    },
    {
        week: 3,
        baseAffix: 'Tyrannical',
        plusFour: 'Incorporeal',
        plusSeven: 'Spiteful'
    },
    {
        week: 4,
        baseAffix: 'Fortified',
        plusFour: 'Afflicted',
        plusSeven: 'Raging'
    },
    {
        week: 5,
        baseAffix: 'Tyrannical',
        plusFour: 'Volcanic',
        plusSeven: 'Sanguine'
    },
    {
        week: 6,
        baseAffix: 'Fortified',
        plusFour: 'Storming',
        plusSeven: 'Bursting'
    },
    {
        week: 7,
        baseAffix: 'Tyrannical',
        plusFour: 'Afflicted',
        plusSeven: 'Bolstering'
    },
    {
        week: 8,
        baseAffix: 'Fortified',
        plusFour: 'Incorporeal',
        plusSeven: 'Sanguine'
    },
    {
        week: 9,
        baseAffix: 'Tyrannical',
        plusFour: 'Entangling',
        plusSeven: 'Bursting'
    },
    {
        week: 10,
        baseAffix: 'Fortified',
        plusFour: 'Volcanic',
        plusSeven: 'Spiteful'
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
            <Paper>
                <Container>
                    <Grid container> {/*Calendar*/}
                        <Grid xs={12} container justifyContent='space-between'>
                            <Grid xs={4}>
                                <Typography variant='h6'>+2</Typography>
                            </Grid>
                            <Grid xs={4}>
                                <Typography variant='h6'>+7</Typography>
                            </Grid>
                            <Grid xs={4}>
                                <Typography variant='h6'>+14</Typography>
                            </Grid>
                        </Grid>
                        {schedule.map(obj => {
                            const isCurrentWeek = currentWeek === obj.week;

                            return <Grid key={`affixWeek${obj.week}`} container xs={12} style={{backgroundColor: `${isCurrentWeek ? '#772CE8' : null}`, justifyContent: "space-between" }}> {/*Week*/}
                                <Grid xs={4} > {/*baseAffix*/}
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
                                <Grid xs={4} > {/*plusFour*/}
                                    <Button 
                                    variant="text" 
                                    size="medium"
                                    style={{color: isCurrentWeek ? 'black' : null, fontSize: window.innerWidth < 600 ? 10 : null}}
                                    href={`https://wowhead.com/affix=${affixes[obj.plusFour].id}`} 
                                    data-wowhead={`affix=${affixes[obj.plusFour].id}`}
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    startIcon={
                                        <img 
                                        style={{width: 24, height: 24}} 
                                        src={`https://render.worldofwarcraft.com/us/icons/56/${affixes[obj.plusFour].icon}.jpg`} 
                                        alt={obj.plusFour + ' Mythic Plus Affix'}
                                        onError={e => {
                                            e.target.src = 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg';
                                        }}
                                        />
                                    }>
                                        {obj.plusFour}
                                    </Button>
                                </Grid>
                                <Grid xs={4} > {/*plusSeven*/}
                                    <Button 
                                    variant="text" 
                                    size="medium"
                                    style={{color: isCurrentWeek ? 'black' : null, fontSize: window.innerWidth < 600 ? 10 : null}}
                                    href={`https://wowhead.com/affix=${affixes[obj.plusSeven].id}`} 
                                    data-wowhead={`affix=${affixes[obj.plusSeven].id}`}
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    startIcon={
                                        <img 
                                        style={{width: 24, height: 24}} 
                                        src={`https://render.worldofwarcraft.com/us/icons/56/${affixes[obj.plusSeven].icon}.jpg`} 
                                        alt={obj.plusSeven + ' Mythic Plus Affix'}
                                        onError={e => {
                                            e.target.src = 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg';
                                        }}
                                        />
                                    }>
                                        {obj.plusSeven}
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
                                </Grid> */}
                            </Grid>
                        })}
                    </Grid>
                </Container>
            </Paper>
        </Dialog>
    );
}
