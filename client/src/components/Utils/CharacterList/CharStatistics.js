import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import axios from 'axios';
import moment from 'moment';
import './CharStatistics.css';

class CharStatistics extends Component {
    constructor() {
        super();

        this.state = {
            subCategories: [],
            loaded: false
        }
    }

    componentDidMount = () => {
        axios.put(`/api/wow/character/${this.props.selectedCharName}&${this.props.selectedCharRealm}/statistics/`).then(res => {
            this.setState({ subCategories: res.data.statistics.subCategories, loaded: true });
        }).catch(error => {
            console.log('WoW Character Statistics API Error: ', error);
        });
    }

    statisticsBuilder = (obj, index) => {
        return <div className="flex-row flex-between">
            <div className="statistics-name">{obj.name} {obj.highest && `: ${obj.highest}`}</div>
            <div className="flex-row flex-between">
                <div>{obj.quantity}</div>
                <div id="statistics-date">{moment(obj.lastUpdated).format('MMMM Do YYYY, h:mm:ss a')}</div>
            </div>
        </div>
    }

    statisticsCategoryBuilder = (obj, index, subCategory) => {

        return <Collapsible 
            key={obj.id}
            trigger={
                <div className="flex-row flex-between statistics-category" id={subCategory ? 'statistics-sub-category' : undefined}>{obj.name}</div>
            } 
            transitionTime={200} 
            easing={'ease 0s'} 
            lazyRender={true}
        >
            <div className="flex-column flex-between statistics-sub-category animate-right">
                {obj.statistics && 
                    <div id="statistics-card">
                        {obj.statistics.map((statObj, statIndex) => {
                            return this.statisticsBuilder(statObj, statIndex);
                        })}
                    </div>
                }
                {obj.subCategories && obj.subCategories.map((subCatObj, subCatIndex) => {
                    return this.statisticsCategoryBuilder(subCatObj, subCatIndex, true);
                })}
            </div>
        </Collapsible>

    }

    render () {
        return (
            <div className="selected-category-container char-info-overflow">
                {this.state.loaded ? 
                    <div className="animate-right">
                        {this.state.subCategories.map((obj, index) => {
                            return this.statisticsCategoryBuilder(obj, index ,false);
                        })}
                    </div>
                : 
                    <div class="lds-roller">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                }
            </div>
        )
    }
}

export default CharStatistics