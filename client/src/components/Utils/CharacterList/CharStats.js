import React, { Component } from 'react';
// import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import SpiderwebChart from '../Highcharts/SpiderwebChart';
import Loader from '../Loader';

class CharStats extends Component {
    constructor() {
        super();

        this.state = {
            charStats: {},
            loaded: false,
            spiderwebSeries: {},
            spiderwebCategories: []
        }
    }

    createPercentage = (num) => {
        return '(' + Math.round(num * 100) / 100 + '%)';
    }

    capitalizeFirst = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    statBuilder = (name, value, percentage, tooltip, icon) => {
        if (percentage > 0 || value > 0) {
            return <div className="flex-column row-container collected" style={{ fontSize: '18px', width: '125px', alignItems: 'center', textAlign: 'center' }} data-tip={tooltip}>
                <div className="icon60" style={{
                    background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1547522492/site/icons/stats/${icon}.png) center no-repeat`,
                    backgroundSize: '60px'
                }}
                />
                <div>{name}</div>
                <div>{value} {percentage && this.createPercentage(percentage)}</div>
            </div>
        } else {
            return null
        }
    }

    componentDidMount = () => {
        axios.put(`/api/wow/character/${this.props.selectedCharName}&${this.props.selectedCharRealm}/stats/`).then(res => {
            console.log(res.data)
            this.setState({
                charStats: res.data.stats,
                spiderwebSeries: {
                    name: 'Raw Stat',
                    data: [
                        [
                            `${res.data.stats.critRating}`,
                            res.data.stats.crit
                        ],
                        [
                            `${res.data.stats.hasteRating}`,
                            res.data.stats.haste
                        ],
                        [
                            `${res.data.stats.masteryRating}`,
                            res.data.stats.mastery
                        ],
                        [
                            `${res.data.stats.versatility}`,
                            res.data.stats.versatilityDamageDoneBonus                            
                        ],
                        [
                            `${res.data.stats.versatility}`,
                            res.data.stats.versatilityDamageTakenBonus
                        ],
                        [
                            `${res.data.stats.versatility}`,
                            res.data.stats.versatilityHealingDoneBonus
                        ],
                    ],
                    pointPlacement: 'on',
                    color: '#784dbd',
                    shadow: true,
                    type: 'area'
                },
                spiderwebCategories: [
                    `Critical Strike ${this.createPercentage(res.data.stats.crit)}`,
                    `Haste ${this.createPercentage(res.data.stats.haste)}`,
                    `Mastery ${this.createPercentage(res.data.stats.mastery)}`,
                    `Versatility Dmg Increased ${this.createPercentage(res.data.stats.versatilityDamageDoneBonus)}`,
                    `Versatility Dmg Taken Reduced ${this.createPercentage(res.data.stats.versatilityDamageTakenBonus)}`,
                    `Versatility Healing Increased ${this.createPercentage(res.data.stats.versatilityHealingDoneBonus)}`
                ],
                loaded: true
            });
        }).catch(error => {
            console.log('WoW Character Stat API Error: ', error);
        });
    }

    render() {
        return (
            <div className="selected-category-container char-info-overflow">
                {this.state.loaded === false ?
                    <Loader />
                    :
                    <SpiderwebChart spiderwebChartID={'characterStatsWeb'} spiderwebChartTitle={'Character Stats'} spiderwebSeries={this.state.spiderwebSeries} spiderwebCategories={this.state.spiderwebCategories} spiderwebEnabled={false} />
                    // <div className="animate-right" style={{ width: '95%' }}>
                    //     <div className="char-info-overflow" style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}>
                    //         {this.statBuilder('Health', this.state.charStats.health, null, 'Character health before buffs.', 'health')}
                    //         {this.statBuilder(this.capitalizeFirst(this.state.charStats.powerType), this.state.charStats.power, null, 'Class resource.', 'power')}
                    //         {this.statBuilder('Strength', this.state.charStats.str, null, 'Character strength.', 'str')}
                    //         {this.statBuilder('Agility', this.state.charStats.agi, null, 'Character agility.', 'agi')}
                    //         {this.statBuilder('Intellect', this.state.charStats.int, null, 'Character intellect.', 'int')}
                    //         {this.statBuilder('Stamina', this.state.charStats.sta, null, 'Character stamina.', 'sta')}
                    //         {this.statBuilder('Speed', this.state.charStats.speedRating, this.state.charStats.speedRatingBonus, 'Character run speed.', 'speed')}
                    //         {this.statBuilder('Critical Strike', this.state.charStats.critRating, this.state.charStats.crit, 'Character critical strike chance.', 'crit')}
                    //         {this.statBuilder('Haste', this.state.charStats.hasteRating, this.state.charStats.hasteRatingPercent, 'Character haste.', 'haste')}
                    //         {this.statBuilder('Mastery', this.state.charStats.masteryRating, this.state.charStats.mastery, 'Character mastery.', 'mastery')}
                    //         {this.statBuilder('Leech', this.state.charStats.leechRating, this.state.charStats.leechRatingBonus, 'Character leech.', 'leech')}
                    //         {this.statBuilder('Versatility', this.state.charStats.versatility, null, 'Character versatility.', 'versatility')}
                    //         {this.statBuilder('Damage Bonus', null, this.state.charStats.versatilityDamageDoneBonus, 'The percentage increase in damage done due to versatility.', 'versatility')}
                    //         {this.statBuilder('Healing Bonus', null, this.state.charStats.versatilityHealingDoneBonus, 'The percentage increase in healing done due to versatility.', 'versatility')}
                    //         {this.statBuilder('Reduction Bonus', null, this.state.charStats.versatilityDamageTakenBonus, 'The percentage decreate in damage taken due to versatility.', 'versatility')}
                    //         {this.statBuilder('Spell Critical Strike', this.state.charStats.spellCritRating, this.state.charStats.spellCrit, 'Character spell critical strike chance.', 'spellCrit')}
                    //         {this.statBuilder('MP/5', this.state.charStats.mana5, null, 'The amount of mana the character recovers every 5 seconds.', 'mana5')}
                    //         {this.statBuilder('Armor', this.state.charStats.armor, null, 'The amount of armor the character has.', 'armor')}
                    //         {this.statBuilder('Dodge', this.state.charStats.dodgeRating, this.state.charStats.dodge, 'The chance the character has to dodge a physical attack.', 'dodge')}
                    //         {this.statBuilder('Parry', this.state.charStats.parryRating, this.state.charStats.parry, 'The chance the character has to parry a physical attack.', 'parry')}
                    //         {this.statBuilder('Block', this.state.charStats.blockRating, this.state.charStats.block, 'The chance the character has to block a physical attack.', 'block')}
                    //     </div>
                    //     <ReactTooltip />
                    // </div>
                }
            </div>
        )
    }
}

export default CharStats