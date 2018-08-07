import React, { Component } from 'react';
import './Item.css';

export default class Item extends Component {

    render () {
        const { item } = this.props;
        const link = `https://www.wowhead.com/item=${item.id}`;
        const icon = `https://res.cloudinary.com/complexityguild/image/upload/v1533521204/wow/icons/${item.icon}.png`;
        let wowhead = `item=${item.id}`;

        const addWowheadData = (x) => {
            return wowhead += x;
        }

        item.itemLevel && addWowheadData(`&amp;ilvl=${item.itemLevel}`);
        item.tooltipParams.enchant && addWowheadData(`&amp;ench=${item.tooltipParams.enchant}`);
        item.tooltipParams.gem0 && addWowheadData(`&amp;gems=${item.tooltipParams.gem0}`);
        item.tooltipParams.gem1 && addWowheadData(`:${item.tooltipParams.gem1}`);
        item.tooltipParams.gem2 && addWowheadData(`:${item.tooltipParams.gem2}`);
        let sock = 0; //Extra Socket
        let pcs = 0; //Item Set Pieces
        let upgd = 0;


        return (
                <a className="item-link" href={link} data-wowhead={wowhead} target="_blank">
                    <div className="item-icon" style={{backgroundImage: `url('${icon}')`, boxShadow: '0 0 0 1px #ff8002, 0 0 12px #ff8002'}} />
                </a>
        )
    }
}