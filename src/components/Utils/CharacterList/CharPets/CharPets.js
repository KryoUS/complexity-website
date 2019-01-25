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
            petCalcSliderValue: 0,
            petCalcQualityValue: {
                label: 'Poor',
                value: 1,
                color: '#5C5C5C'
            },
            petCalcBreedValue: {
                label: '4/14 (P/P)',
                value: 4,
            }
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

    setDefaultQualityLabel = (x) => {
        switch (x) {
            case 0:
                return 'Poor'
            case 1:
                return 'Common'
            case 2:
                return 'Uncommon'
            case 3:
                return 'Rare'
            case 4:
                return 'Epic'
            case 5:
                return 'Legendary'
            default:
                return null
        }
    };

    setDefaultQualityColor = (x) => {
        switch (x) {
            case 0:
                return '#5C5C5C'
            case 1:
                return 'white'
            case 2:
                return '#02ff4e'
            case 3:
                return '#0281ff'
            case 4:
                return '#c600ff'
            case 5:
                return '#ff8002'
            default:
                return null
        }
    };

    setDefaultBreedLabel = (x) => {
        switch (x) {
            case 4 || 14:
                return '4/14 (P/P)'
            case 5 || 15:
                return '5/15 (S/S)'
            case 6 || 16:
                return '6/16 (H/H'
            case 7 || 17:
                return '7/17 (H/P)'
            case 8 || 18:
                return '8/18 (P/S)'
            case 9 || 19:
                return '9/19 (H/S)'
            case 10 || 20:
                return '10/20 (P/B)'
            case 11 || 21:
                return '11/21 (S/B)'
            case 12 || 22:
                return '12/22 (H/B)'
            case 3 || 13:
                return '3/13 (B/B)'
            default:
                return null
        }
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
                this.setState({ 
                    petModalObj: obj, 
                    petSpeciesInfoLoading: false, 
                    petCalcQualityValue: {
                        label: this.setDefaultQualityLabel(obj.stats.petQualityId),
                        value: 1 + (obj.stats.petQualityId / 10),
                        color: this.setDefaultQualityColor(obj.stats.petQualityId),
                    }, 
                    petCalcSliderValue: obj.stats.level,
                    petCalcBreedValue: {
                        label: this.setDefaultBreedLabel(obj.stats.breedId),
                        value: obj.stats.breedId,
                    },
                });
                console.log('Pet Species Info: ', obj)
            }).catch(error => {
                console.log('WoW Pet Species API Error', error);
            });
        }
    };

    skipHref = (e) => {
        e.preventDefault();
    };

    handleSliderChange = (event, value) => {
        this.setState({ petCalcSliderValue: value });
    };

    handleQualityChange = (selectedOption) => {
        this.setState({ petCalcQualityValue: selectedOption });
    };

    handleBreedChange = (selectedOption) => {
        this.setState({ petCalcBreedValue: selectedOption });
    };

    petBreedInfo = (breed) => {
        if (breed === 4 || breed === 14) {return `Breed: ${breed}(P/P)`}
        else if (breed === 5 || breed === 15) {return `Breed: ${breed}(S/S)`}
        else if (breed === 6 || breed === 16) {return `Breed: ${breed}(H/H)`}
        else if (breed === 7 || breed === 17) {return `Breed: ${breed}(H/P)`}
        else if (breed === 8 || breed === 18) {return `Breed: ${breed}(P/S)`}
        else if (breed === 9 || breed === 19) {return `Breed: ${breed}(H/S)`}
        else if (breed === 10 || breed === 20) {return `Breed: ${breed}(P/B)`}
        else if (breed === 11 || breed === 21) {return `Breed: ${breed}(S/B)`}
        else if (breed === 12 || breed === 22) {return `Breed: ${breed}(H/B)`}
        else if (breed === 3 || breed === 13) {return `Breed: ${breed}(B/B)`}
        else {return `Breed: Unknown`}
    };

    petBreedTooltip = (breed) => {
        if (breed === 4 || breed === 14) {return 'P/P the pet has a boost to base power. (+2)'}
        else if (breed === 5 || breed === 15) {return 'S/S the pet has a boost to base speed. (+2)'}
        else if (breed === 6 || breed === 16) {return 'H/H the pet has a boost to base health. (+2)'}
        else if (breed === 7 || breed === 17) {return 'H/P the pet has a boost to base health and power. (+0.9)'}
        else if (breed === 8 || breed === 18) {return 'P/S the pet has a boost to base power and speed. (+0.9)'}
        else if (breed === 9 || breed === 19) {return 'H/S the pet has a boost to base health and speed. (+0.9)'}
        else if (breed === 10 || breed === 20) {return 'P/B the pet has a boost to all base stats with a little more to power. (+0.4 & +0.9)'}
        else if (breed === 11 || breed === 21) {return 'S/B the pet has a boost to all base stats with a little more to speed. (+0.4 & +0.9)'}
        else if (breed === 12 || breed === 22) {return 'H/B the pet has a boost to all base stats with a little more to health. (+0.4 & +0.9)'}
        else if (breed === 3 || breed === 13) {return 'B/B the pet has a slight boost to all base stats evenly. (+0.5)'}
        else {return 'This breed is unknown.'}
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
                            <div className="pet-stats" data-tip={this.petBreedTooltip(obj.stats.breedId)}>{this.petBreedInfo(obj.stats.breedId)}</div>
                            <div className="flex-row" data-tip='Pet Family'>
                                <div className ="icon20" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547745534/site/icons/pets/family.png`, backgroundSize: '20px'}} />
                                <a href={`https://www.wowhead.com/${this.familyWowhead(obj.family)}`} target="_blank" rel="noopener noreferrer" onClick={(e) => this.skipHref(e)}>
                                    <div className ="icon20" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/icon_petfamily_${obj.family === 'dragonkin' ? 'dragon' : `${obj.family}`}.png) 20px`, backgroundSize: '20px'}} />
                                </a>
                            </div>
                            <div className="flex-row" data-tip='Strong Against'>
                                <div className ="icon20" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547745534/site/icons/pets/strong.png`, backgroundSize: '20px'}} />
                                {obj.strongAgainst.map(strong => {
                                    return <a href={`https://www.wowhead.com/${this.familyWowhead(strong)}`} key={strong} target="_blank" rel="noopener noreferrer" onClick={(e) => this.skipHref(e)}>
                                        <div className ="icon20" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/icon_petfamily_${strong === 'dragonkin' ? 'dragon' : `${strong}`}.png) 20px`, backgroundSize: '20px'}} />
                                    </a>
                                })}
                            </div>
                            <div className="flex-row" data-tip='Weak Against'>
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
                            <div className="flex-row" data-tip='Pet Health Points'>
                                <div className ="icon20" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547749233/site/icons/pets/health.png`, backgroundSize: '20px'}} />
                                <div style={{width: '36px'}}>{obj.stats.health}</div>
                            </div>
                            <div className="flex-row" data-tip='Pet Power'>
                                <div className ="icon20" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547571993/site/icons/stats/str.png`, backgroundSize: '20px'}} />
                                <div style={{width: '28px'}}>{obj.stats.power}</div>
                            </div>
                            <div className="flex-row" data-tip='Pet Speed'>
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
                        <ReactTooltip place='left' type='light'/>
                        <CharPetsModal
                            pet={this.state.petModalObj} 
                            petModalIsOpen={this.state.petModalIsOpen} 
                            petModalClose={this.petModalClose} 
                            loading={this.state.petSpeciesInfoLoading} 
                            familyWowhead={this.familyWowhead}
                            petCalcSliderValue={this.state.petCalcSliderValue}
                            handleSliderChange={this.handleSliderChange}
                            petCalcQualityValue={this.state.petCalcQualityValue}
                            handleQualityChange={this.handleQualityChange}
                            petCalcBreedValue={this.state.petCalcBreedValue}
                            handleBreedChange={this.handleBreedChange}
                            petBreedInfo={this.petBreedInfo}
                            petBreedTooltip={this.petBreedTooltip}
                        />
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
