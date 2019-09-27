import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'moment';
import Functions from '../Functions';
import Loader from '../../Utils/Loader';

class CharRaidbots extends Component {
    constructor() {
        super();

        this.state = {
            raidbotLogs: []
        }
    }

    componentDidMount = () => {
        axios.put(`/api/raidbots/character/${this.props.selectedCharName.toLowerCase()}&${this.props.selectedCharRealm.toLowerCase()}`).then(res => {
            this.setState({ raidbotLogs: res.data });
        }).catch(error => {
            console.log('Raidbots Character API Error: ', error);
        });
    }

    buildItems = (obj) => {
        if (obj) {

            let wowheadData = `item=${obj.id}`;

            if (obj.bonusLists) {
                wowheadData += `&bonus=`;
                obj.bonusLists.forEach((bonus) => {
                    wowheadData += `:${bonus}`
                });
            };

            if (obj.azeriteEmpoweredItem && obj.azeriteEmpoweredItem.azeritePowers) {
                wowheadData += `&azerite-powers=${this.state.className}`;
                obj.azeriteEmpoweredItem.azeritePowers.forEach(power => {
                    wowheadData += `:${power.id}`;
                });
            };

            if (obj.itemLevel) { wowheadData += `&ilvl=${obj.itemLevel}` };
            if (obj.tooltipParams.enchant) { wowheadData += `&ench=${obj.tooltipParams.enchant}` };
            if (obj.tooltipParams.gem0) { wowheadData += `&gems=${obj.tooltipParams.gem0}` };
            if (obj.tooltipParams.gem1) { wowheadData += `:${obj.tooltipParams.gem1}` };
            if (obj.tooltipParams.gem2) { wowheadData += `:${obj.tooltipParams.gem2}` };
            if (obj.tooltipParams.set) {
                wowheadData += `&pcs=`;
                obj.tooltipParams.set.forEach(bonus => {
                    wowheadData += `:${bonus}`
                });
            };

            if (obj.tooltipParams.transmogItem) { wowheadData += `&transmog=${obj.tooltipParams.transmogItem}` };

            return <div className={`flex-row flex-between row-container collected`}>
                <a className="flex-row" style={{ alignItems: 'center' }} data-wowhead={wowheadData} href={`https://www.wowhead.com/${obj.id}`} target="_blank" rel="noopener noreferrer">
                    <div className="row-name" style={{ color: Functions.qualityColor(obj.quality) }}>{obj.name}</div>
                </a>
                <div className="flex-row flex-between">
                    {obj.tooltipParams.gem0 && <a className="flex-row" style={{ alignItems: 'center' }} data-wowhead={wowheadData} href={`https://www.wowhead.com/item=${obj.tooltipParams.gem0}`} target="_blank" rel="noopener noreferrer">
                        <div className="icon25" style={{ background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/inv_misc_gem_01.png) 25px`, backgroundSize: '25px' }} />
                    </a>}
                    {obj.tooltipParams.gem1 && <a className="flex-row" style={{ alignItems: 'center' }} data-wowhead={wowheadData} href={`https://www.wowhead.com/item=${obj.tooltipParams.gem1}`} target="_blank" rel="noopener noreferrer">
                        <div className="icon25" style={{ background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/inv_misc_gem_01.png) 25px`, backgroundSize: '25px' }} />
                    </a>}
                    {obj.tooltipParams.gem2 && <a className="flex-row" style={{ alignItems: 'center' }} data-wowhead={wowheadData} href={`https://www.wowhead.com/item=${obj.tooltipParams.gem2}`} target="_blank" rel="noopener noreferrer">
                        <div className="icon25" style={{ background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/inv_misc_gem_01.png) 25px`, backgroundSize: '25px' }} />
                    </a>}
                    {obj.tooltipParams.enchant && <a className="flex-row" style={{ alignItems: 'center' }} data-wowhead={wowheadData} href={`https://www.wowhead.com/item=${obj.id}`} target="_blank" rel="noopener noreferrer">
                        <div className="icon25" style={{ background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/trade_engraving.png) 25px`, backgroundSize: '25px' }} />
                    </a>}
                    <div className="row-name">{obj.itemLevel}</div>
                </div>
            </div>
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="selected-category-container char-info-overflow">
                {this.state.raidbotLogs.length < 1 ?
                    <Loader />
                    :
                    this.state.raidbotLogs.map((obj, index) => {
                        return <div key={`raidbots${index}`}>
                            <div className="flex-row flex-between">
                                <div>{Moment(obj.created_at).format('MMMM Do YYYY, h:mm:ss a')}</div>
                                <div>{obj.body.simbot.fightStyle}</div>
                                <div>{obj.body.simbot.publicTitle}</div>
                                <div>{Math.round(obj.body.sim.statistics.raid_dps.mean * 100) / 100} DPS</div>
                                <div>{obj.body.sim.players[0].specialization}</div>
                            </div>
                            {/* <div>{this.buildItems(obj.body.simbot.meta.rawFormData.character.items.head)}</div>
                            <div>{this.buildItems(obj.body.simbot.meta.rawFormData.character.items.neck)}</div>
                            <div>{this.buildItems(obj.body.simbot.meta.rawFormData.character.items.shoulder)}</div>
                            <div>{this.buildItems(obj.body.simbot.meta.rawFormData.character.items.back)}</div>
                            <div>{this.buildItems(obj.body.simbot.meta.rawFormData.character.items.chest)}</div>
                            <div>{this.buildItems(obj.body.simbot.meta.rawFormData.character.items.wrist)}</div>
                            <div>{this.buildItems(obj.body.simbot.meta.rawFormData.character.items.hands)}</div>
                            <div>{this.buildItems(obj.body.simbot.meta.rawFormData.character.items.belt)}</div>
                            <div>{this.buildItems(obj.body.simbot.meta.rawFormData.character.items.legs)}</div>
                            <div>{this.buildItems(obj.body.simbot.meta.rawFormData.character.items.feet)}</div>
                            <div>{this.buildItems(obj.body.simbot.meta.rawFormData.character.items.finger1)}</div>
                            <div>{this.buildItems(obj.body.simbot.meta.rawFormData.character.items.finger2)}</div>
                            <div>{this.buildItems(obj.body.simbot.meta.rawFormData.character.items.trinket1)}</div>
                            <div>{this.buildItems(obj.body.simbot.meta.rawFormData.character.items.trinket2)}</div>
                            <div>{this.buildItems(obj.body.simbot.meta.rawFormData.character.items.mainHand)}</div>
                            <div>{obj.body.simbot.meta.rawFormData.character.items.offHand && this.buildItems(obj.body.simbot.meta.rawFormData.character.items.offHand)}</div> */}
                        </div>
                    })
                }
            </div>
        )
    }
}

export default CharRaidbots