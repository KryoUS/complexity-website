import React, { Component } from 'react';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import StatTable from '../../Utils/StatTable';
import './Stats.css';

class ConsumableStats extends Component {
    constructor() {
        super();

        this.state = {
            consumablesTable: [],
            sortMethod: 'desc',
            loadTable: false,
            selectedHeader: 'stat_health_pots'
        }
    }

    componentDidMount = () => {
        axios.get('/api/stats/consumables').then(response => {
            this.setState({consumablesTable: response.data, loadTable: true})
        }).catch(error => {
            console.log('Consumable Stat API Failed');
            console.log(error);
        })
    }

    sortBy = (orderBy) => {
        this.setState({selectedHeader: orderBy});
        let sortArray = [...this.state.consumablesTable]

        if (this.state.sortMethod === 'asc') {
            sortArray.sort((a, b) => {
                return a[orderBy] - b[orderBy]
            })
            this.setState({sortMethod: 'desc', consumablesTable: sortArray});
        } else {
            sortArray.sort((a, b) => {
                return b[orderBy] - a[orderBy]
            })
            this.setState({sortMethod: 'asc', consumablesTable: sortArray});
        }
    }

    handleClick = () => {
        this.setState({loadTable: false});
        this.props.handleSection('consumables');
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
                            {displayName: 'Health Potions', name: 'stat_health_pots', tooltip: 'How many Health Potions the character has consumed.'},
                            {displayName: 'Mana Potions', name: 'stat_mana_pots', tooltip: 'How many Mana Potions the character has consumed.'},
                            {displayName: 'Elixirs', name: 'stat_elixirs', tooltip: 'How many Elixirs the character has consumed.<br>'},
                            {displayName: 'Flasks', name: 'stat_flasks', tooltip: ''},
                            {displayName: 'Drinks', name: 'stat_drinks', tooltip: ''},
                            {displayName: 'Food', name: 'stat_foods', tooltip: ''},
                            {displayName: 'Healthstones', name: 'stat_healthstones', tooltip: ''}
                        ]}
                        tableData={this.state.consumablesTable}
                        sortBy={this.sortBy}
                        selectedHeader={this.state.selectedHeader}
                    />
                    </div>
                </Slide>
            </div>
        )
    }
}

export default ConsumableStats