import React,  { Component } from 'react';
import Moment from 'moment';
import Quote from '../Utils/Quote';
import '../News/News.css';

class ComingSoon extends Component {
    constructor() {
        super();

        this.state = {
            weeksFirstHalf: false,
            rotationSchedule: (Moment().week() - 29) % 4,
            corruptionRotation: [
                {
                    rotation: 1,
                    tuesdayCorruptions: [
                        {
                            name: "Ineffable Truth 1",
                            cost: 3300,
                            spellId: 318303,
                        },
                        {
                            name: "Honed Mind 1",
                            cost: 4125,
                            spellId: 318269,
                        },
                        {
                            name: "Strikethrough 2",
                            cost: 4125,
                            spellId: 315281,
                        },
                        {
                            name: "Masterful 2",
                            cost: 4125,
                            spellId: 315530,
                        },
                        {
                            name: "Expedient 3",
                            cost: 5000,
                            spellId: 315546,
                        },
                        {
                            name: "Twisted Appendage 3",
                            cost: 13200,
                            spellId: 318483,
                        },
                    ],
                    fridayCorruptions: [
                        {
                            name: "Ineffable Truth 2",
                            cost: 6750,
                            spellId: 318484,
                        },
                        {
                            name: "Void Ritual 1",
                            cost: 4125,
                            spellId: 318286,
                        },
                        {
                            name: "Deadly Momentum 2",
                            cost: 5000,
                            spellId: 318493,
                        },
                        {
                            name: "Masterful 1",
                            cost: 3000,
                            spellId: 315529,
                        },
                        {
                            name: "Versatile 3",
                            cost: 5000,
                            spellId: 315553,
                        },
                        {
                            name: "Siphoner 2",
                            cost: 6300,
                            spellId: 315591,
                        },
                        {
                            name: "Avoidant 2",
                            cost: 3300,
                            spellId: 315608,
                        },
                    ],
                },
                {
                    rotation: 2,
                    tuesdayCorruptions: [
                        {
                            name: "Infinite Stars 1",
                            cost: 5000,
                            spellId: 318489,
                        },
                        {
                            name: "Surging Vitality 1",
                            cost: 4125,
                            spellId: 318270,
                        },
                        {
                            name: "Glimpse of Clarity",
                            cost: 4125,
                            spellId: 315573,
                        },
                        {
                            name: "Severe 2",
                            cost: 4125,
                            spellId: 315557,
                        },
                        {
                            name: "Racing Pulse 3",
                            cost: 7875,
                            spellId: 318496,
                        },
                        {
                            name: "Siphoner 3",
                            cost: 9000,
                            spellId: 315592,
                        },
                        {
                            name: "Avoidant 3",
                            cost: 4250,
                            spellId: 315609,
                        },
                    ],
                    fridayCorruptions: [
                        {
                            name: "Twilight Devastation 2",
                            cost: 10000,
                            spellId: 318477,
                        },
                        {
                            name: "Severe 1",
                            cost: 3000,
                            spellId: 315554,
                        },
                        {
                            name: "Strikethrough 3",
                            cost: 5000,
                            spellId: 315282,
                        },
                        {
                            name: "Honed Mind 3",
                            cost: 7875,
                            spellId: 318498,
                        },
                        {
                            name: "Expedient 2",
                            cost: 4125,
                            spellId: 315545,
                        },
                        {
                            name: "Siphoner 1",
                            cost: 4250,
                            spellId: 315590,
                        },
                    ],
                },
                {
                    rotation: 3,
                    tuesdayCorruptions: [
                        {
                            name: "Infinite Stars 3",
                            cost: 15000,
                            spellId: 318488,
                        },
                        {
                            name: "Racing Pulse 2",
                            cost: 5000,
                            spellId: 318492,
                        },
                        {
                            name: "Echoing Void 2",
                            cost: 7875,
                            spellId: 318485,
                        },
                        {
                            name: "Severe 3",
                            cost: 5000,
                            spellId: 315558,
                        },
                        {
                            name: "Expedient 1",
                            cost: 3000,
                            spellId: 315544,
                        },
                        {
                            name: "Twisted Appendage 1",
                            cost: 3000,
                            spellId: 318481,
                        },
                    ],
                    fridayCorruptions: [
                        {
                            name: "Twilight Devastation 3",
                            cost: 15000,
                            spellId: 318478,
                        },
                        {
                            name: "Racing Pulse 1",
                            cost: 4125,
                            spellId: 318266,
                        },
                        {
                            name: "Strikethrough 1",
                            cost: 3000,
                            spellId: 315277,
                        },
                        {
                            name: "Masterful 3",
                            cost: 5000,
                            spellId: 315531,
                        },
                        {
                            name: "Surging Vitality 2",
                            cost: 5000,
                            spellId: 318495,
                        },
                        {
                            name: "Void Ritual 2",
                            cost: 7875,
                            spellId: 318479,
                        },
                        {
                            name: "Avoidant 1",
                            cost: 2400,
                            spellId: 315607,
                        },
                    ],
                },
                {
                    rotation: 4,
                    tuesdayCorruptions: [
                        {
                            name: "Infinite Stars 2",
                            cost: 10000,
                            spellId: 318487,
                        },
                        {
                            name: "Deadly Momentum 3",
                            cost: 7875,
                            spellId: 318497,
                        },
                        {
                            name: "Echoing Void 1",
                            cost: 6250,
                            spellId: 318280,
                        },
                        {
                            name: "Honed Mind 2",
                            cost: 5000,
                            spellId: 318494,
                        },
                        {
                            name: "Versatile 1",
                            cost: 3000,
                            spellId: 315549,
                        },
                        {
                            name: "Void Ritual 3",
                            cost: 13200,
                            spellId: 318480,
                        },
                        {
                            name: "Gushing Wound",
                            cost: 4125,
                            spellId: 318179,
                        },
                    ],
                    fridayCorruptions: [
                        {
                            name: "Twilight Devastation 1",
                            cost: 6250,
                            spellId: 318276,
                        },
                        {
                            name: "Surging Vitality 3",
                            cost: 7875,
                            spellId: 318499,
                        },
                        {
                            name: "Echoing Void 3",
                            cost: 12000,
                            spellId: 318486,
                        },
                        {
                            name: "Deadly Momentum 1",
                            cost: 4125,
                            spellId: 318268,
                        },
                        {
                            name: "Versatile 2",
                            cost: 4125,
                            spellId: 315552,
                        },
                        {
                            name: "Twisted Appendage 2",
                            cost: 7875,
                            spellId: 318482,
                        },
                    ],
                },
            ],
        }
    }   

    componentDidMount = () => {
        //If between Tuesday and Friday (Saturday UTC)
        if (Moment().utc().day() >= 2 && Moment().utc().day() <= 6) {
            if (Moment().utc().day() === 2 && Moment().utc().hours() >= 15) {
                //If Tuesday and after 8am Pacific (3pm UTC)
                this.setState({ weeksFirstHalf: true });
            } else if (Moment().utc().day() === 6 && Moment().utc().hours() <= 3) {
                //If Friday (Saturday UTC) and before 8pm Pacifc (3am UTC)
                this.setState({ weeksFirstHalf: true });
            } else if (Moment().utc().day() === 3 || Moment().utc().day() === 4 || Moment().utc().day() === 5) {
                //If Wednesday, Thursday, or Friday (all UTC).
                this.setState({ weeksFirstHalf: true });
            };
        };
    };

    corruptions = (corruption) => {
        return <a 
            key={corruption.spellId} 
            className={"button-text"} 
            style={{width: '200px'}} 
            data-wowhead={`spell=${corruption.spellId}`} 
            href={`https://www.wowhead.com/spell=${corruption.spellId}`} 
            target="_blank" 
            rel="noopener noreferrer">
                {corruption.name} - {corruption.cost}
            </a>
    };

    weeklyRotation = (rotation, rotationIndex) => {
    return <div key={`corruptionIndex${rotationIndex}`}>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', border: 'none', backgroundImage: 'none'}} className={rotationIndex === this.state.rotationSchedule && this.state.weeksFirstHalf ? 'collected' : 'not-collected'}>
    <div style={{width: '200px'}}>{Moment().day(-5).add((7 * rotationIndex), 'day').format("dddd, MMMM Do")}</div>
            {rotation.tuesdayCorruptions.map(corruption => {return this.corruptions(corruption)})}
        </div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', border: 'none', backgroundImage: 'none'}} className={rotationIndex === this.state.rotationSchedule && !this.state.weeksFirstHalf ? 'collected' : 'not-collected'}>
            <div style={{width: '200px'}}>{Moment().day(-2).add((7 * rotationIndex), 'day').format("dddd, MMMM Do")}</div>
            {rotation.fridayCorruptions.map(corruption => {return this.corruptions(corruption)})}
        </div>
    </div>
    }

    render(){
        return(
            <div>
                <div className="news-background image-mask" />
                <div className="page-div" style={{marginTop: 0, overflow: 'hidden'}}>
                    <div style={{width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.75)'}}>
                        <div className='fade2s' style={{height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
                            <img className="logo" src="https://res.cloudinary.com/complexityguild/image/upload/v1535585345/wow/logos/logov3.png" alt="Complexity Logo"/>
                            <div className='modal-title' style={{fontSize: '4rem', textAlign: 'center'}}>COMING SOON</div>
                            <Quote />
                            <div className='modal-title' style={{fontSize: '2rem', textAlign: 'center'}}>Corruption Rotation</div>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                {this.state.corruptionRotation.map((rotation, index) => {
                                    return this.weeklyRotation(rotation, index);
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ComingSoon