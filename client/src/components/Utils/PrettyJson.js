import React, { Component } from 'react';

class Prettyjson extends Component {

    render() {
        return (
            <div>
                <pre>{ JSON.stringify(this.props.jsonData, null, 2) }</pre>
            </div>
        )
    }
}

export default Prettyjson;