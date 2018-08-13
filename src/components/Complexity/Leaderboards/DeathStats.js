import React, { Component } from 'react';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import StatTable from '../../Utils/StatTable';
import './Stats.css';

class DeathStats extends Component {
    constructor() {
        super();

        this.state = {
            deathsTable: [],
            sortMethod: 'desc',
            loadTable: false,
            selectedHeader: 'stat_total_deaths'
        }
    }

    componentDidMount = () => {
        axios.get('/api/stats/deaths').then(response => {
            this.setState({deathsTable: response.data, loadTable: true})
        }).catch(error => {
            console.log('Deaths Stat API Failed');
            console.log(error);
        })
    }

    sortBy = (orderBy) => {
        this.setState({selectedHeader: orderBy});
        let sortArray = [...this.state.deathsTable]

        if (this.state.sortMethod === 'asc') {
            sortArray.sort((a, b) => {
                return a[orderBy] - b[orderBy]
            })
            this.setState({sortMethod: 'desc', deathsTable: sortArray});
        } else {
            sortArray.sort((a, b) => {
                return b[orderBy] - a[orderBy]
            })
            this.setState({sortMethod: 'asc', deathsTable: sortArray});
        }
    }

    handleClick = () => {
        this.setState({loadTable: false});
        this.props.handleSection('deaths');
    }

    render(){

        return(
            <div className="stats-div">
                <Slide direction="left" in={this.state.loadTable} mountOnEnter unmountOnExit>
                    <div>
                        <div className="stat-button-container">
                            <div className="stat-back-button" onClick={() => this.handleClick()}>Back</div>
                        </div>
                        <StatTable 
                        headerRow={[
                            {displayName: 'Level', name: 'level', tooltip: 'The current level of the character.'},
                            {displayName: 'Character', name: 'character_name', tooltip: `The character's name.`},
                            {displayName: 'Realm', name: 'realm', tooltip: `The character's realm/server.`},
                            {displayName: 'Total Deaths', name: 'stat_total_deaths', tooltip: 'How many total Deaths the character has faced.'},
                            {displayName: '2v2 Arena Deaths', name: 'stat_2v2_deaths', tooltip: 'How many times the character has fallen in 2v2 Arean combat.'},
                            {displayName: '3v3 Arena Deaths', name: 'stat_3v3_deaths', tooltip: 'How many times the character has fallen in 3v3 Arean combat.'},
                            {displayName: '5v5 Arena Deaths', name: 'stat_5v5_deaths', tooltip: 'How many times the character has fallen in 5v5 Arean combat.'},
                            {displayName: `Deaths to Drek'Thar`, name: 'stat_av_drek_deaths', tooltip: `How many times the character has fallen to Drek'Thar in Alterac Valley.`},
                            {displayName: `Deaths to Vann`, name: 'stat_av_drek_deaths', tooltip: `How many times the character has fallen to Vann in Alterac Valley? (These characters were Horde at one time.)`},
                            {displayName: '5man Dungeon Deaths', name: 'stat_normal_dungeon_deaths', tooltip: 'How many times the character has fallen in a 5man Dungeon.'},
                            {displayName: '5man Heroic Dungeon Deaths', name: 'stat_heroic_dungeon_deaths', tooltip: 'How many times the character has fallen in a 5man Heroic Dungeon.'},
                            {displayName: 'Raid Deaths', name: 'stat_raid_deaths', tooltip: 'How many times the character has fallen in Raiding.'},
                            {displayName: 'Drowned', name: 'stat_drowning_deaths', tooltip: 'How many times the character has forgotten that it was unable to breath underwater.'},
                            {displayName: 'Deaths to Hogger', name: 'stat_hogger_deaths', tooltip: 'How many times the character has fallen to Hogger...'},
                            {displayName: 'Deaths from Fatigue', name: 'stat_fatigue_deaths', tooltip: 'How many times the character has tried to venture outside the world boundries.'},
                            {displayName: 'Deaths from Falling', name: 'stat_falling_deaths', tooltip: 'How many times the character has come to a sudden stop during terminal velocity.'},
                            {displayName: 'Fire or Lava Deaths', name: 'stat_fire_or_lava_deaths', tooltip: `How many times the character has been burned in the maker's fire.`}
                        ]}
                        tableData={this.state.deathsTable}
                        sortBy={this.sortBy}
                        selectedHeader={this.state.selectedHeader}
                    />
                    </div>
                </Slide>
            </div>
        )
    }
}

export default DeathStats