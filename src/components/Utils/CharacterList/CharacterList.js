import React, { Component } from 'react';
import './CharacterList.css';
import CharAchievements from './CharAchievements';
import CharMounts from './CharMounts';
import CharHunterPets from './CharHunterPets';
import ProgressBar from '../ProgressBar';
import CharStats from './CharStats';
import CharItems from './CharItems';
import CharPets from './CharPets/CharPets';
import CharProfessions from './CharProfessions';

const buttonArray = [
    'Achievements', 
    'Hunter Pets', 
    'Items', 
    'Mounts', 
    'Pets', 
    'Professions', 
    'Progression', 
    'PVP', 
    'Quests', 
    'Reputation', 
    'Statistics', 
    'Stats', 
    'Talents', 
    'Titles',
    'Warcraft Logs',
    'Raidbots Sim',
    'RaiderIO'
];

export default class CharacterList extends Component {
    constructor() {
        super();

        this.state = {
            selectedCharName: '',
            selectedCharRealm: '',
            selectedCharBackground: 'https://res.cloudinary.com/complexityguild/image/upload/v1546758915/wow/backgrounds/raiders.jpg',
            selectedCharClass: '',
            selectedCharRace: '',
            selectedCharLevel: 0,
            selectedCharSpec: '',
            selectedCharAzeriteLevel: 0,
            selectedCharAzeriteXp: 0,
            selectedCharAzeriteXpRemaining: 0,
            selectedButton: ''
        }
    }

    raceBackgroundTop = (x) => {
        switch (x) {
            case 1: //Human
                return 34
            case 3: //Dwarf
                return 42
            case 4: //Night Elf
                return 30
            case 7: //Gnome
                return 50
            case 25: //Pandaren
                return 30
            case 29: //Void Elf
                return 36
            case 30: //Draenei
                return 30
            case 34: //Dark-Iron Dwarf
                return 42
            default:
                return 30
        }
    }

    //TODO: The two functions below need to instead be an API reference to the server
    classNameSet = (x) => {
        switch (x) {
            case 1:
                return 'Warrior'
            case 2:
                return 'Paladin'
            case 3:
                return 'Hunter'
            case 4:
                return 'Rogue'
            case 5:
                return 'Priest'
            case 6:
                return 'Death Knight'
            case 7:
                return 'Shaman'
            case 8:
                return 'Mage'
            case 9:
                return 'Warlock'
            case 10:
                return 'Monk'
            case 11:
                return 'Druid'
            case 12:
                return 'Demon Hunter'
            default:
                return 'Unknown Class'
        }
    }

    raceNameSet = (x) => {
        switch (x) {
            case 1:
                return 'Human'
            case 2:
                return 'Orc'
            case 3:
                return 'Dwarf'
            case 4:
                return 'Night Elf'
            case 5:
                return 'Undead'
            case 6:
                return 'Tauren'
            case 7:
                return 'Gnome'
            case 8:
                return 'Troll'
            case 9:
                return 'Goblin'
            case 10:
                return 'Blood Elf'
            case 11:
                return 'Draenei'
            case 22:
                return 'Worgen'
            case 24:
                return 'Pandaren'
            case 25:
                return 'Pandaren'
            case 26:
                return 'Pandaren'
            case 27:
                return 'Nightborne'
            case 28:
                return 'Highmountain Tauren'
            case 29:
                return 'Void Elf'
            case 30:
                return 'Lightforged Draenei'
            case 34:
                return 'Dark Iron Dwarf'
            case 36:
                return `Mag'har Orc`
            default:
                return 'Unknown Race'
        }
    }

    selectedChar = (name, realm, avatar, className, race, level, spec, azeriteLvl, azeriteXp, azeriteXpRemaining) => {
        className = this.classNameSet(className);
        race = this.raceNameSet(race);
        this.setState({
            selectedCharName: name, 
            selectedCharRealm: realm, 
            selectedCharBackground: avatar, 
            selectedCharClass: className, 
            selectedCharRace: race, 
            selectedCharLevel: level,
            selectedCharSpec: spec,
            selectedCharAzeriteLevel: azeriteLvl,
            selectedCharAzeriteXp: azeriteXp,
            selectedCharAzeriteXpRemaining: azeriteXpRemaining,
            selectedButton: ''
        })
    }

    selectedButton = (button) => {
        this.setState({selectedButton: button});
    }

    render () {
        return (
            <div>
                <div className="char-background image-mask" style={{backgroundImage: `url(${this.state.selectedCharBackground})`}}/>
                <div className="char-info-container">
                    {this.props.charsArray.length <= 0 ? 
                        <div style={{width: '33vw'}} />
                    :
                        <div className="animate-left hidden-scrollbar char-info-overflow">
                            {this.props.charsArray.length > 0 && this.props.charsArray.map(char => {
                                return <div key={`${char.character_name}${char.class}`} 
                                            style={{
                                                background: `url(${char.avatar_large}) no-repeat 10% ${this.raceBackgroundTop(char.race)}%`, 
                                                backgroundSize: '150%'
                                            }} 
                                            className="armorycharimage"
                                            onClick={() => this.selectedChar(char.character_name, char.realm, char.avatar_large, char.class, char.race, char.level, char.spec_name, char.azerite_lvl, char.azerite_xp, char.azerite_xp_remaining)}>
                                    {char.spec_icon ? <div style={{
                                        marginLeft: '5px',
                                        background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/${char.spec_icon}.png)`,
                                        width: '25px',
                                        height: '25px',
                                        backgroundSize: '25px'
                                    }}/>
                                    :
                                    <div style={{
                                        marginLeft: '5px',
                                        background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/INV_Misc_QuestionMark.png)`,
                                        width: '25px',
                                        height: '25px',
                                        backgroundSize: '25px'
                                    }}/>
                                    }
                                    <div className="charname">{char.character_name}</div>
                                </div>
                            })}
                        </div>
                    }
                    {this.state.selectedCharName ? 
                        <div className='selected-char'>
                            <div className="selected-char-info">
                                <div>
                                    <div style={{fontSize: 50}}>{this.state.selectedCharName}</div>
                                    {this.state.selectedCharLevel} {this.state.selectedCharRace} {this.state.selectedCharSpec} {this.state.selectedCharClass}
                                </div>
                                {this.state.selectedCharAzeriteLevel > 0 &&
                                    <div>
                                        <div>Azerite Level: {this.state.selectedCharAzeriteLevel}</div>
                                        <ProgressBar 
                                            current={this.state.selectedCharAzeriteXp} 
                                            remaining={this.state.selectedCharAzeriteXpRemaining} 
                                            height={'30px'}
                                            bgColor={'#edba03'}
                                            fontSize={'18px'}
                                        />
                                    </div>
                                }
                            </div>
                        </div>
                    :
                        this.props.charsArray.length <= 0 ? 
                            <div className="loader" />
                        :
                            <div className='selected-char pulse-color pulse-select'>Select a Character...</div>
                    }
                    <div className="char-info">
                        {this.state.selectedButton === 'Achievements' && <CharAchievements selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} />}
                        {this.state.selectedButton === 'Hunter Pets' && <CharHunterPets selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm}  />}
                        {this.state.selectedButton === 'Mounts' && <CharMounts selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} />}
                        {this.state.selectedButton === 'Stats' && <CharStats selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} />}
                        {this.state.selectedButton === 'Items' && <CharItems selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} />}
                        {this.state.selectedButton === 'Pets' && <CharPets selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} />}
                        {this.state.selectedButton === 'Professions' && <CharProfessions selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} />}
                    </div>
                    {this.state.selectedCharName && 
                        <div className="flex-row flex-center flex-wrap char-button-container">
                            {buttonArray.map(button => {
                                return this.state.selectedButton === button ?
                                    <div className='button-border animate-bottom' id='button-selected' key={button}>
                                        <div className='button-text'>{button}</div>
                                    </div>
                                :
                                    button === 'Hunter Pets' ? 
                                        this.state.selectedCharClass === 'Hunter' ? 
                                            <div className='button-border animate-bottom' key={button} onClick={() => this.selectedButton(button)}>
                                                <div className='button-text'>{button}</div>
                                            </div>
                                        :
                                            <div className='button-border animate-bottom' id='non-hunter' key={button} >
                                                <div className='button-text'>{button}</div>
                                            </div>
                                    :
                                        <div className='button-border animate-bottom' key={button} onClick={() => this.selectedButton(button)}>
                                            <div className='button-text'>{button}</div>
                                        </div>
                            })}
                        </div>
                    }
                </div>
            </div>
        )
    }
}