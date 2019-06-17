import React, { Component } from 'react';
import axios from 'axios';
import ProgressBar from '../ProgressBar';
import './CharPVP.css';

class CharPVP extends Component {
    constructor() {
        super();

        this.state = {
            pvp: {}
        }
    }

    componentDidMount = () => {
        axios.put(`/api/wow/character/${this.props.selectedCharName}&${this.props.selectedCharRealm}/pvp/`).then(res => {
            this.setState({ pvp: res.data.pvp });
        }).catch(error => {
            console.log('WoW Character Professions API Error: ', error);
        });
    }

    pvpRank = (rating) => {
        if (rating < 1400) {
            return 'Unranked'
        } else if (rating < 1600) {
            return 'Combatant'
        } else if (rating < 1800) {
            return 'Challenger'
        } else if (rating < 2100) {
            return 'Rival'
        } else if (rating < 2400) {
            return 'Duelist'
        } else if (rating >= 2400) {
            return 'Elite'
        } else {
            return 'Unknown'
        }
    }

    progressBarBuilder = (rating) => {
        return <ProgressBar 
                current={rating} 
                remaining={2400 - rating} 
                height={'17px'}
                bgColor={'#edba03'}
                fontSize={'13px'}
        />
    }

    pvpCardBuilder = (obj, title) => {
        return <div className="pvp-card">
            <div className="pvp-card-title">
                {title} - {obj.rating} ({this.pvpRank(obj.rating)})
                <div className="pvp-card-bar">{this.progressBarBuilder(obj.rating)}</div>
            </div>
            <div className="flex-row pvp-card-row">
                <div className="flex-column pvp-card-column">
                    <div>Weekly Played: {obj.weeklyPlayed}</div>
                    <div>Weekly Won: {obj.weeklyWon}</div>
                    <div>Weekly Lost: {obj.weeklyLost}</div>
                </div>
                <div className="flex-column pvp-card-column">
                    <div>Season Played: {obj.seasonPlayed}</div>
                    <div>Season Won: {obj.seasonWon}</div>
                    <div>Season Lost: {obj.seasonLost}</div>
                </div>
            </div>
        </div>
    }

    render () {
        return (
            <div className="selected-category-container char-info-overflow">
                {this.state.pvp.brackets ? 
                    <div className="flex-row flex-end flex-wrap animate-right">
                        {this.pvpCardBuilder(this.state.pvp.brackets.ARENA_BRACKET_2v2, 'Rated 2v2')}
                        {this.pvpCardBuilder(this.state.pvp.brackets.ARENA_BRACKET_3v3, 'Rated 3v3')}
                        {this.pvpCardBuilder(this.state.pvp.brackets.ARENA_BRACKET_RBG, 'Rated RBG')}
                        {this.pvpCardBuilder(this.state.pvp.brackets.ARENA_BRACKET_2v2_SKIRMISH, 'Skirmish 2v2')}
                    </div>
                : 
                    <div className="loader" style={{left: '85vw'}}/>
                }
            </div>
        )
    }
}

export default CharPVP