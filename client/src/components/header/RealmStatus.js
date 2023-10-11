import React from 'react';
import axios from 'axios';
import { Error, CheckCircle, Warning } from '@material-ui/icons';
import { Button, Tooltip, CircularProgress } from '@material-ui/core'

export default class RealmStatus extends React.Component {
    constructor() {
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

    render() {
        return (
            this.state.realmInfo.status ?
                        <Button
                            variant="text"
                            size="medium"
                            // onClick={() => this.function()}
                            startIcon={
                                this.state.realmInfo.status.type === "DOWN"
                                    ?
                                    //Server is down
                                    <Tooltip title="The server is down.">
                                        <Error color="error" fontSize="small" />
                                    </Tooltip>
                                    :
                                    //Server is up but does it have a queue?
                                    this.state.realmInfo.has_queue
                                        ?
                                        //Server has a queue
                                        <Tooltip title="The server is up but with a queue.">
                                            <Warning fontSize="small" style={{ color: "#ffff00" }} />
                                        </Tooltip>
                                        :
                                        //Server does not have a queue
                                        <Tooltip title="The server is up.">
                                            <CheckCircle fontSize="small" style={{ color: "#00ff1e" }} />
                                        </Tooltip>
                            }>
                            Realm Status
                        </Button>
                :
                <CircularProgress size={16} color="secondary" />
        )
    }
}