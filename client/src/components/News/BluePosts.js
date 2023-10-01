import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Typography, CircularProgress, Grid, Link } from '@material-ui/core';

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

    post = (obj) => {
        return <Link id="blizzard" href={`https://us.forums.blizzard.com/en/wow${obj.url}`} underline="hover" style={{ textOverflow: "ellipsis" }}>
            <Typography align='left' variant='body1'>{moment(obj.created_at).fromNow(true)}: {obj.title}</Typography>
        </Link>
    }

    render() {
        return (
            <div>
                {this.state.bluePosts.length >= 1 ?
                    <Grid container>
                        <Grid item xs={6}>
                            <div>{this.post(this.state.bluePosts[0])}</div>
                            <div>{this.post(this.state.bluePosts[1])}</div>
                            <div>{this.post(this.state.bluePosts[2])}</div>
                            <div>{this.post(this.state.bluePosts[3])}</div>
                            <div>{this.post(this.state.bluePosts[4])}</div>
                            <div>{this.post(this.state.bluePosts[5])}</div>
                            <div>{this.post(this.state.bluePosts[6])}</div>
                            <div>{this.post(this.state.bluePosts[7])}</div>
                            <div>{this.post(this.state.bluePosts[8])}</div>
                            <div>{this.post(this.state.bluePosts[9])}</div>
                        </Grid>
                        <Grid item xs={6}>
                            <div>{this.post(this.state.bluePosts[10])}</div>
                            <div>{this.post(this.state.bluePosts[11])}</div>
                            <div>{this.post(this.state.bluePosts[12])}</div>
                            <div>{this.post(this.state.bluePosts[13])}</div>
                            <div>{this.post(this.state.bluePosts[14])}</div>
                            <div>{this.post(this.state.bluePosts[15])}</div>
                            <div>{this.post(this.state.bluePosts[16])}</div>
                            <div>{this.post(this.state.bluePosts[17])}</div>
                            <div>{this.post(this.state.bluePosts[18])}</div>
                            <div>{this.post(this.state.bluePosts[19])}</div>
                        </Grid>
                    </Grid>
                    :
                    <CircularProgress />
                }
            </div>
        )
    }
}