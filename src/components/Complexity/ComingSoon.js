import React,  { Component } from 'react';
import '../News/News.css';

class ComingSoon extends Component {

    render(){
        return(
            <div>
                <div className="news-background image-mask" />
                <div className="news-div">
                    <div style={{width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
                        <div className='fade2s' style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                            <div className='modal-title' style={{fontSize: '4rem', textAlign: 'center'}}>COMING SOON</div>
                            <div className='pulse' style={{fontSize: '1.5rem', textShadow: '2px 2px 3px #000000', textAlign: 'center'}}>GOOD THINGS COME TO THOSE WHO WAIT</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ComingSoon