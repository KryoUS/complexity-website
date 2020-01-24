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
                    plusFour: 'Bolstering',
                    plusSeven: 'Grievous',                    
                    type: 'Awakened'
                },
                {
                    week: 2,
                    baseAffix: 'Tyrannical',
                    plusFour: 'Raging',
                    plusSeven: 'Explosive',                    
                    type: 'Awakened'
                },
                {
                    week: 3,
                    baseAffix: 'Fortified',
                    plusFour: 'Sanguine',
                    plusSeven: 'Grievous',                    
                    type: 'Awakened'
                },
                {
                    week: 4,
                    baseAffix: 'Tyrannical',
                    plusFour: 'Teeming',
                    plusSeven: 'Volcanic',                    
                    type: 'Awakened'
                },
                {
                    week: 5,
                    baseAffix: 'Fortified',
                    plusFour: 'Bolstering',
                    plusSeven: 'Skittish',                  
                    type: 'Awakened'
                },
                {
                    week: 6,
                    baseAffix: 'Tyrannical',
                    plusFour: 'Bursting',
                    plusSeven: 'Necrotic',
                    type: 'Awakened'
                },
                {
                    week: 7,
                    baseAffix: 'Fortified',
                    plusFour: 'Sanguine',
                    plusSeven: 'Quaking',
                    type: 'Awakened'
                },
                {
                    week: 8,
                    baseAffix: 'Tyrannical',
                    plusFour: 'Bolstering',
                    plusSeven: 'Explosive',
                    type: 'Awakened'
                },
                {
                    week: 9,
                    baseAffix: 'Fortified',
                    plusFour: 'Bursting',
                    plusSeven: 'Volcanic',
                    type: 'Awakened'
                },
                {
                    week: 10,
                    baseAffix: 'Tyrannical',
                    plusFour: 'Raging',
                    plusSeven: 'Necrotic',
                    type: 'Awakened'
                },
                {
                    week: 11,
                    baseAffix: 'Fortified',
                    plusFour: 'Teeming',
                    plusSeven: 'Quaking',
                    type: 'Awakened'
                },
                {
                    week: 12,
                    baseAffix: 'Tyrannical',
                    plusFour: 'Bursting',
                    plusSeven: 'Skittish',
                    type: 'Awakened'
                },
                
            ],
            usMythicAffixes: {},
            seasonalAffix: ''
        }
    }
    
    componentDidMount = () => {
        axios.get('/api/raiderio/mythicaffixes').then(res => {
            this.setState({ usMythicAffixes: res.data, seasonalAffix: res.data.affix_details[3].name });
            console.log(this.props);
        }).catch(raiderIOMythicAffixesError => {
            this.props.infoModal(true, 'Oops!', "We tried to get the Mythic+ affixes for the week but couldn't. Please exercise extreme caution when entering dungeons for now.", 'OK');
        });
    }

    affixId = (affixName) => {
        return wowheadAffixData[affixName].id;
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