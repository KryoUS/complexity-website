import React,  { Component } from 'react';
import axios from 'axios';
import { setMain } from '../../ducks/reducer';
import { connect } from 'react-redux';

// Set a new Main
// If Admin, allow raider exception flag, new release addition, and maybe news?
// Delete Account

class Settings extends Component {

    componentDidMount = () => {
        axios.get('/auth').then(res => {
            console.log('Auth User Object', res.data);
        }).catch(error => {
            console.log('Not Authed', error);
        })
    }

    // newMain = () => {
    //     this.props.setMain(name, avatarLarge, avatarMed, avatarSmall);
    // }

    render(){

        console.log('Props', this.props)
        return(
            <div>Settings</div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        main: state.main,
        mainAvatarLarge: state.mainAvatarLarge,
        mainAvatarMed: state.mainAvatarMed,
        mainAvatarSmall: state.mainAvatarSmall,
    }
}

export default connect( mapStateToProps, {setMain} )( Settings );