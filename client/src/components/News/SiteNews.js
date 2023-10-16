import React from 'react';
import axios from 'axios';
import WoWNews from './WoWNews';
import BluePosts from './BluePosts';
import WowheadNews from './wowhead/WowheadCards';
import Twitter from './twitter/TwitterEmbed';
import { Card, CardContent, CircularProgress, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export default class News extends React.Component {
    constructor() {
        super();

        this.state = {
            news: []
        }
    }

    componentDidMount = () => {
        axios.get('/api/wow/news').then(res => {
            this.setState({ news: res.data });
        }).catch(error => {

        });
    }

    render() {
        return (
            <Container maxWidth={false}>
                <Grid container direction={'column'} alignItems={'center'} spacing={6} id="BlueNews" style={{ padding: '20px 0px 20px 0px' }}>
                    <Grid xs={12} sm={12} md={8} lg={8}>
                        <Card style={{ filter: 'drop-shadow(5px 5px 4px #000)' }}>
                            <CardContent>
                                <Typography variant={'h5'} color="secondary" gutterBottom>World of Warcraft - Breaking News</Typography>
                                <WoWNews />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid xs={8}>
                        <Card style={{ filter: 'drop-shadow(5px 5px 4px #000)' }} sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}>
                            <CardContent>
                                <Typography variant={'h5'} color="secondary" gutterBottom>World of Warcraft - Blue Posts</Typography>
                                <BluePosts />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container id="NewsContent" spacing={6} style={{ padding: '20px 0px 20px 0px' }}>
                    <Grid xs={12} sm={12} md={7} lg={8} xl={9}>
                        {this.state.news
                            ?
                            <WowheadNews news={this.state.news} />
                            :
                            <CircularProgress color="secondary" />
                        }
                    </Grid>
                    <Grid xs sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' } }}>
                        <Twitter />
                    </Grid>
                </Grid>
            </Container>
        )
    }
}