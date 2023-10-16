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
            console.log(res.data)
        }).catch(error => {

        });
    }

    render() {
        return (this.state.bluePosts.length > 1 ?
            <Grid container spacing={6} justifyContent="space-evenly">
                {this.state.bluePosts.map((news) => (
                    <Grid key={'BluePost:' + news.id} xs={12}>
                        <Card raised>
                            <CardActionArea id='CardArea' href={`https://us.forums.blizzard.com/en/wow${news.url}`} target="_blank" rel="noopener noreferrer">
                                <CardMedia
                                    style={{ position: 'relative', height: '100px' }}
                                    image={'./images/blizzard.jpg'}
                                    title={news.title}
                                    alt={news.title}
                                    onError={e => {
                                        e.target.src = 'https://res.cloudinary.com/complexityguild/image/upload/v1635415242/wow/backgrounds/shadowlands_icecrown.jpg';
                                    }}
                                >
                                    <CardHeader
                                        avatar={
                                            <Avatar
                                                alt={news.user.name}
                                                src={news.user.avatar_template.includes('https://') ? news.user.avatar_template : `https://us.forums.blizzard.com/en/wow${news.user.avatar_template}`}
                                                style={{ filter: 'drop-shadow(2px 2px 2px #000)' }}
                                            />
                                        }
                                        title={
                                            <div>
                                                <Typography align='left' variant="subtitle2" color='textPrimary' gutterBottom style={{ textShadow: '2px 2px 2px #000000' }}>
                                                    {moment(news.created_at).format('MMM. Do YYYY, h:mma')}
                                                </Typography>
                                                <Typography align='left' variant="subtitle1" color='textPrimary' style={{ textShadow: '2px 2px 2px #000000' }}>
                                                    {news.title}
                                                </Typography>
                                            </div>
                                        }
                                    />
                                </CardMedia>
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