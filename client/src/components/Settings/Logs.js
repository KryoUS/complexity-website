import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { infoModal } from '../../ducks/reducer';
import LogTable from '../Utils/LogTable';

class Logs extends Component {
    constructor() {
        super();

        this.state = {
            data: [],
            type: 'Services'
        }
    }

    componentDidMount = () => {
        this.servicesLog();
    }

    discordbotLog = () => {
        axios.get('/logs/discordbot').then(res => {
            this.setState({ data: res.data.reverse() });
        }).catch(error => {
            this.props.infoModal(true, 'Oops!', "Looks like there was a problem. Please try again in a moment.", 'OK');
        });
    }

    servicesLog = () => {
        axios.get('/logs/serviceslog').then(res => {
            this.setState({ data: res.data.reverse() });
        }).catch(error => {
            this.props.infoModal(true, 'Oops!', "Looks like there was a problem. Please try again in a moment.", 'OK');
        });
    }

    setLogType = (type) => {
        if (type === 'Discord' && this.state.type !== 'Discord') {
            this.setState({ type: type, data: [] });
            this.discordbotLog();
        }

        if (type === 'Services' && this.state.type !== 'Services') {
            this.setState({ type: type, data: [] });
            this.servicesLog();
        }
    }

    render () {
        return (
            <div className="flex-column" style={{height: '100%', width: '100%', marginTop: '80px'}}>
                <div className="flex-row" style={{width: '95%', alignSelf: 'center'}}>
                    <div 
                        className="basic-hover" style={{
                            padding: '5px', 
                            backgroundColor: `${this.state.type === 'Discord' ? '#202125' : '#121315'}`, 
                            border: `${this.state.type === 'Discord' ? '1px solid grey' : '1px solid black'}`
                        }}
                        onClick={ () => this.setLogType('Discord') }
                    >Discord</div>
                    <div 
                        className="basic-hover" 
                        style={{
                            padding: '5px', 
                            backgroundColor: `${this.state.type === 'Services' ? '#202125' : '#121315'}`, 
                            border: `${this.state.type === 'Services' ? '1px solid grey' : '1px solid black'}`
                        }}
                        onClick={ () => this.setLogType('Services') }
                    >Services</div>
                </div>
                {this.state.data.length > 1 ? <LogTable data={this.state.data} /> : <div className="loader"></div>}
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        modalOpen: state.modalOpen,
        modalTitle: state.modalTitle,
        modalMessage: state.modalMessage,
        modalButton: state.modalButton
    }
}

export default connect( mapStateToProps, {infoModal} )( Logs );