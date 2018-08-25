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
                            if (header.name === selectedHeader) {
                                return <div 
                                    className="table-header hover selected" 
                                    style={{width: this.props.rowWidth ? this.props.rowWidth : '115px' }} 
                                    key={header.displayName} 
                                    id={header.name} 
                                    onClick={(e) => sortBy(e.target.id)} 
                                    data-tip={header.tooltip}>
                                        {header.displayName}
                                    </div>
                            } else {
                                return <div 
                                    className="table-header hover" 
                                    style={{width: this.props.rowWidth ? this.props.rowWidth : '115px' }} 
                                    key={header.displayName} 
                                    id={header.name} 
                                    onClick={(e) => sortBy(e.target.id)} 
                                    data-tip={header.tooltip}>
                                        {header.displayName}
                                    </div>
                            }
                        })}
                    </div>
                    <div className="table-body">
                        {tableData.map((row, i) => {
                            return <div className="table-data-row" key={i}>
                                {Object.values(row).map((value, index) => {
                                    return <div className="table-data" style={{width: this.props.rowWidth ? this.props.rowWidth : '115px' }} key={i + index}>{value}</div>
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