import React, { Component } from 'react';
import { connect } from 'react-redux';
import { infoModal } from '../../../../ducks/reducer';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import ProgressBar from '../../ProgressBar';
import CharPetsModal from './CharPetsModal';
import Select from 'react-select';
import './CharPets.css';

const sortOptions = [
    { value: 1, label: 'Name (A to Z)' },
    { value: 2, label: 'Name (Z to A)' },
    { value: 3, label: 'is Favorite' },
    { value: 4, label: 'is not Favorite' },
    { value: 5, label: 'Breed (Asc)' },
    { value: 6, label: 'Breed (Desc)' },
    { value: 7, label: 'Health (Asc)' },
    { value: 8, label: 'Health (Desc)' },
    { value: 9, label: 'Power (Asc)' },
    { value: 10, label: 'Power (Desc)' },
    { value: 11, label: 'Speed (Asc)' },
    { value: 12, label: 'Speed (Desc)' },
    { value: 13, label: 'Level (Asc)' },
    { value: 14, label: 'Level (Desc)' },
    { value: 15, label: 'Can Battle' },
    { value: 16, label: 'Cannot Battle' },
    { value: 17, label: 'Family (A to Z)' },
    { value: 18, label: 'Family (Z to A)' },
    { value: 19, label: 'Strong Against (A to Z)' },
    { value: 20, label: 'Strong Against (Z to A)' },
    { value: 21, label: 'Weak Against (A to Z)' },
    { value: 22, label: 'Weak Against (Z to A)' },
]

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
            petCalcHealth: 0,
            petCalcPower: 0,
            petCalcSpeed: 0,
            petCalcLoading: false,
            petSortValue: {
                label: 'Sort by',
                value: 0,
            },
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
                },
                numCollected: res.data.pets.numCollected, 
                numNotCollected: res.data.pets.numNotCollected
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
            if ( x === 4 || x ===14) {return '4/14 (P/P)'}
            else if ( x === 5 || x ===15) {return '5/15 (S/S)'}
            else if ( x === 6 || x ===16) {return '6/16 (H/H'}
            else if ( x === 7 || x ===17) {return '7/17 (H/P)'}
            else if ( x === 8 || x ===18) {return '8/18 (P/S)'}
            else if ( x === 9 || x ===19) {return '9/19 (H/S)'}
            else if ( x === 10 || x === 20) {return '10/20 (P/B)'}
            else if ( x === 11 || x === 21) {return '11/21 (S/B)'}
            else if ( x === 12 || x === 22) {return '12/22 (H/B)'}
            else if ( x === 3 || x ===13) {return '3/13 (B/B)'}
            else {return 'Unknown'}
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
                        value: obj.stats.petQualityId,
                        color: this.setDefaultQualityColor(obj.stats.petQualityId),
                    }, 
                    petCalcSliderValue: obj.stats.level,
                    petCalcHealth: obj.stats.health,
                    petCalcPower: obj.stats.power,
                    petCalcSpeed: obj.stats.speed,
                    petCalcBreedValue: {
                        label: this.setDefaultBreedLabel(obj.stats.breedId),
                        value: obj.stats.breedId,
                    },
                });
                console.log('petModalObj', this.state.petModalObj);
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

    getPetCalcInfo = () => {
        if (this.state.petCalcBreedValue.value === this.state.petModalObj.stats.breedId 
            && this.state.petCalcSliderValue === this.state.petModalObj.stats.level 
            && this.state.petCalcQualityValue.value === this.state.petModalObj.stats.petQualityId) {
                this.props.infoModal(true, 'Oops!', "The Battle Pet Calculator values match the pet's values. Change a value and try again.", 'OK');
        } else {
            this.setState({ petCalcLoading: true })
            axios.get(`/api/wow/pet/stats/${this.state.petModalObj.stats.speciesId}&${this.state.petCalcSliderValue}&${this.state.petCalcBreedValue.value}&${this.state.petCalcQualityValue.value}`).then(res => {
                this.setState({ petCalcHealth: res.data.health, petCalcPower: res.data.power, petCalcSpeed: res.data.speed, petCalcLoading: false });
            }).catch(error => {
                console.log(error);
            });
        }
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

    sortPetsBy = (x) => {
        if (x.value === 1) { 
            this.setState( { 
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                }, 
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        var x = a.name.toLowerCase();
                        var y = b.name.toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    }),
                },
            } ) 
        } else if (x.value === 2) { 
            this.setState( { 
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                }, 
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        var y = a.name.toLowerCase();
                        var x = b.name.toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    }),
                },
            } ) 
        } else if (x.value === 3) {
            this.setState({
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                },
                character: {
                    pets: this.state.character.pets.sort((x, y) => {
                        return y.isFavorite - x.isFavorite
                    }), 
                },
            });
        } else if (x.value === 4) {
            this.setState({
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                },
                character: {
                    pets: this.state.character.pets.sort((x, y) => {
                        return x.isFavorite - y.isFavorite
                    }), 
                },
            });
        } else if (x.value === 5) {
            this.setState({
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                },
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        let aBreed = a.stats.breedId;
                        let bBreed = b.stats.breedId;
                        if (aBreed > 12) {aBreed = aBreed - 10;}
                        if (bBreed > 12) {bBreed = bBreed - 10;}
                        return aBreed - bBreed;
                    })
                }
            })
        } else if (x.value === 6) {
            this.setState({
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                },
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        let aBreed = a.stats.breedId;
                        let bBreed = b.stats.breedId;
                        if (aBreed > 12) {aBreed = aBreed - 10;}
                        if (bBreed > 12) {bBreed = bBreed - 10;}
                        return bBreed - aBreed;
                    })
                }
            })
        } else if (x.value === 7) {
            this.setState({
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                },
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        return a.stats.health - b.stats.health;
                    }), 
                },
            });
        } else if (x.value === 8) {
            this.setState({
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                },
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        return b.stats.health - a.stats.health;
                    }), 
                },
            });
        } else if (x.value === 9) {
            this.setState({
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                },
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        return a.stats.power - b.stats.power;
                    }), 
                },
            });
        } else if (x.value === 10) {
            this.setState({
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                },
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        return b.stats.power - a.stats.power;
                    }), 
                },
            });
        } else if (x.value === 11) {
            this.setState({
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                },
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        return a.stats.speed - b.stats.speed;
                    }), 
                },
            });
        } else if (x.value === 12) {
            this.setState({
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                },
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        return b.stats.speed - a.stats.speed;
                    }), 
                },
            });
        } else if (x.value === 13) {
            this.setState({
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                },
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        return a.stats.level - b.stats.level;
                    }), 
                },
            });
        } else if (x.value === 14) {
            this.setState({
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                },
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        return b.stats.level - a.stats.level;
                    }), 
                },
            });
        } else if (x.value === 15) {
            this.setState({
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                },
                character: {
                    pets: this.state.character.pets.sort((x, y) => {
                        return y.canBattle - x.canBattle
                    }), 
                },
            });
        } else if (x.value === 16) {
            this.setState({
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                },
                character: {
                    pets: this.state.character.pets.sort((x, y) => {
                        return x.canBattle - y.canBattle
                    }), 
                },
            });
        } else if (x.value === 17) { 
            this.setState( { 
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                }, 
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        var x = a.family.toLowerCase();
                        var y = b.family.toLowerCase();
                        if (x === 'water') {x = 'aquatic'}
                        if (y === 'water') {y = 'aquatic'}
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    }),
                },
            } ) 
        } else if (x.value === 18) { 
            this.setState( { 
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                }, 
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        var y = a.family.toLowerCase();
                        var x = b.family.toLowerCase();
                        if (x === 'water') {x = 'aquatic'}
                        if (y === 'water') {y = 'aquatic'}
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    }),
                },
            } ) 
        } else if (x.value === 19) { 
            this.setState( { 
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                }, 
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        var x = a.strongAgainst[0].toLowerCase();
                        var y = b.strongAgainst[0].toLowerCase();
                        if (x === 'water') {x = 'aquatic'}
                        if (y === 'water') {y = 'aquatic'}
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    }),
                },
            } ) 
        } else if (x.value === 20) { 
            this.setState( { 
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                }, 
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        var y = a.strongAgainst[0].toLowerCase();
                        var x = b.strongAgainst[0].toLowerCase();
                        if (x === 'water') {x = 'aquatic'}
                        if (y === 'water') {y = 'aquatic'}
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    }),
                },
            } ) 
        } else if (x.value === 21) { 
            this.setState( { 
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                }, 
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        var x = a.weakAgainst[0].toLowerCase();
                        var y = b.weakAgainst[0].toLowerCase();
                        if (x === 'water') {x = 'aquatic'}
                        if (y === 'water') {y = 'aquatic'}
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    }),
                },
            } ) 
        } else if (x.value === 22) { 
            this.setState( { 
                petSortValue: { 
                    label: x.label, 
                    value: x.value
                }, 
                character: {
                    pets: this.state.character.pets.sort((a, b) => {
                        var y = a.weakAgainst[0].toLowerCase();
                        var x = b.weakAgainst[0].toLowerCase();
                        if (x === 'water') {x = 'aquatic'}
                        if (y === 'water') {y = 'aquatic'}
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    }),
                },
            } ) 
        } else {
            //Error here?
        }
    };

    render () {
        return (
            <div>
                {this.state.character.pets.length === 0 && <div className="loader" style={{left: '85vw'}} />}
                {this.state.character.pets.length > 0 && 
                    <div className="animate-right" style={{width: '100%'}}>
                        <div className="flex-row flex-between" style={{alignItems: 'center'}}>
                            <input type="text" className="input" placeholder="Search for a pet by name..." onChange={this.searchData}/>
                            <div style={{width: '340px'}}>
                                <Select 
                                    className="sort-select-container"
                                    classNamePrefix="sort-select"
                                    value={this.state.petSortValue}
                                    options={sortOptions} 
                                    onChange={(x) => this.sortPetsBy(x)}
                                    menuPlacement="top"
                                    styles={{
                                        singleValue: (provided, state) => {
                                            const color = 'white';
                                            return { ...provided, color };
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="char-info-overflow" style={{height: '70vh', width: '100%'}} ref="iScroll">
                        {this.state.filteredPets.length > 0 ?
                            this.buildPets(this.state.filteredPets)
                        :
                            this.buildPets(this.state.character.pets)
                        }
                        </div>
                        <div style={{textAlign: 'center'}}>Pets Collected</div>
                        <ProgressBar 
                            current={this.state.numCollected} 
                            remaining={this.state.numNotCollected}
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
                            getPetCalcInfo={this.getPetCalcInfo}
                            petCalcHealth={this.state.petCalcHealth}
                            petCalcPower={this.state.petCalcPower}
                            petCalcSpeed={this.state.petCalcSpeed}
                            petCalcLoading={this.state.petCalcLoading}
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
