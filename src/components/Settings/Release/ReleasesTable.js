import React, { Component } from 'react';
import StatTable from '../../Utils/StatTable';

class ReleasesTable extends Component {
    constructor() {
        super();

        this.state = {
            tableData: [],
            sortMethod: 'asc',
            selectedHeader: 'id',
            checkedRows: []
        }
    }

    componentDidMount = () => {
        this.setState({ tableData: this.props.tableData });
    }

    sortBy = (orderBy) => {
        this.setState({selectedHeader: orderBy});
        let sortArray = [...this.state.tableData];

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
            this.setState({sortMethod: 'desc', tableData: sortArray});
        } else {
            sortArray.sort((a, b) => {
                return b[orderBy] - a[orderBy]
            })
            this.setState({sortMethod: 'asc', tableData: sortArray});
        }
    }

    letterSort = (sortArray, orderBy) => {
        
        if (this.state.sortMethod === 'asc') {
            sortArray.sort((a, b) => {
                return a[orderBy] > b[orderBy] ? 1 : ((a[orderBy] < b[orderBy]) ? -1 : 0)
            })
            this.setState({sortMethod: 'desc', tableData: sortArray});
        } else {
            sortArray.sort((a, b) => {
                return a[orderBy] < b[orderBy] ? 1 : ((a[orderBy] > b[orderBy]) ? -1 : 0)
            })
            this.setState({sortMethod: 'asc', tableData: sortArray});
        }

    }

    //Need to only have checked items in the array
    checkedRows = (checked) => {
        let checkedArray = [...this.state.checkedRows];

        checkedArray.push(checked);
        this.setState({ checkedRows: checkedArray });
        console.log(this.state.checkedRows);
    }

    render(){

        return(
                <StatTable 
                    headerRow={[
                        {displayName: 'Remove?', name: 'checkbox', tooltip: ''},
                        {displayName: 'id', name: 'id', tooltip: 'Unique identifier for the release database entry.'},
                        {displayName: 'Title', name: 'title', tooltip: `The title that is displayed on the Home page, just above the countdown timer.`},
                        {displayName: 'Release Date', name: 'date', tooltip: `The date and time, in milliseconds, that the countdown timer counts down to.`},
                        {displayName: 'Link', name: 'link', tooltip: `The link the user is taken to when the countdown timer is clicked.`},
                    ]}
                    tableData={this.state.tableData}
                    sortBy={this.sortBy}
                    selectedHeader={this.state.selectedHeader}
                    rowWidth='300px'
                    checkboxes={true}
                    checkedRows={this.checkedRows}
                />
        )
    }
}

export default ReleasesTable