import React from 'react';
import axios from 'axios';

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
                    plusFour: 'Sanguine',
                    plusSeven: 'Necrotic',                    
                },
                {
                    week: 2,
                    baseAffix: 'Tyrannical',
                    plusFour: 'Bursting',
                    plusSeven: 'Skittish',                    
                },
                {
                    week: 3,
                    baseAffix: 'Fortified',
                    plusFour: 'Teeming',
                    plusSeven: 'Quaking',                    
                },
                {
                    week: 4,
                    baseAffix: 'Tyrannical',
                    plusFour: 'Raging',
                    plusSeven: 'Necrotic',                    
                },
                {
                    week: 5,
                    baseAffix: 'Fortified',
                    plusFour: 'Sanguine',
                    plusSeven: 'Grievous',                  
                },
                {
                    week: 6,
                    baseAffix: 'Tyrannical',
                    plusFour: 'Bolstering',
                    plusSeven: 'Explosive',
                },
                {
                    week: 7,
                    baseAffix: 'Fortified',
                    plusFour: 'Bursting',
                    plusSeven: 'Volcanic',
                },
                {
                    week: 8,
                    baseAffix: 'Tyrannical',
                    plusFour: 'Raging',
                    plusSeven: 'Volcanic',
                },
                {
                    week: 9,
                    baseAffix: 'Fortified',
                    plusFour: 'Teeming',
                    plusSeven: 'Explosive',
                },
                {
                    week: 10,
                    baseAffix: 'Tyrannical',
                    plusFour: 'Bolstering',
                    plusSeven: 'Grievous',
                },
                
            ],
            usMythicAffixes: {},
            seasonalAffix: ''
        }
    }
    
    componentDidMount = () => {
        axios.get('/api/raiderio/mythicaffixes').then(res => {
            console.log(res.data)
            this.setState({ usMythicAffixes: res.data, seasonalAffix: res.data.affix_details[3].name });
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
                <a className="affix" href={this.affixWowheadURL(this.state.seasonalAffix)} data-wowhead={`affix=${this.affixId(this.state.seasonalAffix)}`} target="_blank"  rel="noopener noreferrer">{this.state.seasonalAffix}</a>
            </div>
        } else {
            return <div key={obj.week} className="affix-row">
                <a className="affix" href={this.affixWowheadURL(obj.baseAffix)} data-wowhead={`affix=${this.affixId(obj.baseAffix)}`} target="_blank"  rel="noopener noreferrer">{obj.baseAffix}</a>
                <a className="affix" href={this.affixWowheadURL(obj.plusFour)} data-wowhead={`affix=${this.affixId(obj.plusFour)}`} target="_blank"  rel="noopener noreferrer">{obj.plusFour}</a>
                <a className="affix" href={this.affixWowheadURL(obj.plusSeven)} data-wowhead={`affix=${this.affixId(obj.plusSeven)}`} target="_blank"  rel="noopener noreferrer">{obj.plusSeven}</a>
                <a className="affix" href={this.affixWowheadURL(this.state.seasonalAffix)} data-wowhead={`affix=${this.affixId(this.state.seasonalAffix)}`} target="_blank"  rel="noopener noreferrer">{this.state.seasonalAffix}</a>
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

export default MythicPlusAffixes;