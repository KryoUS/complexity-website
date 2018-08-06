import React, { Component } from 'react';
import './Achievement.css';

export default class Achievement extends Component {
    render () {
        const { news } = this.props;
        console.log(news);
        const background = 'https://res.cloudinary.com/complexityguild/image/upload/v1533522105/wow/achievements/UI-Achievement-Alert-Background.png';
        const frame = 'https://res.cloudinary.com/complexityguild/image/upload/v1533529660/wow/achievements/UI-Achievement-IconFrame.png';
        const link = `https://www.wowhead.com/achievement=${news.achievement.id}`;
        const wowhead = `who=${news.character}&amp;when=${news.timestamp}`;
        const icon = `https://res.cloudinary.com/complexityguild/image/upload/v1533521204/wow/icons/${news.achievement.icon}.png`;

        return (
            <a className="link" href={link} target="_blank" data-wowhead={wowhead}>
                <div className="achievement-row"  style={{backgroundImage: `url('${background}')`}}>
                    <div className="achievement-icon" style={{backgroundImage: `url('${icon}')`}}>
                        <div className="achievement-frame" style={{backgroundImage: `url('${frame}')`}} />
                    </div>
                    <div className="achievement-title">{news.achievement.title}</div>
                </div>
            </a>
        )
    }
}