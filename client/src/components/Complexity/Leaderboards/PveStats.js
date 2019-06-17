import React, { Component } from 'react';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import StatTable from '../../Utils/StatTable';
import './Stats.css';

class PveStats extends Component {
    constructor() {
        super();

        this.state = {
            pveTable: [],
            sortMethod: 'desc',
            loadTable: false,
            selectedHeader: 'stat_quest_completed'
        }
    }

    componentDidMount = () => {
        axios.get('/api/stats/pve').then(response => {
            this.setState({pveTable: response.data, loadTable: true})
        }).catch(error => {
            console.log('PVE Stat API Failed');
            console.log(error);
        })
    }

    sortBy = (orderBy) => {
        this.setState({selectedHeader: orderBy, loadTable: false});
        let sortArray = [...this.state.pveTable];

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
            this.setState({sortMethod: 'desc', pveTable: sortArray, loadTable: true});
        } else {
            sortArray.sort((a, b) => {
                return b[orderBy] - a[orderBy]
            })
            this.setState({sortMethod: 'asc', pveTable: sortArray, loadTable: true});
        }
    }

    letterSort = (sortArray, orderBy) => {
        
        if (this.state.sortMethod === 'asc') {
            sortArray.sort((a, b) => {
                return a[orderBy] > b[orderBy] ? 1 : ((a[orderBy] < b[orderBy]) ? -1 : 0)
            })
            this.setState({sortMethod: 'desc', pveTable: sortArray, loadTable: true});
        } else {
            sortArray.sort((a, b) => {
                return a[orderBy] < b[orderBy] ? 1 : ((a[orderBy] > b[orderBy]) ? -1 : 0)
            })
            this.setState({sortMethod: 'asc', pveTable: sortArray, loadTable: true});
        }

    }

    handleClick = () => {
        this.setState({loadTable: false});
        this.props.handleSection('pve');
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
                            {displayName: 'Quests Completed', name: 'stat_quest_completed', tooltip: 'How many quests the character has completed.'},
                            {displayName: 'Daily Quests Completed', name: 'stat_quest_dailies', tooltip: 'How many daily quests the character has completed.'},
                            {displayName: 'Quests Abandoned', name: 'stat_quest_abandoned', tooltip: 'How many quests the character has abandoned.'},
                            {displayName: 'Cataclysm Dungeons Completed', name: 'stat_cata_dungeons_completed', tooltip: 'How many Cataclysm dungeons the character has completed. (These are recorded when the last boss is killed.)'},
                            {displayName: 'Pandarian Dungeons Completed', name: 'stat_panda_dungeons_completed', tooltip: 'How many Pandarian dungeons the character has completed. (These are recorded when the last boss is killed.)'},
                            {displayName: 'Dreanor Dungeons Completed', name: 'stat_cata_dungeons_completed', tooltip: 'How many Dreanor dungeons the character has completed. (These are recorded when the last boss is killed.)'},
                            {displayName: 'Legion Dungeons Completed', name: 'stat_cata_dungeons_completed', tooltip: 'How many Legion dungeons the character has completed. (These are recorded when the last boss is killed.)'},
                            {displayName: 'Challenge Modes Completed', name: 'stat_challenge_modes_completed', tooltip: 'How many Challenge Mode Dungeons the character has completed. (Challenge Mode Dungeons were during both Mists of Pandaria and Warlords of Draenor.)'},
                            {displayName: 'Cataclysm Raids Completed', name: 'stat_cata_raids_completed', tooltip: 'How many Cataclysm Raids the character completed. (These are recorded when the last boss is killed.)'},
                            {displayName: 'Pandarian Raids Completed', name: 'stat_panda_raids_completed', tooltip: 'How many Pandarian Raids the character completed. (These are recorded when the last boss is killed.)'},
                            {displayName: 'Draenor Raids Completed', name: 'stat_wod_raids_completed', tooltip: 'How many Draenor Raids the character completed. (These are recorded when the last boss is killed.)'},
                            {displayName: 'Legion Raids Completed', name: 'stat_legion_raids_completed', tooltip: 'How many Legion Raids the character completed. (These are recorded when the last boss is killed.)'}
                        ]}
                        tableData={this.state.pveTable}
                        sortBy={this.sortBy}
                        selectedHeader={this.state.selectedHeader}
                    />
                    </div>
                </Slide>
            </div>
        )
    }
}

export default PveStats