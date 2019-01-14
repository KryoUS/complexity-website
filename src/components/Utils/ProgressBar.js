import React, { Component } from 'react';
import './ProgressBar.css';

export default class ProgressBar extends Component {

    percentage = (current, remaining) => {
        return Math.round(((current/(current+remaining)) * 100) * 100) / 100
    }

    render() {
        let {current, remaining} = this.props;
        return (
            <div className="progress-bar">
                <div className="progress-internal" style={{width: `${this.percentage(current, remaining)}%`}} >
                    <div className="progress-text">{current}/{current + remaining} ({this.percentage(current, remaining)}%)</div>
                </div>
            </div>
        )
    }
}