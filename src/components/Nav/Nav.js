import React,  { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser, userLogout } from '../../ducks/reducer';
import axios from 'axios';
import DiscordWidget from './DiscordWidget';
import './Nav.css';

class Nav extends Component {
    constructor() {
        super();

        this.state = {
            realmInfo: {},
            usMythicAffixes: {},
            tokenPrice: 0,
            discordWidgetShow: false
        }
    }

    componentDidMount = () => {
        axios.get('/auth').then(res => {
            if (res.status === 200) {
                const user = res.data;
                this.props.setUser({user});
            } else {
                console.log(`Something's not quite right...`)
            }
        }).catch(error => {
            //Do not place an error message in this catch, otherwise none logged in users will see it.
        });

        axios.get('/api/wow/server/status').then(res => {
            this.setState({ realmInfo: res.data })
        }).catch(wowServerStatusError => {
            console.log(wowServerStatusError);
        });
        
        axios.get('/api/raiderio/mythicaffixes').then(res => {
            this.setState({ usMythicAffixes: res.data })
        }).catch(raiderIOMythicAffixesError => {
            console.log(raiderIOMythicAffixesError);
        });

        axios.get('/api/wow/token/price').then(res => {
            this.setState({ tokenPrice: res.data.price.toString().slice(0,-4)})
        }).catch(error => {
            console.log('WoW Token Price Error: ', error);
        });
    }

    login = () => {
        axios.get('/auth/login').then(response => {

        }).catch(loginError => {
            console.log('Unable to login! NEEDSERROR')
        })
    }

    logout = () => {
        axios.get('/auth/logout').then(response => {
            this.props.userLogout();
        }).catch(logoutError => {
            console.log('Logout failed!');
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
                        <ul className="nav-routes">
                            <li><Link to="/" className="nav-no-menu" >Home</Link></li>
                            <li><Link className="nav-no-menu" to="/about">About</Link></li>
                            <li><Link className="nav-no-menu" to="/raiders">Raid Roster</Link></li>
                            <li><Link className="nav-no-menu" to="/members">Members</Link></li>
                            <li><Link className="nav-no-menu" to="/leaderboards">Leaderboards</Link></li>
                        </ul>
                        
                        {this.props.user.id ?
                            <div className="login-container">
                                <div className="avatar" style={{backgroundImage: `url('${this.props.user.mainAvatarSmall}')`}} alt={this.props.user.main}>
                                    <ul className="nav-routes">
                                        <li className="settings-menu">
                                            <ul className="settings-menu-content">
                                                <li><Link className="nav-link" to="/">My Characters</Link></li>
                                                <li><Link className="nav-link" to="/settings">Settings</Link></li>
                                                <li><Link onClick={() => {this.logout()}} className="nav-link" to="/">Log Out</Link></li>
                                            </ul>
                                        </li>
                                    </ul>
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
                </div>
                <div className="nav-footer">
                    <div>
                        {this.state.usMythicAffixes.affix_details && 
                            <div className="affixes">Mythic+ Affixes: 
                                {this.state.usMythicAffixes.affix_details.map(affix => {
                                    return <a key={affix.name} href={affix.wowhead_url} data-wowhead={`affix=${affix.id}`} target="_blank"  rel="noopener noreferrer">{affix.name}</a>
                                })}
                            </div>
                        }
                    </div>
                    <div style={{fontSize: '10px', color: '#585858'}}>World of Warcraft and Blizzard Entertainment are trademarks or registered trademarks of Blizzard Entertainment, Inc. in the U.S. and/or other countries. All other trademarks are the property of their respective owners.</div>
                    <div style={{width: '330px', fontSize: '12px', color: 'white', textAlign: 'center'}}>
                        {this.state.tokenPrice > 0 && 
                            <a href="https://us.shop.battle.net/en-us/product/world-of-warcraft-token" data-wowhead="item=122284" target="_blank"  rel="noopener noreferrer">
                                <img style={{width: '12px', height: '12px'}} alt='Current WoW Token Price' src="https://res.cloudinary.com/complexityguild/image/upload/v1538802480/site/iconarmory.png" />
                                Token: {this.state.tokenPrice}g
                            </a>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        user: state.user
    }
}

export default connect( mapStateToProps, {setUser, userLogout} )( Nav );