import React,  { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
            console.log(this.state.news);
        }).catch(error => {
            console.log(error);
        })
    }

    render(){
        return(
            <div className="news-div">
                {   this.state.news
                    ?
                    this.state.news.map(news => (
                    <div key={news.id} className="news-row">
                        <h3>Title: {news.title}</h3>
                        <p>Desc: {news.description}</p>
                        <div>{new Date(parseInt(news.news_datetime)).toString()}</div>
                        <a href={news.link} target="_blank">Read More</a>
                    </div>
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