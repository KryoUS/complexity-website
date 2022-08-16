import React from 'react';
import axios from 'axios';
import { CheckRounded, CheckCircle, ClearRounded } from '@material-ui/icons';
import { Typography, Tooltip } from '@material-ui/core'
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
            this.setState({ realmInfo: res.data });
        }).catch(wowServerStatusError => {
            console.log("Error: ", wowServerStatusError);
        });
    }

    render(){
        return(
            this.state.realmInfo.status ? 
            <>
                <Typography style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                    Realm: {this.state.realmInfo.status.type === "DOWN" ? 
                        <Tooltip title={this.state.realmInfo.status.name}>
                            <Error color="error" fontSize="small" /> 
                        </Tooltip>
                    : 
                        <Tooltip title={this.state.realmInfo.status.name}>
                            <CheckRounded fontSize="small" style={{color: "#AAFF00"}} />
                        </Tooltip>}
                </Typography>
                <Typography style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                    Queue: {this.state.realmInfo.has_queue ? 
                        <Tooltip title="Currently there is a queue to log into the server.">
                            <CheckCircle color="secondary" fontSize="small" /> 
                        </Tooltip>
                    : 
                        <Tooltip title="There is no queue to log into the server.">
                            <ClearRounded fontSize="small" style={{color: "#AAFF00"}} /> 
                        </Tooltip>}
                </Typography>
            </>
            :
            null
        )
    }
}