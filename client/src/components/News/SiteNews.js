import React from 'react';
import axios from 'axios';
import moment from 'moment';
import WoWNews from './WoWNews';
import BluePosts from './BluePosts';
import { Container, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Hidden, CircularProgress, Zoom } from '@material-ui/core';

export default class News extends React.Component{
    constructor() {
        super();

        this.state = {
            news: []
        }
    }

    componentDidMount = () => {
        // axios.get('/api/news').then(res => {
        //     this.setState({news: res.data});
        // }).catch(error => {
            
        // });

        axios.get('/api/wow/news').then(res => {
            this.setState({news: res.data});
        }).catch(error => {

        });

        window.twttr.widgets.load();
    }

    render(){
        return(
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant={'h5'} color="secondary">World of Warcraft - Breaking News</Typography>
                                <WoWNews />
                            </CardContent>
                        </Card>
                    </Grid>
                    <Hidden mdDown>
                        <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                    <Typography variant={'h5'} color="secondary">World of Warcraft - Blue Posts</Typography>
                                    <BluePosts />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Hidden>
                    <Hidden mdDown>
                        <Grid item xs={12}>
                            {/* DESKTOP */}
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Grid container spacing={2}>
                                        {   this.state.news.length > 0
                                            ?
                                            this.state.news.map((news, index) => ( 
                                                <Zoom key={news.guid[0]._} in={true} style={{transitionDelay: `${index*0.10}s`}} >
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <CardContent>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs style={{margin: 0}}> 
                                                                        <img 
                                                                        style={{width: 500, height: 300, objectFit: "cover"}}
                                                                        src={news.hasOwnProperty("media:content") ? news["media:content"][0].$.url : 'https://res.cloudinary.com/complexityguild/image/upload/v1635415242/wow/backgrounds/shadowlands_icecrown.jpg'} 
                                                                        alt={news.title[0]}
                                                                        onError={e => {
                                                                            e.target.src = 'https://res.cloudinary.com/complexityguild/image/upload/v1635415242/wow/backgrounds/shadowlands_icecrown.jpg';
                                                                        }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs container direction="column" spacing={2}>
                                                                        <Grid item xs container direction="column" justifyContent="space-between">
                                                                            <Grid item xs>
                                                                                <Typography variant="h6" component="div" color="secondary" style={{textAlign: "left"}}>{news.title[0]}</Typography>
                                                                            </Grid>
                                                                            <Grid item xs>
                                                                                <Typography variant="body1" component="div" color="textSecondary" style={{textAlign: "right"}}>{moment(news.pubDate[0]).format('MMM. Do YYYY, h:mma')}</Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs>
                                                                            <Typography gutterBottom variant="body1" color="textSecondary" style={{textAlign: "left"}}>{news.description[0].substring(0, news.description[0].indexOf('<'))}</Typography>
                                                                        </Grid>
                                                                        <Grid item xs>
                                                                            <Button variant="contained" size="small" color="secondary" href={news.link[0]} target="_blank" rel="noopener noreferrer">
                                                                                <Typography variant="body1">Read More on Wowhead</Typography>
                                                                            </Button>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </CardContent>
                                                        </Card>
                                                    </Grid>
                                                </Zoom>
                                            ))
                                            :
                                                <CircularProgress color="secondary" />
                                        }
                                    </Grid>
                                </Grid>
                                {/* Removed since Twitter broke their API */}
                                {/* <Grid item xs={5}>
                                    <Card>
                                        <a 
                                        class="twitter-timeline" 
                                        data-theme="dark" 
                                        href="https://twitter.com/KryoUS/lists/1588319783837003777?ref_src=twsrc%5Etfw"
                                        // data-tweet-limit={14}
                                        data-chrome="noheader nofooter noborders transparent">
                                            <CircularProgress color="secondary" />
                                        </a>
                                    </Card>
                                </Grid> */}
                            </Grid>
                        </Grid>
                    </Hidden>
                    <Hidden lgUp>
                        {/* MOBILE */}
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                {   this.state.news
                                    ?
                                    this.state.news.map(news => (
                                        <Grid key={`mobile${news.guid[0]._}`} item xs={12} sm={6} md={4} lg={3} xl={2}>
                                            <Card>
                                                <CardMedia 
                                                component="img" 
                                                height="140" 
                                                src={news.hasOwnProperty(["media:content"]) ? news["media:content"][0].$.url : 'https://res.cloudinary.com/complexityguild/image/upload/v1635415242/wow/backgrounds/shadowlands_icecrown.jpg'} 
                                                onError={e => {
                                                    e.target.src = 'https://res.cloudinary.com/complexityguild/image/upload/v1635415242/wow/backgrounds/shadowlands_icecrown.jpg';
                                                }}
                                                />
                                                <CardContent style={{ textAlign: "left" }}>
                                                    <Typography gutterBottom variant="body1" component="div" color="secondary">{news.title[0]}</Typography>
                                                    <Typography gutterBottom variant="body2" color="textSecondary">{moment(news.pubDate[0]).format('MMMM Do YYYY, h:mma')}</Typography>
                                                    <Typography variant="body2">{news.description[0].substring(0, news.description[0].indexOf('<'))}</Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small" color="secondary" href={news.link[0]} target="_blank" rel="noopener noreferrer">Read More on Wowhead</Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                    :
                                    null
                                }
                            </Grid>
                        </Grid>
                    </Hidden>
                </Grid>
            </Container>
        )
    }
}