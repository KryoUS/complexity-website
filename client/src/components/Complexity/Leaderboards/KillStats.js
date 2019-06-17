import React, { Component } from 'react';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import StatTable from '../../Utils/StatTable';
import './Stats.css';

class KillStats extends Component {
    constructor() {
        super();

        this.state = {
            killsTable: [],
            sortMethod: 'desc',
            loadTable: false,
            selectedHeader: 'stat_total_kills'
        }
    }

    componentDidMount = () => {
        axios.get('/api/stats/kills').then(response => {
            this.setState({killsTable: response.data, loadTable: true})
        }).catch(error => {
            console.log('Kills Stat API Failed');
            console.log(error);
        })
    }

    sortBy = (orderBy) => {
        this.setState({selectedHeader: orderBy, loadTable: false});
        let sortArray = [...this.state.killsTable];

        if (isNaN(sortArray[0][orderBy])) {
            this.letterSort(sortArray, orderBy);
        } else {
            this.numberSort(sortArray, orderBy);
        }
        
    }

    numberSort = (sortArray, orderBy) => {
        
        if (this.state.sortMethod === 'asc') {
            sortArray.sort((a, b) => {
                return a[orderBy] - b[orderBy]
            })
            this.setState({sortMethod: 'desc', killsTable: sortArray, loadTable: true});
        } else {
            sortArray.sort((a, b) => {
                return b[orderBy] - a[orderBy]
            })
            this.setState({sortMethod: 'asc', killsTable: sortArray, loadTable: true});
        }
    }

    letterSort = (sortArray, orderBy) => {
        
        if (this.state.sortMethod === 'asc') {
            sortArray.sort((a, b) => {
                return a[orderBy] > b[orderBy] ? 1 : ((a[orderBy] < b[orderBy]) ? -1 : 0)
            })
            this.setState({sortMethod: 'desc', killsTable: sortArray, loadTable: true});
        } else {
            sortArray.sort((a, b) => {
                return a[orderBy] < b[orderBy] ? 1 : ((a[orderBy] > b[orderBy]) ? -1 : 0)
            })
            this.setState({sortMethod: 'asc', killsTable: sortArray, loadTable: true});
        }

    }

    handleClick = () => {
        this.setState({loadTable: false});
        this.props.handleSection('kills');
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
                            {displayName: 'Kills', name: 'stat_total_kills', tooltip: 'How many total kills the character has earned.'},
                            {displayName: 'Creature Kills', name: 'stat_creature_kills', tooltip: 'How many total creatures the character has killed.'},
                            {displayName: 'Critter Kills', name: 'stat_critter_kills', tooltip: 'How many poor defenseless critters the character has killed. Jerk.'},
                            {displayName: 'Honor Kills', name: 'stat_honor_kills', tooltip: 'How many honorable kills the character has claimed for the Alliance.'},
                            {displayName: 'World Honor Kills', name: 'stat_world_honor_kills', tooltip: 'How many honorable kills the character has claimed during adventures in the world.'},
                            {displayName: 'Arena Kills', name: 'stat_arena_kills', tooltip: 'How many kills the character has claimed during arena combat.'},
                            {displayName: '2v2 Arena Kills', name: 'stat_2v2_kills', tooltip: 'How many kills the character has claimed during 2v2 arena combat.'},
                            {displayName: '3v3 Arena Kills', name: 'stat_3v3_kills', tooltip: 'How many kills the character has claimed during 3v3 arena combat.'},
                            {displayName: '5v5 Arena Kills', name: 'stat_5v5_kills', tooltip: 'How many kills the character has claimed during 5v5 arena combat.'},
                            {displayName: 'Battleground Kills', name: 'stat_bg_kills', tooltip: 'How many kills the character has claimed during Battleground combat.'}
                        ]}
                        tableData={this.state.killsTable}
                        sortBy={this.sortBy}
                        selectedHeader={this.state.selectedHeader}
                    />
                    </div>
                </Slide>
            </div>
        )
    }
}

export default KillStats