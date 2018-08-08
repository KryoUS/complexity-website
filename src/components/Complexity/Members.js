import React, { Component } from 'react';
import EnhacedTable from '../Utils/MemberTable';
import './Members.css';

class Members extends Component {
    constructor() {
        super();

        this.state = {
            backgroundAvatars: []
        }
    }

    render(){

        return(
            <div className="members-div">
                <div className="members-table">
                    <EnhacedTable />
                </div>
            </div>
        )
    }
}

export default Members