import React, { Component } from 'react';
import ItemIcon from '../Warcraft/Icons/ItemIcon';
import Loader from '../../Utils/Loader';
import axios from 'axios';

class CharItems extends Component {
    constructor() {
        super();

        this.state = {
            items: [],
            averageItemLevelEquipped: 0,
            loaded: false
        }
    }

    componentDidMount = () => {
        axios.put(`/api/wow/character/${this.props.selectedCharName.toLowerCase()}&${this.props.selectedCharRealm.toLowerCase()}/items/`).then(res => {
            let iLevels = [];
            let averageilvl = 0;

            res.data.equipped_items.forEach(item => {
                if (item.slot.type === "TABARD" || item.slot.type === "SHIRT") {
                    //Tabards and shirts are ignored by Blizzard for Average Item Level as per Armory
                } else {
                    iLevels.push(item.level.value);
                };
            });

            for (let i = 0; i < iLevels.length; i++) {
                averageilvl += iLevels[i];
            }

            let avg = averageilvl / iLevels.length;

            this.setState({ items: res.data.equipped_items, averageItemLevelEquipped: avg, loaded: true });
        }).catch(error => {
            console.log('WoW Character Items API Error: ', error);
        });
    }

    render() {
        return (
            <div className="selected-category-container char-info-overflow">
                {this.state.loaded === false ?
                    <Loader />
                    :
                    <div className="animate-right" style={{ width: '95%' }}>
                        <div className="char-info-overflow" style={{ width: '100%', overflow: 'hidden' }}>
                            {this.state.items.map(itemObj => {
                                return <div key={itemObj.item.id} >
                                    <div className="flex-row flex-between row-container">
                                        <div className="flex-row">
                                            <ItemIcon item={itemObj} size={25} classNum={this.props.selectedCharClassNum} />
                                            <div className="row-name" style={{marginLeft: '10px', color: itemObj.quality.color}}>{itemObj.name}</div>
                                        </div>
                                        {/* Add Sockets and Enchants Later */}
                                        <div className="row-name">{itemObj.level.value}</div>
                                    </div>
                                    <div className="gradient-line-white" />
                                </div>
                            })}
                            <div className="flex-row flex-evenly" style={{ textAlign: 'center', fontSize: '18px' }}>
                                {/* Have to calculate ilevel */}
                                <div style={{ width: '50%' }}>Item Level Equipped: {Math.round(this.state.averageItemLevelEquipped * 100) / 100}</div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default CharItems