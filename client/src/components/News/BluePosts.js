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
            this.setState({bluePosts: res.data});
        }).catch(error => {

        });
    }

    render() {
        return (
            <Grid container>
            {this.state.bluePosts.length >= 1 ?
                this.state.bluePosts.map(obj => {
                    return <Grid key={obj.id} item xs={6}>
                        <Link id="blizzard" href={`https://us.forums.blizzard.com/en/wow${obj.url}`} underline="hover" style={{textOverflow: "ellipsis"}}>
                            <Typography align='left' variant='body1'>{moment(obj.created_at).fromNow(true)}: {obj.title}</Typography>
                        </Link>
                    </Grid>
                })
                :
                <CircularProgress />
            }
            </Grid>
        )
    }
}