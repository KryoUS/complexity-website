import React, { Component } from 'react';
import axios from 'axios';
import './About.css';

const headerStyle = {
    backgroundImage: `url('/images/about/about_header.jpg')`, 
    width: '100%', 
    height: '500px', 
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundLeftCover: {backgroundImage: 'linear-gradient(to right, #160e37, #160e37, transparent, transparent, transparent, transparent, transparent)'},
    backgroundRightCover: {backgroundImage: 'linear-gradient(to left, #160e37, #160e37, transparent, transparent, transparent, transparent, transparent)'},
    backgroundBottomCover: {backgroundImage: 'linear-gradient(to top, #160e37, #160e37, transparent, transparent, transparent, transparent, transparent)'}
}

class About extends Component {
    constructor() {
        super();

        this.state = {
            guildNews: {}
        }
    }

    componentDidMount = () => {
        axios.get('/api/guildnews').then(res => {
            let newsArr = [];
            let count = 0;
            res.data.news.forEach((news, i) => {
                if (count <= 9) {
                    if (news.type === 'playerAchievement') {
                        count++
                        newsArr.push(news);
                    }
                }
            })
            this.setState({ guildNews: { lastModified: res.data.lastModified, news: newsArr } });
            console.log(this.state.guildNews);
        }).catch(error => {
            console.log('Guild News API Error');
            console.log(error);
        })
    }

    render(){
        return(
            <div className="about-div">
                <div className="about-header" style={headerStyle}>
                    <div className="header-gradient" style={headerStyle.backgroundLeftCover}>
                        <div className="header-gradient" style={headerStyle.backgroundRightCover}>
                            <div className="header-gradient" style={headerStyle.backgroundBottomCover}>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-text">During the tail end of World of Warcraft: Wrath of the Lich King, Complexity was founded by Glacial on July 4th, 2010 with the help of Hopeless, Theeotown, Shockerfist, and Holykush. The focus quickly shifted to the next expansion, World of Warcraft: Cataclysm, where Complexity started with Normal Difficulty and was eventually able to complete Dragon Soul on Heroic Difficulty with two separate groups. After some difficulties during World of Warcraft: Mists of Pandaria in the Throne of Thunder, Complexity bounced back and was able to complete Siege of Orgrimmar on Heroic difficulty, earning the Ahead of the Curve achievement. World of Warcraft: Warlords of Draenor showed steady progress as Complexity was able to complete this expansion on Heroic Difficulty, earning the Ahead of the Curve achievement on all raids. Currently in World of Warcraft: Legion, Complexity has continued to show steady progress, earning the Ahead of the Curve Achievement on all current raid content.</div>
                <div className="about-footer" />
            </div>
        )
    }
}

export default About