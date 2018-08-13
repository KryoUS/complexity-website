import React, { Component } from 'react';
import axios from 'axios';
import Slide from '@material-ui/core/Slide';
import StatTable from '../../Utils/StatTable';
import './Stats.css';

class ProfessionStats extends Component {
    constructor() {
        super();

        this.state = {
            professionTable: [],
            sortMethod: 'desc',
            loadTable: false,
            selectedHeader: 'stat_prof_learned'
        }
    }

    componentDidMount = () => {
        axios.get('/api/stats/consumables').then(response => {
            this.setState({professionTable: response.data, loadTable: true})
        }).catch(error => {
            console.log('Profession Stat API Failed');
            console.log(error);
        })
    }

    sortBy = (orderBy) => {
        this.setState({selectedHeader: orderBy});
        let sortArray = [...this.state.professionTable]

        if (this.state.sortMethod === 'asc') {
            sortArray.sort((a, b) => {
                return a[orderBy] - b[orderBy]
            })
            this.setState({sortMethod: 'desc', professionTable: sortArray});
        } else {
            sortArray.sort((a, b) => {
                return b[orderBy] - a[orderBy]
            })
            this.setState({sortMethod: 'asc', professionTable: sortArray});
        }
    }

    handleClick = () => {
        this.setState({loadTable: false});
        this.props.handleSection('professions');
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
                            {displayName: 'Professions Learned', name: 'stat_prof_learned', tooltip: 'How many Professions the character has learned.'},
                            {displayName: 'Professions Maxed', name: 'stat_prof_maxed', tooltip: 'How many Professions the character has risen to max level.'},
                            {displayName: 'Secondary Professions Maxed', name: 'stat_secondary_prof_maxed', tooltip: 'How many Secondary Professions the character has risen to max level.'},
                            {displayName: 'Cooking Recipes', name: 'stat_cooking_recipes', tooltip: 'How many cooking recipes the character has learned.'},
                            {displayName: 'Fish Caught', name: 'stat_fish_caught', tooltip: 'How many fish the character has caught.'},
                            {displayName: 'Alchemy Recipes', name: 'stat_alch_recipes', tooltip: 'How many Alchemy Recipes the character has learned.'},
                            {displayName: 'Blacksmithing Plans', name: 'stat_blacksmith_plans', tooltip: 'How many Blacksmithing Plans the character has learned.'},
                            {displayName: 'Enchants', name: 'stat_enchants', tooltip: 'How many Enchants the character has learned.'},
                            {displayName: 'Disenchants', name: 'stat_disenchants', tooltip: 'How many items the character has disenchanted.'},
                            {displayName: 'Engineering Schematics', name: 'stat_engi_schematics', tooltip: 'How many Engineering Schematics the character has learned.'},
                            {displayName: 'Inscription Recipes', name: 'stat_inscriptions', tooltip: 'How many Inscription Recipes the character has learned.'},
                            {displayName: 'Jewel Designs', name: 'stat_jewel_designs', tooltip: 'How many Jewel Designs the character has learned.'},
                            {displayName: 'Leather Patterns', name: 'stat_leather_patterns', tooltip: 'How many Leather Patterns the character has learned.'},
                            {displayName: 'Smelting Recipes', name: 'stat_smelting_recipes', tooltip: 'How many Smelting Recipes the character has learned.'},
                            {displayName: 'Tailor Patterns', name: 'stat_tailor_patterns', tooltip: 'How many Tailor Patterns the character has learned.'}
                        ]}
                        tableData={this.state.professionTable}
                        sortBy={this.sortBy}
                        selectedHeader={this.state.selectedHeader}
                    />
                    </div>
                </Slide>
            </div>
        )
    }
}

export default ProfessionStats