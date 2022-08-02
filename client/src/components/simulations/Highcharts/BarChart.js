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
                spacing: [20, 10, 45, 10],
                type: 'bar',
                height: this.props.barChartHeight
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
                    textOutline: 'black',
                    fontFamily: 'Oswald,sans-serif',
                    fontSize: '2.5rem'
                },
            },
            subtitle: {
                text: this.props.barChartSubTitle,
                style: {
                    color: 'white',
                    textOutline: 'black',
                    fontFamily: 'Oswald,sans-serif',
                    fontSize: '1rem'
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
                        fontSize: this.props.barChartXFont,
                        textDecoration: 'none',
                    },
                    align: 'left',
                    reserveSpace: true
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
            tooltip: {
                backgroundColor: '#121212',
                headerFormat: this.props.barChartHeaderFormat ? this.props.barChartHeaderFormat : '<span style="font-size: 10px">{point.key}</span><br/>',
                pointFormat: this.props.barChartPointFormat ? this.props.barChartPointFormat : '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
                formatter: this.props.barChartFormatter,
                valueSuffix: this.props.barChartTooltipSuffix,
                style: {
                    color: 'white'
                }
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        style: {
                            color: 'white',
                            fontSize: this.props.barChartDataLabelFont,
                        },
                    },
                },
            },
            legend: {
                enabled: false,
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
                enabled: this.props.barChartCredits ? true : false,
                href: this.props.barChartCredits && this.props.barChartCredits,
                text: this.props.barChartCredits && this.props.barChartCredits.replace('https://www.', '').replace('/', ''),
                style: {
                    color: 'white',
                    textOutline: 'black',
                    fontFamily: 'Oswald,sans-serif',
                    fontSize: '1.5rem'
                },
            },

            series: this.props.barChartData,
        });
    }

    render() {
        return (
            <div id={this.props.barChartID} />
        )
    }
}

export default BarChart;