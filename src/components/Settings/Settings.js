import React,  { Component } from 'react';
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

// Set a new Main
// If Admin, allow raider exception flag, new release addition, and maybe news?
// Delete Account

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
            releaseDate: '2019-05-24T10:30',
            releaseLink: '',
            dialogOpen: false,
            dialogTitle: '',
            dialogMessage: '',
            newMain: '',
            newAvatarSmall: '',
            newAvatarMed: '',
            newAvatarLarge: '',
            snackBarOpen: false,
            snackBarMessage: ''
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleSubmit = (section) => {
        section === 'releases' &&
        //Below is the milliseconds from the date TextField
        console.log(new Date(this.state.releaseDate).getTime())
        this.setState({ snackBarMessage: 'New Release Added!', snackBarOpen: true })
    }

    handleSetMain = () => {
        this.props.setMain(this.state.newMain, this.state.newAvatarSmall, this.state.newAvatarMed, this.state.newAvatarLarge);
        this.handleClose();
        axios.post('/auth/newmain', {
            id: this.props.user.id,
            main: this.state.newMain,
            mainAvatarSmall: this.state.newAvatarSmall,
            mainAvatarMed: this.state.newAvatarMed,
            mainAvatarLarge: this.state.newAvatarLarge
        }).then(res => {
            
        })
    }

    handleClickOpen = (name, avatarSmall, avatarMed, avatarLarge) => {
        this.setState({ 
            dialogOpen: true,
            dialogTitle: 'Set a new main character?',
            dialogMessage: `Do you really want to set your new main to ${name}?`, 
            newMain: name, 
            newAvatarSmall: avatarSmall, 
            newAvatarMed: avatarMed, 
            newAvatarLarge: avatarLarge 
        });
    };

    handleClose = () => {
        this.setState({ dialogOpen: false });
    };

    snackBarClose = () => {
        this.setState({ snackBarOpen: false });
    }

    render(){

        console.log('Settings Props', this.props)

        const mainNameStyle = {
            width: '100%', 
            background: 'linear-gradient(to right, transparent, rgb(0, 0, 0), transparent)', 
            textAlign: 'center'
        }

        return(
            <div className ="settings-div" style={{
                background: `url('https://res.cloudinary.com/complexityguild/image/upload/v1534798726/wow/backgrounds/settings.jpg') top center/cover no-repeat`, 
                maxWidth: '100vw', 
                maxHeight: '100vw'
                }}>
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
                                            onClick={() => {this.handleClickOpen(char.name, char.avatarSmall, char.avatarMed, char.avatarLarge)}}
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
                            <div data-tip='Add a new Release Date countdown timer to the Home page.'>Add a New Release</div>
                            <div className="settings-row">
                                <TextField
                                    id="releaseTitle"
                                    label="Title"
                                    value={this.state.releaseTitle}
                                    onChange={this.handleChange('releaseTitle')}
                                    required={true}
                                />
                                <TextField
                                    id="releaseLink"
                                    label="Link"
                                    value={this.state.releaseLink}
                                    onChange={this.handleChange('releaseLink')}
                                />
                                <TextField
                                    id="datetime-local"
                                    label="Release Date"
                                    type="datetime-local"
                                    defaultValue="2019-05-24T10:30"
                                    onChange={this.handleChange('releaseDate')}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div id="releases" className="settings-button" onClick={() => this.handleSubmit('releases')}>Submit</div>
                        </div>
                        <ReactTooltip />
                    </MuiThemeProvider>
                    }
                </div>
                <Dialog
                    open={this.state.dialogOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                >
                <DialogTitle id="alert-dialog-slide-title">
                    {this.state.dialogTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        {this.state.dialogMessage}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        No
                    </Button>
                    <Button onClick={this.handleSetMain} color="primary">
                        Yes
                    </Button>
                </DialogActions>
                </Dialog>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snackBarOpen}
                    autoHideDuration={3000}
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