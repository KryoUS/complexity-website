import React,  { Component } from 'react';
import axios from 'axios';
import Quote from '../Utils/Quote';
import '../News/News.css';

class ComingSoon extends Component {

    render(){
        return(
            <div>
                <div className="news-background image-mask" />
                <div className="page-div" style={{marginTop: 0, overflow: 'hidden'}}>
                    <div style={{width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
                        <div className='fade2s' style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                            <img className="logo" src="https://res.cloudinary.com/complexityguild/image/upload/v1535585345/wow/logos/logov3.png" alt="Complexity Logo"/>
                            <div className='modal-title' style={{fontSize: '4rem', textAlign: 'center'}}>COMING SOON</div>
                            <Quote />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ComingSoon