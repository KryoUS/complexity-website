import React,  { Component } from 'react';
import axios from 'axios';
import '../News/News.css';

class ComingSoon extends Component {
    constructor() {
        super();

        this.state = {
            quote: '',
            saidBy: '',
            showQuote: false
        }
    }

    componentDidMount = () => {
        axios.get('/api/complexity/quotes').then(res => {
            this.setState({quote: res.data.quote, saidBy: res.data.said_by, showQuote: true});
        }).catch(err => {
            console.log('Quote retrieve error.');
        });
    }

    render(){
        return(
            <div>
                <div className="news-background image-mask" />
                <div className="news-div">
                    <div style={{width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
                        <div className='fade2s' style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                            <img className="logo" src="https://res.cloudinary.com/complexityguild/image/upload/v1535585345/wow/logos/logov3.png" alt="Complexity Logo"/>
                            <div className='modal-title' style={{fontSize: '4rem', textAlign: 'center'}}>COMING SOON</div>
                            <div className='pulse' style={{fontSize: '1.5rem', textShadow: '2px 2px 3px #000000', textAlign: 'center'}}>{this.state.showQuote && `${this.state.quote} - ${this.state.saidBy}`}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ComingSoon