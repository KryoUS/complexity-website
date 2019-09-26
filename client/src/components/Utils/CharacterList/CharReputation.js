import React, { Component } from 'react';
import axios from 'axios';
import ProgressBar from '../ProgressBar';
import './CharReputation.css';

class CharReputation extends Component {
    constructor() {
        super();

        this.state = {
            reputation: []
        }
    }

    componentDidMount = () => {
        axios.put(`/api/wow/character/${this.props.selectedCharName}&${this.props.selectedCharRealm}/reputation/`).then(res => {
            this.setState({
                reputation: res.data.reputation.sort((a, b) => {
                    let x = a.name.toLowerCase();
                    let y = b.name.toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                })
            });
        }).catch(error => {
            console.log('WoW Character Reputation API Error: ', error);
        });
    }

    reputationBarColor = (standing) => {
        if (standing === 7) {
            //Exalted or Best Friend for Tillers
            return '#28a687'
        } else if (standing === 6 || standing === 5 || standing === 4) {
            //Revered, Honored, or Friendly
            return '#0f9601'
        } else if (standing === 3) {
            //Neutral
            return '#edba03'
        } else if (standing === 2) {
            //Unfriendly
            return '#cc3609'
        } else if (standing === 1) {
            //Acquaintance
            return '#edba03'
        } else if (standing === 0) {
            //Hated
            return '#d90e03'
        } else {
            return '#fff'
        }
    }

    reputationStanding = (standing) => {
        if (standing === 7) {
            return 'Exalted'
        } else if (standing === 6) {
            return 'Revered'
        } else if (standing === 5) {
            return 'Honored'
        } else if (standing === 4) {
            return 'Friendly'
        } else if (standing === 3) {
            return 'Neutral'
        } else if (standing === 2) {
            return 'Unfriendly'
        } else if (standing === 1) {
            return 'Acquaintance'
        } else if (standing === 0) {
            return 'Hated'
        } else {
            return 'Unknown'
        }
    }

    reputationBarBuilder = (obj) => {
        return <div key={obj.id} className="flex-row reputation-row">
            <div className="reputation-name">
                {obj.name}
            </div>
            <a href={`https://www.wowhead.com/faction=${obj.id}`} target="_blank" rel="noopener noreferrer">
                <img src="https://res.cloudinary.com/complexityguild/image/upload/v1550396606/site/icons/wowhead_32.png" alt={`${obj.name} on Wowhead`} width='20' height='20' />
            </a>
            <div className="reputation-bar">
                <ProgressBar
                    current={obj.value}
                    remaining={obj.max - obj.value}
                    height={'17px'}
                    bgColor={this.reputationBarColor(obj.standing)}
                    fontSize={'.85rem'}
                />
            </div>
            <div className="reputation-standing" style={{ color: `${this.reputationBarColor(obj.standing)}` }}>{this.reputationStanding(obj.standing)}</div>
        </div>
    }

    render() {
        return (
            <div className="selected-category-container char-info-overflow">
                {this.state.reputation.length > 0 ?
                    this.state.reputation.map(obj => {
                        if (obj.name !== 'Alliance' && obj.name !== 'Horde') {
                            return this.reputationBarBuilder(obj);
                        } else {
                            return null
                        }
                    })
                    :
                    <div className="lds-roller">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                }
            </div>
        )
    }
}

export default CharReputation