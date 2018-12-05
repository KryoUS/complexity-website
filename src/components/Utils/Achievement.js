import React, { Component } from 'react';
import './Achievement.css';

export default class Achievement extends Component {
    render () {
        const { achievement, character } = this.props;
        const wowhead = `who=${character}&amp;when=${achievement.timestamp}`;
        const link = `https://www.wowhead.com/achievement=${achievement.achievement.id}`;
        const icon = `https://res.cloudinary.com/complexityguild/image/upload/v1533521204/wow/icons/${achievement.achievement.icon}.png`;

        return (
            <a className="achievement-link" href={link} target="_blank" rel="noopener noreferrer" data-wowhead={wowhead}>
                <div className="achievement-container">
                    <img className="achievement-icon" src={icon} alt={achievement.achievement.title}/>
                    <div className="achievement-title">{achievement.achievement.title}</div>
                </div>
            </a>
        )
    }
}