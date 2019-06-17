import React,  { Component } from 'react';

class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            secondsLeft: 0,
            minutesLeft: 0,
            hoursLeft: 0,
            daysLeft: 0,
            displaySeconds: 0,
            displayMinutes: 0,
            displayHours: 0

        }
    }

    padZero = (num) => {
        if (num.toString().length === 1) {
            num = "0" + num;
        }
        return num;
    }

    tick = () => {
        if (this.state.displaySec === 0 && this.state.displayMinutes === 0 && this.state.displayHours === 0 && this.state.daysLeft === 0) {
            clearInterval(this.timerID);
            return;
        }
        const currentDate = new Date();
        const seconds = this.state.secondsLeft;
        const minutes = this.state.minutesLeft;
        const hours = this.state.hoursLeft;
        switch (!this.state.date) {
            case true:
                this.setState({
                    date: currentDate
                });
            break;
            default:
                this.setState((prevState, props) => ({
                    date: currentDate,
                    secondsLeft: prevState.secondsLeft - Math.round((currentDate - prevState.date) / 1000),
                    displaySeconds: this.padZero(parseInt(seconds % 60, 10)),
                    minutesLeft: parseInt(Math.floor(seconds / 60), 10),
                    displayMinutes: this.padZero(parseInt(minutes % 60, 10)),
                    hoursLeft: parseInt(Math.floor(minutes / 60), 10),
                    displayHours: this.padZero(parseInt(hours % 24, 10)),
                    daysLeft: this.padZero(parseInt(Math.floor(hours / 24), 10))
                }));
        }
    }

    componentDidMount = () => {
        const currentDate = new Date().getTime();
        const ms = this.props.date - currentDate;
        const seconds = parseInt(Math.floor(ms / 1000), 10)-2;
        let displaySec = this.padZero(parseInt(seconds % 60, 10));
        const minutes = parseInt(Math.floor(seconds / 60), 10);
        let displayMin = this.padZero(parseInt(minutes % 60, 10));
        const hours = parseInt(Math.floor(minutes / 60), 10);
        let displayH = this.padZero(parseInt(hours % 24, 10));
        let days = this.padZero(parseInt(Math.floor(hours / 24), 10));
        this.setState({
            secondsLeft: seconds,
            minutesLeft: minutes,
            hoursLeft: hours,
            daysLeft: days,
            displaySeconds: displaySec,
            displayMinutes: displayMin,
            displayHours: displayH

        })
        this.timerID = setInterval(
            () => this.tick(), 1000
        );
    }

    componentWillUnmount = () => {
        clearInterval(this.timerID);
    }

    render() {
        return (
        <div key={this.props.id}>
            <div>{this.state.daysLeft}:Days {this.state.displayHours}:Hours {this.state.displayMinutes}:Mins {this.state.displaySeconds}:Secs</div>
        </div>
        );
    }
}

export default Timer