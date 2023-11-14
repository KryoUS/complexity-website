import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

export default class WowheadNews extends React.Component {
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
        return (this.state.news.length > 0 ?
            <Grid container spacing={4} justifyContent="space-evenly">
                {this.state.news.map((news) => (
                    <Grid key={news.guid[0]._} xs={12} sm={12} md={12} lg={6}>
                        <Card raised sx={{ background: 'none', boxShadow: 'none' }}>
                            <CardActionArea id='CardArea' href={news.link[0]} target="_blank" rel="noopener noreferrer">
                                <CardMedia
                                    style={{ position: 'relative', height: '275px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                    image={news.hasOwnProperty("media:content") ? news["media:content"][0].$.url + '?maxHeight=300' : './images/blizzard.jpg'}
                                    title={news.title[0]}
                                    alt={news.title[0]}
                                    onError={e => {
                                        e.target.src = 'https://res.cloudinary.com/complexityguild/image/upload/v1635415242/wow/backgrounds/shadowlands_icecrown.jpg';
                                    }}
                                >
                                    <CardContent id='CardDesc'>
                                        <Typography
                                            variant="h6"
                                            color="textPrimary"
                                            component="p">
                                            {news.description[0].substring(0, news.description[0].indexOf('<')).replace(/&quot;/g, '"')}
                                        </Typography>
                                        <Typography
                                            variant="button"
                                            color="secondary"
                                            component="p">
                                            Read More
                                        </Typography>
                                    </CardContent>
                                </CardMedia>
                            </CardActionArea>
                            <CardHeader
                                avatar={
                                    <Avatar
                                        alt='Wowhead Logo'
                                        src='https://res.cloudinary.com/complexityguild/image/upload/v1535585319/wow/logos/wowhead_news.png'
                                        style={{ filter: 'drop-shadow(2px 2px 2px #000)', backgroundColor: '#121212' }}
                                    />
                                }
                                title={news.title[0]}
                                titleTypographyProps={{
                                    align: 'left',
                                    variant: 'h6',
                                    color: 'white'
                                }}
                                subheader={moment(news.pubDate[0]).format('MMM. Do YYYY, h:mma')}
                                subheaderTypographyProps={{
                                    align: 'left'
                                }}
                                sx={{ padding: '0' }}
                            />
                        </Card>
                    </Grid>
                ))}
            </Grid>
            :
            <CircularProgress />
        )
    }
}