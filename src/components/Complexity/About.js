import React, { Component } from 'react';
import axios from 'axios';
import './About.css';

class About extends Component {
    constructor() {
        super();

        this.state = {
            wowProgress: {},
            raiderIO: {},
            raiderIOLoaded: false,
        }
    }

    componentDidMount = () => {
        axios.get('/api/wowprogress/guildranking').then(res => {
            this.setState({ wowProgress: res.data });
        }).catch(wowProgressError => {
            console.log(wowProgressError);
        });
        axios.get('/api/raiderio/guildranking').then(res => {
            this.setState({ raiderIO: res.data , raiderIOLoaded: true});
        }).catch(raiderIOError => {
            console.log(raiderIOError);
        });
    }

    render(){
        return(
            <div className="about-div fade1s" style={{background: `url('https://res.cloudinary.com/complexityguild/image/upload/v1534801397/wow/backgrounds/about.jpg') top center no-repeat`}}>
                <div className="about-info">
                    <div className="guildinfo-container">
                        <div style={{fontSize: '20px', textAlign: 'center'}}>Guild Scores</div>
                        <div>Score: {this.state.wowProgress.score}</div>
                        <div><a href="https://www.wowprogress.com/pve/world">World Rank:</a> {this.state.wowProgress.world_rank}</div>
                        <div><a href="https://www.wowprogress.com/pve/us">Region Rank:</a> {this.state.wowProgress.area_rank}</div>
                        <div><a href="https://www.wowprogress.com/pve/us/thunderlord">Realm Rank:</a> {this.state.wowProgress.realm_rank}</div>
                        <div style={{textAlign: 'right', fontSize: '10px', marginTop: 'auto'}}>Provided by <a href="https://www.wowprogress.com/">WoWProgress.com</a></div>
                    </div>
                    {this.state.raiderIOLoaded && 
                        <div className="guildinfo-container" style={{width: '600px'}}>
                            <div style={{fontSize: '20px', textAlign: 'center'}}>Raid Progress</div>
                            <div>
                                <div style={{fontSize: '18px'}}>Uldir {this.state.raiderIO.raid_progression.uldir.summary}</div>
                                <div className="evenspaced-row">
                                    <div style={{width: '120px'}}>Normal: {this.state.raiderIO.raid_progression.uldir.normal_bosses_killed}/{this.state.raiderIO.raid_progression.uldir.total_bosses}</div>
                                    <div style={{width: '120px'}}>World: {this.state.raiderIO.raid_rankings.uldir.normal.world}</div>
                                    <div style={{width: '120px'}}>Region: {this.state.raiderIO.raid_rankings.uldir.normal.region}</div>
                                    <div style={{width: '120px'}}>Realm: {this.state.raiderIO.raid_rankings.uldir.normal.realm}</div>
                                </div>
                                <div className="evenspaced-row">
                                    <div style={{width: '120px'}}>Heroic: {this.state.raiderIO.raid_progression.uldir.heroic_bosses_killed}/{this.state.raiderIO.raid_progression.uldir.total_bosses}</div>
                                    <div style={{width: '120px'}}>World: {this.state.raiderIO.raid_rankings.uldir.heroic.world}</div>
                                    <div style={{width: '120px'}}>Region: {this.state.raiderIO.raid_rankings.uldir.heroic.region}</div>
                                    <div style={{width: '120px'}}>Realm: {this.state.raiderIO.raid_rankings.uldir.heroic.realm}</div>
                                </div>
                                { this.state.raiderIO.raid_progression.uldir.mythic_bosses_killed > 0 &&
                                <div className="evenspaced-row">
                                    <div style={{width: '120px'}}>Mythic: {this.state.raiderIO.raid_progression.uldir.mythic_bosses_killed}/{this.state.raiderIO.raid_progression.uldir.total_bosses}</div>
                                    <div style={{width: '120px'}}>World: {this.state.raiderIO.raid_rankings.uldir.mythic.world}</div>
                                    <div style={{width: '120px'}}>Region: {this.state.raiderIO.raid_rankings.uldir.mythic.region}</div>
                                    <div style={{width: '120px'}}>Realm: {this.state.raiderIO.raid_rankings.uldir.mythic.realm}</div>
                                </div>
                                }
                            </div>
                            <div style={{marginTop: '10px'}}>
                                <div style={{fontSize: '18px'}}>Antorus the Burning Throne {this.state.raiderIO.raid_progression["antorus-the-burning-throne"].summary}</div>
                                <div className="evenspaced-row">
                                    <div style={{width: '120px'}}>Normal: {this.state.raiderIO.raid_progression["antorus-the-burning-throne"].normal_bosses_killed}/{this.state.raiderIO.raid_progression["antorus-the-burning-throne"].total_bosses}</div>
                                    <div style={{width: '120px'}}>World: {this.state.raiderIO.raid_rankings["antorus-the-burning-throne"].normal.world}</div>
                                    <div style={{width: '120px'}}>Region: {this.state.raiderIO.raid_rankings["antorus-the-burning-throne"].normal.region}</div>
                                    <div style={{width: '120px'}}>Realm: {this.state.raiderIO.raid_rankings["antorus-the-burning-throne"].normal.realm}</div>
                                </div>
                                <div className="evenspaced-row">
                                    <div style={{width: '120px'}}>Heroic: {this.state.raiderIO.raid_progression["antorus-the-burning-throne"].heroic_bosses_killed}/{this.state.raiderIO.raid_progression["antorus-the-burning-throne"].total_bosses}</div>
                                    <div style={{width: '120px'}}>World: {this.state.raiderIO.raid_rankings["antorus-the-burning-throne"].heroic.world}</div>
                                    <div style={{width: '120px'}}>Region: {this.state.raiderIO.raid_rankings["antorus-the-burning-throne"].heroic.region}</div>
                                    <div style={{width: '120px'}}>Realm: {this.state.raiderIO.raid_rankings["antorus-the-burning-throne"].heroic.realm}</div>
                                </div>
                                { this.state.raiderIO.raid_progression["antorus-the-burning-throne"].mythic_bosses_killed > 0 &&
                                <div className="evenspaced-row">
                                    <div style={{width: '120px'}}>Mythic: {this.state.raiderIO.raid_progression["antorus-the-burning-throne"].mythic_bosses_killed}/{this.state.raiderIO.raid_progression["antorus-the-burning-throne"].total_bosses}</div>
                                    <div style={{width: '120px'}}>World: {this.state.raiderIO.raid_rankings["antorus-the-burning-throne"].mythic.world}</div>
                                    <div style={{width: '120px'}}>Region: {this.state.raiderIO.raid_rankings["antorus-the-burning-throne"].mythic.region}</div>
                                    <div style={{width: '120px'}}>Realm: {this.state.raiderIO.raid_rankings["antorus-the-burning-throne"].mythic.realm}</div>
                                </div>
                                }
                            </div>
                            <div style={{marginTop: '10px'}}>
                                <div style={{fontSize: '18px'}}>Tomb of Sargeras {this.state.raiderIO.raid_progression["tomb-of-sargeras"].summary}</div>
                                <div className="evenspaced-row">
                                    <div style={{width: '120px'}}>Normal: {this.state.raiderIO.raid_progression["tomb-of-sargeras"].normal_bosses_killed}/{this.state.raiderIO.raid_progression["tomb-of-sargeras"].total_bosses}</div>
                                    <div style={{width: '120px'}}>World: {this.state.raiderIO.raid_rankings["tomb-of-sargeras"].normal.world}</div>
                                    <div style={{width: '120px'}}>Region: {this.state.raiderIO.raid_rankings["tomb-of-sargeras"].normal.region}</div>
                                    <div style={{width: '120px'}}>Realm: {this.state.raiderIO.raid_rankings["tomb-of-sargeras"].normal.realm}</div>
                                </div>
                                <div className="evenspaced-row">
                                    <div style={{width: '120px'}}>Heroic: {this.state.raiderIO.raid_progression["tomb-of-sargeras"].heroic_bosses_killed}/{this.state.raiderIO.raid_progression["tomb-of-sargeras"].total_bosses}</div>
                                    <div style={{width: '120px'}}>World: {this.state.raiderIO.raid_rankings["tomb-of-sargeras"].heroic.world}</div>
                                    <div style={{width: '120px'}}>Region: {this.state.raiderIO.raid_rankings["tomb-of-sargeras"].heroic.region}</div>
                                    <div style={{width: '120px'}}>Realm: {this.state.raiderIO.raid_rankings["tomb-of-sargeras"].heroic.realm}</div>
                                </div>
                                { this.state.raiderIO.raid_progression["tomb-of-sargeras"].mythic_bosses_killed > 0 &&
                                <div className="evenspaced-row">
                                    <div style={{width: '120px'}}>Mythic: {this.state.raiderIO.raid_progression["tomb-of-sargeras"].mythic_bosses_killed}/{this.state.raiderIO.raid_progression["tomb-of-sargeras"].total_bosses}</div>
                                    <div style={{width: '120px'}}>World: {this.state.raiderIO.raid_rankings["tomb-of-sargeras"].mythic.world}</div>
                                    <div style={{width: '120px'}}>Region: {this.state.raiderIO.raid_rankings["tomb-of-sargeras"].mythic.region}</div>
                                    <div style={{width: '120px'}}>Realm: {this.state.raiderIO.raid_rankings["tomb-of-sargeras"].mythic.realm}</div>
                                </div>
                                }
                            </div>
                            <div style={{marginTop: '10px'}}>
                                <div style={{fontSize: '18px'}}>The Nighthold {this.state.raiderIO.raid_progression["the-nighthold"].summary}</div>
                                <div className="evenspaced-row">
                                    <div style={{width: '120px'}}>Normal: {this.state.raiderIO.raid_progression["the-nighthold"].normal_bosses_killed}/{this.state.raiderIO.raid_progression["the-nighthold"].total_bosses}</div>
                                    <div style={{width: '120px'}}>World: {this.state.raiderIO.raid_rankings["the-nighthold"].normal.world}</div>
                                    <div style={{width: '120px'}}>Region: {this.state.raiderIO.raid_rankings["the-nighthold"].normal.region}</div>
                                    <div style={{width: '120px'}}>Realm: {this.state.raiderIO.raid_rankings["the-nighthold"].normal.realm}</div>
                                </div>
                                <div className="evenspaced-row">
                                    <div style={{width: '120px'}}>Heroic: {this.state.raiderIO.raid_progression["the-nighthold"].heroic_bosses_killed}/{this.state.raiderIO.raid_progression["the-nighthold"].total_bosses}</div>
                                    <div style={{width: '120px'}}>World: {this.state.raiderIO.raid_rankings["the-nighthold"].heroic.world}</div>
                                    <div style={{width: '120px'}}>Region: {this.state.raiderIO.raid_rankings["the-nighthold"].heroic.region}</div>
                                    <div style={{width: '120px'}}>Realm: {this.state.raiderIO.raid_rankings["the-nighthold"].heroic.realm}</div>
                                </div>
                                { this.state.raiderIO.raid_progression["the-nighthold"].mythic_bosses_killed > 0 &&
                                <div className="evenspaced-row">
                                    <div style={{width: '120px'}}>Mythic: {this.state.raiderIO.raid_progression["the-nighthold"].mythic_bosses_killed}/{this.state.raiderIO.raid_progression["the-nighthold"].total_bosses}</div>
                                    <div style={{width: '120px'}}>World: {this.state.raiderIO.raid_rankings["the-nighthold"].mythic.world}</div>
                                    <div style={{width: '120px'}}>Region: {this.state.raiderIO.raid_rankings["the-nighthold"].mythic.region}</div>
                                    <div style={{width: '120px'}}>Realm: {this.state.raiderIO.raid_rankings["the-nighthold"].mythic.realm}</div>
                                </div>
                                }
                            </div>
                            <div style={{textAlign: 'right', fontSize: '10px', marginTop: 'auto'}}>Provided by <a href="https://raider.io">Raider.IO</a></div>
                        </div>
                    }
                </div>
                <div className="about-text">During the tail end of World of Warcraft: Wrath of the Lich King, Complexity was founded by Glacial on July 4th, 2010 with the help of Hopeless, Theeotown, Shockerfist, and Holykush. The focus quickly shifted to the next expansion, World of Warcraft: Cataclysm, where Complexity started with Normal Difficulty and was eventually able to complete Dragon Soul on Heroic Difficulty with two separate groups. After some difficulties during World of Warcraft: Mists of Pandaria in the Throne of Thunder, Complexity bounced back and was able to complete Siege of Orgrimmar on Heroic difficulty, earning the Ahead of the Curve achievement. World of Warcraft: Warlords of Draenor showed steady progress as Complexity was able to complete this expansion on Heroic Difficulty, earning the Ahead of the Curve achievement on all raids. Currently in World of Warcraft: Legion, Complexity has continued to show steady progress, earning the Ahead of the Curve Achievement on all current raid content.</div>
            </div>
        )
    }
}

export default About