import React, { Component } from 'react';
import './StatTable.css';

class StatTable extends Component {

    render(){
        const { tableData, headerRow } = this.props;

        return(
            <div className="table-div">
                {tableData.length > 0 &&
                    <table>
                        <thead>
                            <tr>
                                {headerRow.map(header => {
                                    return <th key={header}>{header}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                                {tableData.map((row, i) => {
                                    return <tr>
                                        {Object.values(row).map((value, index) => {
                                            return <td key={i + index}>{value}</td>
                                        })}
                                    </tr>
                                })}
                        </tbody>
                    </table>
                }
            </div>
        )
    }
}

export default StatTable