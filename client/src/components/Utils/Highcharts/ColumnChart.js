import React, { Component } from 'react';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

class ColumnChart extends Component {

    componentDidMount = () => {

        Highcharts.chart(this.props.columnChartID, {
            chart: {
                backgroundColor: null,
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'column'
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false,
                    },
                },
            },
            title: {
                text: this.props.columnChartTitle,
                style: {
                    color: 'white',
                },
            },
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y}',
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif',
                },
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -55,
                    style: {
                        fontSize: '10px',
                        fontFamily: 'Verdana, sans-serif',
                        color: 'white'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total',
                    style: {
                        color: 'white',
                    },
                },
                labels: {
                    enabled: true,
                    style: {
                        color: 'white',
                    },
                },
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>',
            },
            series: [{
                name: 'Total',
                colorByPoint: true,
                data: this.props.columnChartData
            }],
        });
    }

    render(){
        return(
            <div id={this.props.columnChartID} style={{minWidth: '930px'}}/>
        )
    }
}

export default ColumnChart;