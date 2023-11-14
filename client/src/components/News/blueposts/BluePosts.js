import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Avatar, Card, CardActionArea, CardHeader, CardMedia, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export default class BluePosts extends Component {
    constructor() {
        super();

        this.state = {
            bluePosts: [],
        }
    }

    componentDidMount = () => {
        axios.get('/api/wow/blueposts').then(res => {
            this.setState({ bluePosts: res.data });
        }).catch(error => {

        });
    }

    render() {
        return (this.state.bluePosts.length > 1 ?
            <Grid container spacing={3}>
                {this.state.bluePosts.map((news) => (
                    <Grid key={'BluePost:' + news.id} xs={12}>
                        <Card>
                            <CardActionArea id='CardArea' href={`https://us.forums.blizzard.com/en/wow${news.url}`} target="_blank" rel="noopener noreferrer">
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            alt={news.user.name}
                                            src={news.user.avatar_template.includes('https://') ? news.user.avatar_template : `https://us.forums.blizzard.com/en/wow${news.user.avatar_template}`}
                                            style={{ filter: 'drop-shadow(2px 2px 2px #000)' }}
                                        />
                                    }
                                    title={ news.title }
                                    titleTypographyProps={{
                                        align: 'left',
                                        variant: 'body1',
                                        color: 'white'
                                    }}
                                    subheader={ moment(news.created_at).format('MMM. Do YYYY, h:mma') }
                                    subheaderTypographyProps={{
                                        align: 'left'
                                    }}
                                />
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            :
            <CircularProgress />
        )
    }
}