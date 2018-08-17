import React, { Component } from 'react';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import StatTable from '../../Utils/StatTable';
import './Stats.css';

class PvpStats extends Component {
    constructor() {
        super();

        this.state = {
            pvpTable: [],
            sortMethod: 'desc',
            loadTable: false,
            selectedHeader: 'stat_pvp_deaths'
        }
    }

    componentDidMount = () => {
        axios.get('/api/stats/pvp').then(response => {
            this.setState({pvpTable: response.data, loadTable: true})
        }).catch(error => {
            console.log('PVP Stat API Failed');
            console.log(error);
        })
    }

    sortBy = (orderBy) => {
        this.setState({selectedHeader: orderBy, loadTable: false});
        let sortArray = [...this.state.pvpTable];

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
            this.setState({sortMethod: 'desc', pvpTable: sortArray, loadTable: true});
        } else {
            sortArray.sort((a, b) => {
                return b[orderBy] - a[orderBy]
            })
            this.setState({sortMethod: 'asc', pvpTable: sortArray, loadTable: true});
        }
    }

    letterSort = (sortArray, orderBy) => {
        
        if (this.state.sortMethod === 'asc') {
            sortArray.sort((a, b) => {
                return a[orderBy] > b[orderBy] ? 1 : ((a[orderBy] < b[orderBy]) ? -1 : 0)
            })
            this.setState({sortMethod: 'desc', pvpTable: sortArray, loadTable: true});
        } else {
            sortArray.sort((a, b) => {
                return a[orderBy] < b[orderBy] ? 1 : ((a[orderBy] > b[orderBy]) ? -1 : 0)
            })
            this.setState({sortMethod: 'asc', pvpTable: sortArray, loadTable: true});
        }

    }

    handleClick = () => {
        this.setState({loadTable: false});
        this.props.handleSection('pvp');
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
                            {displayName: 'PVP Deaths', name: 'stat_pvp_deaths', tooltip: 'How many times the character has died for the Alliance.'},
                            {displayName: 'Deaths to Horde', name: 'stat_horde_deaths', tooltip: 'How many times the character has fallen to the might of the Horde.'},
                            {displayName: 'Duels Won', name: 'stat_duels_won', tooltip: 'How many duels the character has won.'},
                            {displayName: 'Duels Lost', name: 'stat_duels_lost', tooltip: 'How many duels the character has lost.'},
                            {displayName: 'Battlegrounds Played', name: 'stat_bgs_played', tooltip: 'How many Battlegrounds the character has participated in.'},
                            {displayName: 'Battleground Victories', name: 'stat_bgs_won', tooltip: 'How many Battlegrounds the character has claimed victory.'},
                            {displayName: 'Battleground Killing Blows', name: 'stat_bgs_kbs', tooltip: 'How many killing blows the character has landed in Battlegrounds.'},
                            {displayName: 'Rated Battlegrounds Played', name: 'stat_rbgs_played', tooltip: 'How many Rated Battlegrounds the character has claimed victory.'},
                            {displayName: 'Rated Battleground Victories', name: 'stat_rbgs_won', tooltip: 'How many Rated Battlegrounds the character has claimed victory.'}
                        ]}
                        tableData={this.state.pvpTable}
                        sortBy={this.sortBy}
                        selectedHeader={this.state.selectedHeader}
                    />
                    </div>
                </Slide>
            </div>
        )
    }
}

export default PvpStats