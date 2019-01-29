import React,  { Component } from 'react';
import Timer from '../Timer/Timer';
import axios from 'axios';
import './News.css';

class News extends Component {
    constructor() {
        super();

        this.state = {
            news: [],
            releases: []
        }
    }

    componentDidMount = () => {
        axios.get('/api/news').then(res => {
            this.setState({news: res.data});
        }).catch(error => {
            console.log('News Error')
            console.log(error);
        });

        axios.get('/api/releases').then(res => {
            this.setState({releases: res.data});
        }).catch(error => {
            console.log('Releases Error')
            console.log(error);
        })
    }

    render(){
        return(
            <div>
                <div className="news-background image-mask" />
                <div className="news-div fade1s">
                    <div className="news-header">
                        {   this.state.releases.length &&
                            <div className="news-countdown">
                                {this.state.releases ?
                                    this.state.releases.map(release => (
                                        <a className="news-flex-column" key={release.id} href={release.link} target="_blank"  rel="noopener noreferrer">
                                            <div className="news-countdown-timer">{release.title}</div>
                                            <div className="news-countdown-timer">
                                                <Timer className="news-countdown-time" key={release.id} date={release.release_date}/>
                                            </div>
                                        </a>
                                    ))
                                    : null
                                }
                            </div>
                        }
                    </div>
                    <div className="news-container">
                    {   this.state.news
                        ?
                        this.state.news.map(news => (
                                <div className="news-card animate-bottom" key={news.id} style={{
                                    background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('${news.image ? news.image.replace('http:', 'https:') : 'https://res.cloudinary.com/complexityguild/image/upload/v1535585277/wow/backgrounds/news_header.jpg'}')`,
                                    width: '20%', 
                                    minWidth: '384px',
                                    height: '700px', 
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'}}>
                                    <a href={news.link} target="_blank"  rel="noopener noreferrer">
                                        <div className="news-card-layer">
                                            <div className="button-border" id="news-title">
                                                <div className="button-text" id="news-text">{news.title}</div>
                                            </div>
                                            <div className="news-desc-container">
                                                <div className="news-desc-text">{news.description}</div>
                                                {news.source === "wowhead" && <img src="https://res.cloudinary.com/complexityguild/image/upload/v1535585319/wow/logos/wowhead_news.png" alt="Wowhead" />}
                                            </div>
                                        </div>
                                    </a>
                                </div>
                        ))
                        :
                        <div className="news-row" />
                    }
                    </div>
                </div>
            </div>
        )
    }
}

export default News