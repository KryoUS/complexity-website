import React from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

export default class TokenPrice extends React.Component{
    constructor(){
        super();

        this.state = {
            tokenPrice: 0
        }
    }

    componentDidMount = () => {
        axios.get('/api/wow/token/price').then(res => {
            this.setState({ tokenPrice: res.data.price.toString().slice(0, -4) })
        }).catch(error => {
            console.log("Error:", error);
        });

    }

    render(){
        return(
            <Button
            variant="text"
            size="medium" 
            href="https://us.shop.battle.net/en-us/product/world-of-warcraft-token" 
            data-wowhead="item=122284" 
            target="_blank" 
            rel="noopener noreferrer"
            startIcon={<img style={{ width: '16px', height: '16px' }} alt='Current WoW Token Price' src="https://res.cloudinary.com/complexityguild/image/upload/v1538802480/site/iconarmory.png" />}
            >
                Token: {this.state.tokenPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")} g
            </Button>
        )
    }
}