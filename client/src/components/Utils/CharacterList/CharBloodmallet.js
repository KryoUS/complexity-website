import React, { Component } from 'react';
import Bloodmallet from '../Bloodmallet/Bloodmallet';

class CharBloodmallet extends Component {
    constructor() {
        super();

    };

    render() {
        return (
            <div className="selected-category-container char-info-overflow">
                <Bloodmallet selectedCharClass={this.props.selectedCharClass} selectedCharSpec={this.props.selectedCharSpec} />
            </div>
        )
    }
}

export default CharBloodmallet