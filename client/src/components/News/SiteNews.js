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
        axios.get('/api/news').then(res => {
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
                                <Grid item xs={7}>
                                    <Grid container spacing={2}>
                                        {   this.state.news
                                            ?
                                            this.state.news.map((news, index) => (
                                                <Zoom key={news.id} in={true} style={{transitionDelay: `${index*0.10}s`}} >
                                                    <Grid item xs={12}>
                                                        <Card>
                                                            <CardContent>
                                                                <Grid container spacing={2}>
                                                                    <Grid item xs style={{margin: 0}}>
                                                                        <img 
                                                                        style={{width: 300, objectFit: "cover"}} 
                                                                        src={news.image ? news.image.replace('http:', 'https:') : 'https://res.cloudinary.com/complexityguild/image/upload/v1635415242/wow/backgrounds/shadowlands_icecrown.jpg'} 
                                                                        alt={news.title}
                                                                        onError={e => {
                                                                            e.target.src = 'https://res.cloudinary.com/complexityguild/image/upload/v1635415242/wow/backgrounds/shadowlands_icecrown.jpg';
                                                                        }}
                                                                        />
                                                                    </Grid>
                                                                    <Grid item xs container direction="column" spacing={2}>
                                                                        <Grid item xs container direction="column" justifyContent="space-between">
                                                                            <Grid item xs>
                                                                                <Typography component="div" color="secondary" style={{textAlign: "left"}}>{news.title}</Typography>
                                                                            </Grid>
                                                                            <Grid item xs>
                                                                                <Typography variant="body2" component="div" color="textSecondary" style={{textAlign: "right"}}>{moment(Number(news.news_datetime)).format('MMM. Do YYYY, h:mm:ssa')}</Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs>
                                                                            <Typography gutterBottom variant="body2" color="textSecondary" style={{textAlign: "left"}}>{news.description}</Typography>
                                                                        </Grid>
                                                                        <Grid item xs>
                                                                            <Button variant="contained" size="small" color="secondary" href={news.link} target="_blank" rel="noopener noreferrer">
                                                                                <Typography variant="body2">Read More on {news.source}</Typography>
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
                                <Grid item xs={5}>
                                    <Card>
                                        <a 
                                        class="twitter-timeline" 
                                        data-theme="dark" 
                                        href="https://twitter.com/KryoUS/lists/1588319783837003777?ref_src=twsrc%5Etfw"
                                        data-tweet-limit={14}
                                        data-chrome="noheader nofooter noborders transparent">
                                            <CircularProgress color="secondary" />
                                        </a>
                                    </Card>
                                </Grid>
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
                                        <Grid key={`mobile${news.id}`} item xs={12} sm={6} md={4} lg={3} xl={2}>
                                            <Card>
                                                <CardMedia 
                                                component="img" 
                                                height="140" 
                                                src={news.image ? news.image.replace('http:', 'https:') : 'https://res.cloudinary.com/complexityguild/image/upload/v1635415242/wow/backgrounds/shadowlands_icecrown.jpg'} 
                                                onError={e => {
                                                    e.target.src = 'https://res.cloudinary.com/complexityguild/image/upload/v1635415242/wow/backgrounds/shadowlands_icecrown.jpg';
                                                }}
                                                />
                                                <CardContent style={{ textAlign: "left" }}>
                                                    <Typography gutterBottom variant="body1" component="div" color="secondary">{news.title}</Typography>
                                                    <Typography gutterBottom variant="body2" color="textSecondary">{moment(Number(news.news_datetime)).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                                                    <Typography variant="body2">{news.description}</Typography>
                                                </CardContent>
                                                <CardActions>
                                                    <Button size="small" color="secondary" href={news.link} target="_blank" rel="noopener noreferrer">Read More on Wowhead</Button>
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