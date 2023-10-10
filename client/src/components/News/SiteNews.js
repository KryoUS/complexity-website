import React from 'react';
import axios from 'axios';
import WoWNews from './WoWNews';
import BluePosts from './BluePosts';
import WowheadNews from './wowhead/WowheadCards';
import Twitter from './twitter/TwitterEmbed';
import { Card, CardContent, CircularProgress, Container, Grid, Hidden, Typography } from '@material-ui/core';

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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Container maxWidth='lg'>
                            <Card>
                                <CardContent>
                                    <Typography variant={'h5'} color="secondary">World of Warcraft - Breaking News</Typography>
                                    <WoWNews />
                                </CardContent>
                            </Card>
                        </Container>
                    </Grid>
                    <Hidden smDown>
                        <Grid item xs={12}>
                            <Container maxWidth='lg'>
                                <Card>
                                    <CardContent>
                                        <Typography variant={'h5'} color="secondary">World of Warcraft - Blue Posts</Typography>
                                        <BluePosts />
                                    </CardContent>
                                </Card>
                            </Container>
                        </Grid>
                    </Hidden>
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={7} lg={9} xl={9}>
                                {this.state.news
                                    ?
                                    <WowheadNews news={this.state.news} />
                                    :
                                    <CircularProgress color="secondary" />
                                }
                            </Grid>
                            <Grid item xs={false} sm={false} md={5} lg={3} xl={3}>
                                <Twitter />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        )
    }
}