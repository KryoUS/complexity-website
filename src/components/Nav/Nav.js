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
            loggedIn: false
        }
    }

    componentDidMount = () => {
        axios.get('/auth').then(res => {
            this.setState({user: res.data})
            this.setState({loggedIn: true})
            //res.data needs to go to redux
        }).catch(error => {
            console.log(error);
        })
    }

    render(){
        return(
            <div className="nav-div">
                <div className="nav-flex-container">
                    <div className="logo-container">
                        <Link to="/"><img className="logo" src="/images/logo.png" alt="Complexity Logo"/></Link>
                    </div>
                    <ul className="nav-routes">
                        <li><Link to="/" className="nav-link" >Home</Link></li>
                        <li><Link to="/" className="nav-link" >Complexity</Link></li>
                        <li><Link to="/" className="nav-link" >Blizzcon</Link></li>
                        <li><Link to="/" className="nav-link" >Twitch</Link></li>
                        <li><Link to="/" className="nav-link" >Youtube</Link></li>
                    </ul>
                    <div className="login-container">
                        {this.state.loggedIn ?
                            <img className="avatar" src={this.state.user.chars[11].avatarMed} alt={this.state.user.chars[0].name}/>
                        :
                            <a href="https://localhost:3050/login" className="login">Login</a>
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