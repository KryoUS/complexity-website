import React,  { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends Component {

    render(){
        return(
            <div className="nav-div">
                <div className="nav-flex-container">
                    <p>This is Nav.</p> <br />
                    <Link to="/login"><button className="nav-button"> Login </button></Link>
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