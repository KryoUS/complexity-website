import React from 'react';
import WoWNews from './WoWNews';
import BluePosts from './blueposts/BluePosts';
import WowheadNews from './wowhead/WowheadCards';
import Twitter from './twitter/TwitterEmbed';
import { Card, CardContent, Container, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export default function News() {
    return (
        <Container maxWidth={false}>
            <Grid container spacing={3}>
                <Grid xs={12}>
                    <Container maxWidth='md'>
                        <Card>
                            <CardContent>
                                <Typography variant={'h4'} color="secondary" gutterBottom>World of Warcraft - Breaking News</Typography>
                                <WoWNews />
                            </CardContent>
                        </Card>
                    </Container>
                </Grid>
                <Grid xs={2} sm={2} md={2} lg={2} xl={2} sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'none', xl: 'flex' }, flexDirection: 'column' }}>
                    <Divider flexItem>
                        <Typography variant='h6'>Blue Posts</Typography>
                    </Divider>
                    <BluePosts />
                </Grid>
                <Grid xs={12} sm={12} md={7} lg={7} xl={7}>
                    <Divider>
                        <Typography variant='h6'>Wowhead</Typography>
                    </Divider>
                    <WowheadNews />
                </Grid>
                <Grid xs={3} sm={3} md={5} lg={5} xl={3} sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' }, flexDirection: 'column' }}>
                    <Divider flexItem>
                        <Typography variant='h6'>Twitter</Typography>
                    </Divider>
                    <Twitter />
                </Grid>
            </Grid>
        </Container>
    )
}