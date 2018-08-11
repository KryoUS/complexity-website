import React, { Component } from 'react';
import Slide from '@material-ui/core/Slide';
import './Leaderboards.css';
import CharacterStats from './Leaderboards/CharacterStats';
import ConsumableStats from './Leaderboards/ConsumableStats';

class Leaderboards extends Component {
    constructor() {
        super();

        this.state = {
            section: 'none',
            mainSlide: true,
            characterStats: false,
            consumableStats: false
        }
    }

    handleSection = (section) => {
        section === 'character' && this.setState({ characterStats: !this.state.characterStats });
        section === 'consumables' && this.setState({ consumableStats: !this.state.consumableStats });
        this.setState({ mainSlide: !this.state.mainSlide });
    }

    render(){

        return(
            <div>
                <Slide direction="right" in={this.state.mainSlide} mountOnEnter unmountOnExit>
                <div className="leaderboards-div">
                    <div className="stat-card" onClick={() => this.handleSection('character')} style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533948801/wow/sections/character_stats.jpg")'}}>
                        <div className="stat-text-container">
                            <div className="stats-title">Character Stats</div>
                            <div>See basic statistics like Exalted Reputations, Need Rolls, and Mounts collected.</div>
                        </div>
                    </div>
                    <div className="stat-card" onClick={() => this.handleSection('consumables')} style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533950184/wow/sections/consumables.jpg")'}}>
                        <div className="stat-text-container">
                            <div className="stats-title">Consumables</div>
                            <div>Let's see who the flask abuser is, or who remembers to use Healthstones the most.</div>
                        </div>
                    </div>
                    <div className="stat-card" style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533950620/wow/sections/combat.jpg")'}}>
                        <div className="stat-text-container">
                            <div className="stats-title">Combat</div>
                            <div>Who's the top dog of damage? Who saves us? Who gets picked up off the floor during fights?</div>
                        </div>
                    </div>
                    <div className="stat-card" style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/kill.jpg")'}}>
                        <div className="stat-text-container">
                            <div className="stats-title">Kills</div>
                            <div>Think your bloodthirsty? Are you a critter killer? Do you carry the might of the Alliance?</div>
                        </div>
                    </div>
                    <div className="stat-card" style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/deaths.jpg")'}}>
                        <div className="stat-text-container">
                            <div className="stats-title">Deaths</div>
                            <div>Characters that know every detail on every floor texture that exists, and Hogger?</div>
                        </div>
                    </div>
                    <div className="stat-card" style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/questing_dungeons_raids.jpg")'}}>
                        <div className="stat-text-container">
                            <div className="stats-title">PVE</div>
                            <div>Questing, Dungeons, Raids. Find out who runs the most errands and who the real dragonslayer is.</div>
                        </div>
                    </div>
                    <div className="stat-card" style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/professions.jpg")'}}>
                        <div className="stat-text-container">
                            <div className="stats-title">Professions</div>
                            <div>Who makes the most meals, fishes the most, knows the most recipes, has maxed the most professions?</div>
                        </div>
                    </div>
                    <div className="stat-card" style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/travel.jpg")'}}>
                        <div className="stat-text-container">
                            <div className="stats-title">Travel</div>
                            <div>Call yourself a weary traveller? AFK on flight paths much? Just waiting to be summoned?</div>
                        </div>
                    </div>
                    <div className="stat-card" style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/emotes.jpg")'}}>
                        <div className="stat-text-container">
                            <div className="stats-title">Emotes</div>
                            <div>Hugs, and facepalms, and lols, oh my! Are you the emote extraordinaire? /cheer</div>
                        </div>
                    </div>
                    <div className="stat-card" style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/pvp_bg.jpg")'}}>
                        <div className="stat-text-container">
                            <div className="stats-title">PVP, Duels, Battlegrounds</div>
                            <div>See basic PVP stats from duels, Battlegrounds, and Rated Battlegrounds.</div>
                        </div>
                    </div>
                    <div className="stat-card" style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/arena.jpg")'}}>
                        <div className="stat-text-container">
                            <div className="stats-title">Arenas</div>
                            <div>Think you're the best in arenas? Prove it. Check ratings and other stats related to arenas.</div>
                        </div>
                    </div>
                    <div className="stat-card" style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/pets.jpg")'}}>
                        <div className="stat-text-container">
                            <div className="stats-title">Pets</div>
                            <div>Some are small and cuddly, others flat out get the job done. Who is obsessed, with pets!?</div>
                        </div>
                    </div>                
                </div>
                </Slide>
                <Slide direction="left" in={this.state.characterStats} mountOnEnter unmountOnExit>
                    <CharacterStats handleSection={this.handleSection}/>
                </Slide>
                <Slide direction="left" in={this.state.consumableStats} mountOnEnter unmountOnExit>
                    <ConsumableStats handleSection={this.handleSection}/>
                </Slide>
            </div>
        )
    }
}

export default Leaderboards