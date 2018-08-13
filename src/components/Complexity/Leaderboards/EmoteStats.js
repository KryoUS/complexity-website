import React, { Component } from 'react';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import StatTable from '../../Utils/StatTable';
import './Stats.css';

class EmoteStats extends Component {
    constructor() {
        super();

        this.state = {
            emoteTable: [],
            sortMethod: 'desc',
            loadTable: false,
            selectedHeader: 'stat_hugs'
        }
    }

    componentDidMount = () => {
        axios.get('/api/stats/emotes').then(response => {
            this.setState({emoteTable: response.data, loadTable: true})
        }).catch(error => {
            console.log('Emote Stat API Failed');
            console.log(error);
        })
    }

    sortBy = (orderBy) => {
        this.setState({selectedHeader: orderBy});
        let sortArray = [...this.state.emoteTable]

        if (this.state.sortMethod === 'asc') {
            sortArray.sort((a, b) => {
                return a[orderBy] - b[orderBy]
            })
            this.setState({sortMethod: 'desc', emoteTable: sortArray});
        } else {
            sortArray.sort((a, b) => {
                return b[orderBy] - a[orderBy]
            })
            this.setState({sortMethod: 'asc', emoteTable: sortArray});
        }
    }

    handleClick = () => {
        this.setState({loadTable: false});
        this.props.handleSection('emotes');
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
                            {displayName: 'Hugs', name: 'stat_hugs', tooltip: 'How many hugs the character has given.'},
                            {displayName: 'Facepalms', name: 'stat_facepalms', tooltip: 'How many facepalms the character has performed.'},
                            {displayName: 'Smallest Violins', name: 'stat_small_viollins', tooltip: 'How many times the character has played the worlds smallest violin.'},
                            {displayName: 'LOLs', name: 'stat_lols', tooltip: 'How many times the character has laughed out loud.'},
                            {displayName: 'Cheers', name: 'stat_cheers', tooltip: 'How many times the character has cheered.'},
                            {displayName: 'Waves', name: 'stat_waves', tooltip: 'How many times the character has waved.'}
                        ]}
                        tableData={this.state.emoteTable}
                        sortBy={this.sortBy}
                        selectedHeader={this.state.selectedHeader}
                    />
                    </div>
                </Slide>
            </div>
        )
    }
}

export default EmoteStats