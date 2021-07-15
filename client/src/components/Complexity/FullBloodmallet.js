import React, { Component } from 'react';
import { connect } from 'react-redux';
import { infoModal } from '../../ducks/reducer';
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
        document.querySelectorAll("div.bloodmallet_chart")[0].setAttribute("data-loaded-data", "");
        window.bloodmallet_chart_import();

        let proceed = true;
        const test = document.getElementById('bloodMalletChart');
        const observer = new MutationObserver((mutationsList, observ) => {

            for (let mutation of mutationsList) {
                if (proceed) {
                    if (mutation.type === 'childList') {
                        if (mutation.target.innerHTML === '<g></g>') {
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
        Axios.get('/api/wow/classes').then(res => {
            let classes = [];

            const dataMap = res.data.map(obj => {
                return obj.specializations.map(specObj => {
                    return classes.push({ 
                        className: obj.name.en_US,
                        spec_name: specObj.name.en_US, 
                        spec_role: specObj.name.en_US === 'Holy' || specObj.name.en_US === 'Restoration' || specObj.name.en_US === 'Mistweaver' ? 'HEALING' : '',
                        spec_icon: specObj.media.assets[0].value
                    });
                })
            });

            Promise.all(dataMap).then(() => {
                this.setState({
                    classes: classes.sort((a, b) => {
                        var x = a.className.toLowerCase();
                        var y = b.className.toLowerCase();
                        if (x < y) { return -1; }
                        if (x > y) { return 1; }
                        return 0;
                    }),
                    classesLoaded: true
                });
            }).catch(promiseErr => {
                console.log('Promise Error? ', promiseErr);
            });
            
        }).catch(err => {
            this.props.infoModal(true, 'Drats!', "Looks like there might be a small issue with the flurbal flobbin. Please try again later.", 'Understood...');
        })
    };

    render() {
        return (
            <div className="page-div">
                <div className="about-background image-mask" />
                <div className="flex-column fade1s" >
                    {this.state.classes.length > 0 ?
                        <div className="flex-column flex-center" style={{alignItems: 'center'}}>
                            <div className="flex-row flex-between flex-wrap" style={{ justifyContent: 'center' }}>
                                {this.state.classes.map(obj => {
                                    if (obj.spec_role === 'HEALING') {
                                        return <div className="icon-border-black not-collected" 
                                        key={`${obj.spec_name}${obj.className}`} 
                                        style={{
                                            background: `url(${obj.spec_icon})`,
                                            width: '30px',
                                            height: '30px',
                                            backgroundSize: '30px',
                                            margin: '5px'
                                        }} />
                                    } else {
                                        return <div 
                                        className={obj.spec_name === this.state.selectedSpec && obj.className === this.state.selectedClass ? 'icon-border-purple' : 'icon-border-white'} 
                                        key={`${obj.spec_name}${obj.className}`} 
                                        style={{
                                            background: `url(${obj.spec_icon})`,
                                            width: '30px',
                                            height: '30px',
                                            backgroundSize: '30px',
                                            margin: '5px'
                                        }} onClick={() => this.setClassSpec(obj.className, obj.spec_name)} />
                                    }
                                })}
                            </div>
                            {this.state.selectedSpec === '' && <div style={{fontSize: '2rem'}}>Select a Specialization...</div>}
                        </div>
                    :
                        <Loader />
                    }
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        {this.state.selectedSpec !== '' && 
                            <Bloodmallet 
                            selectedCharClass={this.state.selectedClass.toLowerCase().replace(' ', '_')} 
                            selectedCharSpec={this.state.selectedSpec.toLowerCase().replace(' ', '_')} 
                            chartLoaded={this.state.chartLoaded}
                            bloodMalletLoad={this.bloodMalletLoad}
                            bloodMalletFontColor={'white'}
                            />
                        }
                    </div>
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

export default connect(mapStateToProps, { infoModal })(FullBloodmallet);