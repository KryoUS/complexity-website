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

        const azeriteArray = (x, bonusArray) => {
            wowhead += x;
            bonusArray.forEach((bonus, index) => {
                if (index > 0) {
                    wowhead += `:${bonus.id}`
                }
            });
        }

        const qualityColor = (quality) => {
            switch (quality) {

                case 1:
                    return '#ffffff'
                
                case 2:
                    return '#02ff4e'

                case 3:
                    return '#0281ff'

                case 4:
                    return '#c600ff'
                
                case 5:
                    return '#ff8002'

                case 6:
                    return '#e5cc80'
        
                default:
                    return null
            }
        }

        item.bonusLists && bonusArray(`&amp;bonus=${item.bonusLists[0]}`, item.bonusLists);
        item.azeriteEmpoweredItem.azeritePowers && azeriteArray(`&amp;azerite-powers=${selectedClass}`, item.azeriteEmpoweredItem.azeritePowers);
        item.itemLevel && addWowheadData(`&amp;ilvl=${item.itemLevel}`);
        item.tooltipParams.enchant && addWowheadData(`&amp;ench=${item.tooltipParams.enchant}`);
        item.tooltipParams.gem0 && addWowheadData(`&amp;gems=${item.tooltipParams.gem0}`);
        item.tooltipParams.gem1 && addWowheadData(`:${item.tooltipParams.gem1}`);
        item.tooltipParams.gem2 && addWowheadData(`:${item.tooltipParams.gem2}`);
        item.tooltipParams.set && bonusArray(`&amp;pcs=${item.tooltipParams.set[0]}`, item.tooltipParams.set);
        //let upgd = 0; //Upgrade level, seemingly not used?

        return (
                <a className="item-link" href={link} data-wowhead={wowhead} target="_blank" rel="noopener noreferrer">
                    <div className="item-container">
                        <div className="item-name" style={{color: qualityColor(item.quality)}}>{item.name}</div>
                        <div className="item-level">Item Level {item.itemLevel} {item.name === 'Heart of Azeroth' && `(Azerite Level ${item.azeriteItem.azeriteLevel})`}</div>
                    </div>
                    <div className="item-icon" style={{backgroundImage: `url('${icon}')`, boxShadow: `0 0 0 1px ${qualityColor(item.quality)}, 0 0 2px ${qualityColor(item.quality)}`}} />
                </a>
        )
    }
}