import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import axios from 'axios';
import ProgressBar from '../ProgressBar';
import moment from 'moment';
import './CharProgression.css';

class CharProgression extends Component {
    constructor() {
        super();

        this.state = {
            raids: []
        }
    }

    componentDidMount = () => {
        axios.put(`/api/wow/character/${this.props.selectedCharName}&${this.props.selectedCharRealm}/progression/`).then(res => {
            this.setState({raids: res.data.progression.raids.reverse()});
        }).catch(error => {
            console.log('WoW Character Progression API Error: ', error);
        });
    }

    progressBarBuilder = (kills, count) => {
        return <ProgressBar 
                current={kills} 
                remaining={count - kills} 
                height={'17px'}
                bgColor={'#edba03'}
                fontSize={'13px'}
        />
    }

    bossImageBuilder = (npc) => {
        //NOTE: Blizzard's render isn't very reliable, onError is used to hide broken images
        return <div key={npc.creatureDisplayId} style={{width: '150px'}}>
            <img className="image-mask fade1s" src={`https://render-us.worldofwarcraft.com/npcs/zoom/creature-display-${npc.creatureDisplayId}.jpg`} 
                alt={npc.urlSlug}
                width="150"
                onError={(e) => { 
                    e.target.style = 'display: none' 
                }}
                onLoad={(e) => {
                    e.target.style = 'animation: fade 1s; -o-animation: fade 1s; -moz-animation: fade 1s; -webkit-animation: fade 1s;'
                }}
            />
        </div>
    }

    progressionBuilder = (obj, index) => {
        let lfrBossCount = 0;
        let lfrBossKills = 0;
        let normalBossCount = 0;
        let normalBossKills = 0;
        let heroicBossCount = 0;
        let heroicBossKills = 0;
        let mythicBossCount = 0;
        let mythicBossKills = 0;

        obj.bosses.forEach(bossObj => {
            if (bossObj.hasOwnProperty('lfrKills')) {
                lfrBossCount++
                bossObj.lfrKills > 0 && lfrBossKills++
            }
            if (bossObj.hasOwnProperty('normalKills')) {
                normalBossCount++
                bossObj.normalKills > 0 && normalBossKills++
            }
            if (bossObj.hasOwnProperty('heroicKills')) {
                heroicBossCount++
                bossObj.heroicKills > 0 && heroicBossKills++
            }
            if (bossObj.hasOwnProperty('mythicKills')) {
                mythicBossCount++
                bossObj.mythicKills > 0 && mythicBossKills++
            }
        })

        return <Collapsible 
            key={obj.id}
            trigger={
                <div className="flex-row flex-between prog-category">
                    <a className="prog-title"href={`https://www.wowhead.com/zone=${obj.id}`} target="_blank" rel="noopener noreferrer">{obj.name}</a>
                    <div className="prog-bar">
                        <ProgressBar 
                            current={Math.max(lfrBossKills, normalBossKills, heroicBossKills, mythicBossKills)} 
                            remaining={Math.max(lfrBossCount, normalBossCount, heroicBossCount, mythicBossCount) - Math.max(lfrBossKills, normalBossKills, heroicBossKills, mythicBossKills)} 
                            height={'17px'}
                            bgColor={'rgb(146, 91, 234)'}
                            fontSize={'13px'}
                        />
                    </div>
                </div>
            } 
            transitionTime={200} 
            easing={'ease 0s'} 
            lazyRender={true}
            open={index === 0 ? true : false}
        >
            <div className="flex-column flex-between prog-sub-category animate-right">
                {lfrBossCount > 0 && 
                    <div className="flex-row">
                        <div className="prog-title" id="prog-raid-type">Looking for Raid</div>
                        <div className="prog-bar">{this.progressBarBuilder(lfrBossKills, lfrBossCount)}</div>
                    </div>
                }
                {normalBossCount > 0 && 
                    <div className="flex-row">
                        <div className="prog-title" id="prog-raid-type">Normal</div>
                        <div className="prog-bar">{this.progressBarBuilder(normalBossKills, normalBossCount)}</div>
                    </div>
                }
                {heroicBossCount > 0 && 
                    <div className="flex-row">
                        <div className="prog-title" id="prog-raid-type">Heroic</div>
                        <div className="prog-bar">{this.progressBarBuilder(heroicBossKills, heroicBossCount)}</div>
                    </div>
                }
                {mythicBossCount > 0 && 
                    <div className="flex-row">
                        <div className="prog-title" id="prog-raid-type">Mythic</div>
                        <div className="prog-bar">{this.progressBarBuilder(mythicBossKills, mythicBossCount)}</div>
                    </div>
                }
                <div className="flex-column" style={{width: '90%', marginTop: '10px', alignSelf: 'flex-end'}}>
                    {obj.bosses.map((bossObj, bossIndex) => {
                        return <Collapsible 
                        key={bossObj.id * bossIndex}
                        trigger={
                            <div className="flex-row flex-between prog-category" id="prog-sub-boss">
                                <a href={`https://www.wowhead.com/npc=${bossObj.id}`} target="_blank" rel="noopener noreferrer">{bossObj.name}</a>
                                <div className="flex-row flex-between prog-kills">
                                    {/* If a className is being defined through a ternary, {condition ? value : undefined} must be used */}
                                    <div className={!bossObj.hasOwnProperty('lfrKills') ? `opacity25` : undefined}>LFR: {bossObj.lfrKills}</div>
                                    <div className={!bossObj.hasOwnProperty('normalKills') ? `opacity25` : undefined}>Normal: {bossObj.normalKills}</div>
                                    <div className={!bossObj.hasOwnProperty('heroicKills') ? `opacity25` : undefined}>Heroic: {bossObj.heroicKills}</div>
                                    <div className={!bossObj.hasOwnProperty('mythicKills') ? `opacity25` : undefined}>Mythic: {bossObj.mythicKills}</div>
                                </div>
                            </div>
                        } 
                        openedClassName={'prog-category-open'}
                        transitionTime={200} 
                        easing={'ease 0s'} 
                        lazyRender={true}
                        >
                            <div  id="prog-card">
                                <div>{bossObj.bossInfo.description}</div>
                                <div className="flex-row flex-around flex-wrap">
                                    {bossObj.bossInfo.npcs.map(npc => {
                                        return this.bossImageBuilder(npc);
                                    })}
                                </div>
                                <div className="flex-row flex-center">
                                    <div>Health:</div>
                                    <div>{bossObj.bossInfo.health}</div>
                                </div>
                                <div className="flex-row flex-center">
                                    <div>Level:</div>
                                    <div>{bossObj.bossInfo.level}</div>
                                </div>
                                {bossObj.hasOwnProperty('lfrKills') && bossObj.lfrTimestamp > 0 && 
                                    <div className="flex-row flex-between">
                                        <div>LFR First Kill:</div>
                                        <div>{moment(bossObj.lfrTimestamp).format('MMMM Do YYYY')}</div>
                                    </div>
                                }
                                {bossObj.hasOwnProperty('normalKills') && bossObj.normalTimestamp > 0 &&
                                    <div className="flex-row flex-between">
                                        <div>Normal First Kill:</div>
                                        <div>{moment(bossObj.normalTimestamp).format('MMMM Do YYYY')}</div>
                                    </div>
                                }
                                {bossObj.hasOwnProperty('heroicKills') && bossObj.heroicTimestamp > 0 &&
                                    <div className="flex-row flex-between">
                                        <div>Heroic First Kill:</div>
                                        <div>{moment(bossObj.heroicTimestamp).format('MMMM Do YYYY')}</div>
                                    </div>
                                }
                                {bossObj.hasOwnProperty('mythicKills') && bossObj.mythicTimestamp > 0 && 
                                    <div className="flex-row flex-between">
                                        <div>Mythic First Kill:</div>
                                        <div>{moment(bossObj.mythicTimestamp).format('MMMM Do YYYY')}</div>
                                    </div>
                                }
                            </div>
                        </Collapsible>
                    })}
                </div>
            </div>
        </Collapsible>

    }

    render () {
        return (
            <div className="selected-category-container char-info-overflow">
                {this.state.raids.length > 0 ? 
                    <div className="animate-right">
                        {this.state.raids.map((obj, index) => {
                            return this.progressionBuilder(obj, index);
                        })}
                    </div>
                : 
                    <div className="loader" style={{left: '85vw'}}/>
                }
            </div>
        )
    }
}

export default CharProgression