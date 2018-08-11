import React, { Component } from 'react';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import StatTable from '../../Utils/StatTable';
import './CharacterStats.css';

class CharacterStats extends Component {
    constructor() {
        super();

        this.state = {
            characterTable: [],
            sortMethod: 'desc',
            loadTable: false,
            selectedHeader: 'exhaulted_reputations'
        }
    }

    componentDidMount = () => {
        axios.get('/api/stats/character').then(response => {
            this.setState({characterTable: response.data, loadTable: true})
        }).catch(error => {
            console.log('Character Stat API Failed');
            console.log(error);
        })
    }

    sortBy = (orderBy) => {
        this.setState({loadTable: false, selectedHeader: orderBy});
        let sortArray = [...this.state.characterTable]

        if (this.state.sortMethod === 'asc') {
            sortArray.sort((a, b) => {
                return a[orderBy] - b[orderBy]
            })
            this.setState({sortMethod: 'desc', characterTable: sortArray, loadTable: true});
        } else {
            sortArray.sort((a, b) => {
                return b[orderBy] - a[orderBy]
            })
            this.setState({sortMethod: 'asc', characterTable: sortArray, loadTable: true});
        }
    }

    render(){

        return(
            <div className="stats-div">
                {this.state.loadTable &&
                <Slide direction="left" in={this.state.loadTable} mountOnEnter unmountOnExit>
                    <StatTable 
                        headerRow={[
                            {displayName: 'Level', name: 'level', tooltip: 'The current level of the character.'},
                            {displayName: 'Character', name: 'character_name', tooltip: `The character's name.`},
                            {displayName: 'Realm', name: 'realm', tooltip: `The character's realm/server.`},
                            {displayName: 'Exhalted Reputations', name: 'stat_exhaulted_reps', tooltip: 'The total number of Exalted Reputations.'},
                            {displayName: 'Need Rolls', name: 'stat_need_rolls', tooltip: 'How many times the character has rolled "Need".'},
                            {displayName: 'Greed Rolls', name: 'stat_greed_rolls', tooltip: 'How many times the character has rolled "Greed".'},
                            {displayName: 'Mounts', name: 'stat_mounts', tooltip: 'How many mounts the characters has collected.'},
                            {displayName: 'Epics Equipped', name: 'stat_epics', tooltip: 'How many unique epic quality items the character has equipped.'}
                        ]}
                        tableData={this.state.characterTable}
                        sortBy={this.sortBy}
                        selectedHeader={this.state.selectedHeader}
                    />
                </Slide>
                }
            </div>
        )
    }
}

export default CharacterStats