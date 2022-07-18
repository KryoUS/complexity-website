import React from 'react';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import CheckRounded from '@material-ui/icons/CheckRounded';
import CheckCircle from '@material-ui/icons/CheckCircle';
import ClearRounded from '@material-ui/icons/ClearRounded';
import Error from '@material-ui/icons/Error';

export default class RealmStatus extends React.Component{
    constructor(){
        super();

        this.state = {
            realmInfo: {},
        }
    }

    componentDidMount = () => {
        axios.get('/api/wow/server/status').then(res => {
            this.setState({ realmInfo: res.data })
        }).catch(wowServerStatusError => {
            console.log("Error: ", wowServerStatusError);
        });
    }

    render(){
        return(
            <>
                <Typography style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                    Realm: {this.state.realmInfo.status ? 
                        <CheckRounded 
                        fontSize="small" 
                        style={{color: "#AAFF00"}} /> 
                    : 
                        <Error 
                        color="error" 
                        fontSize="small" /> }
                </Typography>
                <Typography style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                    Queue: {this.state.realmInfo.has_queue ? 
                        <CheckCircle 
                        color="secondary" 
                        fontSize="small" /> 
                    : 
                        <ClearRounded 
                        fontSize="small"
                        style={{color: "#AAFF00"}} /> }
                </Typography>
            </>
        )
    }
}