import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { infoModal } from '../../ducks/reducer';

//TODO: This needs to be pulled from DB and not hard-coded
const wowheadAffixData = {
    Fortified: {
        id: 10
    },
    Tyrannical: {
        id: 9
    },
    Teeming: {
        id: 5
    },
    Raging: {
        id: 6
    },
    Bolstering: {
        id: 7
    },
    Sanguine: {
        id: 8
    },
    Bursting: {
        id: 11
    },
    Necrotic: {
        id: 4
    },
    Skittish: {
        id: 2
    },
    Volcanic: {
        id: 3
    },
    Explosive: {
        id: 13
    },
    Quaking: {
        id: 14
    },
    Grievous: {
        id: 12
    },
    Reaping: {
        id: 117
    },
    Beguiling: {
        id: 119
    },
    Awakened: {
        id: 120
    },
    Prideful: {
        id: 121
    },
    Inspiring: {
        id: 122
    },
    Spiteful: {
        id: 123
    },
    Storming: {
        id: 124
    },
    Tormented: {
        id: 128
    }
}

class MythicPlusAffixes extends React.Component {
    constructor() {
        super();

        this.state = {
            affixes: [
                {
                    week: 1,
                    baseAffix: 'Fortified',
                    plusFour: 'Bursting',
                    plusSeven: 'Storming',                    
                    type: 'Tormented'
                },
                {
                    week: 2,
                    baseAffix: 'Tyrannical',
                    plusFour: 'Raging',
                    plusSeven: 'Volcanic',                    
                    type: 'Tormented'
                },
                {
                    week: 3,
                    baseAffix: 'Fortified',
                    plusFour: 'Inspiring',
                    plusSeven: 'Grievous',                    
                    type: 'Tormented'
                },
                {
                    week: 4,
                    baseAffix: 'Tyrannical',
                    plusFour: 'Spiteful',
                    plusSeven: 'Necrotic',                    
                    type: 'Tormented'
                },
                {
                    week: 5,
                    baseAffix: 'Fortified',
                    plusFour: 'Bolstering',
                    plusSeven: 'Quaking',                  
                    type: 'Tormented'
                },
                {
                    week: 6,
                    baseAffix: 'Tyrannical',
                    plusFour: 'Sanguine',
                    plusSeven: 'Storming',
                    type: 'Tormented'
                },
                {
                    week: 7,
                    baseAffix: 'Fortified',
                    plusFour: 'Raging',
                    plusSeven: 'Explosive',
                    type: 'Tormented'
                },
                {
                    week: 8,
                    baseAffix: 'Tyrannical',
                    plusFour: 'Bursting',
                    plusSeven: 'Volcanic',
                    type: 'Tormented'
                },
                {
                    week: 9,
                    baseAffix: 'Fortified',
                    plusFour: 'Spiteful',
                    plusSeven: 'Grievous',
                    type: 'Tormented'
                },
                {
                    week: 10,
                    baseAffix: 'Tyrannical',
                    plusFour: 'Inspiring',
                    plusSeven: 'Quaking',
                    type: 'Tormented'
                },
                {
                    week: 11,
                    baseAffix: 'Fortified',
                    plusFour: 'Sanguine',
                    plusSeven: 'Necrotic',
                    type: 'Tormented'
                },
                {
                    week: 12,
                    baseAffix: 'Tyrannical',
                    plusFour: 'Bolstering',
                    plusSeven: 'Explosive',
                    type: 'Tormented'
                },
                
            ],
            usMythicAffixes: {},
            seasonalAffix: ''
        }
    }
    
    componentDidMount = () => {
        axios.get('/api/raiderio/mythicaffixes').then(res => {
            this.setState({ usMythicAffixes: res.data, seasonalAffix: res.data.affix_details[3].name });
        }).catch(raiderIOMythicAffixesError => {
            this.props.infoModal(true, 'Oops!', "We tried to get the Mythic+ affixes for the week but couldn't. Please exercise extreme caution when entering dungeons for now.", 'OK');
        });
    }

    affixId = (affixName) => {
        if (wowheadAffixData[affixName]) {
            return wowheadAffixData[affixName].id;
        } else {
            return 999;
        }
    }

    affixWowheadURL = (affixName) => {
        return `https://www.wowhead.com/affix=${this.affixId(affixName)}`
    }

    affixes = (obj) => {
        if (obj.baseAffix === this.state.usMythicAffixes.affix_details[0].name && obj.plusFour === this.state.usMythicAffixes.affix_details[1].name && obj.plusSeven === this.state.usMythicAffixes.affix_details[2].name) {
            return <div key={obj.week} className="affix-row" id="affix-current-week">
                <a className="affix" href={this.affixWowheadURL(obj.baseAffix)} data-wowhead={`affix=${this.affixId(obj.baseAffix)}`} target="_blank"  rel="noopener noreferrer">{obj.baseAffix}</a>
                <a className="affix" href={this.affixWowheadURL(obj.plusFour)} data-wowhead={`affix=${this.affixId(obj.plusFour)}`} target="_blank"  rel="noopener noreferrer">{obj.plusFour}</a>
                <a className="affix" href={this.affixWowheadURL(obj.plusSeven)} data-wowhead={`affix=${this.affixId(obj.plusSeven)}`} target="_blank"  rel="noopener noreferrer">{obj.plusSeven}</a>
                <a className="affix" href={this.affixWowheadURL(this.state.seasonalAffix)} data-wowhead={`affix=${this.affixId(this.state.seasonalAffix)}`} target="_blank"  rel="noopener noreferrer">{obj.type}</a>
            </div>
        } else {
            return <div key={obj.week} className="affix-row">
                <a className="affix" href={this.affixWowheadURL(obj.baseAffix)} data-wowhead={`affix=${this.affixId(obj.baseAffix)}`} target="_blank"  rel="noopener noreferrer">{obj.baseAffix}</a>
                <a className="affix" href={this.affixWowheadURL(obj.plusFour)} data-wowhead={`affix=${this.affixId(obj.plusFour)}`} target="_blank"  rel="noopener noreferrer">{obj.plusFour}</a>
                <a className="affix" href={this.affixWowheadURL(obj.plusSeven)} data-wowhead={`affix=${this.affixId(obj.plusSeven)}`} target="_blank"  rel="noopener noreferrer">{obj.plusSeven}</a>
                <a className="affix" href={this.affixWowheadURL(this.state.seasonalAffix)} data-wowhead={`affix=${this.affixId(this.state.seasonalAffix)}`} target="_blank"  rel="noopener noreferrer">{obj.type}</a>
            </div>
        }
    }

    render() {
        return (
            this.state.usMythicAffixes.affix_details ? 
                <div className="affixes">
                        Mythic+ Affixes: 
                        {this.state.usMythicAffixes.affix_details.map(affix => {
                            return <a key={affix.name} href={affix.wowhead_url} data-wowhead={`affix=${affix.id}`} target="_blank"  rel="noopener noreferrer">{affix.name}</a>
                        })}
                        <div className="affix-schedule-container">
                            <div className="affix-schedule">
                            <div className="affix-row" id="affix-title">Affix Weekly Schedule</div>
                                <div className="affix-row">
                                    <div className="affix" id="affix-subtitle">+2</div>
                                    <div className="affix" id="affix-subtitle">+4</div>
                                    <div className="affix" id="affix-subtitle">+7</div>
                                    <div className="affix" id="affix-subtitle">Seasonal</div>
                                </div>
                                {this.state.affixes.map(obj => {
                                    return this.affixes(obj);
                                })}
                            </div>
                        </div>
                </div>
            :
            null
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modalOpen: state.modalOpen,
        modalTitle: state.modalTitle,
        modalMessage: state.modalMessage,
        modalButton: state.modalButton
    }
}

export default connect(mapStateToProps, { infoModal })(MythicPlusAffixes);