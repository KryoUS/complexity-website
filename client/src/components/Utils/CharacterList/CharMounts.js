import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import ProgressBar from '../ProgressBar';

class CharMounts extends Component {
    constructor() {
        super();

        this.state = {
            character: {
                mounts: [],
                numCollected: 0,
                numNotCollected: 0
            },
            filteredMounts: [],
            loadedMounts: 30
        }
    }

    componentDidMount = () => {
        axios.put(`/api/wow/character/${this.props.selectedCharName}&${this.props.selectedCharRealm}/mounts/`).then(res => {
            this.setState({
                character: {
                    mounts: res.data.mounts.sort((x, y) => y.collected - x.collected), 
                    numCollected: res.data.numCollected, 
                    numNotCollected: res.data.numNotCollected
                }
            });

            this.refs.iScroll.addEventListener("scroll", () => {
                if (
                    this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
                    this.refs.iScroll.scrollHeight
                ) {
                    this.setState({loadedMounts: this.state.loadedMounts + 20});
                };
            });
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

    searchData = (e) => {
        let searchResults = [];
        if(e.target.value !== '' && e.target.value.length > 2) {
            this.state.character.mounts.forEach(mount => {
                if (mount.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
                    searchResults.push(mount);
                };
            });
        };
        this.setState({filteredMounts: searchResults});
    }

    render () {
        return (
            <div>
                {this.state.character.mounts.length === 0 && <div className="loader" style={{left: '85vw'}} />}
                {this.state.character.mounts.length > 0 && 
                    <div className="animate-right" style={{width: '95%'}}>
                        <input type="text" className="input" placeholder="Search for a mount..." onChange={this.searchData} />
                        <div className="char-info-overflow" style={{height: '68vh', width: '100%'}} ref="iScroll">
                        {this.state.filteredMounts.length > 0 ?
                            this.state.filteredMounts.map((obj, index) => {
                                let collected = 'not-collected';
                                if (obj.collected === true) {collected = 'collected'};
                                return index <= this.state.loadedMounts &&
                                    <div className={`flex-row flex-between row-container ${collected && collected}`} key={obj.itemId} >
                                        <a className="flex-row" style={{alignItems: 'center'}} data-wowhead={`item=${obj.icon}`} href={`https://www.wowhead.com/item=${obj.itemId}`} target="_blank" rel="noopener noreferrer">
                                            <div className ="icon25" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/${obj.icon}.png) 25px`, backgroundSize: '25px'}} />
                                            <div className="row-name" style={{color: obj.qualityColor}}>{obj.name}</div>
                                        </a>
                                        <div className="flex-row flex-between">
                                            <div className={`icon25 ${this.opacitySet(obj.isGround)}`} 
                                                style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/site/icons/white_mountains_200.png) 25px`, backgroundSize: '25px'}} 
                                                data-tip={`This mount ${this.canOrCannot(obj.isGround)} walk.`}/>
                                            <div className={`icon25 ${this.opacitySet(obj.isAquatic)}`} 
                                                style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/site/icons/white_water_200.png) 25px`, backgroundSize: '25px'}} 
                                                data-tip={`This mount ${this.canOrCannot(obj.isAquatic)} swim underwater.`}/>
                                            <div className={`icon25 ${this.opacitySet(obj.isFlying)}`} 
                                                style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/site/icons/white_flying_200.png) 25px`, backgroundSize: '25px'}} 
                                                data-tip={`This mount ${this.canOrCannot(obj.isFlying)} fly.`}/>
                                        </div>
                                    </div>
                            })
                        :
                            this.state.character.mounts.map((obj, index) => {
                                let collected = 'not-collected';
                                if (obj.collected === true) {collected = 'collected'};
                                return index <= this.state.loadedMounts &&
                                    <div className={`flex-row flex-between row-container ${collected && collected}`} key={obj.itemId} >
                                        <a className="flex-row" style={{alignItems: 'center'}} data-wowhead={`item=${obj.icon}`} href={`https://www.wowhead.com/item=${obj.itemId}`} target="_blank" rel="noopener noreferrer">
                                            <div className ="icon25" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/${obj.icon}.png) 25px`, backgroundSize: '25px'}} />
                                            <div className="row-name" style={{color: obj.qualityColor}}>{obj.name}</div>
                                        </a>
                                        <div className="flex-row flex-between">
                                            <div className={`icon25 ${this.opacitySet(obj.isGround)}`} 
                                                style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/site/icons/white_mountains_200.png) 25px`, backgroundSize: '25px'}} 
                                                data-tip={`This mount ${this.canOrCannot(obj.isGround)} walk.`}/>
                                            <div className={`icon25 ${this.opacitySet(obj.isAquatic)}`} 
                                                style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/site/icons/white_water_200.png) 25px`, backgroundSize: '25px'}} 
                                                data-tip={`This mount ${this.canOrCannot(obj.isAquatic)} swim underwater.`}/>
                                            <div className={`icon25 ${this.opacitySet(obj.isFlying)}`} 
                                                style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/site/icons/white_flying_200.png) 25px`, backgroundSize: '25px'}} 
                                                data-tip={`This mount ${this.canOrCannot(obj.isFlying)} fly.`}/>
                                        </div>
                                    </div>
                            })
                        }
                        </div>
                        <div className="flex-column flex-center" style={{width: '90%', margin: 'auto'}}>
                            <div style={{textAlign: 'center'}}>Mounts Collected</div>
                            <ProgressBar 
                                current={this.state.character.numCollected} 
                                remaining={this.state.character.numNotCollected}
                                height={'20px'}
                                bgColor={'#edba03'}
                                fontSize={'14px'}
                            />
                        </div>
                        <ReactTooltip />
                    </div>
                }
            </div>
        )
    }
}

export default CharMounts