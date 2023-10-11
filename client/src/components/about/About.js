import React from 'react';
import { Container, Paper, Typography, Divider } from '@material-ui/core';

export default class About extends React.Component{

    render(){
        return(
            <Container style={{padding: '24px'}}>
                <Paper elevation={10} style={{padding: '24px'}}>
                    <Typography variant='h3' color="secondary" align='left' style={{padding: '24px'}}>History</Typography>
                    <Typography align='left'>Founded in July of 2010 by Glacial and Hopeless, Complexity started out as a very small guild of just a few players. Over time the guild grew and so did the friendships. With some seasoned veterans and fresh new blood joining the guild, it didn't take long for Complexity to step into raiding. Finding its stride in Dragon Soul with two separate raid groups completing Heroic Difficulty. Complexity has continued this steady progress with earning the coveted, "Ahead of the Curve" Achievement in every raid, including Shadowlands.</Typography>
                    <Divider style={{margin: '24px'}} />
                    <Typography variant='h3' color="secondary" align='left' style={{padding: '24px'}}>People</Typography>
                    <Typography align='left'>At Complexity, the people are what makes us special. That's why most of us have stayed as long as we have. Some of our members have been on Thunderlord since before Complexity was founded, with the rest of us finding ourselves calling Complexity home after joining. We engage with each other, spending hours in Discord together, even if just to annoy our Raid Leader who has been leading Complexity Raiding since Mists of Pandaria.</Typography>
                    <Divider style={{margin: '24px'}} />
                    <Typography variant='h3' color="secondary" align='left' style={{padding: '24px'}}>Community</Typography>
                    <Typography align='left'>As one of the oldest guilds on Thunderlord, we are dedicated to creating an inclusive environment that empowers everyone to be themselves. Our main goal is to foster a community where anyone can make new friends and find where they want to be, or even find themselves. With Transmog runs, Raiding, Mythic Plus, and PVP, you're sure to find yourself in no time.</Typography>
                    <Typography variant='h6' style={{margin: '24px'}}>The Complexity Way</Typography>
                </Paper>
            </Container>
        )
    }
}