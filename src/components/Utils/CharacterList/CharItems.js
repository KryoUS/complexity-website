import React, { Component } from 'react';
import axios from 'axios';

class CharItems extends Component {
    constructor() {
        super();

        this.state = {
            className: '',
            items: {},
            loaded: false
        }
    }

    componentDidMount = () => {
        axios.put(`/api/wow/character/${this.props.selectedCharName}&${this.props.selectedCharRealm}/items/`).then(res => {
            this.setState({className: res.data.className, items: res.data.items, loaded: true});
            console.log(res.data)
        }).catch(error => {
            console.log('WoW Character Items API Error: ', error);
        });
    }

    buildItems = (obj) => {
        let wowheadData = `item=${obj.id}`;

        if (obj.bonusLists) {
            wowheadData += `&bonus=`;
            obj.bonusLists.forEach((bonus) => {
                wowheadData += `:${bonus}`
            });
        };

        if (obj.azeriteEmpoweredItem.azeritePowers) {
            wowheadData += `&azerite-powers=${this.state.className}`;
            obj.azeriteEmpoweredItem.azeritePowers.forEach(power => {
                wowheadData += `:${power.id}`;
            });
        };

        if (obj.itemLevel) {wowheadData += `&ilvl=${obj.itemLevel}`};
        if (obj.tooltipParams.enchant) {wowheadData += `&ench=${obj.tooltipParams.enchant}`};
        if (obj.tooltipParams.gem0) {wowheadData += `&gems=${obj.tooltipParams.gem0}`};
        if (obj.tooltipParams.gem1) {wowheadData += `:${obj.tooltipParams.gem1}`};
        if (obj.tooltipParams.gem2) {wowheadData += `:${obj.tooltipParams.gem2}`};
        if (obj.tooltipParams.set) {
            wowheadData += `&pcs=`;
            obj.tooltipParams.set.forEach(bonus => {
                wowheadData += `:${bonus}`
            });
        };

        if (obj.tooltipParams.transmogItem) {wowheadData += `&transmog=${obj.tooltipParams.transmogItem}`};

        return <div className={`flex-row flex-between row-container collected`}>
            <a className="flex-row" style={{alignItems: 'center'}} data-wowhead={wowheadData} href={`https://www.wowhead.com/${obj.id}`} target="_blank" rel="noopener noreferrer">
                <div className ="icon25" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/${obj.icon}.png) 25px`, backgroundSize: '25px'}} />
                <div className="row-name" style={{color: obj.qualityColor}}>{obj.name}</div>
            </a>
            <div className="flex-row flex-between">
                {obj.tooltipParams.gem0 && <a className="flex-row" style={{alignItems: 'center'}} data-wowhead={wowheadData} href={`https://www.wowhead.com/item=${obj.tooltipParams.gem0}`} target="_blank" rel="noopener noreferrer">
                    <div className ="icon25" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/inv_misc_gem_01.png) 25px`, backgroundSize: '25px'}} />
                </a>}
                {obj.tooltipParams.gem1 && <a className="flex-row" style={{alignItems: 'center'}} data-wowhead={wowheadData} href={`https://www.wowhead.com/item=${obj.tooltipParams.gem1}`} target="_blank" rel="noopener noreferrer">
                    <div className ="icon25" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/inv_misc_gem_01.png) 25px`, backgroundSize: '25px'}} />
                </a>}
                {obj.tooltipParams.gem2 && <a className="flex-row" style={{alignItems: 'center'}} data-wowhead={wowheadData} href={`https://www.wowhead.com/item=${obj.tooltipParams.gem2}`} target="_blank" rel="noopener noreferrer">
                    <div className ="icon25" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/inv_misc_gem_01.png) 25px`, backgroundSize: '25px'}} />
                </a>}
                {obj.tooltipParams.enchant && <a className="flex-row" style={{alignItems: 'center'}} data-wowhead={wowheadData} href={`https://www.wowhead.com/item=${obj.id}`} target="_blank" rel="noopener noreferrer">
                    <div className ="icon25" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/trade_engraving.png) 25px`, backgroundSize: '25px'}} />
                </a>}
                <div className="row-name">{obj.itemLevel}</div>
            </div>
        </div>
    }

    render () {
        return (
            <div>
                {this.state.loaded === false ?
                    <div className="loader" style={{left: '85vw'}} />
                :
                    <div className="animate-right" style={{width: '95%'}}>
                        <div className="char-info-overflow" style={{height: '80vh', width: '100%'}}>
                            {this.state.items.head && this.buildItems(this.state.items.head)}
                            {this.state.items.neck && this.buildItems(this.state.items.neck)}
                            {this.state.items.shoulder && this.buildItems(this.state.items.shoulder)}
                            {this.state.items.back && this.buildItems(this.state.items.back)}
                            {this.state.items.chest && this.buildItems(this.state.items.chest)}
                            {this.state.items.wrist && this.buildItems(this.state.items.wrist)}
                            {this.state.items.hands && this.buildItems(this.state.items.hands)}
                            {this.state.items.waist && this.buildItems(this.state.items.waist)}
                            {this.state.items.legs && this.buildItems(this.state.items.legs)}
                            {this.state.items.feet && this.buildItems(this.state.items.feet)}
                            {this.state.items.finger1 && this.buildItems(this.state.items.finger1)}
                            {this.state.items.finger2 && this.buildItems(this.state.items.finger2)}
                            {this.state.items.trinket1 && this.buildItems(this.state.items.trinket1)}
                            {this.state.items.trinket2 && this.buildItems(this.state.items.trinket2)}
                            {this.state.items.mainHand && this.buildItems(this.state.items.mainHand)}
                            {this.state.items.offHand && this.buildItems(this.state.items.offHand)}
                            <div className="flex-row flex-evenly" style={{textAlign: 'center', fontSize: '18px'}}>
                                <div style={{width: '50%'}}>Item Level:{this.state.items.averageItemLevel}</div>
                                <div style={{width: '50%'}}>Item Level Equipped:{this.state.items.averageItemLevelEquipped}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default CharItems