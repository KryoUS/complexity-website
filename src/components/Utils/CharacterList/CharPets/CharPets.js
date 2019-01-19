import React, { Component } from 'react';
import { connect } from 'react-redux';
import { infoModal } from '../../../../ducks/reducer';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import ProgressBar from '../../ProgressBar';
import CharPetsModal from './CharPetsModal';
import './CharPets.css';

class CharPets extends Component {
    constructor() {
        super();

        this.state = {
            character: {
                pets: [],
                numCollected: 0,
                numNotCollected: 0
            },
            filteredPets: [],
            loadedPets: 30,
            petModalIsOpen: false,
            petModalObj: {},
            petSpeciesInfoLoading: true,
        };
    };

    componentDidMount = () => {
        axios.put(`/api/wow/character/${this.props.selectedCharName}&${this.props.selectedCharRealm}/pets/`).then(res => {
            this.setState({
                character: {
                    pets: res.data.pets.collected.sort((a, b) => {
                        var x = a.name.toLowerCase();
                        var y = b.name.toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                      }).sort((x, y) => {
                        return y.isFavorite - x.isFavorite
                    }).sort((x, y) => {
                        return x.slot - y.slot
                    }), 
                    numCollected: res.data.pets.numCollected, 
                    numNotCollected: res.data.pets.numNotCollected
                },
            });

            this.refs.iScroll.addEventListener("scroll", () => {
                if (
                    this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
                    this.refs.iScroll.scrollHeight
                ) {
                    this.setState({loadedPets: this.state.loadedPets + 20});
                };
            });

        }).catch(error => {
            console.log('WoW Character Pets API Error: ', error);
        });
    };

    componentDidUpdate = () => {
        ReactTooltip.rebuild();
    };

    searchData = (e) => {
        let searchResults = [];
        if(e.target.value !== '' && e.target.value.length > 2) {
            this.state.character.pets.forEach(pet => {
                if (pet.name.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
                    searchResults.push(pet);
                } else if (pet.creatureName.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
                    searchResults.push(pet);
                }
            });
        };
        this.setState({filteredPets: searchResults});
    };

    familyWowhead = (family) => {
        switch (family) {
            case 'water':
                return 'petability=240'
            case 'beast':
                return 'petability=237'
            case 'critter':
                return 'petability=236'
            case 'dragonkin':
                return 'petability=245'
            case 'elemental':
                return 'petability=241'
            case 'flying':
                return 'petability=239'
            case 'humanoid':
                return 'petability=238'
            case 'magical':
                return 'petability=243'
            case 'mechanical':
                return 'petability=244'
            case 'undead':
                return 'petability=242'
            default:
                return null
        }
    };

    petModalClose = () => {
        this.setState({ petModalIsOpen: false, petSpeciesInfoLoading: true });
    };

    petModalOpen = (obj) => {

        if (obj.canBattle === false) {
            this.setState({ petModalObj: obj, petModalIsOpen: true, petSpeciesInfoLoading: false });
        } else {
            this.setState({ petModalObj: obj, petModalIsOpen: true });

            axios.get(`/api/wow/pet/species/${obj.stats.speciesId}`).then(res => {
                obj.stats.speciesInfo = res.data;
                this.setState({ petModalObj: obj, petSpeciesInfoLoading: false });
                console.log('Pet Species Info: ', obj)
            }).catch(error => {
                console.log('WoW Pet Species API Error', error);
            });
        }
    };

    skipHref = (e) => {
        e.preventDefault();
    };

    buildPets = (array) => {
        return array.map((obj, index) => {
            return index <= this.state.loadedPets &&
                <div className={`flex-row flex-between row-container pet-container`} key={obj.battlePetGuid + obj.creatureId} onClick={() => this.petModalOpen(obj)} >
                    <a className="flex-row" style={{width: '280px', alignItems: 'center'}} data-wowhead={`npc=${obj.creatureId}`} href={`https://www.wowhead.com/npc=${obj.creatureId}`} onClick={(e) => this.skipHref(e)} target="_blank" rel="noopener noreferrer">
                        <div className ="icon40" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533519767/wow/icons/${obj.icon.replace(/&|-/g, '_')}.png) 40px`, backgroundSize: '40px'}} />
                        <div className="row-name" style={{color: obj.qualityColor, fontSize: '.95rem'}}>{obj.name} {obj.name !== obj.creatureName && `the ${obj.creatureName}`}</div>
                    </a>
                    <div className="flex-column flex-between pet-stat-container">
                        <div className="flex-row flex-between pet-stat-row">
                            <div className="pet-stats">{obj.slot < 4 ? `Slot ${obj.slot}` : 'Unequipped'}</div>
                            <div className="flex-row  pet-stats" data-tip='Pet Family'>
                                <div className ="icon20" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547745534/site/icons/pets/family.png`, backgroundSize: '20px'}} />
                                <a href={`https://www.wowhead.com/${this.familyWowhead(obj.family)}`} target="_blank" rel="noopener noreferrer" onClick={(e) => this.skipHref(e)}>
                                    <div className ="icon20" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/icon_petfamily_${obj.family === 'dragonkin' ? 'dragon' : `${obj.family}`}.png) 20px`, backgroundSize: '20px'}} />
                                </a>
                            </div>
                            <div className="flex-row pet-stats" data-tip='Strong Against'>
                                <div className ="icon20" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547745534/site/icons/pets/strong.png`, backgroundSize: '20px'}} />
                                {obj.strongAgainst.map(strong => {
                                    return <a href={`https://www.wowhead.com/${this.familyWowhead(strong)}`} key={strong} target="_blank" rel="noopener noreferrer" onClick={(e) => this.skipHref(e)}>
                                        <div className ="icon20" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/icon_petfamily_${strong === 'dragonkin' ? 'dragon' : `${strong}`}.png) 20px`, backgroundSize: '20px'}} />
                                    </a>
                                })}
                            </div>
                            <div className="flex-row pet-stats" data-tip='Weak Against'>
                                <div className ="icon20" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547745534/site/icons/pets/weak.png`, backgroundSize: '20px'}} />
                                {obj.weakAgainst.map(weak => {
                                    return <a href={`https://www.wowhead.com/${this.familyWowhead(weak)}`} key={weak} target="_blank" rel="noopener noreferrer" onClick={(e) => this.skipHref(e)}>
                                        <div className ="icon20" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/icon_petfamily_${weak === 'dragonkin' ? 'dragon' : `${weak}`}.png) 20px`, backgroundSize: '20px'}} />
                                    </a>
                                })}
                            </div>
                            <div className={`icon20 ${obj.isFavorite === false && 'opacity25'}`} style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547742281/site/icons/pets/${obj.isFavorite === true ? 'favorite' : 'notfavorite' }.png) 20px`, backgroundSize: '20px'}} data-tip={`${obj.isFavorite === true ? 'This pet is a favorite.' : 'This pet is not a favorite.'}`}/>
                        </div>
                        <div className="flex-row flex-between pet-stat-row">
                            <div className="pet-stats">Level {obj.stats.level}</div>
                            <div className="flex-row pet-stats" data-tip='Pet Health Points'>
                                <div className ="icon20" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547749233/site/icons/pets/health.png`, backgroundSize: '20px'}} />
                                <div style={{width: '36px'}}>{obj.stats.health}</div>
                            </div>
                            <div className="flex-row pet-stats" data-tip='Pet Power'>
                                <div className ="icon20" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547571993/site/icons/stats/str.png`, backgroundSize: '20px'}} />
                                <div style={{width: '28px'}}>{obj.stats.power}</div>
                            </div>
                            <div className="flex-row pet-stats" data-tip='Pet Speed'>
                                <div className ="icon20" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547571993/site/icons/stats/speed.png`, backgroundSize: '20px'}} />
                                <div style={{width: '28px'}}>{obj.stats.speed}</div>
                            </div>
                            <div className={`icon20 ${obj.canBattle === false && 'opacity25'}`} style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547742281/site/icons/pets/battle.png) 20px`, backgroundSize: '20px'}} data-tip={`${obj.canBattle === false ? 'This pet is unable to do battle.' : 'This pet is able to do battle.'}`}/>
                        </div>
                    </div>
                </div>
        });
    };

    render () {
        return (
            <div>
                {this.state.character.pets.length === 0 && <div className="loader" style={{left: '85vw'}} />}
                {this.state.character.pets.length > 0 && 
                    <div className="animate-right" style={{width: '100%'}}>
                        <input type="text" className="input" placeholder="Search for a pet by name..." onChange={this.searchData} />
                        <div className="char-info-overflow" style={{height: '70vh', width: '100%'}} ref="iScroll">
                        {this.state.filteredPets.length > 0 ?
                            this.buildPets(this.state.filteredPets)
                        :
                            this.buildPets(this.state.character.pets)
                        }
                        </div>
                        <div style={{textAlign: 'center'}}>Pets Collected</div>
                        <ProgressBar 
                            current={this.state.character.numCollected} 
                            remaining={this.state.character.numNotCollected}
                            height={'18px'}
                            bgColor={'#edba03'}
                            fontSize={'14px'}
                        />
                        <ReactTooltip place='left'/>
                        <CharPetsModal pet={this.state.petModalObj} petModalIsOpen={this.state.petModalIsOpen} petModalClose={this.petModalClose} loading={this.state.petSpeciesInfoLoading} familyWowhead={this.familyWowhead} />
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        modalOpen: state.modalOpen,
        modalTitle: state.modalTitle,
        modalMessage: state.modalMessage,
        modalButton: state.modalButton
    }
}

export default connect( mapStateToProps, {infoModal} )( CharPets );
