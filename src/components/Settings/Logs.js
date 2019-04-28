import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux';
import { infoModal } from '../../ducks/reducer';
import LineChart from '../Utils/LineChart';

class Logs extends Component {
    constructor() {
        super();

        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        axios.get('/logs/discordbot').then(res => {
            this.setState({ data: res.data.reverse() });
        }).catch(error => {
            console.log('Discord Bot Log Error: ', error);
        });
    }

    showError = (title, message) => {
        this.props.infoModal(true, title, message, 'OK');
    }

    render () {
        return (
            <div className="flex-column flex-around" style={{ marginTop: '80px', marginBottom: '80px', width: '100vw', alignItems: 'center', textAlign: 'center' }}>
                <div className="flex-row flex-between" style={{width: '90%', padding: '5px', backgroundColor: '#1B1C1F'}}>
                    <div className="flex-column flex-center" style={{width: '20%'}}>Date/Time</div>
                    <div className="flex-column flex-center" style={{width: '20%'}}>User Avatar</div>
                    <div className="flex-column flex-center" style={{width: '20%'}}>Username</div>
                    <div className="flex-column flex-center" style={{width: '20%'}}>Message</div>
                    <div className="flex-column flex-center" style={{width: '20%'}}>Error</div>
                </div>
                { this.state.data.length > 1 && this.state.data.map((obj, index) => {
                    let avatar = '';
                    let bgColor = '#202125';
                    if (obj.useravatarurl === 'https://cdn.discordapp.com/avatars/173959311578497026/bed8ea93dbfae9ebbb527ff76d587647.png?size=2048') {
                        avatar = '';
                    } else if (obj.useravatarurl) {
                        avatar = obj.useravatarurl.replace('?size=2048', '');
                    }
                    if (index%2 === 0) {bgColor = '#1B1C1F';}
                    return <div className="flex-row flex-between" key={obj.id} style={{width: '90%', padding: '5px', backgroundColor: bgColor}}>
                        <div className="flex-row flex-center" style={{width: '20%', margin: 'auto'}}>{ moment(obj.created_at).format("MMMM Do YYYY, h:mm:ss a") }</div>
                        <div className="flex-row flex-center" style={{width: '20%', margin: 'auto'}}>{obj.useravatarurl && <img className="avatar" src={avatar} alt=""></img>}</div>
                        <div className="flex-row flex-center" style={{width: '20%', margin: 'auto'}}>{ obj.username }</div>
                        <div className="flex-row flex-center" style={{width: '20%', margin: 'auto'}}>{ obj.message }</div>
                        {obj.error.message ? 
                            <div className="flex-row flex-center" style={{width: '20%'}}>
                                <div className="basic-hover" style={{padding: '5px'}} onClick={() => this.showError(obj.error.error.code, obj.error.target) }>{ obj.error.error.code }</div>
                            </div>
                        :
                            <div className="flex-row flex-center" style={{width: '20%'}}></div>
                        }
                    </div>
                })                    
                }
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