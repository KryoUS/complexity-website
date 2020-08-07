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
            weekNum: Moment().week(),
            corruptionRotation: [
                {
                    rotation: 1,
                    tuesdayCorruptions: [
                        {
                            name: "Ineffable Truth 1",
                            cost: 3300,
                            itemId: 177981,
                        },
                        {
                            name: "Honed Mind 1",
                            cost: 4125,
                            itemId: 177978,
                        },
                        {
                            name: "Strikethrough 2",
                            cost: 4125,
                            itemId: 177999,
                        },
                        {
                            name: "Masterful 2",
                            cost: 4125,
                            itemId: 177987,
                        },
                        {
                            name: "Expedient 3",
                            cost: 5000,
                            itemId: 177975,
                        },
                        {
                            name: "Twisted Appendage 3",
                            cost: 13200,
                            itemId: 178009,
                        },
                    ],
                    fridayCorruptions: [
                        {
                            name: "Ineffable Truth 2",
                            cost: 6750,
                            itemId: 177982,
                        },
                        {
                            name: "Void Ritual 1",
                            cost: 4125,
                            itemId: 178013,
                        },
                        {
                            name: "Deadly Momentum 2",
                            cost: 5000,
                            itemId: 177965,
                        },
                        {
                            name: "Masterful 1",
                            cost: 3000,
                            itemId: 177986,
                        },
                        {
                            name: "Versatile 3",
                            cost: 5000,
                            itemId: 178012,
                        },
                        {
                            name: "Siphoner 2",
                            cost: 6300,
                            itemId: 177996,
                        },
                        {
                            name: "Avoidant 2",
                            cost: 3300,
                            itemId: 177971,
                        },
                    ],
                },
                {
                    rotation: 2,
                    tuesdayCorruptions: [
                        {
                            name: "Infinite Stars 1",
                            cost: 5000,
                            itemId: 177983,
                        },
                        {
                            name: "Surging Vitality 1",
                            cost: 4125,
                            itemId: 178001,
                        },
                        {
                            name: "Glimpse of Clarity",
                            cost: 4125,
                            itemId: 177976,
                        },
                        {
                            name: "Severe 2",
                            cost: 4125,
                            itemId: 177993,
                        },
                        {
                            name: "Racing Pulse 3",
                            cost: 7875,
                            itemId: 177991,
                        },
                        {
                            name: "Siphoner 3",
                            cost: 9000,
                            itemId: 177997,
                        },
                        {
                            name: "Avoidant 3",
                            cost: 4250,
                            itemId: 177972,
                        },
                    ],
                    fridayCorruptions: [
                        {
                            name: "Twilight Devastation 2",
                            cost: 10000,
                            itemId: 178005,
                        },
                        {
                            name: "Severe 1",
                            cost: 3000,
                            itemId: 177992,
                        },
                        {
                            name: "Strikethrough 3",
                            cost: 5000,
                            itemId: 178000,
                        },
                        {
                            name: "Honed Mind 3",
                            cost: 7875,
                            itemId: 177980,
                        },
                        {
                            name: "Expedient 2",
                            cost: 4125,
                            itemId: 177974,
                        },
                        {
                            name: "Siphoner 1",
                            cost: 4250,
                            itemId: 177995,
                        },
                    ],
                },
                {
                    rotation: 3,
                    tuesdayCorruptions: [
                        {
                            name: "Infinite Stars 3",
                            cost: 15000,
                            itemId: 177985,
                        },
                        {
                            name: "Racing Pulse 2",
                            cost: 5000,
                            itemId: 177990,
                        },
                        {
                            name: "Echoing Void 2",
                            cost: 7875,
                            itemId: 177968,
                        },
                        {
                            name: "Severe 3",
                            cost: 5000,
                            itemId: 177994,
                        },
                        {
                            name: "Expedient 1",
                            cost: 3000,
                            itemId: 177973,
                        },
                        {
                            name: "Twisted Appendage 1",
                            cost: 3000,
                            itemId: 178007,
                        },
                    ],
                    fridayCorruptions: [
                        {
                            name: "Twilight Devastation 3",
                            cost: 15000,
                            itemId: 178006,
                        },
                        {
                            name: "Racing Pulse 1",
                            cost: 4125,
                            itemId: 177989,
                        },
                        {
                            name: "Strikethrough 1",
                            cost: 3000,
                            itemId: 177998,
                        },
                        {
                            name: "Masterful 3",
                            cost: 5000,
                            itemId: 177988,
                        },
                        {
                            name: "Surging Vitality 2",
                            cost: 5000,
                            itemId: 178002,
                        },
                        {
                            name: "Void Ritual 2",
                            cost: 7875,
                            itemId: 178014,
                        },
                        {
                            name: "Avoidant 1",
                            cost: 2400,
                            itemId: 177970,
                        },
                    ],
                },
                {
                    rotation: 4,
                    tuesdayCorruptions: [
                        {
                            name: "Infinite Stars 2",
                            cost: 10000,
                            itemId: 177984,
                        },
                        {
                            name: "Deadly Momentum 3",
                            cost: 7875,
                            itemId: 177966,
                        },
                        {
                            name: "Echoing Void 1",
                            cost: 6250,
                            itemId: 177967,
                        },
                        {
                            name: "Honed Mind 2",
                            cost: 5000,
                            itemId: 177979,
                        },
                        {
                            name: "Versatile 1",
                            cost: 3000,
                            itemId: 178010,
                        },
                        {
                            name: "Void Ritual 3",
                            cost: 13200,
                            itemId: 178015,
                        },
                        {
                            name: "Gushing Wound",
                            cost: 4125,
                            itemId: 177977,
                        },
                    ],
                    fridayCorruptions: [
                        {
                            name: "Twilight Devastation 1",
                            cost: 6250,
                            itemId: 178004,
                        },
                        {
                            name: "Surging Vitality 3",
                            cost: 7875,
                            itemId: 178003,
                        },
                        {
                            name: "Echoing Void 3",
                            cost: 12000,
                            itemId: 177969,
                        },
                        {
                            name: "Deadly Momentum 1",
                            cost: 4125,
                            itemId: 177955,
                        },
                        {
                            name: "Versatile 2",
                            cost: 4125,
                            itemId: 178011,
                        },
                        {
                            name: "Twisted Appendage 2",
                            cost: 7875,
                            itemId: 178008,
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
            } else if (Moment().utc().day() === 6 && Moment().utc().hours() < 3) {
                //If Friday (Saturday UTC) and before 8pm Pacifc (3am UTC)
                this.setState({ weeksFirstHalf: true });
            } else if (Moment().utc().day() === 3 || Moment().utc().day() === 4 || Moment().utc().day() === 5) {
                //If Wednesday, Thursday, or Friday (all UTC).
                this.setState({ weeksFirstHalf: true });
            };
        };

        //If Sunday, Monday, or Tuesday before reset, subtract one index from the rotation schedule and the week number
        if (Moment().utc().day() === 0 || Moment().utc().day() === 1 || (Moment().utc().day() === 2 && Moment().utc().hours() <= 14)) {
            this.setState({ rotationSchedule: this.state.rotationSchedule - 1, weekNum: this.state.weekNum - 1 });
        };

    };

    corruptions = (corruption) => {
        return <a 
            key={corruption.itemId} 
            className={"button-text"} 
            style={{width: '200px'}} 
            data-wowhead={`item=${corruption.itemId}`} 
            href={`https://www.wowhead.com/item=${corruption.itemId}`} 
            target="_blank" 
            rel="noopener noreferrer">
                {corruption.name} - {corruption.cost}
            </a>
    };

    weeklyRotation = (rotation, rotationIndex) => {

        let week = this.state.weekNum;
        let rotationSchedule = this.state.rotationSchedule;

        //Based on the current week and the 4 week rotation, we need to set the week numbers for each rotation shown
        //First Week of Rotation Schedule
        if (rotationSchedule === 0) {
            //Second Week
            if (rotationIndex === 1) {week = week + 1};
            //Third Week
            if (rotationIndex === 2) {week = week + 2};
            //Fourth Week
            if (rotationIndex === 3) {week = week + 3};
        };

        //Second Week of Rotation Schedule
        if (rotationSchedule === 1) {
            //First Week
            if (rotationIndex === 0) {week = week - 1};
            //Third Week
            if (rotationIndex === 2) {week = week + 1};
            //Fourth Week
            if (rotationIndex === 3) {week = week + 2};
        };

        //Third Week of Rotation Schedule
        if (rotationSchedule === 2) {
            //First Week
            if (rotationIndex === 0) {week = week - 2};
            //Second Week
            if (rotationIndex === 1) {week = week - 1};
            //Fourth Week
            if (rotationIndex === 3) {week = week + 1};
        };

        //Fourth Week of Rotation Schedule
        if (rotationSchedule === 3) {
            //First Week
            if (rotationIndex === 0) {week = week - 3};
            //Second Week
            if (rotationIndex === 1) {week = week - 2};
            //Third Week
            if (rotationIndex === 2) {week = week - 1};
        };

        return <div key={`corruptionIndex${rotationIndex}`}>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', border: 'none', backgroundImage: 'none'}} className={rotationIndex === this.state.rotationSchedule && this.state.weeksFirstHalf ? 'collected' : 'not-collected'}>
                <div style={{width: '200px'}}>{Moment().week(week).day(2).format("dddd, MMMM Do")}</div>
                {rotation.tuesdayCorruptions.map(corruption => {return this.corruptions(corruption)})}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', border: 'none', backgroundImage: 'none'}} className={rotationIndex === this.state.rotationSchedule && !this.state.weeksFirstHalf ? 'collected' : 'not-collected'}>
                <div style={{width: '200px'}}>{Moment().week(week).day(5).format("dddd, MMMM Do")}</div>
                {rotation.fridayCorruptions.map(corruption => {return this.corruptions(corruption)})}
            </div>
        </div>
    };

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

export default ComingSoon;