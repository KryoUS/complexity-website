import React, { Component } from 'react';
import Loader from '../Loader';
import './Bloodmallet.css';

const dataTypes = [
    {
        type: 'trinkets',
        name: 'Trinkets'
    },
    {
        type: 'azerite_traits_stacking',
        name: 'Trait Stacking'
    },
    {
        type: 'azerite_traits_itemlevel',
        name: 'Trait iLevel'
    },
    {
        type: 'essences',
        name: 'Essences'
    },
    {
        type: 'essence_combinations',
        name: 'Essence Combinations'
    },
    {
        type: 'azerite_items_chest',
        name: 'Trait Chest'
    },
    {
        type: 'azerite_items_head',
        name: 'Trait Head'
    },
    {
        type: 'azerite_items_shoulders',
        name: 'Trait Shoulder'
    },
    {
        type: 'races',
        name: 'Race'
    },
];

const tierTypes = [
    {
        type: 3,
        name: 'Outer Traits'
    },
    {
        type: 2,
        name: 'Inner Traits'
    },
];

const fightTypes = [
    {
        type: 'patchwerk',
        name: 'Patchwerk'
    },
    {
        type: 'hecticaddcleave',
        name: 'Hectic Cleave'
    }
]

class Bloodmallet extends Component {
    constructor() {
        super();

        this.state = {
            bloodMalletType: 'trinkets',
            bloodMalletAzeriteTier: 3,
            bloodMalletFightStyle: 'patchwerk',
        }
    };

    selectedButton = (button) => {
        this.setState({ bloodMalletType: button}, () => {
            this.props.bloodMalletLoad();
        });
    };

    tierButton = (button) => {
        this.setState({ bloodMalletAzeriteTier: button}, () => {
            this.props.bloodMalletLoad();
        });
    };

    fightButton = (button) => {
        this.setState({ bloodMalletFightStyle: button}, () => {
            this.props.bloodMalletLoad();
        });
    };

    componentDidMount = () => {
        this.props.bloodMalletLoad();
    };

    render() {
        return (
            <div style={{width: '100%'}}>
                <div className="flex-row flex-center flex-wrap char-button-container">
                    {dataTypes.map(button => {
                        return this.state.bloodMalletType === button.type ?
                            <div className='button-border' key={button.type}>
                                <div className='button-text' id='button-selected'>{button.name}</div>
                            </div>
                            :
                            <div className='button-border' key={button.type} onClick={() => this.selectedButton(button.type)}>
                                <div className='button-text'>{button.name}</div>
                            </div>
                    })}
                </div>
                <div className="gradient-line-purple" />
                <div className="flex-row flex-center flex-wrap char-button-container">
                    {fightTypes.map(button => {
                        return this.state.bloodMalletFightStyle === button.type ?
                            <div className='button-border' key={button.type}>
                                <div className='button-text' id='button-selected'>{button.name}</div>
                            </div>
                            :
                            <div className='button-border' key={button.type} onClick={() => this.fightButton(button.type)}>
                                <div className='button-text'>{button.name}</div>
                            </div>
                    })}
                    {(this.state.bloodMalletType === 'azerite_traits_itemlevel' || this.state.bloodMalletType === 'azerite_traits_stacking') &&
                        tierTypes.map(button => {
                            return this.state.bloodMalletAzeriteTier === button.type ?
                                <div className='button-border' key={button.type}>
                                    <div className='button-text' id='button-selected'>{button.name}</div>
                                </div>
                                :
                                <div className='button-border' key={button.type} onClick={() => this.tierButton(button.type)}>
                                    <div className='button-text'>{button.name}</div>
                                </div>
                        })
                    }
                </div>
                <div className="gradient-line-purple" />
                {!this.props.chartLoaded && <div style={{ height: '100%', width: '100%' }}><Loader /></div>}
                <div
                    style={{ height: !this.props.chartLoaded && '0px' }}
                    id="bloodMalletChart"
                    className="bloodmallet_chart"
                    data-bloodmallet="chart"
                    data-wow-class={this.props.selectedCharClass}
                    data-wow-spec={this.props.selectedCharSpec}
                    data-type={this.state.bloodMalletType}
                    data-azerite-tier={this.state.bloodMalletAzeriteTier}
                    data-fight-style={this.state.bloodMalletFightStyle}
                    data-entries={7}
                    data-background-color='rgba(17, 11, 40, 0)'
                    data-font-color={this.props.bloodMalletFontColor}
                >Loading...</div>
            </div>
        )
    }
}

export default Bloodmallet