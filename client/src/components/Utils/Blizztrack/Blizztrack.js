import React, { Component } from 'react';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import './Blizztrack.css';
import axios from 'axios';

const Transition = (props) => {
    return <Slide direction="up" {...props} />;
}

class Blizztrack extends Component {
    constructor() {
        super();

        this.state = {
            wowVersion: {},
            wowPatchNotes: {},
            wowBluePosts: [],
            wowLatestPosts: {},
            patchNotesOpen: false,
            patchNotesTitle: '',
            patchNotesDate: '',
            patchNotesContent: '',
            patchNotesURL: ''
        }
    }

    componentDidMount = () => {
        axios.get('/api/blizztrack/wow/version').then(res => {
            this.setState({ wowVersion: res.data });
        }).catch(error => {
            console.log('Blizztrack WoW Version Error = ', error)
        });

        axios.get('/api/blizztrack/wow/patchnotes').then(res => {
            this.setState({ wowPatchNotes: res.data });
        }).catch(error => {
            console.log('Blizztrack WoW Version Error = ', error)
        });

        axios.get('/api/blizztrack/wow/blueposts').then(res => {
            this.setState({ wowBluePosts: res.data });
            ReactTooltip.rebuild();
        }).catch(error => {
            console.log('Blizztrack WoW Version Error = ', error)
        });

        axios.get('/api/blizztrack/wow/latestposts').then(res => {
            this.setState({ wowLatestPosts: res.data });
            ReactTooltip.rebuild();
        }).catch(error => {
            console.log('Blizztrack WoW Version Error = ', error)
        });
    }

    versionBuilder = (obj) => {
        return <div className="flex-row flex-between" key={obj.regionname}>
            <div className="flex-row">
                <div className="flex-row flex-center blizztrack-diff">{moment(parseInt(obj.updated)).fromNow(true)}</div> 
                <div>{obj.regionname}</div>
            </div>
            <div>{obj.versionsname}</div>
        </div>
    }

    patchBuilder = (obj) => {
        return <div className="flex-row flex-between blizztrack-highlight" key={obj.id} onClick={() => this.patchNotesShow(obj.title, moment(obj.date_published).format('MMMM Do YYYY, h:mm:ss a'), obj.content_html, obj.url)}>
            <div className="flex-row flex-center">
                <div className="flex-row flex-center blizztrack-diff">{moment(obj.date_published).fromNow(true)}</div> 
            </div>
            <div className="blizztrack-link">{obj.id}</div>
        </div>
    }

    bluePostsBuilder = (obj) => {
        return <a className="flex-row flex-between blizztrack-highlight" 
            key={obj.id} 
            href={`https://us.forums.blizzard.com/en/wow${obj.url}`}
            target="_blank" 
            rel="noopener noreferrer" 
            data-for="blizztrack-posts"
            data-tip={`
                <div class="flex-row flex-between">
                    <div class="blizztrack-link">${obj.user.username} - ${obj.user.title}</div>
                    <div>${obj.category}</div>
                </div>
                <div class="flex-row flex-between blizztrack-diff">
                    <div>${moment(obj.created_at).format('MMMM Do YYYY, h:mm:ss a')}</div>
                    <div>${obj.topic.posts_count} Posts</div>
                </div>
                <div class="blizztrack-tooltip">${obj.excerpt}</div>`
            } 
            data-html={true}
        >
            <div className="flex-row flex-center">
                <div className="flex-row flex-center blizztrack-diff">{moment(obj.created_at).fromNow(true)}</div> 
            </div>
            <div className="blizztrack-post blizztrack-bluepost">{obj.title}</div>
        </a>
    }

    latestPostsBuilder = (obj) => {
        return <a className="flex-row flex-between blizztrack-highlight" 
            key={obj.id} 
            href={`https://us.forums.blizzard.com/en/wow/t/${obj.slug}/${obj.id}`}
            target="_blank" 
            rel="noopener noreferrer" 
            data-for="blizztrack-posts"
            data-tip={`
                <div class="flex-row flex-between blizztrack-tooltip">
                    <div class="blizztrack-link">${obj.last_poster_username}</div>
                    <div>${obj.category}</div>
                </div>
                <div class="flex-row flex-between blizztrack-diff">
                    <div>${moment(obj.last_posted_at).format('MMMM Do YYYY, h:mm:ss a')}</div>
                    <div>${obj.posts_count} Posts |</div>
                    <div>${obj.reply_count} Replies |</div>
                    <div>${obj.views} Views</div>
                </div>
                <div class="flex-row flex-center">Click to Read More on WorldofWarcraft.com</div>`
            } 
            data-html={true}
        >
            <div className="flex-row flex-center">
                <div className="flex-row flex-center blizztrack-diff">{moment(obj.last_posted_at).fromNow(true)}</div> 
            </div>
            <div className="blizztrack-post">{obj.title}</div>
        </a>
    }

    modalClose = () => {
        this.setState({ patchNotesOpen: false })
    };

    patchNotesShow = (title, date, content, url) => {
        this.setState({ patchNotesTitle: title, patchNotesDate: date, patchNotesContent: content, patchNotesURL: url, patchNotesOpen: true });
    }

    modalClear = () => {
        this.setState({ patchNotesTitle: '', patchNotesDate: '', patchNotesContent: '', patchNotesURL: '' });
    }

    render() {
        return (
            <div className="flex-row flex-center blizztrack-back">
                {this.state.wowVersion.name &&
                    <div className="flex-column blizztrack-container">
                        
                            <div className="fade2s">
                                <div className="blizztrack-title">World of Warcraft - Retail</div>
                                <div className="flex-column blizztrack-overflow">
                                    {this.state.wowVersion.regions.map(obj => {
                                        return this.versionBuilder(obj)
                                    })}
                                </div>
                                <div className="blizztrack-bottom" />
                            </div>
                    </div>
                }
                {this.state.wowPatchNotes.items &&
                    <div className="flex-column blizztrack-container">
                        
                            <div className="fade2s">
                                <div className="blizztrack-title">World of Warcraft - Patch Notes</div>
                                <div className="flex-column blizztrack-overflow">
                                    {this.state.wowPatchNotes.items.map(obj => {
                                        return this.patchBuilder(obj)
                                    })}
                                </div>
                                <div className="blizztrack-bottom" />
                            </div>
                        
                    </div>
                }
                {this.state.wowBluePosts.length > 0 &&
                    <div className="flex-column blizztrack-container">
                        
                            <div className="fade2s">
                                <div className="blizztrack-title">World of Warcraft - Blue Posts</div>
                                <div className="flex-column blizztrack-overflow">
                                    {this.state.wowBluePosts.map(obj => {
                                        return this.bluePostsBuilder(obj)
                                    })}
                                </div>
                                <div className="blizztrack-bottom" />
                                <ReactTooltip id="blizztrack-posts" />
                            </div>
                    </div>
                }
                {this.state.wowLatestPosts.Posts &&
                    <div className="flex-column blizztrack-container">
                        <div className="fade2s">
                            <div className="blizztrack-title">World of Warcraft - Latest Posts</div>
                            <div className="flex-column blizztrack-overflow">
                                {this.state.wowLatestPosts.Posts.map(obj => {
                                    return this.latestPostsBuilder(obj)
                                })}
                            </div>
                            <a className="blizztrack-bottom" href="https://blizztrack.com/" target="_blank" rel="noopener noreferrer">
                                <div className="icon20 blizztrack-modal-logo"/>
                                <div className="blizztrack-diff" id="blizztrack-provider">Provided by Blizztrack</div>
                            </a>
                            <ReactTooltip id="blizztrack-posts" />
                        </div>
                    </div>
                }
                <Dialog
                    id="blizztrack-modal"
                    fullScreen={true}
                    open={this.state.patchNotesOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.modalClose}
                    onExited={this.modalClear}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        <div className="flex-row flex-between">
                            <div>{this.state.patchNotesTitle}</div>
                            <div className="blizztrack-diff">{this.state.patchNotesDate}</div>
                        </div>
                    </DialogTitle>
                    <DialogContent id="alert-dialog-slide-content">
                        <div className="blizztrack-html" dangerouslySetInnerHTML={{ __html: this.state.patchNotesContent }}></div>
                    </DialogContent>
                    <DialogActions id="alert-dialog-slide-actions">
                        <a className="blizztrack-modal-logo-container flex-row"
                            href={this.state.patchNotesURL} 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <div className="icon20 blizztrack-modal-logo"/>
                            <div className="blizztrack-diff" id="blizztrack-provider">Provided by Blizztrack</div>
                        </a>
                        <div className="button-border" id="blizztrack-modal-button" onClick={this.modalClose}>
                            <div className="button-text">Close</div>
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default Blizztrack;