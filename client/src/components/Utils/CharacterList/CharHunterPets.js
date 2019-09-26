import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';

class CharHunterPets extends Component {
    constructor() {
        super();

        this.state = {
            hunterPets: [],
            filteredHunterPets: [],
            loadedHunterPets: 30
        }
    }

    componentDidMount = () => {
        axios.put(`/api/wow/character/${this.props.selectedCharName}&${this.props.selectedCharRealm}/hunterPets/`).then(res => {
            this.setState({ hunterPets: res.data });

            this.refs.iScroll.addEventListener("scroll", () => {
                if (
                    this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
                    this.refs.iScroll.scrollHeight
                ) {
                    this.setState({ loadedMounts: this.state.loadedMounts + 20 });
                };
            });

            console.log(this.state.hunterPets)
        }).catch(error => {
            console.log('WoW Hunter Pets API Error: ', error);
        });
    }

    componentDidUpdate = () => {
        ReactTooltip.rebuild();
    }

    opacitySet = (x) => {
        if (x === false) { return 'opacity25' }
    };

    searchData = (e) => {
        let searchResults = [];
        if (e.target.value !== '' && e.target.value.length > 2) {
            this.state.hunterPets.forEach(obj => {
                if (obj.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
                    searchResults.push(obj);
                } else if (obj.familyName.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
                    searchResults.push(obj);
                }
            });
        };
        this.setState({ filteredHunterPets: searchResults });
    }

    render() {
        return (
            <div className="selected-category-container char-info-overflow">
                {this.state.hunterPets.length === 0 && <div className="lds-roller">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>}
                {this.state.hunterPets.length > 0 &&
                    <div className="animate-right" style={{ width: '95%' }}>
                        <input type="text" className="input" placeholder="Search for a Hunter Pet by name or family..." onChange={this.searchData} />
                        <div className="char-info-overflow" style={{ height: '70vh', width: '100%' }} ref="iScroll">
                            {this.state.filteredHunterPets.length > 0 ?
                                this.state.filteredHunterPets.map((obj, index) => {
                                    return index <= this.state.loadedHunterPets &&
                                        <div className={`flex-row flex-between row-container collected`} key={obj.creature} >
                                            <div className="flex-row" style={{ alignItems: 'center' }}>
                                                <a className="flex-row row-name" style={{ width: '150px' }} data-wowhead={`npc=${obj.creature}`} href={`https://www.wowhead.com/npc=${obj.creature}`} target="_blank" rel="noopener noreferrer">
                                                    {obj.name}
                                                </a>
                                                <div className="flex-row" >
                                                    <div className="icon25"
                                                        style={{
                                                            background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547500265/site/icons/tag_round.png) 25px`,
                                                            backgroundSize: '25px'
                                                        }}
                                                        data-tip="Pet Family"
                                                    />
                                                    <div className="row-name"> {obj.familyName}</div>
                                                </div>
                                            </div>
                                            {obj.spec && <div className="flex-row flex-between">
                                                {obj.selected === true &&
                                                    <div className="icon25"
                                                        style={{
                                                            background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547502909/site/icons/star.png) no-repeat`,
                                                            backgroundSize: '25px'
                                                        }}
                                                        data-tip="This pet is currently selected."
                                                    />
                                                }
                                                <div className="icon25"
                                                    style={{ background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/wow/icons/${obj.spec.icon}.png) 25px`, backgroundSize: '25px' }}
                                                    data-tip={`${obj.spec.name}: ${obj.spec.description}`}>
                                                </div>
                                                {obj.spec.name === 'Ferocity' &&
                                                    <div className="flex-row">
                                                        <a data-wowhead='spell=264667' href={`https://www.wowhead.com/spell=264667`} target="_blank" rel="noopener noreferrer">
                                                            <div className="icon25"
                                                                style={{
                                                                    background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/wow/icons/spell_shadow_unholyfrenzy.png) 25px`,
                                                                    backgroundSize: '25px'
                                                                }}
                                                            />
                                                        </a>
                                                        <a data-wowhead={'spell=264663'} href={`https://www.wowhead.com/spell=264663`} target="_blank" rel="noopener noreferrer">
                                                            <div className="icon25"
                                                                style={{
                                                                    background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/wow/icons/spell_shadow_vampiricaura.png) 25px`,
                                                                    backgroundSize: '25px'
                                                                }}
                                                            />
                                                        </a>
                                                    </div>
                                                }
                                                {obj.spec.name === 'Tenacity' &&
                                                    <div className="flex-row">
                                                        <a data-wowhead='spell=264735' href={`https://www.wowhead.com/spell=264735`} target="_blank" rel="noopener noreferrer">
                                                            <div className="icon25"
                                                                style={{
                                                                    background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/wow/icons/spell_nature_spiritarmor.png) 25px`,
                                                                    backgroundSize: '25px'
                                                                }}
                                                            />
                                                        </a>
                                                        <a data-wowhead={'spell=264662'} href={`https://www.wowhead.com/spell=264662`} target="_blank" rel="noopener noreferrer">
                                                            <div className="icon25"
                                                                style={{
                                                                    background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/wow/icons/ability_hunter_huntervswild.png) 25px`,
                                                                    backgroundSize: '25px'
                                                                }}
                                                            />
                                                        </a>
                                                    </div>
                                                }
                                                {obj.spec.name === 'Cunning' &&
                                                    <div className="flex-row">
                                                        <a data-wowhead='spell=53271' href={`https://www.wowhead.com/spell=53271`} target="_blank" rel="noopener noreferrer">
                                                            <div className="icon25"
                                                                style={{
                                                                    background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/wow/icons/ability_hunter_masterscall.png) 25px`,
                                                                    backgroundSize: '25px'
                                                                }}
                                                            />
                                                        </a>
                                                        <a data-wowhead={'spell=264656'} href={`https://www.wowhead.com/spell=264656`} target="_blank" rel="noopener noreferrer">
                                                            <div className="icon25"
                                                                style={{
                                                                    background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/wow/icons/spell_lifegivingspeed.png) 25px`,
                                                                    backgroundSize: '25px'
                                                                }}
                                                            />
                                                        </a>
                                                    </div>
                                                }
                                            </div>}
                                        </div>
                                })
                                :
                                this.state.hunterPets.map((obj, index) => {
                                    return index <= this.state.loadedHunterPets &&
                                        <div className={`flex-row flex-between row-container collected`} key={obj.creature} >
                                            <div className="flex-row" style={{ alignItems: 'center' }}>
                                                <a className="flex-row row-name" style={{ width: '150px' }} data-wowhead={`npc=${obj.creature}`} href={`https://www.wowhead.com/npc=${obj.creature}`} target="_blank" rel="noopener noreferrer">
                                                    {obj.name}
                                                </a>
                                                <div className="flex-row" >
                                                    <div className="icon25"
                                                        style={{
                                                            background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547500265/site/icons/tag_round.png) 25px`,
                                                            backgroundSize: '25px'
                                                        }}
                                                        data-tip="Pet Family"
                                                    />
                                                    <div className="row-name"> {obj.familyName}</div>
                                                </div>
                                            </div>
                                            {obj.spec && <div className="flex-row flex-between">
                                                {obj.selected === true &&
                                                    <div className="icon25"
                                                        style={{
                                                            background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547502909/site/icons/star.png) no-repeat`,
                                                            backgroundSize: '25px'
                                                        }}
                                                        data-tip="This pet is currently selected."
                                                    />
                                                }
                                                <div className="icon25"
                                                    style={{ background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/wow/icons/${obj.spec.icon}.png) 25px`, backgroundSize: '25px' }}
                                                    data-tip={`${obj.spec.name}: ${obj.spec.description}`}>
                                                </div>
                                                {obj.spec.name === 'Ferocity' &&
                                                    <div className="flex-row">
                                                        <a data-wowhead='spell=264667' href={`https://www.wowhead.com/spell=264667`} target="_blank" rel="noopener noreferrer">
                                                            <div className="icon25"
                                                                style={{
                                                                    background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/wow/icons/spell_shadow_unholyfrenzy.png) 25px`,
                                                                    backgroundSize: '25px'
                                                                }}
                                                            />
                                                        </a>
                                                        <a data-wowhead={'spell=264663'} href={`https://www.wowhead.com/spell=264663`} target="_blank" rel="noopener noreferrer">
                                                            <div className="icon25"
                                                                style={{
                                                                    background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/wow/icons/spell_shadow_vampiricaura.png) 25px`,
                                                                    backgroundSize: '25px'
                                                                }}
                                                            />
                                                        </a>
                                                    </div>
                                                }
                                                {obj.spec.name === 'Tenacity' &&
                                                    <div className="flex-row">
                                                        <a data-wowhead='spell=264735' href={`https://www.wowhead.com/spell=264735`} target="_blank" rel="noopener noreferrer">
                                                            <div className="icon25"
                                                                style={{
                                                                    background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/wow/icons/spell_nature_spiritarmor.png) 25px`,
                                                                    backgroundSize: '25px'
                                                                }}
                                                            />
                                                        </a>
                                                        <a data-wowhead={'spell=264662'} href={`https://www.wowhead.com/spell=264662`} target="_blank" rel="noopener noreferrer">
                                                            <div className="icon25"
                                                                style={{
                                                                    background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/wow/icons/ability_hunter_huntervswild.png) 25px`,
                                                                    backgroundSize: '25px'
                                                                }}
                                                            />
                                                        </a>
                                                    </div>
                                                }
                                                {obj.spec.name === 'Cunning' &&
                                                    <div className="flex-row">
                                                        <a data-wowhead='spell=53271' href={`https://www.wowhead.com/spell=53271`} target="_blank" rel="noopener noreferrer">
                                                            <div className="icon25"
                                                                style={{
                                                                    background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/wow/icons/ability_hunter_masterscall.png) 25px`,
                                                                    backgroundSize: '25px'
                                                                }}
                                                            />
                                                        </a>
                                                        <a data-wowhead={'spell=264656'} href={`https://www.wowhead.com/spell=264656`} target="_blank" rel="noopener noreferrer">
                                                            <div className="icon25"
                                                                style={{
                                                                    background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547124405/wow/icons/spell_lifegivingspeed.png) 25px`,
                                                                    backgroundSize: '25px'
                                                                }}
                                                            />
                                                        </a>
                                                    </div>
                                                }
                                            </div>}
                                        </div>
                                })
                            }
                        </div>
                        <ReactTooltip className="tooltip" />
                    </div>
                }
            </div>
        )
    }
}

export default CharHunterPets