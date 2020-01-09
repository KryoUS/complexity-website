import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../../../Utils/Loader';
import CharSpec from './CharSpec';

class CharTalents extends Component {
    constructor() {
        super();

        this.state = {
            specializations: [],
            activeSpec: [],
            loaded: false
        }
    }

    componentDidMount = () => {
        axios.put(`/api/wow/character/${this.props.selectedCharName.toLowerCase()}&${this.props.selectedCharRealm.toLowerCase()}/talents/`).then(res => {

            this.setState({
                specializations: res.data.specializations, 
                activeSpec: res.data.specializations.find(obj => obj.specialization.id === res.data.active_specialization.id), 
                loaded: true
            });

            console.log(res.data);
        }).catch(error => {
            console.log('WoW Character Talents API Error: ', error);
        });
    }

    selectSpec = (specArr) => {
        this.setState({ activeSpec: specArr });
    }

    render() {
        return (
            <div className="selected-category-container char-info-overflow">
                {this.state.loaded === false ?
                    <Loader />
                    :
                    <div className="animate-right" style={{ width: '95%' }}>
                        <div className="char-info-overflow" style={{ width: '100%', overflow: 'hidden' }}>
                            <div className="flex-row flex-around" style={{ width: '100%' }}>
                                {this.state.specializations.map(obj => {
                                    return <div
                                        key={`${obj.specialization.id}${obj.specialization.name}`}
                                        className="button-text"
                                        id={this.state.activeSpec.specialization.id === obj.specialization.id ? "button-selected": ""}
                                        onClick={() => this.selectSpec(obj)}
                                    >
                                        {obj.specialization.name}
                                    </div>
                                })}
                            </div>
                            <div className="gradient-line-white" />
                            {this.state.activeSpec.talents ? <CharSpec spec={this.state.activeSpec} /> : <div style={{ fontSize: '1.5rem', textAlign: 'center' }}>Talents Not Selected</div>}
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default CharTalents