import React, { Component } from 'react';
import moment from 'moment';
import './WoWNews.css';
import axios from 'axios';
import Loader from '../Loader';

class WoWNews extends Component {
    constructor() {
        super();

        this.state = {
            breakingNews: [],
        }
    }

    componentDidMount = () => {
        axios.get('/api/breakingnews').then(res => {
            this.setState({ breakingNews: res.data });
        }).catch(error => {
            console.log('Breaking News Error = ', error)
        });
    }

    render() {
        return (
            <div className="flex-row flex-center wownews-back">
                <div className="flex-column wownews-container">
                    <div className="fade2s">
                        <div className="wownews-title">World of Warcraft - Breaking News</div>
                        <div className="flex-column wownews-overflow">
                            {this.state.breakingNews.length >= 1 ?
                                this.state.breakingNews.map(obj => {
                                    return <div key={`wownews${obj.epoch_datetime}`}><div>{moment(obj.created_at).format('MMMM Do YYYY')} - {obj.alert}</div><br /></div>
                                })
                                :
                                <Loader />
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default WoWNews;