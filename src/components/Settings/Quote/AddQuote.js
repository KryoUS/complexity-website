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
import './AddQuote.css';

const Transition = (props) => {
    return <Slide direction="up" {...props} />;
}

class AddQuote extends Component {
    constructor() {
        super();

        this.state = {
            placeholder: 'Search for a member...',
            quote: '',
            saidBy: '',
            members: [],
            filteredMembers: []
        }
    }

    componentDidMount = () => {
        axios.get('/api/members/names').then(res => {
            let membersArr = [];
            res.data.forEach(obj => {
                membersArr.push(obj.character_name);
            });

            this.setState({ members: membersArr });
        }).catch(error => {
            console.log('Get Member Name error!', error);
        })
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    addQuote = () => {

        if (this.state.members.indexOf(this.state.placeholder) >= 0) {
            axios.post('/api/complexity/quotes', {
                quote: this.state.quote,
                saidBy: this.state.saidBy,
            }).then(res => {
                this.props.dialogClose();
                this.props.snackBarMessageSet('New Quote Added!');
                this.setState({ 
                    quote: '',
                    saidBy: ''
                })
            }).catch(error => {
                console.log('Adding a New Quote Failed!', error);
            })
        } else {
            this.props.snackBarMessageSet('That Member does not exist! Please try again.');
        }
    }

    searchData = (e) => {
        let searchResults = [];
        if(e.target.value !== '' && e.target.value.length > 2) {
            this.state.members.forEach(member => {
                if (member.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
                    searchResults.push(member);
                };
            });
        };
        this.setState({filteredMembers: searchResults, placeholder: e.target.value});
    }

    setName = (name) => {
        this.setState({ saidBy: name, placeholder: name, filteredMembers: [] });
    }

    clearInput = () => {
        this.setState({ placeholder: '' })
    }

    render(){

        return(
            <Dialog
                open={this.props.quoteAddDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.props.dialogClose}
                fullScreen={false}
            >
                <DialogTitle id="alert-dialog-slide-title">
                    Add a new Quote
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        This will show on the News page after a random selection.
                    </DialogContentText>
                    <TextField
                        id='quote'
                        label='Quote'
                        value={this.state.quote}
                        onChange={this.handleChange('quote')}
                        required={true}
                        fullWidth={true}
                        margin='normal'
                    />
                    <TextField
                        id='member'
                        label='Member Name'
                        value={this.state.placeholder}
                        onChange={this.searchData}
                        required={true}
                        onClick={this.clearInput}
                        margin='normal'
                    />
                    <div className="quote-results">
                        {this.state.filteredMembers.map((name, index) => {
                            return <div key={name + index} name={name} className="quote-name" onClick={() => this.setName(name)}>{name}</div>
                        })}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.dialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => this.addQuote()} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default AddQuote;