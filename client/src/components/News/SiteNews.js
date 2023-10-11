import React from 'react';
import axios from 'axios';
import WoWNews from './WoWNews';
import BluePosts from './BluePosts';
import WowheadNews from './wowhead/WowheadCards';
import Twitter from './twitter/TwitterEmbed';
import { Card, CardContent, CircularProgress, Container, Divider, Grid, Hidden, Typography } from '@material-ui/core';

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
            <Grid container>
                <Grid id="BlueNews" item xs={12} style={{padding: '20px 0px 20px 0px'}}>
                    <Container maxWidth='lg'>
                        <Grid container spacing={6}>
                            <Grid item xs={12}>
                                <Card style={{ filter: 'drop-shadow(5px 5px 4px #000)' }}>
                                    <CardContent>
                                        <Typography variant={'h5'} color="secondary" gutterBottom>World of Warcraft - Breaking News</Typography>
                                        <WoWNews />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Hidden smDown>
                                    <Card style={{ filter: 'drop-shadow(5px 5px 4px #000)' }}>
                                        <CardContent>
                                            <Typography variant={'h5'} color="secondary" gutterBottom>World of Warcraft - Blue Posts</Typography>
                                            <BluePosts />
                                        </CardContent>
                                    </Card>
                                </Hidden>
                            </Grid>
                        </Grid>
                    </Container>
                </Grid>
                <Divider/>
                <Grid id="NewsContent" item xs={12} style={{padding: '20px 0px 20px 0px'}}>
                    <Container maxWidth={false}>
                        <Grid container spacing={6}>
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
                    </Container >
                </Grid>
            </Grid>
        )
    }
}