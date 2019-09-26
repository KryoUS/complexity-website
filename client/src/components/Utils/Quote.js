import React, { Component } from 'react';
import axios from 'axios';
import Loader from '../Utils/Loader';
import '../News/News.css';

class Quote extends Component {
    constructor() {
        super();

        this.state = {
            quote: '',
            saidBy: '',
            showQuote: false
        }
    }

    componentDidMount = () => {
        axios.get('/api/complexity/quotes').then(res => {
            this.setState({ quote: res.data.quote, saidBy: res.data.said_by, showQuote: true });
        }).catch(err => {
            console.log('Quote retrieve error.');
        });
    }

    render() {
        return (
            this.state.showQuote ? 
            <div className="fade1s" style={{ margin: '5px', fontSize: '1.25rem', textAlign: 'center', textShadow: '2px 2px 3px #000000' }}>"{this.state.quote}" - {this.state.saidBy}</div>
            :
            <Loader scale={'0.25'} margin={'-12px'} />
        )
    }
}

export default Quote;