import React, { Component } from 'react';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import StatTable from '../../Utils/StatTable';
import './Stats.css';

class PetStats extends Component {
    constructor() {
        super();

        this.state = {
            petsTable: [],
            sortMethod: 'desc',
            loadTable: false,
            selectedHeader: 'stat_pets'
        }
    }

    componentDidMount = () => {
        axios.get('/api/stats/pets').then(response => {
            this.setState({petsTable: response.data, loadTable: true})
        }).catch(error => {
            console.log('Pets Stat API Failed');
            console.log(error);
        })
    }

    sortBy = (orderBy) => {
        this.setState({selectedHeader: orderBy, loadTable: false});
        let sortArray = [...this.state.petsTable];

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
            this.setState({sortMethod: 'desc', petsTable: sortArray, loadTable: true});
        } else {
            sortArray.sort((a, b) => {
                return b[orderBy] - a[orderBy]
            })
            this.setState({sortMethod: 'asc', petsTable: sortArray, loadTable: true});
        }
    }

    letterSort = (sortArray, orderBy) => {
        
        if (this.state.sortMethod === 'asc') {
            sortArray.sort((a, b) => {
                return a[orderBy] > b[orderBy] ? 1 : ((a[orderBy] < b[orderBy]) ? -1 : 0)
            })
            this.setState({sortMethod: 'desc', petsTable: sortArray, loadTable: true});
        } else {
            sortArray.sort((a, b) => {
                return a[orderBy] < b[orderBy] ? 1 : ((a[orderBy] > b[orderBy]) ? -1 : 0)
            })
            this.setState({sortMethod: 'asc', petsTable: sortArray, loadTable: true});
        }

    }

    handleClick = () => {
        this.setState({loadTable: false});
        this.props.handleSection('pets');
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
                            {displayName: 'Pets', name: 'stat_pets', tooltip: 'How many pets the character has collected.'},
                            {displayName: 'Pet Battle Victories', name: 'stat_pet_battles_won', tooltip: 'How many pet battles the character has won.'},
                            {displayName: 'PVP Pet Battle Victories', name: 'stat_pvp_pet_battles_won', tooltip: 'How many pet battles the character has won versus other players.'},
                            {displayName: 'PVP FullTeam Victories', name: 'stat_pvp_fullteam_pet_battles_won', tooltip: 'How many full team pet battles the character has won versus other players.'},
                            {displayName: 'Celestial Tournaments', name: 'stat_pet_celestial_tour_won', tooltip: 'How many Celestial Tournaments the character has claimed victory.'}
                        ]}
                        tableData={this.state.petsTable}
                        sortBy={this.sortBy}
                        selectedHeader={this.state.selectedHeader}
                    />
                    </div>
                </Slide>
            </div>
        )
    }
}

export default PetStats