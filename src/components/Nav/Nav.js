import React,  { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Nav extends Component {

    render(){
        return(
            <div className="nav-div">
                <div className="nav-flex-container">
                    <p>This is Nav.</p> <br />
                    <Link to=""><button className="nav-button"> Login </button></Link> 
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