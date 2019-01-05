import React, { Component } from 'react';
import './CharacterList.css';

export default class CharacterList extends Component {
    constructor() {
        super();

        this.state = {
            selectedCharName: '',
            selectedCharRealm: '',
            selectedCharBackground: '',
            selectedCharClass: '',
            selectedCharRace: '',
            selectedCharLevel: 0
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

    selectedChar = (name, realm, avatar, className, race, level) => {
        className = this.classNameSet(className);
        race = this.raceNameSet(race);
        this.setState({
            selectedCharName: name, 
            selectedCharRealm: realm, 
            selectedCharBackground: avatar, 
            selectedCharClass: className, 
            selectedCharRace: race, 
            selectedCharLevel: level
        })
    }

    render () {
        console.log('this.props.charsArray', this.props.charsArray);
        return (
            <div>
                <div className="image-mask" style={{
                    background: `url(${this.state.selectedCharBackground}) no-repeat center fixed`,
                    maxWidth: '1600px',
                    height: '1210px',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: '-400px',
                    margin: 'auto'
                }}>
                {this.state.selectedCharName ? 
                    <div className='selected-char' style={{fontSize: 30}}>
                        <div style={{fontSize: 50}}>{this.state.selectedCharName}</div>
                        {this.state.selectedCharLevel} {this.state.selectedCharRace} {this.state.selectedCharClass}</div>
                :
                    <div className='selected-char pulse' style={{fontSize: 60, marginTop: '50%'}}>Select a Character...</div>
                }
                    </div>
                <div className="animate-left hidden-scrollbar" style={{
                    height: '750px',
                    width: '525px',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    overflow: 'scroll',
                    overflowX: 'hidden',
                    overflowY: 'scroll'
                }}>
                    {this.props.charsArray.map(char => {
                        return <div key={`${char.character_name}${char.class}`} 
                                    style={{
                                        background: `url(${char.avatar_large}) no-repeat 10% ${this.raceBackgroundTop(char.race)}%`, 
                                        backgroundSize: '150%'
                                    }} 
                                    className="armorycharimage"
                                    onClick={() => this.selectedChar(char.character_name, char.realm, char.avatar_large, char.class, char.race, char.level)}>
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
            </div>
        )
    }
}