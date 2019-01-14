import React, { Component } from 'react';

export default class DiscordWidget extends Component {
    render() {
        return (
            <iframe src="https://discordapp.com/widget?id=127631752159035392&theme=dark" 
                width="350" 
                height="500" 
                allowtransparency="true" 
                frameBorder="0" 
                title="Complexity Discord" 
                className="animate-right"
                style={{position: 'absolute', right: '5px', top: '50px'}}
            />
        )
    }
}