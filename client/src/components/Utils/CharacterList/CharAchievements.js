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
            this.setState({ charAchievements: res.data })
        }).catch(error => {
            console.log('WoW Character Achievements API Error: ', error);
        });
    }

    qualityColor = (quality) => {
        switch (quality) {

            case 1:
                return '#ffffff'

            case 2:
                return '#02ff4e'

            case 3:
                return '#0281ff'

            case 4:
                return '#c600ff'

            case 5:
                return '#ff8002'

            case 6:
                return '#e5cc80'

            default:
                return null
        }
    }

    render() {
        return (
            <div className="selected-category-container char-info-overflow">
                {this.state.charAchievements.length <= 0 ?
                    <div class="lds-roller">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    :
                    <div className="achievement-category-container animate-right">
                        {this.state.charAchievements.map((obj, index) => {
                            let category = Object.keys(obj)[0];
                            return <Collapsible key={category} trigger={<div className="achievement-category">{category}</div>} lazyRender={true}>
                                {obj[category].map(achieveObj => {
                                    const wowheadAchievement = `who=${this.props.selectedCharName}&when=${achieveObj.completedTimestamp}`;
                                    const link = `https://www.wowhead.com/achievement=${achieveObj.id}`;
                                    return <div key={achieveObj.id} className="achievement-content-container" style={{ justifyContent: 'space-between', width: '100%' }}>
                                        <a className="achievement-content" data-wowhead={wowheadAchievement} href={link} target="_blank" rel="noopener noreferrer">
                                            {achieveObj.icon ?
                                                <div style={{
                                                    background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/${achieveObj.icon}.png)`,
                                                    width: '15px',
                                                    height: '15px',
                                                    backgroundSize: '15px'
                                                }} />
                                                :
                                                <div style={{
                                                    background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/INV_Misc_QuestionMark.png)`,
                                                    width: '15px',
                                                    height: '15px',
                                                    backgroundSize: '15px'
                                                }} />
                                            } <div>{achieveObj.title}</div>
                                        </a>
                                        {achieveObj.rewardItems.length > 0 &&
                                            <div className="flex-row" style={{ width: '50%' }}>
                                                <div className="flex-row">
                                                    <div>Reward: </div>
                                                    <a key={achieveObj.rewardItems[0].id} className="achievement-content" data-wowhead={`item=${achieveObj.rewardItems[0].id}`} href={`https://www.wowhead.com/item=${achieveObj.rewardItems[0].id}`} target="_blank" rel="noopener noreferrer">
                                                        {achieveObj.rewardItems[0].icon ?
                                                            <div style={{
                                                                background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/${achieveObj.rewardItems[0].icon}.png)`,
                                                                width: '15px',
                                                                height: '15px',
                                                                backgroundSize: '15px'
                                                            }} />
                                                            :
                                                            <div style={{
                                                                background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/INV_Misc_QuestionMark.png)`,
                                                                width: '15px',
                                                                height: '15px',
                                                                backgroundSize: '15px'
                                                            }} />
                                                        } <div style={{ color: `${this.qualityColor(achieveObj.rewardItems[0].quality)}` }}> {achieveObj.rewardItems[0].name}</div>
                                                    </a>
                                                </div>
                                            </div>
                                        }
                                    </div>
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