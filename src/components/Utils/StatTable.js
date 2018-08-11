import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import './StatTable.css';

class StatTable extends Component {

    render(){
        const { tableData, headerRow, sortBy, selectedHeader } = this.props;

        return(
            <div className="table-div">
                    <div className="table-header-row">
                        {headerRow.map(header => {
                            if (header.name !== 'level' && header.name !== 'character_name' && header.name !== 'realm') {
                                if (header.name === selectedHeader) {
                                    return <div className="table-header hover selected" key={header.displayName} id={header.name} onClick={(e) => sortBy(e.target.id)} data-tip={header.tooltip}>{header.displayName}</div>
                                } else {
                                    return <div className="table-header hover" key={header.displayName} id={header.name} onClick={(e) => sortBy(e.target.id)} data-tip={header.tooltip}>{header.displayName}</div>
                                }
                            } else {
                                return <div className="table-header" key={header.displayName} id={header.name} data-tip={header.tooltip}>{header.displayName}</div>
                            }
                        })}
                    </div>
                    <div className="table-body">
                        {tableData.map((row, i) => {
                            return <div className="table-data-row" key={row.character_name}>
                                {Object.values(row).map((value, index) => {
                                    return <div className="table-data" key={i + index}>{value}</div>
                                })}
                            </div>
                        })}
                    </div>
                <ReactTooltip />
            </div>
        )
    }
}

export default StatTable