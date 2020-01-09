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
import CharProgression from './CharProgression';
import CharPVP from './CharPVP';
import CharReputation from './CharReputation';
import CharStatistics from './CharStatistics';
import CharBloodmallet from './CharBloodmallet';
import CharRaidbots from './CharRaidbots';
import CharTalents from './CharTalents/CharTalents';

const buttonArray = [
    'Achievements',
    'Hunter Pets',
    'Items',
    'Mounts',
    'Pets',
    'Professions',
    'Progression',
    'PVP',
    'Reputation',
    'Statistics',
    'Stats',
    'Talents',
    // 'Titles',
    // 'Warcraft Logs',
    // 'Raidbots',
    // 'RaiderIO',
    'Bloodmallet'
];

export default class CharacterList extends Component {
    constructor() {
        super();

        this.charRef = React.createRef();

        this.state = {
            charInfoSlide: false,
            selectedCharName: '',
            selectedCharRealm: '',
            selectedCharBackground: 'https://res.cloudinary.com/complexityguild/image/upload/v1546758915/wow/backgrounds/raiders.jpg',
            selectedCharClass: '',
            selectedCharClassColor: '',
            selectedCharClassNum: 0,
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

    selectedChar = (name, realm, avatar, className, classColor, raceName, level, spec, azeriteLvl, azeriteXp, azeriteXpRemaining, classNum) => {
        this.setState({
            selectedCharName: name,
            selectedCharRealm: realm,
            selectedCharBackground: avatar,
            selectedCharClass: className,
            selectedCharClassColor: classColor,
            selectedCharClassNum: classNum,
            selectedCharRace: raceName,
            selectedCharLevel: level,
            selectedCharSpec: spec,
            selectedCharAzeriteLevel: azeriteLvl,
            selectedCharAzeriteXp: azeriteXp,
            selectedCharAzeriteXpRemaining: azeriteXpRemaining,
            selectedButton: ''
        });
        setTimeout(() => { this[name].current.scrollIntoView({ block: 'start', behavior: 'smooth' }) }, 500);
    }

    selectedButton = (button) => {
        this.setState({ charInfoSlide: false, selectedButton: button });
    }

    charInfoSlider = () => {
        this.setState({ charInfoSlide: true });
    }

    render() {
        return (
            <div>
                <div className="char-background image-mask" style={{ background: `-webkit-linear-gradient(17deg, rgb(17, 11, 41, 0.1), rgb(44, 36, 77, 0.1)), url(${this.state.selectedCharBackground}) fixed center -140px no-repeat` }} />
                <div className="char-info-container">
                    {this.props.charsArray.length > 0 &&
                        <div className="animate-bottom hidden-scrollbar char-info-overflow" id={this.state.selectedCharName ? undefined : 'char-info-fullscreen'}>
                            {this.props.charsArray.length > 0 && this.props.charsArray.map(char => {
                                this[char.character_name] = React.createRef();
                                return <div key={`${char.character_name}${char.class}`}
                                    style={{
                                        background: `url(${char.avatar_large}) no-repeat 10% ${this.raceBackgroundTop(char.race)}%`,
                                        backgroundSize: '100%'
                                    }}
                                    className="armorycharimage"
                                    id={this.state.selectedCharName ? undefined : 'armorycharimage-fullscreen'}
                                    onClick={() => this.selectedChar(char.character_name, char.realm, char.avatar_large, char.className, char.classColor, char.raceName, char.level, char.spec_name, char.azerite_lvl, char.azerite_xp, char.azerite_xp_remaining, char.class)}
                                    ref={this[char.character_name]}
                                >
                                    {char.spec_icon ? <div style={{
                                        marginLeft: '5px',
                                        background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/${char.spec_icon}.png)`,
                                        width: '25px',
                                        height: '25px',
                                        backgroundSize: '25px'
                                    }} />
                                        :
                                        <div style={{
                                            marginLeft: '5px',
                                            background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/INV_Misc_QuestionMark.png)`,
                                            width: '25px',
                                            height: '25px',
                                            backgroundSize: '25px'
                                        }} />
                                    }
                                    <div className="charname" style={{color: char.classColor}}>{char.character_name}</div>
                                </div>
                            })}
                        </div>
                    }
                    {this.state.selectedCharName ?
                        <div className='selected-char'>
                            <div className="selected-char-info">
                                <div>
                                    <div className="selected-char-name">{this.state.selectedCharName}</div>
                                    <div className="selected-char-extrainfo">
                                        {this.state.selectedCharLevel} {this.state.selectedCharRace} {this.state.selectedCharSpec} {this.state.selectedCharClass}
                                    </div>
                                </div>
                                {this.state.selectedCharAzeriteLevel > 0 &&
                                    <div>
                                        <div className="selected-char-extrainfo">Azerite Level: {this.state.selectedCharAzeriteLevel}</div>
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
                            <div style={{ width: '100vw', height: '100vh' }}>
                                <div className="lds-roller">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </div>
                            :
                            null
                    }
                    <div className="char-info">
                        {this.state.selectedButton === 'Achievements' &&
                            <CharAchievements selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} charInfoSlider={this.charInfoSlider} />
                        }
                        {this.state.selectedButton === 'Hunter Pets' &&
                            <CharHunterPets selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} charInfoSlider={this.charInfoSlider} />
                        }
                        {this.state.selectedButton === 'Mounts' &&
                            <CharMounts selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} charInfoSlider={this.charInfoSlider} />
                        }
                        {this.state.selectedButton === 'Stats' &&
                            <CharStats selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} charInfoSlider={this.charInfoSlider} />
                        }
                        {this.state.selectedButton === 'Items' &&
                            <CharItems selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} selectedCharClassNum={this.state.selectedCharClassNum} selectedCharClassColor={this.state.selectedCharClassColor} selectedCharSpec={this.state.selectedCharSpec} charInfoSlider={this.charInfoSlider} />
                        }
                        {this.state.selectedButton === 'Pets' &&
                            <CharPets selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} charInfoSlider={this.charInfoSlider} />
                        }
                        {this.state.selectedButton === 'Professions' &&
                            <CharProfessions selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} charInfoSlider={this.charInfoSlider} />
                        }
                        {this.state.selectedButton === 'Progression' &&
                            <CharProgression selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} charInfoSlider={this.charInfoSlider} />
                        }
                        {this.state.selectedButton === 'PVP' &&
                            <CharPVP selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} charInfoSlider={this.charInfoSlider} />
                        }
                        {this.state.selectedButton === 'Reputation' &&
                            <CharReputation selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} charInfoSlider={this.charInfoSlider} />
                        }
                        {this.state.selectedButton === 'Statistics' &&
                            <CharStatistics selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} charInfoSlider={this.charInfoSlider} />
                        }
                        {this.state.selectedButton === 'Bloodmallet' &&
                            <CharBloodmallet selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} selectedCharClass={this.state.selectedCharClass} selectedCharClassColor={this.state.selectedCharClassColor} selectedCharSpec={this.state.selectedCharSpec} charInfoSlider={this.charInfoSlider} />
                        }
                        {this.state.selectedButton === 'Raidbots' &&
                            <CharRaidbots selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} selectedCharClass={this.state.selectedCharClass} selectedCharClassColor={this.state.selectedCharClassColor} selectedCharClassNum={this.state.selectedCharClassNum} selectedCharSpec={this.state.selectedCharSpec} charInfoSlider={this.charInfoSlider} />
                        }
                        {this.state.selectedButton === 'Talents' &&
                            <CharTalents selectedCharName={this.state.selectedCharName} selectedCharRealm={this.state.selectedCharRealm} selectedCharClass={this.state.selectedCharClass} selectedCharClassColor={this.state.selectedCharClassColor} selectedCharSpec={this.state.selectedCharSpec} charInfoSlider={this.charInfoSlider} />
                        }
                    </div>
                    {this.state.selectedCharName &&
                        <div className="flex-row flex-center flex-wrap char-button-container" style={{width: '100%'}}>
                            <div className="gradient-line-white" style={{width: '100%'}} />
                            {buttonArray.map(button => {
                                return this.state.selectedButton === button ?
                                    <div className='button-border animate-bottom' key={button}>
                                        <div className='button-text' id='button-selected'>{button}</div>
                                    </div>
                                    :
                                    button === 'Hunter Pets' ?
                                        this.state.selectedCharClass === 'Hunter' ?
                                            <div className='button-border animate-bottom' key={button} onClick={() => this.selectedButton(button)}>
                                                <div className='button-text'>{button}</div>
                                            </div>
                                        :
                                            <div className='button-border animate-bottom' id='non-allowed' key={button} >
                                                <div className='button-text'>{button}</div>
                                            </div>
                                    :
                                    button === 'Bloodmallet' ?
                                        this.state.selectedCharSpec === 'Restoration' ? 
                                            <div className='button-border animate-bottom' id={'non-allowed'} key={button}>
                                                <div className='button-text'>{button}</div>
                                            </div>
                                        : this.state.selectedCharSpec === 'Mistweaver' ?
                                            <div className='button-border animate-bottom' id={'non-allowed'} key={button}>
                                                <div className='button-text'>{button}</div>
                                            </div>
                                        : this.state.selectedCharSpec === 'Holy' ? 
                                            <div className='button-border animate-bottom' id={'non-allowed'} key={button}>
                                                <div className='button-text'>{button}</div>
                                            </div>
                                        :
                                            <div className='button-border animate-bottom' key={button} onClick={() => this.selectedButton(button)}>
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