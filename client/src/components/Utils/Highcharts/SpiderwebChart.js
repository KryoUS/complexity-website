import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';

HighchartsMore(Highcharts);

class SpiderwebChart extends Component {

    componentDidMount = () => {

        Highcharts.chart(this.props.spiderwebChartID, {

            chart: {
                backgroundColor: null,
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                polar: true,
                type: 'line'
            },
        
            exporting: {
                buttons: {
                    contextButton: {
                        enabled: false,
                    },
                },
            },

            accessibility: {
                description: 'A spiderweb chart compares the allocated budget against actual spending within an organization. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.'
            },
        
            title: {
                text: this.props.spiderwebChartTitle,
                style: {
                    color: 'white',
                },
            },
        
            xAxis: {
                categories: this.props.spiderwebCategories,
                tickmarkPlacement: 'on',
                lineWidth: 0,
                labels: {
                    style: {
                        color: 'white'
                    }
                }
            },
        
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0,
                labels: {
                    style: {
                        color: 'white'
                    }
                },
                // minorTickInterval: 'auto',
            },
        
            tooltip: {
                // backgroundColor: '#110b29',
                shared: false,
                pointFormat: '<span style="color:{series.color}"><b>{point.y}%</b><br/>'
            },
        
            series: [this.props.spiderwebSeries],
        
            responsive: {
                rules: [{
                    condition: {
                        // maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            enabled: this.props.spiderwebEnabled
                        },
                    }
                }]
            }
        
        });
    }

    render(){
        return(
            <div id={this.props.spiderwebChartID} />
        )
    }
}

export default SpiderwebChart;