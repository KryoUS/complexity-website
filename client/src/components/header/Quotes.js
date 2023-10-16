import React from 'react';
import axios from 'axios';
import { Button, Typography, Fade, CircularProgress} from '@mui/material';

export default class Quotes extends React.Component{
    constructor() {
        super();

        this.state = {
            quote: '',
            saidBy: '',
            showQuote: false
        }
    }

    getRandomQuote = () => {
        this.setState({ showQuote: false });
        axios.get('/api/complexity/quotes').then(res => {
            this.setState({ quote: res.data.quote, saidBy: res.data.said_by, showQuote: true });
        }).catch(err => {
            console.log('Quote retrieve error.');
        });
    };

    componentDidMount = () => {
        this.getRandomQuote();
    };

    render() {
        return (
            <Button style={{display: 'flex', fontStyle: 'italic', textTransform: "none"}} onClick={this.getRandomQuote}>
                {this.state.showQuote ? 
                    <Fade in={true}><Typography variant={"h6"} style={{fontWeight: 400}}>"{this.state.quote}" - {this.state.saidBy}</Typography></Fade> 
                : 
                    <CircularProgress size={32}/>
                }
            </Button>
        )
    }
}