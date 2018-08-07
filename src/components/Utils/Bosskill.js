import React, { Component } from 'react';
import './Bosskill.css';

export default class Bosskill extends Component {
    render () {
        const { bosskill, character } = this.props;
        if (bosskill.achievement.id === 4576) {
            bosskill.achievement.id = 4637
            bosskill.achievement.title = 'Lich King kills (Heroic Icecrown 25 player)'
        }
        console.log(bosskill);
        const link = `https://www.wowhead.com/achievement=${bosskill.achievement.id}`;
        const icon = `https://res.cloudinary.com/complexityguild/image/upload/v1533521204/wow/icons/${bosskill.achievement.icon}.png`;

        return (
            <a className="bosskill-link" href={link} target="_blank">
                <div className="bosskill-container">
                    <img className="bosskill-icon" src={icon} alt={bosskill.achievement.title}/>
                    <div className="bosskill-text-container">
                        <div className="bosskill-title">{bosskill.achievement.title}</div>
                    </div>
                </div>
            </a>
        )
    }
}