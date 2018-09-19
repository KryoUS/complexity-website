import React,  { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { setMain } from '../../ducks/reducer';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Button from '@material-ui/core/Button';
import AddRelease from './Release/AddRelease';
import RemoveRelease from './Release/RemoveRelease';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './Settings.css';

const theme = createMuiTheme({
    palette: {
      primary: { main: "rgb(0, 217, 158)"},
      text: { primary: "#ffffff" }
    },
    overrides: {
        MuiInput: {
            input: {
                color: '#ffffff'
            },
            underline: {
                '&:hover:not($disabled):not($error):not($focused):before': {
                    borderBottom: '1px solid rgb(0, 217, 158)',
                },
                '&:not($disabled):not($error):not($focused):before': {
                    borderBottom: '1px solid #ffffff',
                },
            },
        },
        MuiFormLabel: {
            root: {
                color: '#ffffff'
            }
        },
        MuiFormControl: {
            root: {
                margin: '5px'
            },
        },
    },
    paper: {
        position: 'absolute',
    },
});

const Transition = (props) => {
    return <Slide direction="up" {...props} />;
}

class Settings extends Component {
    constructor() {
        super();

        this.state = {
            newMainDialog: false,
            newMain: '',
            newAvatarSmall: '',
            newAvatarMed: '',
            newAvatarLarge: '',
            releaseAddDialog: false,
            releaseRemoveDialog: false,
            snackBarOpen: false,
            snackBarMessage: '',
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    snackBarMessageSet = (message) => {
        this.setState({ snackBarMessage: message, snackBarOpen: true });
    }

    snackBarClose = () => {
        this.setState({ snackBarOpen: false });
    }

    dialogClose = () => {
        this.setState({ 
            releaseAddDialog: false,
            releaseRemoveDialog: false,
            newMainDialog: false,
        });
    };

    //Doesn't set the main, just sets state for prompts in preperation for user acceptence
    selectNewMain = (name, avatarSmall, avatarMed, avatarLarge) => {
        this.setState({ 
            newMainDialog: true,
            newMain: name, 
            newAvatarSmall: avatarSmall, 
            newAvatarMed: avatarMed, 
            newAvatarLarge: avatarLarge 
        });
    };

    setNewMain = () => {
        this.props.setMain(this.state.newMain, this.state.newAvatarSmall, this.state.newAvatarMed, this.state.newAvatarLarge);
        axios.post('/auth/newmain', {
            id: this.props.user.id,
            main: this.state.newMain,
            mainAvatarSmall: this.state.newAvatarSmall,
            mainAvatarMed: this.state.newAvatarMed,
            mainAvatarLarge: this.state.newAvatarLarge
        }).then(res => {
            this.dialogClose();
            this.snackBarMessageSet('New main set!');
        }).catch(newMainError => {
            console.log('Unable to set a new main. NEEDSERROR');
        })
    }

    handleRelease = (type) => {
        type === 'addRelease' && this.setState({ releaseAddDialog: true });
        type === 'deleteRelease' && this.setState({ releaseRemoveDialog: true });
    }

    render(){

        // console.log('Settings Props', this.props)

        const mainNameStyle = {
            width: '100%', 
            background: 'linear-gradient(to right, transparent, rgb(0, 0, 0), transparent)', 
            textAlign: 'center'
        }

        return(
            <div className ="settings-div" style={{
                background: `url('https://res.cloudinary.com/complexityguild/image/upload/v1534798726/wow/backgrounds/settings.jpg') fixed top center/cover no-repeat`
                }}>
                {!this.props.user.id && <Redirect to='/'/>}
                <div className="settings-container">
                    <div className="settings-column-avatars">
                        <h3>Set Main Character</h3>
                        <div className="settings-row-avatars">
                            {this.props.user.main &&
                                this.props.user.chars.map((char, index) => {
                                    return <div key={index} 
                                            style={{
                                                margin: '5px',
                                                background: `url('${char.avatarMed}') no-repeat`, 
                                                width: '230px', 
                                                height: '116px',
                                                boxShadow: '10px 10px 15px #000000'
                                            }} 
                                            className={`settings-medavatar ${this.props.user.mainAvatarSmall === char.avatarSmall && 'settings-selected'}`}
                                            onClick={() => {this.selectNewMain(char.name, char.avatarSmall, char.avatarMed, char.avatarLarge)}}
                                        >
                                            <div style={mainNameStyle}>{char.name}</div>
                                        </div>
                                })
                            }
                        </div>
                    </div>
                    {this.props.user.isAdmin &&
                        <MuiThemeProvider theme={theme}>
                            <h3>Admin Tools</h3>
                            <div className="settings-column">
                                <div className="settings-row">
                                    <Button 
                                        onClick={() => this.handleRelease('addRelease')} 
                                        color="primary" 
                                        data-tip='Add a new Release Date countdown timer to the Home page.'
                                        >
                                        Add a Release
                                    </Button>
                                    <Button 
                                        onClick={() => this.handleRelease('deleteRelease')} 
                                        color="primary"
                                        data-tip='Remove a new Release Date countdown timer from the Home page.'
                                        >
                                        Remove a Release
                                    </Button>
                                </div>
                            </div>
                        </MuiThemeProvider>
                    }
                </div>
                {/* Set New Main */}
                <Dialog
                    open={this.state.newMainDialog}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.dialogClose}
                    fullScreen={false}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        Set a new main Character?
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {`Do you really want to set ${this.state.newMain} as your main character?`}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.dialogClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.setNewMain()} color="primary">
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
                <AddRelease releaseAddDialog={this.state.releaseAddDialog} dialogClose={this.dialogClose} snackBarMessageSet={this.snackBarMessageSet} />
                {this.state.releaseRemoveDialog && 
                    <RemoveRelease 
                        releaseRemoveDialog={this.state.releaseRemoveDialog} 
                        dialogClose={this.dialogClose} 
                        snackBarMessageSet={this.snackBarMessageSet} 
                    />
                }
                {/* Snackbar Alert */}
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snackBarOpen}
                    autoHideDuration={5000}
                    onClose={this.snackBarClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.snackBarMessage}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            onClick={this.snackBarClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
                <ReactTooltip />
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        user: state.user
    }
}

export default connect( mapStateToProps, {setMain} )( Settings );