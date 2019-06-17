import React, { Component } from 'react';
import Slide from '@material-ui/core/Slide';
import './Leaderboards.css';
import CharacterStats from './Leaderboards/CharacterStats';
import ConsumableStats from './Leaderboards/ConsumableStats';
import CombatStats from './Leaderboards/CombatStats';
import KillStats from './Leaderboards/KillStats';
import DeathStats from './Leaderboards/DeathStats';
import PveStats from './Leaderboards/PveStats';
import ProfessionStats from './Leaderboards/ProfessionStats';
import TravelStats from './Leaderboards/TravelStats';
import EmoteStats from './Leaderboards/EmoteStats';
import PvpStats from './Leaderboards/PvpStats';
import ArenaStats from './Leaderboards/ArenaStats';
import PetStats from './Leaderboards/PetStats';

class Leaderboards extends Component {
    constructor() {
        super();

        this.state = {
            section: 'none',
            mainSlide: true,
            characterStats: false,
            consumableStats: false,
            combatStats: false,
            killsStats: false,
            deathStats: false,
            pveStats: false,
            professionStats: false,
            travelStats: false,
            emoteStats: false,
            pvpStats: false,
            arenaStats: false,
            petStats: false
        }
    }

    handleSection = (section) => {
        section === 'character' && this.setState({ characterStats: !this.state.characterStats });
        section === 'consumables' && this.setState({ consumableStats: !this.state.consumableStats });
        section === 'combat' && this.setState({ combatStats: !this.state.combatStats });
        section === 'kills' && this.setState({ killsStats: !this.state.killsStats });
        section === 'deaths' && this.setState({ deathStats: !this.state.deathStats });
        section === 'pve' && this.setState({ pveStats: !this.state.pveStats });
        section === 'professions' && this.setState({ professionStats: !this.state.professionStats });
        section === 'travel' && this.setState({ travelStats: !this.state.travelStats });
        section === 'emotes' && this.setState({ emoteStats: !this.state.emoteStats });
        section === 'pvp' && this.setState({ pvpStats: !this.state.pvpStats });
        section === 'arena' && this.setState({ arenaStats: !this.state.arenaStats });
        section === 'pets' && this.setState({ petStats: !this.state.petStats });
        this.setState({ mainSlide: !this.state.mainSlide });
    }

    render(){

        return(
            <div className="fade1s" style={{background: `url('https://res.cloudinary.com/complexityguild/image/upload/v1534798726/wow/backgrounds/stats.jpg') top center no-repeat`, maxWidth: '100vw', maxHeight: '100vw'}}>
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
                        <div className="stat-card" onClick={() => this.handleSection('combat')} style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533950620/wow/sections/combat.jpg")'}}>
                            <div className="stat-text-container">
                                <div className="stats-title">Combat</div>
                                <div>Who's the top dog of damage? Who saves us? Who gets picked up off the floor during fights?</div>
                            </div>
                        </div>
                        <div className="stat-card" onClick={() => this.handleSection('kills')} style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/kill.jpg")'}}>
                            <div className="stat-text-container">
                                <div className="stats-title">Kills</div>
                                <div>Think you're bloodthirsty? Are you a critter killer? Do you carry the might of the Alliance?</div>
                            </div>
                        </div>
                        <div className="stat-card" onClick={() => this.handleSection('deaths')} style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/deaths.jpg")'}}>
                            <div className="stat-text-container">
                                <div className="stats-title">Deaths</div>
                                <div>Characters that know every detail on every floor texture that exists and... Hogger?</div>
                            </div>
                        </div>
                        <div className="stat-card" onClick={() => this.handleSection('pve')} style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/questing_dungeons_raids.jpg")'}}>
                            <div className="stat-text-container">
                                <div className="stats-title">PVE</div>
                                <div>Questing, Dungeons, Raids. Find out who runs the most errands and who the real dragonslayer is.</div>
                            </div>
                        </div>
                        <div className="stat-card" onClick={() => this.handleSection('professions')} style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/professions.jpg")'}}>
                            <div className="stat-text-container">
                                <div className="stats-title">Professions</div>
                                <div>Best chef? Expert fisherman? Most known recipes? Maxed the most professions?</div>
                            </div>
                        </div>
                        <div className="stat-card" onClick={() => this.handleSection('travel')} style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/travel.jpg")'}}>
                            <div className="stat-text-container">
                                <div className="stats-title">Travel</div>
                                <div>Call yourself a weary traveller? AFK on flight paths much? Just waiting to be summoned?</div>
                            </div>
                        </div>
                        <div className="stat-card" onClick={() => this.handleSection('emotes')} style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/emotes.jpg")'}}>
                            <div className="stat-text-container">
                                <div className="stats-title">Emotes</div>
                                <div>Hugs, and facepalms, and lols, oh my! Are you the emote extraordinaire? /cheer</div>
                            </div>
                        </div>
                        <div className="stat-card" onClick={() => this.handleSection('pvp')} style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/pvp_bg.jpg")'}}>
                            <div className="stat-text-container">
                                <div className="stats-title">Duels, Battlegrounds</div>
                                <div>See basic PVP stats from duels, Battlegrounds, and Rated Battlegrounds.</div>
                            </div>
                        </div>
                        <div className="stat-card" onClick={() => this.handleSection('arena')} style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/arena.jpg")'}}>
                            <div className="stat-text-container">
                                <div className="stats-title">Arenas</div>
                                <div>Think you're the best in arenas? Prove it. Check ratings and other stats related to arenas.</div>
                            </div>
                        </div>
                        <div className="stat-card" onClick={() => this.handleSection('pets')} style={{backgroundImage: 'url("https://res.cloudinary.com/complexityguild/image/upload/v1533951027/wow/sections/pets.jpg")'}}>
                            <div className="stat-text-container">
                                <div className="stats-title">Pets</div>
                                <div>Some are small and cuddly, others are not so much. Who is obsessed, with pets!?</div>
                            </div>
                        </div>                
                    </div>
                </Slide>
                {this.state.characterStats && <CharacterStats handleSection={this.handleSection}/>}
                {this.state.consumableStats && <ConsumableStats handleSection={this.handleSection}/>}
                {this.state.combatStats && <CombatStats handleSection={this.handleSection}/>}
                {this.state.killsStats && <KillStats handleSection={this.handleSection}/>}
                {this.state.deathStats && <DeathStats handleSection={this.handleSection}/>}
                {this.state.pveStats && <PveStats handleSection={this.handleSection}/>}
                {this.state.professionStats && <ProfessionStats handleSection={this.handleSection}/>}
                {this.state.travelStats && <TravelStats handleSection={this.handleSection}/>}
                {this.state.emoteStats && <EmoteStats handleSection={this.handleSection}/>}
                {this.state.pvpStats && <PvpStats handleSection={this.handleSection}/>}
                {this.state.arenaStats && <ArenaStats handleSection={this.handleSection}/>}
                {this.state.petStats && <PetStats handleSection={this.handleSection}/>}
            </div>
        )
    }
}

export default Leaderboards