import React,  { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser, userLogout, infoModal } from '../../ducks/reducer';
import axios from 'axios';
import DiscordWidget from './DiscordWidget';
import InfoModal from './InfoModal';
import './Nav.css';

class Nav extends Component {
    constructor() {
        super();

        this.state = {
            realmInfo: {},
            discordWidgetShow: false
        }
    }

    componentDidMount = () => {
        axios.get('/auth').then(res => {
            if (res.status === 200) {
                const user = res.data;
                this.props.setUser({user});
            } else {
                this.props.infoModal(true, 'Oops!', "User Authorization Error! Don't panic, We've informed the monkeys. Please try again in a moment.", 'OK');
            }
        }).catch(error => {
            //Do not place an error message in this catch, otherwise none logged in users will see it.
        });

        axios.get('/api/wow/server/status').then(res => {
            this.setState({ realmInfo: res.data })
        }).catch(wowServerStatusError => {
            this.props.infoModal(true, 'Oops!', "We attempted to get WoW's server status but it never responded. It's probably ok, we think. Please try again in a moment.", 'OK');
        });

    }

    login = () => {
        axios.get('/auth/login').then(response => {

        }).catch(loginError => {
            this.props.infoModal(true, 'Oops!', "We couldn't log you in at this time, are a time traveler by chance? Hmm, please try again in a moment.", 'OK');
        })
    }

    logout = () => {
        axios.get('/auth/logout').then(response => {
            this.props.userLogout();
        }).catch(logoutError => {
            this.props.infoModal(true, 'Oops!', "There's no way this failed but here we are... Please try again in a moment.", 'OK');
        })
    }

    handleMouseOver = () => {
        this.setState({discordWidgetShow: !this.state.discordWidgetShow})
    }

    render(){

        return(
            <div>
                <div className="nav-div">
                    <div className="nav-flex-container">
                        <div className="logo-container">
                            <Link to="/"><img className="logo" src="https://res.cloudinary.com/complexityguild/image/upload/v1535585345/wow/logos/logov3.png" alt="Complexity Logo"/></Link>
                            <div className="realm-status-container">
                                <div style={{display: 'flex', width: '70px', justifyContent: 'space-evenly'}}>
                                    <div>Realm:</div>
                                    {this.state.realmInfo.status ? 
                                        <img style={{width: '16px', height: '16px'}} alt="Thunderlord Online" src="https://res.cloudinary.com/complexityguild/image/upload/v1537336976/site/server_status.png"></img> 
                                    : 
                                        <img style={{width: '16px', height: '16px'}} alt="Thunderlord Offline" src="https://res.cloudinary.com/complexityguild/image/upload/v1537336981/site/server_status_false.png"></img>
                                    }
                                </div>
                                <div style={{display: 'flex', width: '70px', justifyContent: 'space-evenly'}}>
                                    <div>Queue:</div>
                                    {this.state.realmInfo.queue ? 
                                        <img style={{width: '16px', height: '16px'}} alt="Thunderlord has a Queue" src="https://res.cloudinary.com/complexityguild/image/upload/v1537336983/site/server_status_queue.png"></img> 
                                    : 
                                        <img style={{width: '16px', height: '16px'}} alt="Thunderlord does not have a Queue" src="https://res.cloudinary.com/complexityguild/image/upload/v1537336981/site/server_status.png"></img>
                                    }
                                </div>
                            </div>
                        </div>
                        {/* <ul className="nav-routes">
                            <li><Link to="/" className="nav-no-menu" >Home</Link></li>
                            <li><Link className="nav-no-menu" to="/about">About</Link></li>
                            <li><Link className="nav-no-menu" to="/raiders">Raid Roster</Link></li>
                            <li><Link className="nav-no-menu" to="/members">Members</Link></li>
                            <li><Link className="nav-no-menu" to="/leaderboards">Leaderboards</Link></li>
                        </ul> */}
                        <div className="flex-row flex-between">
                            <Link to="/">
                                <div className='button-border' id='nav-button'>
                                    <div className='button-text'>Home</div>
                                </div>
                            </Link>
                            <Link to="/about">
                                <div className='button-border' id='nav-button'>
                                    <div className='button-text'>About</div>
                                </div>
                            </Link>
                            <Link to="/raiders">
                                <div className='button-border' id='nav-button'>
                                    <div className='button-text'>Raid Roster</div>
                                </div>
                            </Link>
                            <Link to="/members">
                                <div className='button-border' id='nav-button'>
                                    <div className='button-text'>Members</div>
                                </div>
                            </Link>
                            <Link to="/leaderboards">
                                <div className='button-border' id='nav-button'>
                                    <div className='button-text'>Leaderboards</div>
                                </div>
                            </Link>
                        </div>
                        
                        {this.props.user.id ?
                            <div className="login-container">
                                <div className="avatar" style={{backgroundImage: `url('${this.props.user.mainAvatarSmall}')`}} alt={this.props.user.main}>
                                        <div className="settings-menu">
                                            <div className="settings-menu-content">
                                                <Link className="button-border" id='nav-button' to="/">
                                                    <div className='button-text'>My Characters</div>
                                                </Link>
                                                <Link className="button-border" id='nav-button' to="/settings">
                                                    <div className='button-text'>Settings</div>
                                                </Link>
                                                <Link onClick={() => {this.logout()}} className="button-border" id='nav-button' to="/">
                                                    <div className='button-text'>Log Out</div>
                                                </Link>
                                            </div>
                                        </div>
                                </div>
                                <div className="discord-widget" onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseOver}>
                                    {this.state.discordWidgetShow && <DiscordWidget />}
                                </div>
                            </div>
                        :
                            <div className="login-container">
                                {/* ISSUE */}
                                <a href="https://localhost:3050/auth/login" className="login"> </a>
                                <div className="discord-widget" onMouseEnter={this.handleMouseOver} onMouseLeave={this.handleMouseOver}>
                                    {this.state.discordWidgetShow && <DiscordWidget />}
                                </div>
                                {/* <div className="login" onClick={() => this.login()}>Login</div> */}
                            </div>
                        }
                    </div>
                    <InfoModal />
                    <div className="gradient-line-white" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        user: state.user,
        modalOpen: state.modalOpen,
        modalTitle: state.modalTitle,
        modalMessage: state.modalMessage,
        modalButton: state.modalButton
    }
}

export default connect( mapStateToProps, {setUser, userLogout, infoModal} )( Nav );