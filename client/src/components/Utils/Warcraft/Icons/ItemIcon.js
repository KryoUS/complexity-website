import React, { Component } from 'react';

class ItemIcon extends Component {

    wowheadData = (obj) => {

        if (obj.id) {
            //Old Item API

            let wowheadData = `item=${obj.id}`;

            if (obj.bonusLists) {
                wowheadData += `&bonus=`;
                obj.bonusLists.forEach((bonus) => {
                    wowheadData += `:${bonus}`
                });
            };

            if (obj.azeriteEmpoweredItem && obj.azeriteEmpoweredItem.azeritePowers) {
                wowheadData += `&azerite-powers=${this.props.className}`;
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

            return wowheadData;

        } else if (obj.item) {
            //New Item API 2019-12

            let wowheadData = `item=${obj.item.id}`;

            if (obj.bonus_list) {
                wowheadData += `&bonus=`;
                obj.bonus_list.forEach((bonus) => {
                    wowheadData += `:${bonus}`
                });
            };

            if (obj.azerite_details && obj.azerite_details.selected_powers) {
                wowheadData += `&azerite-powers=${this.props.classNum}`;
                obj.azerite_details.selected_powers.slice().reverse().forEach(power => {
                    wowheadData += `:${power.id}`;
                });
            };

            if (obj.level.value) { wowheadData += `&ilvl=${obj.level.value}` };
            if (obj.enchantments) { 
                obj.enchantments.forEach(enchant => {
                    wowheadData += `&ench=${enchant.enchantment_id}`
                })
            };
            if (obj.sockets) { 
                wowheadData += `&gems=`;
                obj.sockets.forEach(socket => {
                    if (socket.item) {
                        wowheadData += `:${socket.item.id}`
                    }
                });
            };
            if (obj.set) {
                //ISSUE: Future issue here where we won't know in this component that we have the other piece for the set bonus.
                wowheadData += `&pcs=`;
                obj.set.items.forEach(bonus => {
                    if (bonus.item.name === obj.name) {
                        wowheadData += `:${bonus}`
                    }
                });
            };

            if (obj.transmog) { wowheadData += `&transmog=${obj.transmog.item.id}` };

            return wowheadData;
        
        } else {
            return null;
        };
    };

    render() {
        return (
            <a className="flex-row" style={{ alignItems: 'center' }} data-wowhead={this.wowheadData(this.props.item)} href={`https://www.wowhead.com/${this.wowheadData(this.props.item)}`} target="_blank" rel="noopener noreferrer">
                <div style={{ 
                    width: `${this.props.size}px`, 
                    height: `${this.props.size}px`, 
                    background: `url(${this.props.item.icon}), url(https://render-us.worldofwarcraft.com/icons/56/inv_misc_questionmark.jpg) ${this.props.size}px`, 
                    backgroundSize: `${this.props.size}px`,
                    border: '1px solid black'
                }} />
            </a>
        )
    }
}

export default ItemIcon;