import React, { Component } from 'react';
import axios from 'axios';
import Achievement from '../Utils/Achievement';
import Item from '../Utils/Item';
import './Raiders.css';

class Raiders extends Component {
    constructor() {
        super();

        this.state = {
            raiders: [],
            selectorIndex: 0,
            items: {},
            loadItems: false,
            feed: [],
            character: '',
            realm: '',
            achievementLoader: 'loader'
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

    charSelect = (charIndex, char, realm) => {
        let difference = this.state.selectorIndex - charIndex;

        this.setState({achievementLoader: 'loader', feed: [], loadItems: false});
        this.getCharItems(char, realm);

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
        axios.put(`/characters/${name}&${realm}`).then(res => {
            this.setState({character: res.data.name, items: res.data.items, feed: res.data.feed, achievementLoader: '', loadItems: true});
        }).catch(error =>{
            console.log('Character API Failed');
            console.log(error);
        })
    }

    componentDidMount = () => {

        axios.get('/raiders').then(res => {
            
            let selector = Math.floor(res.data.length / 2);
            this.setState({selectorIndex: selector, raiders: res.data});
            this.setState({character: this.state.raiders[selector].character_name, realm: this.state.raiders[selector].realm});
            this.getCharItems(this.state.character, this.state.realm);

        }).catch(error => {
            console.log('Raider API Error');
            console.log(error);
        });

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
                            <div key={char.character_name} className="raiders-char fade3s" char={char.character_name} id={index} onClick={(e) => {this.charSelect(e.target.id, char.character_name, char.realm)}} style={
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
                        <div className="raider-blur fade3s" style={{background: `url('${this.state.raiders[this.state.selectorIndex].avatar_large}') top center no-repeat`}}/>
                        <div className="raider-header fade3s" style={{background: `url('${this.state.raiders[this.state.selectorIndex].avatar_large}') top center no-repeat`}}/>
                        <div className="raider-info-container fade3s">
                            <div className={`raider-achievement-container ${this.state.achievementLoader}`}>
                            { this.state.feed.length > 0 &&
                                this.state.feed.map((feed, index) => (
                                    feed.type === "ACHIEVEMENT" ?
                                    <Achievement achievement={feed} key={index} character={this.state.character}/>
                                    :
                                    null
                                ))
                            }
                            </div>
                            
                            { this.state.loadItems ?
                            <div className="raider-items-container">
                                <div className="raider-items">
                                    <Item item={this.state.items.mainHand}/>
                                    {this.state.items.offHand && <Item item={this.state.items.offHand}/>}
                                    <Item item={this.state.items.head}/>
                                    <Item item={this.state.items.neck}/>
                                </div>
                                <div className="raider-items">
                                    <Item item={this.state.items.shoulder}/>
                                    <Item item={this.state.items.back}/>
                                    <Item item={this.state.items.chest}/>
                                    <Item item={this.state.items.wrist}/>
                                </div>
                                <div className="raider-items">
                                    <Item item={this.state.items.hands}/>
                                    <Item item={this.state.items.waist}/>
                                    <Item item={this.state.items.legs}/>
                                    <Item item={this.state.items.feet}/>
                                </div>
                                <div className="raider-items">
                                    <Item item={this.state.items.finger1}/>
                                    <Item item={this.state.items.finger2}/>
                                    <Item item={this.state.items.trinket1}/>
                                    <Item item={this.state.items.trinket2}/>
                                </div>
                            </div>
                            :
                            null}
                        </div>
                </div>
                }
            </div>
        )
    }
}

export default Raiders