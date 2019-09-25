import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import axios from 'axios';
import ProgressBar from '../ProgressBar';
import './CharProfessions.css';

class CharProfessions extends Component {
    constructor() {
        super();

        this.state = {
            primary: [],
            secondary: []
        }
    }

    componentDidMount = () => {
        axios.put(`/api/wow/character/${this.props.selectedCharName}&${this.props.selectedCharRealm}/professions/`).then(res => {
            this.setState({
                primary: res.data.professions.primary,
                secondary: res.data.professions.secondary
            });
        }).catch(error => {
            console.log('WoW Character Professions API Error: ', error);
        });
    }

    professionBuilder = (obj) => {
        return <div className="flex-row flex-end row-container animate-right" id="prof-row" key={obj.name}>
            <div className="flex-row flex-end prof-name-container">
                <div className="prof-name">{obj.name}</div>
                <div className="icon20" style={{
                    background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/${obj.icon}.png) 20px`,
                    backgroundSize: '20px'
                }} />
            </div>
            <div className="prof-bar-container">
                <ProgressBar
                    current={obj.rank}
                    remaining={obj.max - obj.rank}
                    height={'20px'}
                    bgColor={'#edba03'}
                    fontSize={'18px'}
                />
            </div>
        </div>
    }

    render() {
        return (
            <div className="selected-category-container char-info-overflow">
                {this.state.primary.length > 0 ?
                    <div className="animate-right">
                        <Collapsible trigger={<div className="prof-category">Primary</div>}
                            transitionTime={200}
                            easing={'ease 0s'}
                            open={true}
                            lazyRender={true}
                        >
                            {this.state.primary.map(obj => {
                                return this.professionBuilder(obj)
                            })}
                        </Collapsible>
                        <Collapsible trigger={<div className="prof-category">Secondary</div>}
                            transitionTime={200}
                            easing={'ease 0s'}
                            lazyRender={true}
                        >
                            {this.state.secondary.map(obj => {
                                return this.professionBuilder(obj)
                            })}
                        </Collapsible>
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

export default CharProfessions