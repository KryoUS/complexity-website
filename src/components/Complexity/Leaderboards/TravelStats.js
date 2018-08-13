import React, { Component } from 'react';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import StatTable from '../../Utils/StatTable';
import './Stats.css';

class TravelStats extends Component {
    constructor() {
        super();

        this.state = {
            travelTable: [],
            sortMethod: 'desc',
            loadTable: false,
            selectedHeader: 'stat_flight_paths'
        }
    }

    componentDidMount = () => {
        axios.get('/api/stats/travel').then(response => {
            this.setState({travelTable: response.data, loadTable: true})
        }).catch(error => {
            console.log('Travel Stat API Failed');
            console.log(error);
        })
    }

    sortBy = (orderBy) => {
        this.setState({selectedHeader: orderBy});
        let sortArray = [...this.state.travelTable]

        if (this.state.sortMethod === 'asc') {
            sortArray.sort((a, b) => {
                return a[orderBy] - b[orderBy]
            })
            this.setState({sortMethod: 'desc', travelTable: sortArray});
        } else {
            sortArray.sort((a, b) => {
                return b[orderBy] - a[orderBy]
            })
            this.setState({sortMethod: 'asc', travelTable: sortArray});
        }
    }

    handleClick = () => {
        this.setState({loadTable: false});
        this.props.handleSection('travel');
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
                            {displayName: 'Flight Paths', name: 'stat_flight_paths', tooltip: 'How many flight paths the character has taken.'},
                            {displayName: 'Summons', name: 'stat_summons', tooltip: 'How many times the character has been summoned.'},
                            {displayName: 'Mage Portals', name: 'stat_mage_portals', tooltip: 'How many Mage portals the character has taken.'},
                            {displayName: 'Hearthstones', name: 'stat_hearthstones', tooltip: 'How many times the character has used a Hearthstone.'}                            
                        ]}
                        tableData={this.state.travelTable}
                        sortBy={this.sortBy}
                        selectedHeader={this.state.selectedHeader}
                    />
                    </div>
                </Slide>
            </div>
        )
    }
}

export default TravelStats