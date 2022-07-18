import React from 'react';
import axios from 'axios';
import moment from 'moment';
import WoWNews from './WoWNews';
import { Container, Box, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button, Hidden, CircularProgress, Zoom } from '@material-ui/core';

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
    }

    render(){
        return(
            <Container>
                <Box style={{padding: "24px"}}>
                    <Grid container spacing={2} justifyContent="center" alignItems="stretch">
                        <Grid item xs={11}>
                            <Card>
                                <CardContent>
                                    <Typography variant={'h5'} color="secondary">World of Warcraft - Breaking News</Typography>
                                    <WoWNews />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Hidden mdDown>
                        <Grid container spacing={2} justifyContent="center">
                            {   this.state.news
                                ?
                                this.state.news.map((news, index) => (
                                    <Zoom key={news.id} in={true} style={{transitionDelay: `${index*0.10}s`}} >
                                        <Grid item xs={10} container spacing={2} style={{backgroundColor: "#1B1B1B", margin: "12px"}}>
                                            <Grid item style={{margin: 0}}>
                                                <img 
                                                style={{width: 380, objectFit: "cover"}} 
                                                src={news.image ? news.image.replace('http:', 'https:') : 'https://res.cloudinary.com/complexityguild/image/upload/v1635415242/wow/backgrounds/shadowlands_icecrown.jpg'} 
                                                alt={news.title}
                                                onError={e => {
                                                    e.target.src = 'https://res.cloudinary.com/complexityguild/image/upload/v1635415242/wow/backgrounds/shadowlands_icecrown.jpg';
                                                }}
                                                />
                                            </Grid>
                                            <Grid item xs container direction="column" spacing={2}>
                                                <Grid item xs container justifyContent="space-between" alignItems="center">
                                                    <Grid item>
                                                        <Typography variant="h5" component="div" color="secondary" style={{textAlign: "left"}}>{news.title}</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="body1" component="div" color="textSecondary" style={{fontSize: 14, textAlign: "right"}}>{moment(Number(news.news_datetime)).format('MMM. Do YYYY, h:mm:ssa')}</Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs>
                                                    <Typography gutterBottom variant="body1" color="textSecondary" style={{textAlign: "left"}}>{news.description}</Typography>
                                                </Grid>
                                                <Grid item xs>
                                                    <Button variant="contained" size="medium" color="secondary" width="100%" href={news.link} target="_blank" rel="noopener noreferrer">
                                                        <Typography>Read More on {news.source}</Typography>
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Zoom>
                                ))
                                :
                                <Grid item xs><CircularProgress color="secondary" /></Grid>
                            }
                        </Grid>
                    </Hidden>
                    <Hidden lgUp>
                        <Grid container spacing={4} alignItems="stretch">
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
                                            <CardContent>
                                                <Typography variant="h5" component="div" color="secondary">{news.title}</Typography>
                                                <Typography gutterBottom color="textSecondary" style={{fontSize: 14}}>{moment(Number(news.news_datetime)).format('MMMM Do YYYY, h:mm:ss a')}</Typography>
                                                <Typography variant="body1">{news.description}</Typography>
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
                    </Hidden>
                </Box>
            </Container>
        )
    }
}