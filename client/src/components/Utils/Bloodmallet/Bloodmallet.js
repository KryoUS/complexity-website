import React, { Component } from 'react';
import Loader from '../Loader';
import './Bloodmallet.css';

const dataTypes = [
    {
        type: 'trinkets',
        name: 'Trinkets'
    },
    {
        type: 'legendaries',
        name: 'Legendaries'
    },
    {
        type: 'soul_binds',
        name: 'Soul Binds'
    },
    {
        type: 'talents',
        name: 'Talents'
    },
    {
        type: 'races',
        name: 'Race'
    },
];

const fightTypes = [
    {
        type: 'castingpatchwerk',
        name: 'Patchwerk'
    },
    {
        type: 'hecticaddcleave',
        name: 'Hectic Cleave'
    }
];

const covenantTypes = [
    {
        type: 'Kyrian',
        name: 'Kyrian'
    },
    {
        type: 'Necrolord',
        name: 'Necrolord'
    },
    {
        type: 'Night Fae',
        name: 'Night Fae'
    },
    {
        type: 'Venthyr',
        name: 'Venthyr'
    },
];

class Bloodmallet extends Component {
    constructor() {
        super();

        this.state = {
            bloodMalletType: 'trinkets',
            bloodMalletConduitRank: 7,
            bloodMalletFightStyle: 'castingpatchwerk',
            bloodMalletCovenant: 'Kyrian',
        }
    };

    selectedButton = (button) => {
        this.setState({ bloodMalletType: button}, () => {
            this.props.bloodMalletLoad();
        });
    };

    covenantButton = (button) => {
        this.setState({ bloodMalletCovenant: button}, () => {
            this.props.bloodMalletLoad();
        });
    };

    bloodMalletConduitRank = (button) => {
        this.setState({ bloodMalletConduitRank: button}, () => {
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
            <div style={{width: '95%'}}>
                <div className="flex-row flex-center flex-wrap char-button-container">
                    {covenantTypes.map(button => {
                        return this.state.bloodMalletCovenant === button.type ?
                            <div className='button-border' key={button.type}>
                                <div className='button-text' id='button-selected'>{button.name}</div>
                            </div>
                            :
                            <div className='button-border' key={button.type} onClick={() => this.covenantButton(button.type)}>
                                <div className='button-text'>{button.name}</div>
                            </div>
                    })}
                </div>
                <div className="gradient-line-purple" />
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
                    data-conduit-rank={this.state.bloodMalletConduitRank}
                    data-covenant={this.state.bloodMalletCovenant}
                    data-renown="35"
                    data-chart-mode="soulbinds"
                    data-chart-engine="highcharts"
                    data-tooltip-engine="wowhead"
                    data-fight-style={this.state.bloodMalletFightStyle}
                    data-entries={300}
                    data-background-color='rgba(17, 11, 40, 0)'
                    data-font-color={this.props.bloodMalletFontColor}
                >Loading...</div>
            </div>
        )
    }
}

export default Bloodmallet