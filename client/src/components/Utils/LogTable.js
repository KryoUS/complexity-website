import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { infoModal } from '../../ducks/reducer';

class LogTable extends Component {
    constructor() {
        super();

        this.state = {
            widthPercentage: 1,
            loadedRows: 30
        }
    }

    componentDidMount = () => {
        this.setState({widthPercentage: this.widthPercentage() === Infinity ? 12.5 : this.widthPercentage()})

        this.refs.iScroll.addEventListener("scroll", () => {
            if (
                this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >=
                this.refs.iScroll.scrollHeight
            ) {
                this.setState({loadedRows: this.state.loadedRows + 20});
            };
        });
    }

    createHeaders = (dataObj) => {

        let headerArr = [];
        if (window.innerWidth <= 900) {
            for (let header in dataObj) {
                if (header === 'message' || header === 'error' || header === 'info') {
                    headerArr.push(header);
                }
            }
        } else {
            for (let header in dataObj) {
                headerArr.push(header);
            }
        }

        return headerArr;
    }

    createColumnData = (dataObj) => {
        let columnData = [];
        if (window.innerWidth <= 900) {
            for (let header in dataObj) {
                if (header === 'message' || header === 'error' || header === 'info') {
                    columnData.push(dataObj[header]);
                }
            }
        } else {
            for (let header in dataObj) {
                columnData.push(dataObj[header]);
            }
        }

        return columnData;
    }

    moveToTop = () => {
        document.getElementById("LogData0").scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }

    showObject = (title, message) => {
        this.props.infoModal(true, title, message, 'OK');
    }

    widthPercentage = () => {
        let columnCount = 0;
        for (let headerData in this.props.data[0]) {
            if (this.props.data[0].hasOwnProperty(headerData)) columnCount++;
        }
        return 100 / columnCount;
    }

    render () {
        return (
            <div className="flex-column flex-around" style={{height: '100%', width: '100%', alignItems: 'center', textAlign: 'center'}}>
                {this.state.loadedRows > 30 &&
                    <div className="flex-row flex-between basic-hover fade1s" style={{
                        backgroundColor: '#56596380', 
                        alignSelf: 'center', 
                        position: 'fixed', 
                        bottom: 40, 
                        padding: '5px',
                        borderRadius: '5px'
                    }} onClick={ () => this.moveToTop() }>Move To top</div>
                }
                <div className="flex-row flex-between" style={{width: '95%', backgroundColor: '#121315'}}>
                    {this.createHeaders(this.props.data[0]).map((header, headerIndex) => {
                        if (header === 'error') {header = 'info'}
                        return <div key={`${header}${headerIndex}`} className="flex-column flex-center" style={{width: `${this.state.widthPercentage}%`}}>{header}</div>
                    })}
                </div>
                <div className="flex-column flex-between" style={{height: '100%', width: '95%', overflowY: 'scroll', overflowX: 'hidden'}} ref="iScroll">
                    {this.props.data.map((obj, index) => {
                        let bgColor = '#202125';
                        if (index%2 === 0) {bgColor = '#1B1C1F'}
                        return index <= this.state.loadedRows && <div key={'LogData'+index} id={'LogData'+index} className="flex-row flex-between" style={{width: '100%', padding: '5px', backgroundColor: bgColor}}>
                            {this.createColumnData(obj).map((data, dataIndex) => {
                                
                                if (typeof data === 'object') {

                                    if (data === null || Object.entries(data).length === 0) {
                                        return <div key={'LogString'+dataIndex} className="flex-row flex-center" style={{width: `${this.state.widthPercentage}%`, margin: 'auto'}} />
                                    }
                                    for(let propName in data) {
                                        if(data.hasOwnProperty(propName)) {
                                            return <div key={'LogObject'+dataIndex} className="flex-row flex-center basic-hover" style={{width: `${this.state.widthPercentage}%`}} onClick={() => this.showObject(propName, data) }>
                                                    <div style={{margin: 'auto', color: 'rgb(146, 91, 234)'}}>{ typeof data[propName] === 'object' ? propName : data[propName] }</div>
                                                </div>
                                        }
                                    }

                                } else if (typeof data === 'string' && data.includes('https')) {
                                    return <div key={'LogAvatar'+dataIndex} className="flex-row flex-center" style={{width: `${this.state.widthPercentage}%`, margin: 'auto'}}>
                                        <img className="avatar" src={data} alt="" />
                                    </div>
                                } else if (typeof data === 'string' && data.includes(':')) {
                                    return <div key={'LogString'+dataIndex} className="flex-row flex-center" style={{width: `${this.state.widthPercentage}%`, margin: 'auto'}}>{moment(data).format("MMMM Do YYYY, h:mm:ss a")}</div>
                                } else {
                                    return <div key={'LogString'+dataIndex} className="flex-row flex-center" style={{width: `${this.state.widthPercentage}%`, margin: 'auto'}}>{data}</div>
                                }

                                return null;

                            })}
                        </div>
                    })                    
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ( state ) => {
    return {
        modalOpen: state.modalOpen,
        modalTitle: state.modalTitle,
        modalMessage: state.modalMessage,
        modalButton: state.modalButton
    }
}

export default connect( mapStateToProps, {infoModal} )( LogTable );