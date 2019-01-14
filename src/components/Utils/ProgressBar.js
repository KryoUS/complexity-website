import React, { Component } from 'react';
import './ProgressBar.css';

export default class ProgressBar extends Component {

    percentage = (current, remaining) => {
        return Math.round(((current/(current+remaining)) * 100) * 100) / 100
    }

    render() {
        let {current, remaining, height, bgColor, fontSize} = this.props;
        return (
            <div className="progress-bar" style={{height: height}}>
                <div className="progress-internal" style={{width: `${this.percentage(current, remaining)}%`, backgroundColor: bgColor}} >
                    <div className="progress-text" style={{fontSize}}>{current}/{current + remaining} ({this.percentage(current, remaining)}%)</div>
                </div>
            </div>
        )
    }
}