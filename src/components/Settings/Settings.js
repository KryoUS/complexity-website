import React,  { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { setMain } from '../../ducks/reducer';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './Settings.css';
import ReleasesTable from './ReleasesTable';

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
            releaseTitle: '',
            releaseLink: '',
            releaseDate: '2019-05-24T10:30',
            dialogOpen: false,
            dialogFullscreen: false,
            dialogTitle: '',
            dialogMessage: '',
            dialogTextFields: [],
            dialogButtonOne: '',
            dialogButtonTwo: '',
            newMain: '',
            newAvatarSmall: '',
            newAvatarMed: '',
            newAvatarLarge: '',
            snackBarOpen: false,
            snackBarMessage: '',
            tableData: []
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    snackBarClose = () => {
        this.setState({ snackBarOpen: false });
    }

    dialogClose = () => {
        this.setState({ 
            releaseTitle: '',
            releaseLink: '',
            releaseDate: '2019-05-24T10:30',
            tableData: [],
            dialogOpen: false,
            dialogTitle: '',
            dialogMessage: '',
            dialogTextFields: [],
            dialogButtonOne: '',
            dialogButtonTwo: '',
            dialogFullscreen: false
        });
    };

    //Doesn't set the main, just sets state for prompts in preperation for user acceptence
    selectNewMain = (name, avatarSmall, avatarMed, avatarLarge) => {
        this.setState({ 
            dialogOpen: true,
            dialogTitle: 'Set a new main character?',
            dialogMessage: `Do you really want to set your new main to ${name}?`, 
            dialogButtonOne: 'Cancel',
            dialogButtonTwo: 'Yes',
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
        }).catch(newMainError => {
            console.log('Unable to set a new main. NEEDSERROR');
        })
    }

    dialogAccept = (type) => {
        type === 'Set a new main character?' && this.setNewMain();
        type === 'Add a new Release Date Countdown' && this.addRelease();
    }

    handleRelease = (type) => {
        let tempArray = [];

        if (type === 'addRelease') {
            tempArray.push({id: 'releaseTitle', label: 'Title', value: this.state.releaseTitle, required: true});
            tempArray.push({id: 'releaseLink', label: 'Link', value: this.state.releaseLink, required: false});
            tempArray.push({
                id: 'releaseDate', 
                label: 'Release Date', 
                required: true, 
                type: "datetime-local", 
                defaultValue: this.state.releaseDate, 
                InputLabelProps: {shrink: true},
            });
            this.setState({ 
                dialogOpen: true,
                dialogTitle: 'Add a new Release Date Countdown',
                dialogMessage: `This shows on the Home page as a Countdown timer from now until the release date.`,
                dialogTextFields: tempArray,
                dialogButtonOne: 'Cancel',
                dialogButtonTwo: 'Add'
            });
        }

        type === 'deleteRelease' && this.getAllReleases();
    }

    addRelease = () => {
        axios.post('/api/releases', {
            releaseTitle: this.state.releaseTitle,
            releaseDate: new Date(this.state.releaseDate).getTime(),
            releaseLink: this.state.releaseLink
        }).then(res => {
            this.dialogClose();
            this.setState({ snackBarMessage: 'New Release Added!', snackBarOpen: true })
        }).catch(addReleaseError => {
            console.log('Adding a New Release Failed! NEEDSERROR');
        })
    }

    getAllReleases = () => {
        this.setState({ 
            dialogTitle: 'Release Entry Removal',
            dialogMessage: `Select which Release Date entries you'd like to remove. WARNING: This cannot be undone.`,
            dialogButtonOne: 'Cancel',
            dialogButtonTwo: 'Remove',
            dialogFullscreen: true
        });
        axios.get('/api/allreleases').then(res => {
            this.setState({ tableData: res.data, dialogOpen: true })
        }).catch(allReleaseError => {
            console.log('Getting all Releases DB Error NEEDSERROR');
        })
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
                                <Button onClick={() => this.handleRelease('addRelease')} color="primary">
                                    Add a Release
                                </Button>
                                <Button onClick={() => this.handleRelease('deleteRelease')} color="primary">
                                    Remove a Release
                                </Button>
                            </div>
                        </div>
                        <ReactTooltip />
                    </MuiThemeProvider>
                    }
                </div>
                <Dialog
                    open={this.state.dialogOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.dialogClose}
                    fullScreen={this.state.dialogFullscreen}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {this.state.dialogTitle}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.state.dialogMessage}
                        </DialogContentText>
                        {this.state.dialogTextFields &&
                            this.state.dialogTextFields.map(textField => {
                                return <TextField
                                    key={textField.id}
                                    id={textField.id}
                                    label={textField.label}
                                    defaultValue={textField.value || textField.defaultValue}
                                    onChange={this.handleChange(textField.id)}
                                    required={textField.required}
                                    type={textField.type ? textField.type : null}
                                    InputLabelProps={textField.InputLabelProps ? textField.InputLabelProps : null}
                                />
                            })
                        }
                        {this.state.tableData.length >= 1 && 
                            <ReleasesTable tableData={this.state.tableData}/>
                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.dialogClose} color="primary">
                            {this.state.dialogButtonOne}
                        </Button>
                        <Button onClick={() => this.dialogAccept(this.state.dialogTitle)} color="primary">
                            {this.state.dialogButtonTwo}
                        </Button>
                    </DialogActions>
                </Dialog>
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