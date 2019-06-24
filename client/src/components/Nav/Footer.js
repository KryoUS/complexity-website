import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { infoModal } from '../../ducks/reducer';
import axios from 'axios';
import MythicPlusAffixes from './MythicPlusAffixes';
import './Nav.css';

class Footer extends Component {
    constructor() {
        super();

        this.state = {
            tokenPrice: 0,
        }
    }

    componentDidMount = () => {
        axios.get('/api/wow/token/price').then(res => {
            this.setState({ tokenPrice: res.data.price.toString().slice(0,-4)})
        }).catch(error => {
            this.props.infoModal(true, 'Oops!', "We asked for the WoW Token Price but never heard back, stupid Goblins. Please try again in a moment.", 'OK');
        });
    }

    render(){

        return(
            <div className="nav-footer">
                <MythicPlusAffixes />
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
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        modalOpen: state.modalOpen,
        modalTitle: state.modalTitle,
        modalMessage: state.modalMessage,
        modalButton: state.modalButton
    }
}

export default connect( mapStateToProps, {infoModal} )( Footer );