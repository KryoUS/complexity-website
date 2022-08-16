import React from 'react';
import axios from 'axios';
import { IconButton, CircularProgress } from '@material-ui/core';

export default class MythicAffixes extends React.Component {
    constructor() {
        super();

        this.state = {
            raiderIOData: {},
            raiderIOLoaded: false
        }
    }
    
    componentDidMount = () => {
        axios.get('/api/raiderio/mythicaffixes').then(res => {
            this.setState({ raiderIOData: res.data, raiderIOLoaded: true });
        }).catch(raiderIOMythicAffixesError => {
            console.log("Mythic Affix fetch issue.");
        });
    }

    render() {
        return (
            this.state.raiderIOLoaded ? 
                this.state.raiderIOData.affix_details.map(obj => {
                    return <IconButton
                        key={`affixId${obj.id}`}
                        size={this.props.iconSize}
                        href={obj.wowhead_url} 
                        data-wowhead={`affix=${obj.id}`}
                        target="_blank" 
                        rel="noopener noreferrer" 
                    >
                        <img 
                        style={{height: this.props.iconHW, width: this.props.iconHW}}
                        src={`https://render.worldofwarcraft.com/us/icons/56/${obj.icon}.jpg`} 
                        alt={obj.name + ' Mythic Plus Affix - ' + obj.description}
                        onError={e => {
                            e.target.src = 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg';
                        }}
                        />
                    </IconButton>
                })
            :
            <CircularProgress size={16} color="secondary" />
        );
    }
}