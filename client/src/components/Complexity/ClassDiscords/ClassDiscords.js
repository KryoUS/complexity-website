import React from 'react';
import './ClassDiscords.css';

class ClassDiscords extends React.Component {
    constructor() {
        super();

        this.state = {

        }
    }

    render() {
        return(
            <div className="page-div">
                <div className="about-background image-mask" />
                <div className="flex-column fade1s" style={{ alignItems: 'center' }} >
                    <a id="deathKnight-background-gradient" className="flex-row class-discords-class" href="https://discord.gg/acherus" target="_blank"  rel="noopener noreferrer">
                        <div className="class-discords-icon" style={{background: 'url(https://render-us.worldofwarcraft.com/icons/56/spell_deathknight_classicon.jpg)'}} />
                        <div className="class-discords-text">Death Knight</div>
                    </a>
                    <a id="demonHunter-background-gradient" className="flex-row class-discords-class" href="https://discord.gg/zGGkNGC" target="_blank"  rel="noopener noreferrer">
                        <div className="class-discords-icon" style={{background: 'url(https://render-us.worldofwarcraft.com/icons/56/achievement_boss_illidan.jpg)'}} />
                        <div className="class-discords-text">Demon Hunter</div>
                    </a>
                    <a id="druid-background-gradient" className="flex-row class-discords-class" href="https://discord.gg/dreamgrove" target="_blank"  rel="noopener noreferrer">
                        <div className="class-discords-icon" style={{background: 'url(https://render-us.worldofwarcraft.com/icons/56/classicon_druid.jpg)'}} />
                        <div className="class-discords-text">Druid</div>
                    </a>
                    <a id="hunter-background-gradient" className="flex-row class-discords-class" href="https://discord.gg/trueshot" target="_blank"  rel="noopener noreferrer">
                        <div className="class-discords-icon" style={{background: 'url(https://render-us.worldofwarcraft.com/icons/56/classicon_hunter.jpg)'}} />
                        <div className="class-discords-text">Hunter</div>
                    </a>
                    <a id="mage-background-gradient" className="flex-row class-discords-class" href="https://discord.gg/makGfZA" target="_blank"  rel="noopener noreferrer">
                        <div className="class-discords-icon" style={{background: 'url(https://render-us.worldofwarcraft.com/icons/56/classicon_mage.jpg)'}} />
                        <div className="class-discords-text">Mage</div>
                    </a>
                    <a id="monk-background-gradient" className="flex-row class-discords-class" href="https://discord.gg/peakofserenity" target="_blank"  rel="noopener noreferrer">
                        <div className="class-discords-icon" style={{background: 'url(https://render-us.worldofwarcraft.com/icons/56/classicon_monk.jpg)'}} />
                        <div className="class-discords-text">Monk</div>
                    </a>
                    <a id="paladin-background-gradient" className="flex-row class-discords-class" href="https://discord.gg/hammerofwrath" target="_blank"  rel="noopener noreferrer">
                        <div className="class-discords-icon" style={{background: 'url(https://render-us.worldofwarcraft.com/icons/56/classicon_paladin.jpg)'}} />
                        <div className="class-discords-text">Paladin</div>
                    </a>
                    <a id="priest-background-gradient" className="flex-row class-discords-class" href="https://discord.gg/WarcraftPriests" target="_blank"  rel="noopener noreferrer">
                        <div className="class-discords-icon" style={{background: 'url(https://render-us.worldofwarcraft.com/icons/56/classicon_priest.jpg)'}} />
                        <div className="class-discords-text">Priest</div>
                    </a>
                    <a id="rogue-background-gradient" className="flex-row class-discords-class" href="https://discord.gg/ravenholdt" target="_blank"  rel="noopener noreferrer">
                        <div className="class-discords-icon" style={{background: 'url(https://render-us.worldofwarcraft.com/icons/56/classicon_rogue.jpg)'}} />
                        <div className="class-discords-text">Rogue</div>
                    </a>
                    <a id="shaman-background-gradient" className="flex-row class-discords-class" href="https://discord.gg/earthshrine" target="_blank"  rel="noopener noreferrer">
                        <div className="class-discords-icon" style={{background: 'url(https://render-us.worldofwarcraft.com/icons/56/classicon_shaman.jpg)'}} />
                        <div className="class-discords-text">Shaman</div>
                    </a>
                    <a id="warlock-background-gradient" className="flex-row class-discords-class" href="https://discord.gg/BlackHarvest" target="_blank"  rel="noopener noreferrer">
                        <div className="class-discords-icon" style={{background: 'url(https://render-us.worldofwarcraft.com/icons/56/classicon_warlock.jpg)'}} />
                        <div className="class-discords-text">Warlock</div>
                    </a>
                    <a id="warrior-background-gradient" className="flex-row class-discords-class" href="https://discord.gg/SkyHold" target="_blank"  rel="noopener noreferrer">
                        <div className="class-discords-icon" style={{background: 'url(https://render-us.worldofwarcraft.com/icons/56/classicon_warrior.jpg)'}} />
                        <div className="class-discords-text">Warrior</div>
                    </a>
                    <div>These communitues have some of the best up-to-date information for a given class. Some even have sublevel Discords for a specific specialization.</div>
                </div>
            </div>
        )
    }
}

export default ClassDiscords;