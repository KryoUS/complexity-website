import React, { Component } from 'react';
import axios from 'axios';
import './Raiders.css';

class Raiders extends Component {
    constructor() {
        super();

        this.state = {
            raiders: [],
            selectorIndex: 0,
            items = {}
        }
    }

    shiftLeft = () => {
        let arrayCopy = this.state.raiders;
        let newArray = arrayCopy.shift();
        arrayCopy.push(newArray);
        this.setState({raiders: arrayCopy});
    }

    shiftRight = () => {
        let arrayCopy = this.state.raiders;
        let newArray = arrayCopy.pop();
        arrayCopy.splice(0, 0, newArray);
        this.setState({raiders: arrayCopy});
    }

    charSelect = (charIndex) => {
        let difference = this.state.selectorIndex - charIndex;
        this.getCharItems(this.state.raiders[charIndex].character_name, this.state.raiders[charIndex].realm);

        if (difference > 0) {
            for (let i = 0; i < difference; i++) {
                this.shiftRight();
            }
        }

        if (difference < 0) {
            difference = Math.abs(difference)
            for (let i = 0; i < difference; i++) {
                this.shiftLeft();
            }
        }

    }

    getCharItems = (name, realm) => {
        console.log(name, realm)
        axios.put(`/characters/${name}&${realm}`).then(res => {
            this.setState({items: res.data.items});
        }).catch(error =>{
            console.log('Character API Failed');
            console.log(error);
        })
    }

    componentDidMount = () => {

        axios.get('/raiders').then(res => {
            
            let selector = Math.floor(res.data.length / 2);
            this.setState({selectorIndex: selector});
            this.setState({raiders: res.data});

        }).catch(error => {
            console.log('Raider API Error');
            console.log(error);
        })
    }

    render(){

        return(
            <div className="raiders-div">
                { this.state.raiders.length > 0 &&
                <div>
                    <div className="raiders-list-container" style={
                        this.state.raiders.length % 2 === 0 ?
                        {marginLeft: '-230px'}
                        :
                        {}
                    }
                    >
                        {this.state.raiders.map((char, index) => (
                            <div key={char.character_name} className="raiders-char" id={index} onClick={(e) => {this.charSelect(e.target.id)}} style={
                                index === this.state.selectorIndex ?
                                {backgroundImage: `url('${char.avatar_med}')`, boxShadow: 'inset 0px 0px 0px 2px white'}
                                :
                                {backgroundImage: `url('${char.avatar_med}')`}
                            }>
                                <div className="raider-info-container">
                                    <div className="raider-char-name">{char.character_name}</div>
                                    <img className="raider-spec" src={`https://res.cloudinary.com/complexityguild/image/upload/v1533521204/wow/icons/${char.spec_icon}.png`} alt={char.spec_icon}/>
                                </div>
                            </div>
                        ))}
                    </div>
                        <div className="raider-blur" style={{background: `url('${this.state.raiders[this.state.selectorIndex].avatar_large}') top center no-repeat`}}/>
                        <div className="raider-header" style={{background: `url('${this.state.raiders[this.state.selectorIndex].avatar_large}') top center no-repeat`}}/>
                </div>
                }
                <button onClick={() => {this.shiftLeft()}} >Shift Left</button>
                <button onClick={() => {this.shiftRight()}} >Shift Right</button>
            </div>
        )
    }
}

export default Raiders