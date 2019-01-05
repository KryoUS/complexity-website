import React, { Component } from 'react';
import axios from 'axios';
import CharacterList from '../Utils/CharacterList';
import './Raiders.css';

class Raiders extends Component {
    constructor() {
        super();

        this.state = {
            raiders: [],
            loadChars: 'loader'
        }
    }

    componentDidMount = () => {

        axios.get('/api/raiders').then(res => {
            res.data.sort((a, b) => {
                let x = a.character_name.toLowerCase();
                let y = b.character_name.toLowerCase();
                if (x < y) {return -1;}
                if (x > y) {return 1;}
                return 0;
            })
            this.setState({raiders: res.data, loadChars: ''});
        }).catch(error => {
            console.log('Raider API Error');
            console.log(error);
        });

    }

    render(){

        return(
            <div className="raiders-div">
                <div className={this.state.loadChars} />
                {this.state.raiders.length > 0 && <CharacterList charsArray={this.state.raiders} />}
            </div>
        )
    }
}

export default Raiders