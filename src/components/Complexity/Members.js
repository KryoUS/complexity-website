import React, { Component } from 'react';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import StatTable from '../Utils/StatTable';
import './Leaderboards/Stats.css';

class Members extends Component {
    constructor() {
        super();

        this.state = {
            memberTable: [],
            sortMethod: 'desc',
            loadTable: false,
            selectedHeader: 'rank'
        }
    }

    componentDidMount = () => {
        axios.get('/api/members').then(response => {
            this.setState({memberTable: response.data, loadTable: true})
        }).catch(error => {
            console.log('Members Stat API Failed');
            console.log(error);
        })
    }

    sortBy = (orderBy) => {
        this.setState({selectedHeader: orderBy, loadTable: false});
        let sortArray = [...this.state.memberTable];

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
            this.setState({sortMethod: 'desc', memberTable: sortArray, loadTable: true});
        } else {
            sortArray.sort((a, b) => {
                return b[orderBy] - a[orderBy]
            })
            this.setState({sortMethod: 'asc', memberTable: sortArray, loadTable: true});
        }
    }

    letterSort = (sortArray, orderBy) => {
        
        if (this.state.sortMethod === 'asc') {
            sortArray.sort((a, b) => {
                return a[orderBy] > b[orderBy] ? 1 : ((a[orderBy] < b[orderBy]) ? -1 : 0)
            })
            this.setState({sortMethod: 'desc', memberTable: sortArray, loadTable: true});
        } else {
            sortArray.sort((a, b) => {
                return a[orderBy] < b[orderBy] ? 1 : ((a[orderBy] > b[orderBy]) ? -1 : 0)
            })
            this.setState({sortMethod: 'asc', memberTable: sortArray, loadTable: true});
        }

    }

    render(){

        return(
            <div className="stats-div" style={{background: `url('https://res.cloudinary.com/complexityguild/image/upload/v1534798726/wow/backgrounds/members.jpg') top center no-repeat`}}>
                <Slide direction="up" in={this.state.loadTable} mountOnEnter unmountOnExit>
                <div>
                        <div className="stat-button-container">
                        </div>
                        <StatTable 
                        headerRow={[
                            {displayName: 'Character', name: 'character_name', tooltip: `The character's name.`},
                            {displayName: 'Rank', name: 'rank', tooltip: 'Guild rank.'},
                            {displayName: 'Level', name: 'level', tooltip: 'The current level of the character.'},
                            {displayName: 'Average Item Level', name: 'average_ilvl', tooltip: 'The average item level of the character including gear in bags.'},
                            {displayName: 'Average Item Level Equipped', name: 'average_equipped_ilvl', tooltip: 'The average item level equipped by the character.'},
                            {displayName: 'Azerite Level', name: 'azerite_lvl', tooltip: 'The current Azerite level of the character.'},
                            {displayName: 'Race', name: 'race', tooltip: `The character's race.`},
                            {displayName: 'Specialization', name: 'spec_name', tooltip: `The character's specialization.`},
                            {displayName: 'Class', name: 'class', tooltip: `The character's class.`},
                            {displayName: 'Realm', name: 'realm', tooltip: `The character's realm/server.`}
                        ]}
                        tableData={this.state.memberTable}
                        sortBy={this.sortBy}
                        selectedHeader={this.state.selectedHeader}
                    />
                </div>
                </Slide>
            </div>
        )
    }
}

export default Members