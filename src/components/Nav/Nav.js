import React,  { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setUser, userLogout } from '../../ducks/reducer';
import './Nav.css';

class Nav extends Component {
    constructor() {
        super();

        this.state = {

        }
    }

    componentDidMount = () => {
        axios.get('/auth').then(res => {
            console.log('Auth User Object', res.data);
            if (res.status === 200) {
                const user = res.data;
                this.props.setUser({user});
            } else {
                console.log(`Something's not quite right...`)
            }
        }).catch(error => {
            
        })
    }

    logout = () => {
        axios.get('/auth/logout').then(response => {
            this.props.userLogout();
        }).catch(logoutError => {
            console.log('Logout failed!');
        })
    }

    render(){
        let avatarStyle = {
            backgroundImage: `url('${this.props.user.mainAvatarSmall}')`, 
            width: '54px', 
            height: '54px'
        }

        return(
            <div className="nav-div">
                <div className="nav-flex-container">
                    <div className="logo-container">
                        <Link to="/"><img className="logo" src="/images/logov3.png" alt="Complexity Logo"/></Link>
                    </div>
                    <ul className="nav-routes">
                        <li><Link to="/" className="nav-no-menu" >Home</Link></li>
                        <li><Link className="nav-no-menu" to="/about">About</Link></li>
                        <li><Link className="nav-no-menu" to="/raiders">Raid Roster</Link></li>
                        <li><Link className="nav-no-menu" to="/members">Members</Link></li>
                        <li><Link className="nav-no-menu" to="/leaderboards">Leaderboards</Link></li>
                        {/* NOT MVP AND WILL BE ADDED LATER IN TIME
                        <li className="nav-menu">
                            Complexity
                            <ul className="nav-menu-content">
                                <Link className="nav-link" to="/about"><li>About</li></Link>
                                <Link className="nav-link" to="/raiders"><li>Raid Roster</li></Link>
                                <Link className="nav-link" to="/members"><li>Members</li></Link>
                                <Link className="nav-link" to="/leaderboards"><li>Leaderboards</li></Link>
                            </ul>
                        </li>
                        <li className="nav-menu">
                            Blizzcon
                            <ul className="nav-menu-content">
                                <li className="nav-link">Blizzcon Info</li>
                                <li className="nav-link">Blizzcon 2017</li>
                                <li className="nav-link">Blizzcon 2015</li>
                            </ul>
                        </li>
                        <li><Link to="/" className="nav-no-menu" >Twitch</Link></li>
                        <li><Link to="/" className="nav-no-menu" >Youtube</Link></li> */}
                    </ul>
                    
                    {this.props.user.id ?
                        <div className="login-container">
                            <div className="avatar" style={avatarStyle} alt={this.props.user.main} />
                            <ul className="nav-routes">
                                <li className="nav-menu">
                                    <div className="char-name">{this.props.user.main}</div>
                                        <ul className="nav-menu-content">
                                            <li className="nav-link">My Characters</li>
                                            <li><Link className="nav-link" to="/settings">Settings</Link></li>
                                            <li onClick={() => {this.logout()}} className="nav-link">Log Out</li>
                                        </ul>
                                </li>
                            </ul>
                        </div>
                    :
                        <div className="login-container">
                            <a href="https://localhost:3050/login" className="login">Login</a>
                        </div>
                    }
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