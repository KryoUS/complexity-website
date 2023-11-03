import React, { Component } from 'react';
import axios from 'axios';
import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, CircularProgress, Container, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import InfiniteScroll from 'react-infinite-scroll-component';
import StatsChart from './statsChart';

export default class Members extends Component {
    constructor() {
        super();

        this.state = {
            members: [],
            filteredMembers: [],
            hasMoreValue: true,
            searchTerm: ''
        }
    }

    componentDidMount = () => {
        axios.get('/api/members/all').then(res => {
            this.setState({ members: res.data, filteredMembers: res.data.slice(0, 16) });
            console.log(res.data);
        }).catch(error => {
            console.log('Members Error = ', error);
        });
    }

    classIcon = (classId, className) => {
        let url = '';
        switch (classId) {
            case 6:
                url = 'spell_deathknight_classicon'
                break;
            case 12:
                url = 'classicon_demonhunter'
                break;
            default:
                url = 'classicon_' + className.toLowerCase()
        }
        return `https://render.worldofwarcraft.com/us/icons/56/${url}.jpg`
    }

    nameSearch = (term) => {
        this.setState({
            searchTerm: term,
            filteredMembers: this.state.members.filter(obj => obj.summary.name.toLowerCase().indexOf(term.toLowerCase()) !== -1).slice(0, 16),
            hasMoreValue: true
        });
    }

    loadScrollData = async () => {
        try {
            this.setState({
                filteredMembers: this.state.members.filter(obj => obj.summary.name.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) !== -1).slice(0, this.state.filteredMembers.length + 16)
            })
        } catch (err) {
            console.log(err)
        }
    }

    fetchMoreCharacters = () => {
        console.log('fetchMore')
        if (this.state.filteredMembers.length < this.state.members.length) {
            this.setState({ hasMoreValue: true });
            this.loadScrollData();
            console.log(this.state.filteredMembers.length, this.state.members.length);
        } else {
            this.setState({ hasMoreValue: false })
        }
    }

    render() {
        return (
            this.state.filteredMembers.length >= 1 ?
                <Container maxWidth={'xl'}>
                    <Container maxWidth='sm'>
                        <TextField
                            id='character-search'
                            label='Character Name'
                            variant='outlined'
                            margin='normal'
                            fullWidth
                            value={this.state.searchName}
                            onChange={(e) => { this.nameSearch(e.target.value) }}
                        />
                    </Container>
                    <InfiniteScroll
                        dataLength={this.state.filteredMembers.length}
                        next={this.fetchMoreCharacters}
                        hasMore={this.state.hasMoreValue}
                        loader={null}
                        style={{ overflow: "unset" }}

                    >
                        <Grid container justifyContent="center" spacing={1}>
                            {this.state.filteredMembers.map(obj => {
                                if (obj.media !== null) {
                                    return <Grid key={`character${obj.id}`} xs={3}>
                                        <Card sx={{ background: 'none', boxShadow: 'none' }}>
                                            <CardActionArea id="mem-area">
                                                <CardMedia
                                                    id="mem-card"
                                                    component="img"
                                                    loading="lazy"
                                                    image={obj.media.assets[2].value.replace("main.jpg", "main-raw.png")}
                                                    sx={{ transform: 'scale(1.60)', filter: 'drop-shadow(2px 2px 1px #000)' }}
                                                />
                                                <CardHeader
                                                    avatar={
                                                        <Avatar
                                                            alt="Class Icon"
                                                            src={this.classIcon(obj.summary.character_class.id, obj.summary.character_class.name)}
                                                        />
                                                    }
                                                    title={obj.summary.active_title ? obj.summary.active_title.display_string.replace("{name}", obj.summary.name) : obj.summary.name}
                                                    titleTypographyProps={{ 
                                                        align: 'left', 
                                                        variant: "h5", 
                                                        id: obj.summary.character_class.name.toLowerCase().replace(" ", "")
                                                    }}
                                                    subheader={`${obj.summary.level} - (${obj.summary.average_item_level}) ${obj.summary.active_spec.name} ${obj.summary.character_class.name}`}
                                                    subheaderTypographyProps={{ align: 'left' }}
                                                    sx={{
                                                        textShadow: '2px 2px 2px #000000',
                                                    }}
                                                />
                                                <CardContent>
                                                    <StatsChart charId={obj.id} stats={obj.character_statistics} />
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                } else {
                                    return null;
                                }
                            })
                            }
                        </Grid>
                    </InfiniteScroll>
                </Container>
                :
                <CircularProgress />
        )
    }
}