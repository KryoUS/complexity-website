import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ReactTooltip from 'react-tooltip';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

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
                                <div className="pet-modal-description">{this.props.pet.stats.speciesInfo.description}</div>
                            </DialogTitle>
                            <DialogContent>
                                <div className={`flex-row flex-between`} >
                                    <div className="flex-column flex-between" style={{width: '600px'}}>
                                        <div className="flex-row flex-between pet-stat-modal-row">
                                            <div className="pet-stats">{this.props.pet.slot < 4 ? `Slot ${this.props.pet.slot}` : 'Unequipped'}</div>
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
                                            {this.props.pet.canBattle === false ? 
                                                <div className="pet-modal-subtitle">This pet cannot do battle and therefor has no abilities.</div>
                                            :
                                                <div className="flex-column flex-between pet-stat-modal-row">
                                                    <div className="pet-modal-subtitle">Abilities</div>
                                                    <div className="flex-row flex-between">
                                                        {this.buildAbilities(this.props.pet)}
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.props.petModalClose} color="primary">
                                    Close
                                </Button>
                            </DialogActions>
                            <ReactTooltip place='left'/>
                        </div>
                    }
                </Dialog>
            </div>
        );
    }
}

export default CharPetsModal