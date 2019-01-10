import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import './CharMounts.css';

class CharMounts extends Component {
    constructor() {
        super();

        this.state = {
            character: {
                mounts: [],
                numCollected: 0,
                numNotCollected: 0
            }
        }
    }

    componentDidMount = () => {
        axios.put(`/api/wow/character/${this.props.selectedCharName}&${this.props.selectedCharRealm}/mounts/`).then(res => {
            this.setState({
                character: {
                    mounts: res.data.mounts.filter(obj => obj.itemId > 0).sort((a, b) => {
                        let x = a.name.toLowerCase();
                        let y = b.name.toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    } ).sort((x, y) => y.collected - x.collected), 
                    numCollected: res.data.numCollected, 
                    numNotCollected: res.data.numNotCollected
                }
            });
            console.log(this.state.character.mounts)
        }).catch(error => {
            console.log('WoW Character Achievements API Error: ', error);
        });
    }

    componentDidUpdate = () => {
        ReactTooltip.rebuild();
    }

    opacitySet = (x) => {
        if (x === false) {return 'opacity25'}
    };

    canOrCannot = (x) => {
        if (x === false) {return 'cannot'}
        else {return 'can'}
    };

    render () {
        return (
            <div className="selected-category-container">
                {this.state.character.mounts.length === 0 && <div className="loader" style={{left: '85vw'}} />}
                {this.state.character.mounts.length > 0 && 
                    <div className="animate-right">
                        <div className="flex-row flex-evenly">
                            <div className="mount-text">Mounts Collected: {this.state.character.numCollected}</div>
                            <div className="mount-text">Mounts Not Collected: {this.state.character.numNotCollected}</div>
                        </div>
                        <div className="flex-row" style={{flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                            {this.state.character.mounts.map((obj, index) => {
                                let collected = 'mount-not-collected';
                                if (obj.collected === true) {collected = 'mount-collected'};
                                return index <= this.props.loadedMounts &&
                                    <div className={`flex-column mount ${collected}`} key={obj.itemId} style={{justifyContent: 'space-between'}} >
                                        <a style={{height: '120px'}} data-wowhead={`item=${obj.icon}`} href={`https://www.wowhead.com/item=${obj.itemId}`} target="_blank" rel="noopener noreferrer">
                                            <div className ="icon60" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/${obj.icon}.png) no-repeat center`, width: '100%'}} />
                                            <div className="mount-name" style={{color: obj.qualityColor}}>{obj.name}</div>
                                        </a>
                                        <div className="flex-row flex-evenly" style={{width: '100%'}}>
                                            <div className={`icon25 ${this.opacitySet(obj.isGround)}`} style={{
                                                background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/site/icons/white_mountains_200.png)`, 
                                                width: '25px', 
                                                backgroundSize: '25px'}} data-tip={`This mount ${this.canOrCannot(obj.isGround)} walk.`}/>
                                            <div className={`icon25 ${this.opacitySet(obj.isAquatic)}`} style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/site/icons/white_water_200.png)`, 
                                                width: '25px', 
                                                backgroundSize: '25px'}} data-tip={`This mount ${this.canOrCannot(obj.isAquatic)} swim underwater.`}/>
                                            <div className={`icon25 ${this.opacitySet(obj.isFlying)}`} style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/site/icons/white_flying_200.png)`, 
                                                width: '25px', 
                                                backgroundSize: '25px'}} data-tip={`This mount ${this.canOrCannot(obj.isFlying)} fly.`}/>
                                        </div>
                                    </div>
                            })}
                        </div>
                        <ReactTooltip />
                    </div>
                }
            </div>
        )
    }
}

export default CharMounts