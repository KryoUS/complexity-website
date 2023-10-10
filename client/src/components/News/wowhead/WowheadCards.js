import React from 'react';
import moment from 'moment';
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, Typography } from '@material-ui/core';

export default function News(props) {
    return (
        <Grid container spacing={3}>
            {props.news.map((news) => (
                <Grid key={news.guid[0]._} item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <Card style={{ filter: 'drop-shadow(2px 2px 2px #000)' }}>
                        <CardActionArea id='CardArea' href={news.link[0]} target="_blank" rel="noopener noreferrer">
                            <CardMedia
                                style={{ position: 'relative', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                image={news.hasOwnProperty("media:content") ? news["media:content"][0].$.url : 'https://res.cloudinary.com/complexityguild/image/upload/v1635415242/wow/backgrounds/shadowlands_icecrown.jpg'}
                                title={news.title[0]}
                                alt={news.title[0]}
                                onError={e => {
                                    e.target.src = 'https://res.cloudinary.com/complexityguild/image/upload/v1635415242/wow/backgrounds/shadowlands_icecrown.jpg';
                                }}
                            >
                                <CardHeader
                                    style={{ position: 'absolute', bottom: 0, left: 0 }}
                                    avatar={
                                        <Avatar
                                            alt='Wowhead Logo'
                                            src='https://res.cloudinary.com/complexityguild/image/upload/v1535585319/wow/logos/wowhead_news.png'
                                            style={{ filter: 'drop-shadow(2px 2px 2px #000)' }}
                                        />
                                    }
                                    title={
                                        <div>
                                            <Typography align='left' variant="subtitle2" color='textPrimary' style={{ textShadow: '2px 2px 2px #000000' }}>
                                                {moment(news.pubDate[0]).format('MMM. Do YYYY, h:mma')}
                                            </Typography>
                                            <Typography align='left' variant="h5" color='textPrimary' style={{ textShadow: '2px 2px 2px #000000' }}>
                                                {news.title[0]}
                                            </Typography>
                                        </div>
                                    }
                                />
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
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}