import React,  { Component } from 'react';
import axios from 'axios';
import { setMain } from '../../ducks/reducer';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
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
    }
});

class Settings extends Component {
    constructor() {
        super();

        this.state = {
            isAdmin: false,
            releaseTitle: '',
            releaseDate: '2019-05-24T10:30',
            releaseLink: ''
        }
    }

    componentDidMount = () => {
        axios.get('/auth').then(res => {
            console.log('Auth User Object', res.data);
        }).catch(error => {
            console.log('Not Authed', error);
        })
    }

    // newMain = () => {
    //     this.props.setMain(name, avatarLarge, avatarMed, avatarSmall);
    // }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handleClick = (section) => {
        section === 'releases' &&
        //Below is the milliseconds from the date TextField
        console.log(new Date(this.state.releaseDate).getTime())
    }

    render(){

        console.log('Props', this.props)

        return(
            <div className ="settings-div" style={{background: `url('https://res.cloudinary.com/complexityguild/image/upload/v1534798726/wow/backgrounds/settings.jpg') top center/cover no-repeat`, maxWidth: '100vw', maxHeight: '100vw'}}>
                <div className="settings-container">
                    <div className="settings-column">
                        <div className="settings-row">
                            Main Characters
                        </div>
                    </div>
                    {/* {this.state.isAdmin && */}
                    <MuiThemeProvider theme={theme}>
                        <div className="settings-column">
                            <h3>Add a Release Date</h3>
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
                            <div id="releases" className="settings-button" onClick={() => this.handleClick('releases')}>Submit</div>
                        </div>
                    </MuiThemeProvider>
                    {/* } */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        main: state.main,
        mainAvatarLarge: state.mainAvatarLarge,
        mainAvatarMed: state.mainAvatarMed,
        mainAvatarSmall: state.mainAvatarSmall,
    }
}

export default connect( mapStateToProps, {setMain} )( Settings );