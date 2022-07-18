import React from 'react';
import { Dialog } from '@material-ui/core';

export default function Discord(props){

    return(
        <Dialog
        open={props.discordOpen}
        onClose={props.discordToggle}
        >
            <iframe src="https://discordapp.com/widget?id=127631752159035392&theme=dark" 
            width="350" 
            height="500" 
            allowtransparency="true" 
            frameBorder="0" 
            title="Complexity Discord" 
            />
        </Dialog>
    )
    
}