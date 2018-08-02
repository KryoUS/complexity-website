import React,  { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './Nav.css';

class Nav extends Component {

    componentDidMount = () => {
        axios.get('https://localhost:3050/auth').then(res => {
            console.log(res.data)
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
                        <a href="https://localhost:3050/login" className="login">Login</a>
                    </div>
                    {/* axios to get */}
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