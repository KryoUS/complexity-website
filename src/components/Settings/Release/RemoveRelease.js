import React,  { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import ReleasesTable from './ReleasesTable';

const Transition = (props) => {
    return <Slide direction="up" {...props} />;
}

class RemoveRelease extends Component {
    constructor() {
        super();

        this.state = {
            tableData: [],
        }
    }

    componentDidMount = () => {
        this.getAllReleases();
    }

    getAllReleases = () => {
        axios.get('/api/allreleases').then(res => {
            this.setState({ tableData: res.data });
        }).catch(allReleaseError => {
            console.log('Getting all Releases DB Error NEEDSERROR');
        });
    }

    render(){

        return(
            <Dialog
                open={this.props.releaseRemoveDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.props.dialogClose}
                fullScreen={true}
            >
                <DialogTitle id="alert-dialog-slide-title">
                    Remove a new Release Date Countdown
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Select all Release Dates you'd like to remove from the Home page.
                    </DialogContentText>
                    {this.state.tableData.length >= 1 && 
                        <ReleasesTable tableData={this.state.tableData}/>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.dialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.addRelease()} color="primary">
                        Remove Selected
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default RemoveRelease;