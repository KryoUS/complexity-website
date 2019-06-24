import React, { Component } from 'react';
import { connect } from 'react-redux';
import { infoModal } from '../../ducks/reducer';
import axios from 'axios';
import PieChart from '../Utils/Highcharts/PieChart';
import ColumnChart from '../Utils/Highcharts/ColumnChart';
import BarChart from '../Utils/Highcharts/BarChart';
import './About.css';

class About extends Component {
    constructor() {
        super();

        this.state = {
            wowProgress: {},
            raiderIO: {},
            raiderIOLoaded: false,
            pieChartClasses: [],
            pieChartRaiderClasses: [],
            pieChartRaces: [],
            pieChartRaiderRaces: [],
            pieChartRoles: [],
            pieChartRaiderRoles: [],
            columnChartSpecs: [],
            barChartRaidProgress: [],
            barChartRaidCategories: [],
        }
    }

    componentDidMount = () => {
        axios.get('/api/wowprogress/guildranking').then(res => {
            this.setState({ wowProgress: res.data });
        }).catch(wowProgressError => {
            console.log(wowProgressError);
        });
        
        axios.get('/api/raiderio/guildranking').then(res => {
            this.raidProgressBarGroupBy(res.data);
        }).catch(raiderIOError => {
            console.log(raiderIOError);
        });

        axios.get('/api/members/all').then(res => {
            let raiderClasses = res.data.filter(obj => {
                return obj.rank <= 3;
            });

            let raiderRoles = res.data.filter(obj => {
                return obj.rank <= 3;
            });

            let raiderRaces = res.data.filter(obj => {
                return obj.rank <= 3;
            });

            this.setState({
                pieChartClasses: this.groupBy(res.data, 'className'),
                pieChartRaces: this.groupBy(res.data, 'raceName'),
                columnChartSpecs: this.groupBy(res.data, 'spec_name'),
                pieChartRoles: this.groupBy(res.data, 'spec_role'),
                pieChartRaiderClasses: this.groupBy(raiderClasses, 'className'),
                pieChartRaiderRoles: this.groupBy(raiderRoles, 'spec_role'),
                pieChartRaiderRaces: this.groupBy(raiderRaces, 'raceName'),
                
            });            
        });
    }

    raidProgressBarGroupBy = (objectArray) => {
        let progressionArr = [];
        let progressionCategories = [];
        let seriesArr = [];
        let color = [
            '#925bea',
            '#ea9c59',
            '#59c6ea',
        ];
        let num = 0;
        const sortOrder = ['normal_bosses_killed', 'heroic_bosses_killed', 'mythic_bosses_killed'];

        
        for (let x in objectArray.raid_progression) {
            objectArray.raid_progression[x].raid = x;
            progressionArr.push(objectArray.raid_progression[x]);
            let uglyRaid = x;
            let betterRaid = this.stringReplaceAll(uglyRaid, '-', ' ');
            
            progressionCategories.push(this.stringCapital(betterRaid));
        };

        for (let x in progressionArr[0]) {
            if (x.includes('killed')) {
                seriesArr.push({name: x, data: [], color: color[num]});
                num++;
            };
        };

        seriesArr.sort((a, b) => {
            return sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name);
        });

        seriesArr.forEach(obj => {
            progressionArr.map(progObj => {
                obj.data.push(progObj[obj.name])
            });
        });

        if (seriesArr[0].name.includes('_bosses_killed')) {
            seriesArr.forEach(obj => {
                obj.name = obj.name.replace('_bosses_killed', '');
                obj.name = obj.name[0].toUpperCase() + obj.name.slice(1);
            });
        };

        this.setState({ barChartRaidProgress: seriesArr, barChartRaidCategories: progressionCategories, raiderIO: objectArray , raiderIOLoaded: true });
    }

    columnGroupBy = (objectArray, property) => {

        let arr = [];

        let allProperties = objectArray.map(obj => {
            if (obj[property]) {
                if (property === 'spec_name') {
                    return `${obj[property]} ${obj.className}`
                } else {
                    return obj[property]
                }
            }
        }).filter((value, index, self) => {
            if (value) {
                return self.indexOf(value) === index;
            }
        });

        allProperties.map(prop => {
            let count = 0;

            for (let i =0; i < objectArray.length; i++) {
                if (property === 'spec_name') {
                    if (`${objectArray[i][property]} ${objectArray[i].className}` === prop) {
                        count++;
                    }
                } else {
                    if (objectArray[i][property] === prop) {
                        count++;
                    }
                }
            }

            arr.push([prop, count]);
        });

        return arr.sort((a, b) => {
            if (a[0] < b[0]) return -1;
            if (a[0] > b[0]) return 1;
            return 0;
        });
    }

    groupBy = (objectArray, property) => {

        let arr = [];

        let allProperties = objectArray.map(obj => {
            if (obj[property]) {
                if (property === 'spec_name') {
                    return `${obj[property]} ${obj.className}`
                } else {
                    return obj[property]
                }
            }
        }).filter((value, index, self) => {
            if (value) {
                return self.indexOf(value) === index;
            }
        });

        allProperties.map(prop => {
            let count = 0;
            let color = '';

            for (let i =0; i < objectArray.length; i++) {
                if (property === 'spec_name') {
                    if (`${objectArray[i][property]} ${objectArray[i].className}` === prop) {
                        count++;
                        color = objectArray[i].classColor;
                    }
                } else {
                    if (objectArray[i][property] === prop) {
                        count++;
                        if (property === 'className') {
                            color = objectArray[i].classColor;
                        }
                    }
                }
            }

            if (property === 'className' || property === 'spec_name') {
                arr.push({name: `${prop}s`, y: count, dataLabels: {color: color}, color: color});
            } else {
                arr.push({name: prop, y: count});
            }
        });

        return arr.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        });
    }

    stringReplaceAll = (str, find, replace) => {
        return str.replace(new RegExp(find, 'g'), replace);
    }

    stringCapital = (str) => {
        str = str.split(" ");

        for (var i = 0, x = str.length; i < x; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }

        return str.join(" ");
    }

    render(){
        return(
            <div>
                <div className="about-background image-mask" />
                <div className="page-div fade1s">
                    <div id="about-page" style={{marginBottom: '100px'}}>
                        <div className="about-chart-column">
                        {this.state.pieChartClasses.length > 1 ? 
                                    <PieChart 
                                        pieChartID='classPie' 
                                        pieChartTitle='Classes' 
                                        pieChartData={this.state.pieChartClasses} 
                                        pieChartClassName='about-pie fade1s'
                                        pieChartLegend={false}
                                        pieChartLabels={true}
                                        pieChartSize={100}
                                    />
                            : 
                                <div className="loader" />
                            }
                            {this.state.pieChartRoles.length > 1 ? 
                                    <PieChart 
                                        pieChartID='rolePie' 
                                        pieChartTitle='Roles' 
                                        pieChartData={this.state.pieChartRoles} 
                                        pieChartClassName='about-pie fade1s'
                                        pieChartLegend={false}
                                        pieChartLabels={true}
                                        pieChartSize={100}
                                    /> 
                            : 
                                <div className="loader" />
                            }
                            {this.state.pieChartRaces.length > 1 ? 
                                    <PieChart 
                                        pieChartID='racesPie' 
                                        pieChartTitle='Races' 
                                        pieChartData={this.state.pieChartRaces} 
                                        pieChartClassName='about-pie fade1s'
                                        pieChartLegend={false}
                                        pieChartLabels={true}
                                        pieChartSize={80}

                                    />
                            : 
                                <div className="loader" />
                            }
                        </div>
                        <div id="about-info" className="about-chart-column">
                            {this.state.raiderIOLoaded ? 
                                <div className="not-mobile-friendly">
                                    <BarChart 
                                        barChartID='barProgression' 
                                        barChartTitle='Raid Progression' 
                                        barChartCategories={this.state.barChartRaidCategories} 
                                        barChartYTitle='Bosses Killed' 
                                        barChartTooltipSuffix=' bosses killed'
                                        barChartData={this.state.barChartRaidProgress}
                                    />
                                </div>
                            : 
                                <div className="loader" />
                            }
                            <div className="gradient-line-purple" />
                            <div id="about-text-container">
                                <h1>
                                    <strong>Guild History</strong>
                                </h1>
                                <p style={{textShadow: '1px 1px black'}}>During the tail end of World of Warcraft: Wrath of the Lich King, Complexity was founded by Glacial on July 4th, 2010 with the help of Hopeless, Theeotown, Shockerfist, and Holykush. The focus quickly shifted to the next expansion, World of Warcraft: Cataclysm, where Complexity started with Normal Difficulty and was eventually able to complete Dragon Soul on Heroic Difficulty with two separate groups. After some difficulties during World of Warcraft: Mists of Pandaria in the Throne of Thunder, Complexity bounced back and was able to complete Siege of Orgrimmar on Heroic difficulty, earning the Ahead of the Curve achievement. World of Warcraft: Warlords of Draenor showed steady progress as Complexity was able to complete this expansion on Heroic Difficulty, earning the Ahead of the Curve achievement on all raids. Currently in World of Warcraft: Legion, Complexity has continued to show steady progress, earning the Ahead of the Curve Achievement on all current raid content.</p>
                            </div>
                            <div className="gradient-line-purple" />
                            {this.state.columnChartSpecs.length > 1 ? 
                                <div className="not-mobile-friendly">
                                    <ColumnChart 
                                        columnChartID='specsColumns' 
                                        columnChartTitle='Specializations' 
                                        columnChartData={this.state.columnChartSpecs} 
                                    />
                                </div>
                            : 
                                <div className="loader" />
                            }
                        </div>
                        <div id="about-last-charts" className="about-chart-column">
                            {this.state.pieChartRaiderClasses.length > 1 ? 
                                <PieChart 
                                    pieChartID='classRaiderPie' 
                                    pieChartTitle='Raider Classes' 
                                    pieChartData={this.state.pieChartRaiderClasses} 
                                    pieChartClassName='about-pie fade1s'
                                    pieChartLegend={false}
                                    pieChartLabels={true}
                                    pieChartSize={100}
                                />
                            : 
                                <div className="loader" />
                            }
                            {this.state.pieChartRaiderRoles.length > 1 ? 
                                    <PieChart 
                                        pieChartID='roleRaiderPie' 
                                        pieChartTitle='Raider Roles' 
                                        pieChartData={this.state.pieChartRaiderRoles} 
                                        pieChartClassName='about-pie fade1s'
                                        pieChartLegend={false}
                                        pieChartLabels={true}
                                        pieChartSize={100}
                                    /> 
                            : 
                                <div className="loader" />
                            }
                            {this.state.pieChartRaiderRaces.length > 1 ? 
                                    <PieChart 
                                        pieChartID='racesRaiderPie' 
                                        pieChartTitle='Raider Races' 
                                        pieChartData={this.state.pieChartRaiderRaces} 
                                        pieChartClassName='about-pie fade1s'
                                        pieChartLegend={false}
                                        pieChartLabels={true}
                                        pieChartSize={80}

                                    />
                            : 
                                <div className="loader" />
                            }
                        </div>
                    </div>                        
                    {/* {this.state.raiderIOLoaded && 
                        <div className="guildinfo-container" style={{width: '600px'}}>
                            <div className= "guildinfo-titles">Raid Progress</div>
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
                    } */}
                    {/* {this.state.raiderIOLoaded === true ? 
                        <div className="guildinfo-container">
                            <div className= "guildinfo-titles">Guild Scores</div>
                            <a href="https://www.wowprogress.com/guild/us/thunderlord/Complexity" target="_blank"  rel="noopener noreferrer">
                                <div className="button-border" id="about-scores">
                                    <div className="button-text">Score: {this.state.wowProgress.score}</div>
                                </div>
                            </a>
                            <a href="https://www.wowprogress.com/pve/world" target="_blank"  rel="noopener noreferrer">
                                <div className="button-border" id="about-scores">
                                    <div className="button-text">World Rank: {this.state.wowProgress.world_rank}</div>
                                </div>
                            </a>
                            <a href="https://www.wowprogress.com/pve/us" target="_blank"  rel="noopener noreferrer">
                                <div className="button-border" id="about-scores">
                                    <div className="button-text">Region Rank: {this.state.wowProgress.area_rank}</div>
                                </div> 
                            </a>
                            <a href="https://www.wowprogress.com/pve/us/thunderlord" target="_blank"  rel="noopener noreferrer">
                                <div className="button-border" id="about-scores">
                                    <div className="button-text">Realm Rank: {this.state.wowProgress.realm_rank}</div>
                                </div>
                            </a>
                            <div style={{textAlign: 'right', fontSize: '10px', marginTop: 'auto'}}>Provided by <a href="https://www.wowprogress.com/">WoWProgress.com</a></div>
                        </div>
                        :
                        <div className="loader"></div>
                    } */}
                </div>
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

export default connect( mapStateToProps, {infoModal} )( About );