import React,  { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { setUser } from '../../ducks/reducer';
import './Nav.css';

class Nav extends Component {
    constructor() {
        super();

        this.state = {
            user: {},
            loggedIn: false
        }
    }

    componentDidMount = () => {
        axios.get('/auth').then(res => {
            console.log('Auth User Object', res.data);
            if (res.status === 200) {
                const user = res.data;
                this.setState({user: res.data});
                setUser({user});
                this.setState({loggedIn: true});
            } else {
                console.log(`Something's not quite right...`)
            }
        }).catch(error => {
            
        })
    }

    render(){
        let avatarStyle = {
            backgroundImage: `url('${this.state.user.mainAvatarSmall}')`, 
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
                        <li className="nav-menu">
                            Complexity
                            <ul className="nav-menu-content">
                                <Link className="nav-link" to="/about"><li>About</li></Link>
                                <Link className="nav-link" to="/raiders"><li>Raid Roster</li></Link>
                                <li className="nav-link">Members</li>
                                <li className="nav-link">Leaderboards</li>
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
                        <li><Link to="/" className="nav-no-menu" >Youtube</Link></li>
                    </ul>
                    
                    {this.state.loggedIn ?
                        <div className="login-container">
                            <div className="avatar" style={avatarStyle} alt={this.state.user.main} />
                            <ul className="nav-routes">
                                <li className="nav-menu">
                                    <div className="char-name">{this.state.user.main}</div>
                                        <ul className="nav-menu-content">
                                            <li className="nav-link">My Characters</li>
                                            <li className="nav-link">Settings</li>
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

export default connect( state => state, {setUser} )( Nav );