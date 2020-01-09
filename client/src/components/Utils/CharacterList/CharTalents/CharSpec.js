import React, { Component } from 'react';
import SpellIcon from '../../Warcraft/Icons/SpellIcon';

class CharSpec extends Component {

    render() {
        console.log(this.props.spec);
        return (
            <div className="animate-right">
                {this.props.spec.talents.map(obj => {
                    return <div key={`${obj.spell_tooltip.spell.id}`} className="animate-right">
                        <div className="flex-row">
                            <SpellIcon spellID={obj.spell_tooltip.spell.id} size={56} iconurl={obj.spell_tooltip.iconurl} />
                            <div style={{marginLeft: '10px', fontSize: '.75rem'}}>
                                {obj.spell_tooltip.cast_time}: {obj.spell_tooltip.description}
                            </div>
                        </div>
                        <div className="gradient-line-purple"/>
                    </div>
                })}
                {this.props.spec.pvp_talent_slots && <div style={{ fontSize: '1.5rem', textAlign: 'center' }} className="animate-right">PVP Talents</div>}
                <div className="gradient-line-white animate-right" />
                {this.props.spec.pvp_talent_slots && this.props.spec.pvp_talent_slots.map(obj => {
                    return <div key={`${obj.selected.spell_tooltip.spell.id}`} className="animate-right">
                        <div className="flex-row">
                            <SpellIcon spellID={obj.selected.spell_tooltip.spell.id} size={56} iconurl={obj.selected.spell_tooltip.iconurl} />
                            <div style={{marginLeft: '10px', fontSize: '.75rem'}}>
                                {obj.selected.spell_tooltip.cast_time}: {obj.selected.spell_tooltip.description}
                            </div>
                        </div>
                        <div className="gradient-line-purple animate-right"/>
                    </div>
                })}
            </div>
        )
    }
}

export default CharSpec