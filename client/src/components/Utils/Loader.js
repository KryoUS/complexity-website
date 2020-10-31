import React, { Component } from 'react';

class Loader extends Component {

    render() {
        return (
            <div className="lds-roller" style={{transform: `scale(${this.props.scale})`, margin: this.props.margin, overflow: 'hidden'}} >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}

export default Loader;