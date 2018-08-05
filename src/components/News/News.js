import React,  { Component } from 'react';
import Timer from '../Timer/Timer';
import axios from 'axios';
import './News.css';

let headerStyle = {
    backgroundImage: `url('/images/news/news_header.jpg')`,
    width: '100%', 
    height: '500px', 
    backgroundPosition: 'center'
}

class News extends Component {
    constructor() {
        super();

        this.state = {
            news: [],
            releases: []
        }
    }

    componentDidMount = () => {
        axios.get('/news').then(res => {
            this.setState({news: res.data});
        }).catch(error => {
            console.log('News Error')
            console.log(error);
        });

        axios.get('/releases').then(res => {
            this.setState({releases: res.data});
        }).catch(error => {
            console.log('Releases Error')
            console.log(error);
        })
    }

    render(){
        return(
            <div className="news-div">
                <div className="news-header" style={headerStyle}>
                    {   this.state.releases.length &&
                        <div className="news-countdown">
                            {this.state.releases ?
                                this.state.releases.map(release => (
                                    <div className="news-flex-column" key={release.id}>
                                        <div className="news-countdown-timer">{release.title}</div>
                                        <div className="news-countdown-timer">
                                            <Timer className="news-countdown-time" key={release.id} date={release.release_date}/>
                                        </div>
                                    </div>
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
                        <div className="news-card" key={news.id} style={{
                            background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('${news.image.replace('http', 'https')}')`,
                            width: '20%', 
                            minWidth: '384px',
                            height: '700px', 
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'}}>
                            <div className="news-card-layer">
                                <div className="news-title-container">
                                    <div className="news-title-text">{news.title}</div>
                                </div>
                                <div className="news-desc-container">
                                    <div className="news-desc-text">{news.description}</div>
                                    <a className="news-button" href={news.link} target="_blank">Read More</a>
                                    {news.source === "wowhead" && <img src="/images/news/wowhead_news.png" alt="Wowhead" />}
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <div className="news-row">
                    </div>
                }
                </div>
            </div>
        )
    }
}

export default News