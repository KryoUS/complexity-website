import React, { Component } from 'react';
import axios from 'axios';
import StatTable from '../Utils/StatTable';
import './Leaderboards.css';

class Leaderboards extends Component {
    constructor() {
        super();

        this.state = {
            characterTable: [],
            consumableTable: [],
            combatTable: [],
            killsTable: [],
            deathsTable: [],
            questDungRaidTable: [],
            professionTable: [],
            travelTable: [],
            emoteTable: [],
            pvpBgTable: [],
            arenaTable: [],
            petsTable: [],
            provingTable: []
        }
    }

    componentDidMount = () => {
        axios.get('/characterstats').then(response => {
            this.setState({characterTable: response.data})
            console.log(this.state.characterTable);
        }).catch(error => {
            console.log('Character Stat API Failed');
            console.log(error);
        })
    }

    render(){

        return(
            <div className="leaderboards-div">
                {this.state.characterTable.length > 0 &&
                    <StatTable  
                        headerRow={[
                            'Level',
                            'Character',
                            'Realm',
                            'Exhalted Reputations',
                            'Need Rolls',
                            'Greed Rolls',
                            'Mounts',
                            'Epics Equipped'
                        ]}
                        tableData={this.state.characterTable}
                    />
                }
            </div>
        )
    }
}

export default Leaderboards