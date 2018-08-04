import React,  { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './Nav.css';

class Nav extends Component {
    constructor() {
        super();

        this.state = {
            user: {},
            loggedIn: false,
            loadDisplay: 'login'
        }
    }

    componentDidMount = () => {
        axios.get('/auth').then(res => {
            console.log(res.data);
            this.setState({user: res.data});    //res.data needs to go to redux
            this.setState({loggedIn: true});
        }).catch(error => {
            console.log(error);
        })
    }

    loaderToggle = () => {
        this.setState({loadDisplay: 'loader'})
    }

    render(){
        let avatarStyle = {
            paddingLeft: '5px',
            paddingBottom: '5px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            backgroundImage: `url('${this.state.user.mainAvatarMed}')`, 
            width: '230px', 
            height: '100px', 
            backgroundPosition: 'center',
            color: 'white',
            fontSize: '22px',
            letterSpacing: 0
        }

        return(
            <div className="nav-div">
                <div className="nav-flex-container">
                    <div className="logo-container">
                        <Link to="/"><img className="logo" src="/images/logo.png" alt="Complexity Logo"/></Link>
                    </div>
                    <ul className="nav-routes">
                        <li><Link to="/" className="nav-link" >Home</Link></li>
                        <li className="nav-menu">
                            Complexity
                            <ul className="nav-menu-content">
                                <li className="nav-link">About</li>
                                <li className="nav-link">Raid Roster</li>
                                <li className="nav-link">Members</li>
                                <li className="nav-link">Stat Leaderboards</li>
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
                        <li><Link to="/" className="nav-link" >Twitch</Link></li>
                        <li><Link to="/" className="nav-link" >Youtube</Link></li>
                    </ul>
                    <div className="login-container">
                        {this.state.loggedIn ?
                            <div className="avatar" style={avatarStyle} alt={this.state.user.main}>
                                {this.state.user.main}
                                <img className="settings" src="/images/settings.png" alt="Settings"/>
                            </div>
                        :
                            <a href="https://localhost:3050/login" className={this.state.loadDisplay} onClick={() => {this.loaderToggle()}}>Login</a>
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        tempType: state.tempType
    }
}

export default connect( mapStateToProps )( Nav );