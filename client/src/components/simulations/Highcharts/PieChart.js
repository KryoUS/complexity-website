import React, { Component } from 'react';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

class PieCharts extends Component {

    componentDidMount = () => {

        Highcharts.chart(this.props.pieChartID, {
            chart: {
                backgroundColor: null,
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false,
                    },
                },
            },
            title: {
                text: this.props.pieChartTitle,
                style: {
                    color: 'white',
                },
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y}</b>',
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: this.props.pieChartLabels,
                        format: '<b>{point.name}</b>: {point.y}',
                        style: {
                            textOutline: 'none',
                            color: 'white'
                        },
                    },
                    showInLegend: this.props.pieChartLegend,
                    size: this.props.pieChartSize
                },
            },
            series: [{
                name: 'Total',
                colorByPoint: true,
                data: this.props.pieChartData
            }],
            credits: {
                enabled: false
            },
        });
    }

    render(){
        return(
            <div id={this.props.pieChartID} className={this.props.pieChartClassName}/>
        )
    }
}

export default PieCharts;