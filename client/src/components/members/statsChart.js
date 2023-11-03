import React, { Component } from 'react';
import Highcharts from 'highcharts';
import HighChartsMore from 'highcharts/highcharts-more';

HighChartsMore(Highcharts);

export default class SpiderwebChart extends Component {

    componentDidMount = () => {

        Highcharts.chart(this.props.charId + 'char', {

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
                description: 'A spiderweb chart showing statistics for World of Warcraft characters. The spider chart has six spokes. Each spoke represents one of the 6 departments within the organization: sales, marketing, development, customer support, information technology and administration. The chart is interactive, and each data point is displayed upon hovering. The chart clearly shows that 4 of the 6 departments have overspent their budget with Marketing responsible for the greatest overspend of $20,000. The allocated budget and actual spending data points for each department are as follows: Sales. Budget equals $43,000; spending equals $50,000. Marketing. Budget equals $19,000; spending equals $39,000. Development. Budget equals $60,000; spending equals $42,000. Customer support. Budget equals $35,000; spending equals $31,000. Information technology. Budget equals $17,000; spending equals $26,000. Administration. Budget equals $10,000; spending equals $14,000.'
            },
        
            title: {
                text: 'Stats',
            },
        
            xAxis: {
                categories: ['Mastery', 'Melee Crit', 'Melee Haste', 'Ranged Crit', 'Ranged Haste', 'Spell Crit', 'Spell Haste', 'Versatility'],
                tickmarkPlacement: 'on',
                lineWidth: 0
            },
        
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },
        
            tooltip: {
                shared: true,
                pointFormat: '<span style="color:{series.color}"><b>{point.y}</b><br/>'
            },
        
            series: [{
                name: 'Statistics',
                data: [this.props.stats.mastery.rating, this.props.stats.melee_crit.rating, this.props.stats.melee_haste.rating, this.props.stats.ranged_crit.rating, this.props.stats.ranged_haste.rating, this.props.stats.spell_crit.rating, this.props.stats.spell_haste.rating, this.props.stats.versatility],
                pointPlacement: 'on',
                type: 'area'
            }],
        
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 200
                    },
                    chartOptions: {
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            layout: 'horizontal',
                            enabled: false
                        },
                        pane: {
                            size: '30%'
                        }
                    }
                }]
            }
        })
    }


    render(){
        return(
            <div id={this.props.charId + 'char'} />
        )
    }
}