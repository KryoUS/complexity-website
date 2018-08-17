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
            <div className="stats-div">
                <Slide direction="up" in={this.state.loadTable} mountOnEnter unmountOnExit>
                        <StatTable 
                        headerRow={[
                            {displayName: 'Character', name: 'character_name', tooltip: `The character's name.`},
                            {displayName: 'Rank', name: 'rank', tooltip: 'Guild rank.'},
                            {displayName: 'Level', name: 'level', tooltip: 'The current level of the character.'},
                            {displayName: 'Race', name: 'race', tooltip: `The character's race.`},
                            {displayName: 'Specialization', name: 'spec_name', tooltip: `The character's specialization.`},
                            {displayName: 'Class', name: 'class', tooltip: `The character's class.`},
                            {displayName: 'Realm', name: 'realm', tooltip: `The character's realm/server.`}
                        ]}
                        tableData={this.state.memberTable}
                        sortBy={this.sortBy}
                        selectedHeader={this.state.selectedHeader}
                    />
                </Slide>
            </div>
        )
    }
}

export default Members