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
            checkedRows: []
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

    checkedRows = (checked) => {
        let checkedArray = [...this.state.checkedRows];
        let checkedIndex = checkedArray.indexOf(checked);
        checkedIndex >= 0 ? checkedArray.splice(checkedIndex, 1) : checkedArray.push(checked);
        this.setState({ checkedRows: checkedArray });
    }

    removeRelease = () => {
        this.state.checkedRows.length >= 1 && this.state.checkedRows.map(id => {
            return axios.delete(`/api/deleterelease/${id}`).then(res => {
                this.props.snackBarMessageSet(`Release successfully removed!`);
            }).catch(error => {
                console.log('Release Delete Error NEEDSERROR', error);
            });
        });
        this.props.dialogClose();
        this.setState({ checkedRows: [] });
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
                        <ReleasesTable tableData={this.state.tableData} checkedRows={this.checkedRows}/>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.dialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.removeRelease()} color="primary">
                        Remove Selected
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default RemoveRelease;