import React, { Component } from 'react';
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';

Exporting(Highcharts);

class BarChart extends Component {

    componentDidMount = () => {

        Highcharts.chart(this.props.barChartID, {
            chart: {
                backgroundColor: null,
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'bar'
            },
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false,
                    },
                },
            },
            title: {
                text: this.props.barChartTitle,
                style: {
                    color: 'white',
                },
            },
            xAxis: {
                categories: this.props.barChartCategories,
                title: {
                    text: null,
                },
                labels: {
                    enabled: true,
                    style: {
                        color: 'white',
                        fontSize: '12px',
                        textDecoration: 'none',
                    },
                },
            },
            yAxis: {
                min: 0,
                title: {
                    text: this.props.barChartYTitle,
                    align: 'high',
                    style: {
                        color: 'white',
                    },
                },
                labels: {
                    enabled: true,
                    overflow: 'justify',
                    style: {
                        color: 'white',
                    },
                },
            },
            legend: {
                enabled: false
            },
            tooltip: {
                valueSuffix: this.props.barChartTooltipSuffix,
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: 'white',
                            fontSize: '8px',
                            textOutline: null,
                        },
                    },
                },
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -25,
                y: 0,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: false
            },
            credits: {
                enabled: false
            },
         
            series: this.props.barChartData,
        });
    }

    render(){
        return(
            <div id={this.props.barChartID} style={{minWidth: '930px'}}/>
        )
    }
}

export default BarChart;