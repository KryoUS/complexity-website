import React, { Component } from 'react';
import Bloodmallet from '../Bloodmallet/Bloodmallet';

class CharBloodmallet extends Component {
    constructor() {
        super();

        this.state = {
            chartLoaded: false
        };
    };

    bloodMalletLoad = () => {
        this.setState({ chartLoaded: false });
        window.bloodmallet_chart_import();

        let proceed = true;
        const test = document.getElementById('bloodMalletChart');
        const observer = new MutationObserver((mutationsList, observ) => {

            for (let mutation of mutationsList) {
                if (proceed) {
                    if (mutation.type === 'childList') {
                        if (mutation.target.innerHTML === '<tspan>Δ Damage per second</tspan>') {
                            proceed = false;
                            observer.disconnect();
                            this.setState({ chartLoaded: true });
                        };
                    };
                };
            };
        });

        observer.observe(test, { attributes: true, childList: true, subtree: true });
    };

    render() {
        return (
            <div className="selected-category-container char-info-overflow">
                <Bloodmallet
                    selectedCharClass={this.props.selectedCharClass}
                    selectedCharSpec={this.props.selectedCharSpec}
                    chartLoaded={this.state.chartLoaded}
                    bloodMalletLoad={this.bloodMalletLoad}
                />
            </div>
        )
    };
};

export default CharBloodmallet;