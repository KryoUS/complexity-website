import React, { Component } from 'react';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import StatTable from '../../Utils/StatTable';
import './Stats.css';

class ArenaStats extends Component {
    constructor() {
        super();

        this.state = {
            arenaTable: [],
            sortMethod: 'desc',
            loadTable: false,
            selectedHeader: 'stat_arenas_played'
        }
    }

    componentDidMount = () => {
        axios.get('/api/stats/arena').then(response => {
            this.setState({arenaTable: response.data, loadTable: true})
        }).catch(error => {
            console.log('Arena Stat API Failed');
            console.log(error);
        })
    }

    sortBy = (orderBy) => {
        this.setState({selectedHeader: orderBy});
        let sortArray = [...this.state.arenaTable]

        if (this.state.sortMethod === 'asc') {
            sortArray.sort((a, b) => {
                return a[orderBy] - b[orderBy]
            })
            this.setState({sortMethod: 'desc', arenaTable: sortArray});
        } else {
            sortArray.sort((a, b) => {
                return b[orderBy] - a[orderBy]
            })
            this.setState({sortMethod: 'asc', arenaTable: sortArray});
        }
    }

    handleClick = () => {
        this.setState({loadTable: false});
        this.props.handleSection('arena');
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
                            {displayName: 'Arenas Played', name: 'stat_arenas_played', tooltip: 'How many arena matches the character has participated in.'},
                            {displayName: 'Arenas Won', name: 'stat_arenas_won', tooltip: 'How many arena matches the character has claimed victory.'},
                            {displayName: 'Arena Killing Blows', name: 'stat_arena_kbs', tooltip: 'How many killing blows the character has earned in arena combat.'},
                            {displayName: '5v5 Arena Matches', name: 'stat_5v5_matches', tooltip: 'How many 5v5 Arena Matches the character has participated in.'},
                            {displayName: '5v5 Arena Victories', name: 'stat_5v5_won', tooltip: 'How many 5v5 Arena Victories the character has claimed.'},
                            {displayName: '5v5 Personal Rating', name: 'stat_5v5_highest_personal', tooltip: 'Highest 5v5 Personal Rating the character has achieved.'},
                            {displayName: '5v5 Team Rating', name: 'stat_5v5_highest_team', tooltip: 'Highest 5v5 Team Rating the character has achieved.'},
                            {displayName: '5v5 Killing Blows', name: 'stat_5v5_kbs', tooltip: 'How many killing blows the character has claimed in 5v5 arena combat.'},
                            {displayName: '3v3 Arena Matches', name: 'stat_3v3_matches', tooltip: 'How many 3v3 Arena Matches the character has participated in.'},
                            {displayName: '3v3 Arena Victories', name: 'stat_3v3_won', tooltip: 'How many 3v3 Arena Victories the character has claimed.'},
                            {displayName: '3v3 Personal Rating', name: 'stat_3v3_highest_personal', tooltip: 'Highest 3v3 Personal Rating the character has achieved.'},
                            {displayName: '3v3 Team Rating', name: 'stat_3v3_highest_team', tooltip: 'Highest 3v3 Team Rating the character has achieved.'},
                            {displayName: '3v3 Killing Blows', name: 'stat_3v3_kbs', tooltip: 'How many killing blows the character has claimed in 3v3 arena combat.'},
                            {displayName: '2v2 Arena Matches', name: 'stat_2v2_matches', tooltip: 'How many 2v2 Arena Matches the character has participated in.'},
                            {displayName: '2v2 Arena Victories', name: 'stat_2v2_won', tooltip: 'How many 2v2 Arena Victories the character has claimed.'},
                            {displayName: '2v2 Personal Rating', name: 'stat_2v2_highest_personal', tooltip: 'Highest 2v2 Personal Rating the character has achieved.'},
                            {displayName: '2v2 Team Rating', name: 'stat_2v2_highest_team', tooltip: 'Highest 2v2 Team Rating the character has achieved.'},
                            {displayName: '2v2 Killing Blows', name: 'stat_2v2_kbs', tooltip: 'How many killing blows the character has claimed in 2v2 arena combat.'}
                        ]}
                        tableData={this.state.arenaTable}
                        sortBy={this.sortBy}
                        selectedHeader={this.state.selectedHeader}
                    />
                    </div>
                </Slide>
            </div>
        )
    }
}

export default ArenaStats