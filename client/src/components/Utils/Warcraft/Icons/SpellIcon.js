import React, { Component } from 'react';

class SpellIcon extends Component {

    render() {
        return (
            <a className="flex-row" style={{ alignItems: 'center' }} data-wowhead={`spell=${this.props.spellID}`} href={`https://www.wowhead.com/spell=${this.props.spellID}`} target="_blank" rel="noopener noreferrer">
                <div style={{ 
                    width: `${this.props.size}px`, 
                    height: `${this.props.size}px`, 
                    background: `url(${this.props.iconurl}), url(https://render-us.worldofwarcraft.com/icons/56/inv_misc_questionmark.jpg) ${this.props.size}px`, 
                    backgroundSize: `${this.props.size}px`,
                    border: '1px solid black'
                }} />
            </a>
        )
    }
}

export default SpellIcon;