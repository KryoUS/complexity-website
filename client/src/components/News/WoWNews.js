import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Typography, CircularProgress, Hidden } from '@material-ui/core';

export default class WoWNews extends Component {
    constructor() {
        super();

        this.state = {
            breakingNews: [],
        }
    }

    componentDidMount = () => {
        axios.get('/api/breakingnews').then(res => {
            this.setState({ breakingNews: res.data });
        }).catch(error => {
            console.log('Breaking News Error = ', error)
        });
    }

    render() {
        return (
            this.state.breakingNews.length >= 1 ?
                this.state.breakingNews.map(obj => {
                    return <div key={obj.created_at}>
                        <Hidden mdDown>
                            {/* DESKTOP */}
                            <Typography align="center" key={`wownews${obj.epoch_datetime}`} variant={'body2'} style={{ color: "#00aeff" }}>{moment(obj.created_at).format('MMMM Do YYYY')} - "{obj.alert}."</Typography>
                        </Hidden>
                        <Hidden lgUp>
                            {/* MOBILE */}
                            <Typography align="left" key={`wownews${obj.epoch_datetime}`} variant={'body2'} style={{ color: "#00aeff" }}>{moment(obj.created_at).format('MMMM Do YYYY')} - "{obj.alert}."</Typography>
                        </Hidden>
                    </div>
                })
                :
                <CircularProgress />
        )
    }
}