import React, { Component } from 'react';
import { connect } from 'react-redux';
import { infoModal } from '../../ducks/reducer';
import axios from 'axios';
import BarChart from '../Utils/Highcharts/BarChart';
import Loader from '../Utils/Loader';
import Moment from 'moment';
import './About.css';

const capitalizeFirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

class SimulationCraft extends Component {
    constructor() {
        super();

        this.state = {
            currentTier: {},
            publicRealm: {},
            tierBuild: '',
            simCraftVer: '',
            PTRBuild: '',
            simCraftPTRVer: '',
            loaded: false
        }
    }

    componentDidMount = () => {
        axios.get('/api/simulationcraft').then(res => {

            let currentTierSpecs = [];
            let currentTierData = [{
                data: [],
                borderColor: 'black',
                pointWidth: 20
            }];
            let publicRealmSpecs = [];
            let publicRealmData = [{
                data: [],
                borderColor: 'black',
                pointWidth: 20
            }];

            res.data.currentTier.sort((a, b) => { return b.dps - a.dps });
            res.data.publicRealm.sort((a, b) => { return b.dps - a.dps });

            res.data.currentTier.forEach(obj => {
                currentTierSpecs.push(capitalizeFirst(obj.spec.replace('_', ' ')));
                currentTierData[0].data.push({
                    name: capitalizeFirst(obj.spec.replace('_', ' ')),
                    color: obj.classColor,
                    y: obj.dps,
                    stats: obj.stat,
                    talents: obj.talents,
                    class: capitalizeFirst(obj.class),
                    race: capitalizeFirst(obj.race)
                });
            });
            res.data.publicRealm.forEach(obj => {
                publicRealmSpecs.push(capitalizeFirst(obj.spec.replace('_', ' ')));
                publicRealmData[0].data.push({
                    name: capitalizeFirst(obj.spec.replace('_', ' ')),
                    color: obj.classColor,
                    y: obj.dps,
                    stats: obj.stat,
                    talents: obj.talents,
                    class: capitalizeFirst(obj.class),
                    race: capitalizeFirst(obj.race)
                });
            });

            this.setState({
                currentTier: {
                    data: currentTierData,
                    specs: currentTierSpecs,
                },
                publicRealm: {
                    data: publicRealmData,
                    specs: publicRealmSpecs,
                },
                tierBuild: `${res.data.currentTier[0].tier}`,
                simCraftVer: `Patch: ${res.data.currentTier[0].patch} (Build: ${res.data.currentTier[0].build}) SimCraft Ver: ${res.data.currentTier[0].simcraftVer} (${Moment.unix(Number(res.data.currentTier[0].reportDateTime)).format('MMMM Do YYYY, h:mm:ss a')})`,
                PTRBuild: `${res.data.publicRealm[0].tier}`,
                simCraftPTRVer: `Patch: ${res.data.publicRealm[0].patch} (Build: ${res.data.publicRealm[0].build}) SimCraft Ver: ${res.data.publicRealm[0].simcraftVer} (${Moment.unix(Number(res.data.publicRealm[0].reportDateTime)).format('MMMM Do YYYY, h:mm:ss a')})`,
                loaded: true
            });
        }).catch(simulationCraftError => {
            console.log(simulationCraftError);
        });

        return null;
    }

    render() {
        return (
            <div>
                <div className="news-background image-mask" />
                <div className="flex-column page-div fade1s">
                    {this.state.loaded ?
                        <div style={{ width: '90vw', marginBottom: '100px', alignSelf: 'center', background: 'rgba(17, 11, 41, 0.5)' }}>
                            <BarChart
                                barChartID='barSimulationCraftTier'
                                barChartHeight={1200}
                                barChartXFont='1rem'
                                barChartDataLabelFont='1rem'
                                barChartTitle={`SimulationCraft - ${this.state.tierBuild}`}
                                barChartSubTitle={this.state.simCraftVer}
                                barChartCategories={this.state.currentTier.specs}
                                barChartYTitle=''
                                barChartTooltipSuffix=' DPS'
                                barChartData={this.state.currentTier.data}
                                barChartHeaderFormat={null}
                                barChartPointFormat={null}
                                barChartFormatter={function () {

                                    const objectLoop = (obj, type, type2) => {

                                        let statString = '';

                                        for (var key in obj) {
                                            if (typeof obj[key] === 'object') {
                                                if (type) {
                                                    if (type2) {
                                                        statString += '<br />' + objectLoop(obj[key], type, type2);
                                                    } else {
                                                        statString += '<br />' + objectLoop(obj[key], type, key);
                                                    }
                                                } else {
                                                    statString += '<br />' + objectLoop(obj[key], key);
                                                }
                                            } else {
                                                if (type) {
                                                    if (type2) {
                                                        statString += `${key === 'value' ? `${capitalizeFirst(type)} ${capitalizeFirst(type2)} ${obj[key]}` : key === 'percent' ? ` (${obj[key]}%)` : `${capitalizeFirst(type)} ${capitalizeFirst(key)} ${obj[key]}`}`
                                                    } else {
                                                        statString += `${key === 'value' ? `${capitalizeFirst(type)} ${obj[key]}` : key === 'percent' ? ` (${obj[key]}%)` : `<br />${capitalizeFirst(type)} ${capitalizeFirst(key)} ${obj[key]}`}`
                                                    }

                                                } else {
                                                    statString += `<br />${key === 'value' ? '' : capitalizeFirst(key)}: ${obj[key]}`
                                                }
                                            }
                                        }

                                        return statString;
                                    }
                                    return `<span style="color: ${this.point.color};font-size: 1rem">${this.point.race} ${this.point.category} ${this.point.class}</span> 
                                        <br /> 
                                        Talents: ${this.point.talents} ${objectLoop(this.point.stats)}`
                                }}
                                barChartCredits='https://www.simulationcraft.org/'
                            />
                            <div className="gradient-line-white" style={{ marginTop: '20px', marginBottom: '20px' }} />
                            <BarChart
                                barChartID='barSimulationCraftPTR'
                                barChartHeight={1200}
                                barChartXFont='1rem'
                                barChartDataLabelFont='1rem'
                                barChartTitle={`SimulationCraft - Public Test Realm`}
                                barChartSubTitle={this.state.simCraftPTRVer}
                                barChartCategories={this.state.publicRealm.specs}
                                barChartYTitle=''
                                barChartTooltipSuffix=' DPS'
                                barChartData={this.state.publicRealm.data}
                                barChartHeaderFormat={null}
                                barChartPointFormat={null}
                                barChartFormatter={function () {

                                    const objectLoop = (obj, type, type2) => {

                                        let statString = '';

                                        for (var key in obj) {
                                            if (typeof obj[key] === 'object') {
                                                if (type) {
                                                    if (type2) {
                                                        statString += '<br />' + objectLoop(obj[key], type, type2);
                                                    } else {
                                                        statString += '<br />' + objectLoop(obj[key], type, key);
                                                    }
                                                } else {
                                                    statString += '<br />' + objectLoop(obj[key], key);
                                                }
                                            } else {
                                                if (type) {
                                                    if (type2) {
                                                        statString += `${key === 'value' ? `${capitalizeFirst(type)} ${capitalizeFirst(type2)} ${obj[key]}` : key === 'percent' ? ` (${obj[key]}%)` : `${capitalizeFirst(type)} ${capitalizeFirst(key)} ${obj[key]}`}`
                                                    } else {
                                                        statString += `${key === 'value' ? `${capitalizeFirst(type)} ${obj[key]}` : key === 'percent' ? ` (${obj[key]}%)` : `<br />${capitalizeFirst(type)} ${capitalizeFirst(key)} ${obj[key]}`}`
                                                    }

                                                } else {
                                                    statString += `<br />${key === 'value' ? '' : capitalizeFirst(key)}: ${obj[key]}`
                                                }
                                            }
                                        }

                                        return statString;
                                    }
                                    return `<span style="color: ${this.point.color};font-size: 1rem">${this.point.race} ${this.point.category} ${this.point.class}</span> 
                                        <br /> 
                                        Talents: ${this.point.talents} ${objectLoop(this.point.stats)}`
                                }}
                                barChartCredits='https://www.simulationcraft.org/'
                            />
                        </div>
                        :
                        <Loader />
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        modalOpen: state.modalOpen,
        modalTitle: state.modalTitle,
        modalMessage: state.modalMessage,
        modalButton: state.modalButton
    }
}

export default connect(mapStateToProps, { infoModal })(SimulationCraft);