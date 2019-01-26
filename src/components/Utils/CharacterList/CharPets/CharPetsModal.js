import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/lab/Slider';
import Slide from '@material-ui/core/Slide';
import ReactTooltip from 'react-tooltip';
import Select from 'react-select';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

const qualityOptions = [
    { value: 1, label: 'Poor', color: '#5C5C5C' },
    { value: 1.1, label: 'Common', color: 'white' },
    { value: 1.2, label: 'Uncommon', color: '#02ff4e' },
    { value: 1.3, label: 'Rare', color: '#0281ff' },
    // At present, Epic and Legendary pets do not exist for players
    // { value: 1.4, label: 'Epic', color: '#c600ff' },
    // { value: 1.5, label: 'Legendary', color: '#ff8002' },
]

const breedOptions = [
    { value: 4, label: '4/14 (P/P)' },
    { value: 5, label: '5/15 (S/S)' },
    { value: 6, label: '6/16 (H/H)' },
    { value: 7, label: '7/17 (H/P)' },
    { value: 8, label: '8/18 (P/S)' },
    { value: 9, label: '9/19 (H/S)' },
    { value: 10, label: '10/20 (P/B)' },
    { value: 11, label: '11/21 (S/B)' },
    { value: 12, label: '12/22 (H/B)' },
    { value: 3, label: '3/13 (B/B)' },
]

class CharPetsModal extends React.Component {

    abilitySelected = (firstSelected, secondSelected, thirdSelected, slot, order) => {
        if (firstSelected === false && slot === 0 && order === 0) {
            return null
        } else if (firstSelected === true && slot === 0 && order === 3) {
            return null
        } else if (secondSelected === false && slot === 1 && order === 1) {
            return null
        } else if (secondSelected === true && slot === 1 && order === 4) {
            return null
        } else if (secondSelected === true && slot === 1 && order === 4) {
            return null
        } else if (thirdSelected === false && slot === 2 && order === 2) {
            return null
        } else if (thirdSelected === true && slot === 2 && order === 5) {
            return null
        } else {
            return 'opacity25'
        }
    }

    buildAbilities = (petObj) => {
        return petObj.stats.speciesInfo.abilities.sort((x, y) => {
            return x.order - y.order
        }).map(obj => {
            return <a className="flex-column flex-center" key={obj.id} href={`https://www.wowhead.com/pet-ability=${obj.id}`} target="_blank" rel="noopener noreferrer">
                <div data-tip="Level Required" style={{textAlign: 'center'}}>{obj.requiredLevel}</div>
                <div className ={`icon50 ${this.abilitySelected(petObj.isFirstAbilitySlotSelected, petObj.isSecondAbilitySlotSelected, petObj.isThirdAbilitySlotSelected, obj.slot, obj.order)}`} style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/${obj.icon}.png`, backgroundSize: '50px'}} />
            </a>
        });
    };

    breedHealth = (breed) => {
        if (breed === 4 || breed === 14 || breed === 5 || breed === 15 || breed === 8 || breed === 18) {return 0}
        else if (breed === 6 || breed === 16) {return 20}
        else if (breed === 7 || breed === 17 || breed === 9 || breed === 19 || breed === 12 || breed === 22) {return 9}
        else if (breed === 10 | breed === 20 || breed === 11 || breed === 21) {return 4}
        else if (breed === 3 || breed === 13) {return 5}
        else {return 0}
    }

    breedPower = (breed) => {
        if (breed === 4 || breed === 14) {return 20}
        else if (breed === 5 || breed === 15 || breed === 6 || breed === 16 || breed === 9 || breed === 19) {return 0}
        else if (breed === 7 || breed === 17 || breed === 8 || breed === 18 || breed === 10 | breed === 20) {return 9}
        else if (breed === 11 | breed === 21 || breed === 12 | breed === 22) {return 4}
        else if (breed === 3 || breed === 13) {return 5}
        else {return 0}
    }

    breedSpeed = (breed) => {
        if (breed === 4 || breed === 14 || breed === 6 || breed === 16 || breed === 7 || breed === 17) {return 0}
        else if (breed === 5 || breed === 15) {return 20}
        else if (breed === 8 || breed === 18 || breed === 9 || breed === 19 || breed === 11 | breed === 21) {return 9}
        else if (breed === 10 | breed === 20 || breed === 12 | breed === 22) {return 4}
        else if (breed === 3 || breed === 13) {return 5}
        else {return 0}
    }

    //Get base values from current pet's stats.
    baseHealth = () => {
        return Math.round((((( (this.props.pet.stats.health-100) / ((this.props.pet.stats.petQualityId/10)+1) )/25)/5) - (this.breedHealth(this.props.pet.stats.breedId) / 10)) * 1000) / 1000;
    };

    basePower = () => {
        return Math.round((((this.props.pet.stats.power / ((this.props.pet.stats.petQualityId / 10) + 1)) / this.props.pet.stats.level) - (this.breedPower(this.props.pet.stats.breedId) / 10)) * 1000) / 1000;
    };

    baseSpeed = () => {
        return Math.round((((this.props.pet.stats.speed / ((this.props.pet.stats.petQualityId / 10) + 1)) / this.props.pet.stats.level) - (this.breedSpeed(this.props.pet.stats.breedId) / 10)) * 1000) / 1000;
    };

    //Calculated values from the base value
    petCalcHealth = () => {
        return Math.round(((this.baseHealth() + (this.breedHealth(this.props.petCalcBreedValue.value) / 10)) * 5 * this.props.petCalcSliderValue * this.props.petCalcQualityValue.value) + 100);
    };

    petCalcPower = () => {
        return Math.round((this.basePower() + (this.breedPower(this.props.petCalcBreedValue.value) / 10)) * this.props.petCalcSliderValue * this.props.petCalcQualityValue.value);
    };

    petCalcSpeed = () => {
        return Math.round((this.baseSpeed() + (this.breedSpeed(this.props.petCalcBreedValue.value) / 10)) * this.props.petCalcSliderValue * this.props.petCalcQualityValue.value);
    };

    droppedPetQualityOptions = () => {
        if (this.props.pet.stats.petQualityId === 0 ) {return [{ value: 1, label: 'Poor', color: '#5C5C5C' }]}
        else if (this.props.pet.stats.petQualityId === 1 ) {return [{ value: 1.1, label: 'Common', color: 'white' }]}
        else if (this.props.pet.stats.petQualityId === 2 ) {return [{ value: 1.2, label: 'Uncommon', color: '#02ff4e' }]}
        else if (this.props.pet.stats.petQualityId === 3 ) {return [{ value: 1.3, label: 'Rare', color: '#0281ff' }]}
        else if (this.props.pet.stats.petQualityId === 4 ) {return [{ value: 1.4, label: 'Epic', color: '#c600ff' }]}
        else if (this.props.pet.stats.petQualityId === 5 ) {return [{ value: 1.5, label: 'Legendary', color: '#ff8002' }]}
        else {return {value: 0, label: 'Unknown', color: '#ffffff'} }
    }

    render() {

        return (
            <div>
                <Dialog
                    open={this.props.petModalIsOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.props.petModalClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    {this.props.loading ? 
                        <DialogContent style={{width: '500px', height: '320px'}}>
                            <div className="loader"></div>
                        </DialogContent>
                    :
                        <div>
                            <DialogTitle id="alert-dialog-slide-title">
                                <a className="flex-row" style={{alignItems: 'center'}} data-wowhead={`npc=${this.props.pet.creatureId}`} href={`https://www.wowhead.com/npc=${this.props.pet.creatureId}`} target="_blank" rel="noopener noreferrer">
                                    <div className ="icon60" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533519767/wow/icons/${this.props.pet.icon.replace(/&|-/g, '_')}.png) 60px`, backgroundSize: '60px'}} />
                                    <div style={{color: this.props.pet.qualityColor, marginLeft: '10px'}}>{this.props.pet.name} {this.props.pet.name !== this.props.pet.creatureName && `the ${this.props.pet.creatureName}`}</div>
                                </a>
                                {this.props.pet.canBattle && <div className="pet-modal-description">{this.props.pet.stats.speciesInfo.description}</div>}
                            </DialogTitle>
                            <DialogContent>
                                <div className={`flex-row flex-between`} >
                                    {this.props.pet.canBattle === true ? 
                                        <div className="flex-column flex-between" style={{width: '800px', alignContent: 'center'}}>
                                            <div className="flex-row flex-between pet-stat-modal-row">
                                                <div className="pet-stats" data-place='right' data-tip={this.props.petBreedTooltip(this.props.pet.stats.breedId)}>{this.props.petBreedInfo(this.props.pet.stats.breedId)}</div>
                                                <div className="flex-row pet-stats" data-tip='Pet Family'>
                                                    <div className ="icon40" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547745534/site/icons/pets/family.png`, backgroundSize: '40px'}} />
                                                    <a href={`https://www.wowhead.com/${this.props.familyWowhead(this.props.pet.family)}`} target="_blank" rel="noopener noreferrer">
                                                        <div className ="icon40" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/icon_petfamily_${this.props.pet.family === 'dragonkin' ? 'dragon' : `${this.props.pet.family}`}.png) 40px`, backgroundSize: '40px'}} />
                                                    </a>
                                                </div>
                                                <div className="flex-row pet-stats" data-tip='Strong Against'>
                                                    <div className ="icon40" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547745534/site/icons/pets/strong.png`, backgroundSize: '40px'}} />
                                                    {this.props.pet.strongAgainst.map(strong => {
                                                        return <a href={`https://www.wowhead.com/${this.props.familyWowhead(strong)}`} key={strong} target="_blank" rel="noopener noreferrer">
                                                            <div className ="icon40" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/icon_petfamily_${strong === 'dragonkin' ? 'dragon' : `${strong}`}.png) 40px`, backgroundSize: '40px'}} />
                                                        </a>
                                                    })}
                                                </div>
                                                <div className="flex-row pet-stats" data-tip='Weak Against'>
                                                    <div className ="icon40" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547745534/site/icons/pets/weak.png`, backgroundSize: '40px'}} />
                                                    {this.props.pet.weakAgainst.map(weak => {
                                                        return <a href={`https://www.wowhead.com/${this.props.familyWowhead(weak)}`} key={weak} target="_blank" rel="noopener noreferrer">
                                                            <div className ="icon40" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/icon_petfamily_${weak === 'dragonkin' ? 'dragon' : `${weak}`}.png) 40px`, backgroundSize: '40px'}} />
                                                        </a>
                                                    })}
                                                </div>
                                                <div className={`icon40 ${this.props.pet.isFavorite === false && 'opacity25'}`} style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547742281/site/icons/pets/${this.props.pet.isFavorite === true ? 'favorite' : 'notfavorite' }.png) 40px`, backgroundSize: '40px'}} data-tip={`${this.props.pet.isFavorite === true ? 'This pet is a favorite.' : 'This pet is not a favorite.'}`}/>
                                            </div>
                                            <div className="flex-row flex-between pet-stat-modal-row">
                                                <div className="pet-stats">Level {this.props.pet.stats.level}</div>
                                                <div className="flex-row pet-stats" data-tip='Pet Health Points'>
                                                    <div className ="icon40" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547749233/site/icons/pets/health.png`, backgroundSize: '40px'}} />
                                                    <div style={{width: '36px'}}>{this.props.pet.stats.health}</div>
                                                </div>
                                                <div className="flex-row pet-stats" data-tip='Pet Power'>
                                                    <div className ="icon40" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547571993/site/icons/stats/str.png`, backgroundSize: '40px'}} />
                                                    <div style={{width: '28px'}}>{this.props.pet.stats.power}</div>
                                                </div>
                                                <div className="flex-row pet-stats" data-tip='Pet Speed'>
                                                    <div className ="icon40" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547571993/site/icons/stats/speed.png`, backgroundSize: '40px'}} />
                                                    <div style={{width: '28px'}}>{this.props.pet.stats.speed}</div>
                                                </div>
                                                <div className={`icon40 ${this.props.pet.canBattle === false && 'opacity25'}`} style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547742281/site/icons/pets/battle.png) 40px`, backgroundSize: '40px'}} data-tip={`${this.props.pet.canBattle === false ? 'This pet is unable to do battle.' : 'This pet is able to do battle.'}`}/>
                                            </div>
                                            <div className="pet-stat-modal-row">
                                                <div className="flex-column flex-between pet-stat-modal-row">
                                                    <div className="pet-modal-subtitle">Abilities</div>
                                                    <div className="flex-row flex-between">
                                                        {this.buildAbilities(this.props.pet)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="pet-stat-modal-row pet-modal-subtitle">Battle Pet Calculator</div>
                                            <div className="flex-row flex-between">
                                                <div className="pet-stat-modal-row">Level: {this.props.petCalcSliderValue}</div>
                                                <div style={{width: '150px'}}>
                                                    <Select 
                                                        className="quality-select-container"
                                                        classNamePrefix="quality-select"
                                                        value={this.props.petCalcQualityValue}
                                                        options={this.props.pet.stats.speciesInfo.source.includes('Drop') ? this.droppedPetQualityOptions() : qualityOptions} 
                                                        onChange={this.props.handleQualityChange}
                                                        menuPlacement="top"
                                                        styles={{
                                                            singleValue: (provided, state) => {
                                                                const color = state.data.color;
                                                                return { ...provided, color };
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div style={{width: '150px'}}>
                                                    <Select 
                                                        className="breed-select-container"
                                                        classNamePrefix="breed-select"
                                                        value={this.props.petCalcBreedValue}
                                                        options={breedOptions} 
                                                        onChange={this.props.handleBreedChange}
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
                                            <div className="flex-row flex-center" style={{overflow: 'hidden', padding: '22px 0px', width: '100%'}}>
                                                <Slider
                                                    value={this.props.petCalcSliderValue}
                                                    min={1}
                                                    max={25}
                                                    step={1}
                                                    onChange={this.props.handleSliderChange}
                                                />
                                            </div>
                                            <div className="flex-row flex-between pet-stat-modal-row">
                                                <div className="flex-row pet-stats" data-tip='Pet Health Points'>
                                                    <div className ="icon40" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547749233/site/icons/pets/health.png`, backgroundSize: '40px'}} />
                                                    <div style={{width: '36px'}}>{this.petCalcHealth()}</div>
                                                </div>
                                                <div className="flex-row pet-stats" data-tip='Pet Power'>
                                                    <div className ="icon40" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547571993/site/icons/stats/str.png`, backgroundSize: '40px'}} />
                                                    <div style={{width: '28px'}}>{this.petCalcPower()}</div>
                                                </div>
                                                <div className="flex-row pet-stats" data-tip='Pet Speed'>
                                                    <div className ="icon40" style={{background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547571993/site/icons/stats/speed.png`, backgroundSize: '40px'}} />
                                                    <div style={{width: '28px'}}>{this.petCalcSpeed()}</div>
                                                </div>
                                            </div>
                                        </div>
                                    :
                                        <div className="pet-modal-subtitle">This pet cannot do battle and therefor has no abilities.</div>
                                    }
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.props.petModalClose} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                            <ReactTooltip place='left' type='light'/>
                        </div>
                    }
                </Dialog>
            </div>
        );
    }
}

export default CharPetsModal