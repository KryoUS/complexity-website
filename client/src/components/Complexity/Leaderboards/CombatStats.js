import React, { Component } from 'react';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import StatTable from '../../Utils/StatTable';
import './Stats.css';

class CombatStats extends Component {
    constructor() {
        super();

        this.state = {
            combatTable: [],
            sortMethod: 'desc',
            loadTable: false,
            selectedHeader: 'stat_damage_done'
        }
    }

    componentDidMount = () => {
        axios.get('/api/stats/combat').then(response => {
            this.setState({combatTable: response.data, loadTable: true})
        }).catch(error => {
            console.log('Combat Stat API Failed');
            console.log(error);
        })
    }

    sortBy = (orderBy) => {
        this.setState({selectedHeader: orderBy, loadTable: false});
        let sortArray = [...this.state.combatTable];

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
            this.setState({sortMethod: 'desc', combatTable: sortArray, loadTable: true});
        } else {
            sortArray.sort((a, b) => {
                return b[orderBy] - a[orderBy]
            })
            this.setState({sortMethod: 'asc', combatTable: sortArray, loadTable: true});
        }
    }

    letterSort = (sortArray, orderBy) => {
        
        if (this.state.sortMethod === 'asc') {
            sortArray.sort((a, b) => {
                return a[orderBy] > b[orderBy] ? 1 : ((a[orderBy] < b[orderBy]) ? -1 : 0)
            })
            this.setState({sortMethod: 'desc', combatTable: sortArray, loadTable: true});
        } else {
            sortArray.sort((a, b) => {
                return a[orderBy] < b[orderBy] ? 1 : ((a[orderBy] > b[orderBy]) ? -1 : 0)
            })
            this.setState({sortMethod: 'asc', combatTable: sortArray, loadTable: true});
        }

    }

    handleClick = () => {
        this.setState({loadTable: false});
        this.props.handleSection('combat');
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
                            {displayName: 'Damage Done', name: 'stat_damage_done', tooltip: 'How much total damage the character has done.'},
                            {displayName: 'Damage Received', name: 'stat_damage_received', tooltip: 'How much total damage the character has received.'},
                            {displayName: 'Healing Done', name: 'stat_healing_done', tooltip: 'How much total healing the character has done.'},
                            {displayName: 'Healing Received', name: 'stat_healing_received', tooltip: 'How much total healing the character has recieved.'},
                            {displayName: 'Endless Damage', name: 'stat_highest_endless_dmg', tooltip: 'Highest score from the Proving Grounds Endless Damage.'},
                            {displayName: 'Endless Tank', name: 'stat_highest_endless_tank', tooltip: 'Highest score from the Proving Grounds Endless Tanking.'},
                            {displayName: 'Endless Healing', name: 'stat_highest_endless_heals', tooltip: 'Highest score from the Proving Grounds Endless Healing.'},
                            {displayName: 'Druid Rebirths', name: 'stat_rebirths', tooltip: 'How many times the character has been rebirthed by Druids.'},
                            {displayName: 'Raised from Death', name: 'stat_raised', tooltip: 'How many times the character has been raised from the dead by Death Knights.'},
                            {displayName: 'Soulstones', name: 'stat_soulstones', tooltip: `How many times the character's soul has been brought back by Warlocks.`}
                        ]}
                        tableData={this.state.combatTable}
                        sortBy={this.sortBy}
                        selectedHeader={this.state.selectedHeader}
                    />
                    </div>
                </Slide>
            </div>
        )
    }
}

export default CombatStats