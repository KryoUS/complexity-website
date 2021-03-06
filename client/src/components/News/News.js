import React,  { Component } from 'react';
import { connect } from 'react-redux';
import { infoModal } from '../../ducks/reducer';
import Timer from '../Timer/Timer';
import WoWNews from '../Utils/WoWNews/WoWNews';
import Moment from 'moment';
import Quote from '../Utils/Quote';
import axios from 'axios';
import './News.css';

class News extends Component {
    constructor() {
        super();

        this.state = {
            news: [],
            releases: [],
        }
    }

    componentDidMount = () => {
        axios.get('/api/news').then(res => {
            this.setState({news: res.data});
        }).catch(error => {
            
        });

        axios.get('/api/releases').then(res => {
            this.setState({releases: res.data});
        }).catch(error => {
            this.props.infoModal(true, 'Uh oh!', "We couldn't speak the same language as the database. Give us a moment to learn it and try again later.", 'Sure');
        });
    }

    render(){
        return(
            <div>
                <div className="news-background image-mask" />
                <div className="page-div fade1s">
                    <div className="news-header">
                        <Quote />
                        <WoWNews />
                        {   this.state.releases.length ?
                            <div className="news-countdown">
                                {this.state.releases ?
                                    this.state.releases.map(release => (
                                        <a className="news-flex-column" key={release.id} href={release.link} target="_blank"  rel="noopener noreferrer">
                                            <div className="news-countdown-timer">
                                                <div style={{color: 'rgb(146, 91, 234)'}}>{release.title}</div>
                                                <div>{Moment(Number(release.release_date)).format('MMMM Do YYYY')}</div>
                                                <Timer className="news-countdown-time" key={release.id} date={release.release_date}/>
                                            </div>
                                        </a>
                                    ))
                                    : null
                                }
                            </div>
                            : null
                        }
                    </div>
                    <div className="news-container">
                    {   this.state.news
                        ?
                        this.state.news.map(news => (
                                <div className="news-card animate-bottom" key={news.id} style={{
                                    background: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url('${news.image ? news.image.replace('http:', 'https:') : 'https://res.cloudinary.com/complexityguild/image/upload/v1535585277/wow/backgrounds/news_header.jpg'}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat'}}>
                                    <div className="news-card-layer">
                                        <div className="news-countdown-timer" id="news-title">
                                            <div className="" id="news-text">{news.title}</div>
                                        </div>
                                        <a className="news-desc-container" href={news.link} target="_blank"  rel="noopener noreferrer">
                                            <div className="news-desc-title">{news.title}</div>
                                            <div className="news-desc-text">{news.description}</div>
                                            {news.source === "wowhead" && <img src="https://res.cloudinary.com/complexityguild/image/upload/v1535585319/wow/logos/wowhead_news.png" alt="Wowhead" width="50" height="42"/>}
                                        </a>
                                    </div>
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

const mapStateToProps = (state) => {
    return {
        modalOpen: state.modalOpen,
        modalTitle: state.modalTitle,
        modalMessage: state.modalMessage,
        modalButton: state.modalButton
    }
}

export default connect(mapStateToProps, { infoModal })(News);