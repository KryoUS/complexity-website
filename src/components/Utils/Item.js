import React, { Component } from 'react';
import './Item.css';

export default class Item extends Component {

    render () {
        const { item, selectedClass } = this.props;
        const link = `https://www.wowhead.com/item=${item.id}`;
        const icon = `https://res.cloudinary.com/complexityguild/image/upload/v1533521204/wow/icons/${item.icon}.png`;
        let wowhead = `item=${item.id}`;

        const addWowheadData = (x) => {
            return wowhead += x;
        }

        const bonusArray = (x, bonusArray) => {
            wowhead += x;
            bonusArray.forEach((bonus, index) => {
                if (index > 0) {
                    wowhead += `:${bonus}`
                }
            });
        }

        const borderColor = (quality) => {
            switch (quality) {

                case 1:
                    return '0 0 0 1px #ffffff, 0 0 2px #ffffff'
                
                case 2:
                    return '0 0 0 1px #02ff4e, 0 0 2px #02ff4e'

                case 3:
                    return '0 0 0 1px #0281ff, 0 0 2px #0281ff'

                case 4:
                    return '0 0 0 1px #c600ff, 0 0 4px #c600ff'
                
                case 5:
                    return '0 0 0 1px #ff8002, 0 0 12px #ff8002'

                case 6:
                    return '0 0 0 1px #e5cc80, 0 0 12px #e5cc80'
        
                default:
                    return null
            }
        }

        item.bonusLists && bonusArray(`&amp;bonus=${item.bonusLists[0]}`, item.bonusLists);
        item.azeriteEmpoweredItem.azeritePowers && bonusArray(`&amp;azerite-powers=${selectedClass}`, item.azeriteEmpoweredItem.azeritePowers);
        item.itemLevel && addWowheadData(`&amp;ilvl=${item.itemLevel}`);
        item.tooltipParams.enchant && addWowheadData(`&amp;ench=${item.tooltipParams.enchant}`);
        item.tooltipParams.gem0 && addWowheadData(`&amp;gems=${item.tooltipParams.gem0}`);
        item.tooltipParams.gem1 && addWowheadData(`:${item.tooltipParams.gem1}`);
        item.tooltipParams.gem2 && addWowheadData(`:${item.tooltipParams.gem2}`);
        //let sock = 0; //Extra Socket
        item.tooltipParams.set && bonusArray(`&amp;pcs=${item.tooltipParams.set[0]}`, item.tooltipParams.set);
        //let upgd = 0; //Upgrade level, seemingly not used?

        let borderGlow = borderColor(item.quality);


        return (
                <a className="item-link" href={link} data-wowhead={wowhead} target="_blank">
                    <div className="item-container">
                        <div className="item-name">{item.name}</div>
                        <div className="item-icon" style={{backgroundImage: `url('${icon}')`, boxShadow: borderGlow}} />
                    </div>
                </a>
        )
    }
}