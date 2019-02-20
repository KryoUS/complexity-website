import React,  { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';

const Transition = (props) => {
    return <Slide direction="up" {...props} />;
}

class AddRelease extends Component {
    constructor() {
        super();

        this.state = {
            releaseTitle: '',
            releaseLink: '',
            releaseDate: '',
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    addRelease = () => {
        axios.post('/api/releases', {
            releaseTitle: this.state.releaseTitle,
            releaseDate: new Date(this.state.releaseDate).getTime(),
            releaseLink: this.state.releaseLink
        }).then(res => {
            this.props.dialogClose();
            this.props.snackBarMessageSet('New Release Added!');
            this.setState({ 
                releaseTitle: '',
                releaseLink: '',
                releaseDate: '',
            })
        }).catch(addReleaseError => {
            console.log('Adding a New Release Failed! NEEDSERROR');
        })
    }

    render(){

        return(
            <Dialog
                open={this.props.releaseAddDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.props.dialogClose}
                fullScreen={false}
            >
                <DialogTitle id="alert-dialog-slide-title">
                    <div className="modal-title">Add a new Release Date Countdown</div>
                </DialogTitle>
                <DialogContent id="alert-dialog-slide-content">
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className="modal-description">This shows on the Home page as a Countdown timer from now until the release date.</div>
                    </DialogContentText>
                    <TextField
                        id='releaseTitle'
                        label='Title'
                        value={this.state.releaseTitle}
                        onChange={this.handleChange('releaseTitle')}
                        required={true}
                    />
                    <TextField
                        id='releaseLink'
                        label='Link'
                        value={this.state.releaseLink}
                        onChange={this.handleChange('releaseLink')}
                        required={false}
                    />
                    <TextField
                        InputProps={{
                            classes: {
                                input: {color: 'white'}
                            }
                        }}
                        id='releaseDate'
                        label='Release Date'
                        defaultValue='2019-05-24T10:30'
                        onChange={this.handleChange('releaseDate')}
                        required={true}
                        type='datetime-local'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    {/* {this.state.tableData.length >= 1 && 
                        <ReleasesTable tableData={this.state.tableData}/>
                    } */}
                </DialogContent>
                <DialogActions id="alert-dialog-slide-actions">
                    <Button onClick={this.props.dialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.addRelease()} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default AddRelease;