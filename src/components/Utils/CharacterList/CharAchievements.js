import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import axios from 'axios';
import './CharAchievements.css';

class CharAchievements extends Component {
    constructor() {
        super();

        this.state = {
            charAchievements: []
        }
    }

    componentDidMount = () => {
        axios.put(`/api/wow/character/${this.props.selectedCharName}&${this.props.selectedCharRealm}/achievements/`).then(res => {
            
            let achievements = [];
            for (let x in res.data) {
                achievements.push({[x]: res.data[x]});
            }
            this.setState({charAchievements: achievements})
        }).catch(error => {
            console.log('WoW Character Achievements API Error: ', error);
        });
    }

    render () {
        return (
            <div className="achievement-container">
                {this.state.charAchievements.length <= 0 ? 
                    <div className="loader" style={{left: '85vw'}}/> 
                : 
                    <div className="achievement-category-container animate-right">
                        {this.state.charAchievements.map((obj, index) => {
                            let category = Object.keys(obj)[0];
                            return <Collapsible key={category} trigger={<div className="achievement-category">{category}</div>}>
                                {obj[category].map(achieveObj => {
                                    const wowhead = `who=${this.props.selectedCharName}&when=${achieveObj.completedTimestamp}`;
                                    const link = `https://www.wowhead.com/achievement=${achieveObj.id}`;
                                    return <a key={achieveObj.id} className="achievement-content" data-wowhead={wowhead} href={link} target="_blank" rel="noopener noreferrer">
                                        {achieveObj.icon ? 
                                            <div style={{
                                                marginLeft: '5px',
                                                background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/${achieveObj.icon}.png)`,
                                                width: '20px',
                                                height: '20px',
                                                backgroundSize: '20px'
                                            }}/>
                                        :
                                            <div style={{
                                                marginLeft: '5px',
                                                background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/INV_Misc_QuestionMark.png)`,
                                                width: '20px',
                                                height: '20px',
                                                backgroundSize: '20px'
                                            }}/>
                                        } <div>{achieveObj.title}</div>
                                    </a>
                                })}
                            </Collapsible>
                        })}
                    </div>
                }
            </div>
        )
    }
}

export default CharAchievements