import React,  { Component } from 'react';
import axios from 'axios';
import './News.css';

class News extends Component {
    constructor() {
        super();

        this.state = {
            news: []
        }
    }

    componentDidMount = () => {
        axios.get('https://localhost:3050/news').then(res => {
            this.setState({news: res.data});
        }).catch(error => {
            console.log(error);
        })
    }

    showText = id => {
        this.setState({ [id]: true })
    }

    render(){
        return(
            <div className="news-div">
                <img className="news-header-image" src="/images/news/news_header.jpg" alt="news_header"/>
                {   this.state.news
                    ?
                    this.state.news.map(news => (
                    <a key={news.id} className="news-row" href={news.link} target="_blank" onMouseLeave={() => this.setState({ [news.id]: false})} onMouseEnter={() => this.showText(news.id)}>
                        <div className="news-image-container">
                            <img className ="news-image" src={news.image.replace('http', 'https')} alt={news.title}/>
                        </div>
                        {this.state[news.id] ? (
                            <div className="news-text-container">
                            <div className="news-title-container">
                                <div className="news-title">{news.title} </div>
                                <div className="news-datetime">{new Date(parseInt(news.news_datetime, 10)).toString()}</div>
                            </div>
                            <div className="news-desc">{news.description}</div>
                        </div>
                        ) : (
                            null
                        )}
    
                    </a>
                    ))
                    :
                    <div className="news-row">
                    </div>
                }
            </div>
        )
    }
}

export default News