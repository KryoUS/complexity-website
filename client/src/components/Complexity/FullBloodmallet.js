import React, { Component } from 'react';
import Bloodmallet from '../Utils/Bloodmallet/Bloodmallet';
import Loader from '../Utils/Loader';
import Axios from 'axios';

class FullBloodmallet extends Component {
    constructor() {
        super();

        this.state = {
            selectedClass: '',
            selectedSpec: '',
            classes: [],
            chartLoaded: false,
            classesLoaded: false
        }

    };

    bloodMalletLoad = () => {
        this.setState({ chartLoaded: false });
        window.bloodmallet_chart_import();

        let proceed = true;
        const test = document.getElementById('bloodMalletChart');
        const observer = new MutationObserver((mutationsList, observ) => {

            for (let mutation of mutationsList) {
                if (proceed) {
                    if (mutation.type === 'childList') {
                        if (mutation.target.innerHTML === '<tspan>Δ Damage per second</tspan>') {
                            proceed = false;
                            observer.disconnect();
                            this.setState({ chartLoaded: true });
                        };
                    };
                };
            };
        });

        observer.observe(test, { attributes: true, childList: true, subtree: true });
    };

    setClassSpec = (className, specName) => {
        this.setState({ 
            selectedClass: className, 
            selectedSpec: specName 
        }, () => {this.bloodMalletLoad()});
    }

    componentDidMount() {
        Axios.get('/api/members/specs').then(res => {
            this.setState({
                classes: res.data.sort((a, b) => {
                    var x = a.className.toLowerCase();
                    var y = b.className.toLowerCase();
                    if (x < y) { return -1; }
                    if (x > y) { return 1; }
                    return 0;
                }),
                classesLoaded: true
            }, () => {
                console.log(this.state.classes)
            });
        }).catch(err => {
            console.log('FullBloodmallet spec fetch error ---', err);
        })
    };

    render() {
        return (
            <div>
                <div className="about-background image-mask" />
                <div className="flex-column page-div fade1s" style={{ marginBottom: '100px', background: 'rgba(17, 11, 41, 0.5)', height: '100%' }} >
                    <div style={{minHeight: '42px'}}>
                        {this.state.classes.length > 0 ?
                            <div className="flex-row flex-between flex-wrap">
                                {this.state.classes.map(obj => {
                                    if (obj.spec_role === 'HEALING') {
                                        return <div className="icon-border-black not-collected" 
                                        key={`${obj.spec_name}${obj.className}`} 
                                        style={{
                                            background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/${obj.spec_icon}.png)`,
                                            width: '30px',
                                            height: '30px',
                                            backgroundSize: '30px',
                                            margin: '5px'
                                        }} />
                                    } else {
                                        return <div 
                                        className={obj.spec_name === this.state.selectedSpec ? 'icon-border-purple' : 'icon-border-white'} 
                                        key={`${obj.spec_name}${obj.className}`} 
                                        style={{
                                            background: `url(https://res.cloudinary.com/complexityguild/image/upload/v1533521203/wow/icons/${obj.spec_icon}.png)`,
                                            width: '30px',
                                            height: '30px',
                                            backgroundSize: '30px',
                                            margin: '5px'
                                        }} onClick={() => this.setClassSpec(obj.className, obj.spec_name)} />
                                    }
                                })}
                            </div>
                        :
                            <Loader scale={'0.75'} margin={'-20px'} />
                        }
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '100px', width: '100vw' }}>
                        {this.state.selectedSpec ? 
                            <Bloodmallet 
                            selectedCharClass={this.state.selectedClass} 
                            selectedCharSpec={this.state.selectedSpec} 
                            chartLoaded={this.state.chartLoaded}
                            bloodMalletLoad={this.bloodMalletLoad}
                            bloodMalletFontColor={this.state.selectedClassColor}
                            />
                        :
                            <div style={{fontSize: '2rem'}}>Select a Specialization...</div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default FullBloodmallet