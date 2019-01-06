import React, { Component } from 'react';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import Checkbox from '@material-ui/core/Checkbox';
import StatTable from '../Utils/StatTable';
import './Leaderboards/Stats.css';

class Members extends Component {
    constructor() {
        super();

        this.state = {
            memberTable: [],
            maxLevelMemberTable: [],
            sortMethod: 'desc',
            loadTable: false,
            selectedHeader: 'rank',
            maxLevel: false,
        }
    }

    componentDidMount = () => {
        axios.get('/api/members').then(response => {
            this.setState({memberTable: response.data, loadTable: true});
            this.maxLevelOnly();
        }).catch(error => {
            console.log('Members Stat API Failed');
            console.log(error);
        })
    }

    maxLevelOnly = () => {
        let arrCopy = [...this.state.memberTable];
        let maxChar = arrCopy.reduce((prev, current) => (prev.level > current.level) ? prev : current);
        let newArr = arrCopy.filter(obj => obj.level === maxChar.level);
        this.setState({ maxLevelMemberTable: newArr });
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    sortBy = (orderBy) => {
        this.setState({selectedHeader: orderBy, loadTable: false});
        let sortArray = [...this.state.memberTable];
        let sortMaxLevelArray = [...this.state.maxLevelMemberTable];

        if (isNaN(sortArray[0][orderBy])) {
            this.letterSort(sortArray, sortMaxLevelArray, orderBy);
        } else {
            this.numberSort(sortArray, sortMaxLevelArray, orderBy);
        }
        
    }

    numberSort = (sortArray, sortMaxLevelArray, orderBy) => {
        
        if (this.state.sortMethod === 'asc') {
            sortArray.sort((a, b) => {
                return a[orderBy] - b[orderBy]
            })
            sortMaxLevelArray.sort((a, b) => {
                return a[orderBy] - b[orderBy]
            })
            this.setState({sortMethod: 'desc', memberTable: sortArray, maxLevelMemberTable: sortMaxLevelArray, loadTable: true});
        } else {
            sortArray.sort((a, b) => {
                return b[orderBy] - a[orderBy]
            })
            sortMaxLevelArray.sort((a, b) => {
                return b[orderBy] - a[orderBy]
            })
            this.setState({sortMethod: 'asc', memberTable: sortArray, maxLevelMemberTable: sortMaxLevelArray, loadTable: true});
        }
    }

    letterSort = (sortArray, sortMaxLevelArray, orderBy) => {
        
        if (this.state.sortMethod === 'asc') {
            sortArray.sort((a, b) => {
                return a[orderBy] > b[orderBy] ? 1 : ((a[orderBy] < b[orderBy]) ? -1 : 0)
            })
            sortMaxLevelArray.sort((a, b) => {
                return a[orderBy] > b[orderBy] ? 1 : ((a[orderBy] < b[orderBy]) ? -1 : 0)
            })
            this.setState({sortMethod: 'desc', memberTable: sortArray, maxLevelMemberTable: sortMaxLevelArray, loadTable: true});
        } else {
            sortArray.sort((a, b) => {
                return a[orderBy] < b[orderBy] ? 1 : ((a[orderBy] > b[orderBy]) ? -1 : 0)
            })
            sortMaxLevelArray.sort((a, b) => {
                return a[orderBy] < b[orderBy] ? 1 : ((a[orderBy] > b[orderBy]) ? -1 : 0)
            })
            this.setState({sortMethod: 'asc', memberTable: sortArray, maxLevelMemberTable: sortMaxLevelArray, loadTable: true});
        }

    }

    render(){

        return(
            <div className="stats-div" style={{background: `url('https://res.cloudinary.com/complexityguild/image/upload/v1534798726/wow/backgrounds/members.jpg') top center no-repeat`}}>
                {this.state.loadTable === false && <div className="loader"/>}
                <Slide direction="up" in={this.state.loadTable} mountOnEnter unmountOnExit>
                <div>
                    <div style={{color: 'white'}}>
                        <Checkbox
                            checked={this.state.maxLevel}
                            onChange={this.handleChange('maxLevel')}
                            value="maxLevel"
                            color="primary"
                        />
                        Show Max Level Only
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
                        tableData={this.state.maxLevel ? this.state.maxLevelMemberTable : this.state.memberTable}
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