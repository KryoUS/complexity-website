import React from 'react';
//import axios from 'axios';
import { Typography, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { ReactComponent as DiscordIcon } from '../../icons/Discord-Logo-White.svg';

class ClassInfoList extends React.Component{
    constructor(){
        super();

        this.state = {
            classObj: {}
        }
    }

    componentDidMount = () => {
        this.setState({classObj: this.props.classObj});
    }

    handleClick = (specIndex, openState) => {

        let mutableState = this.state.classObj;
        if (typeof openState === 'boolean') {
            mutableState.specs[specIndex].open = openState;
        } else {
            mutableState.specs[specIndex].open = !this.state.classObj.specs[specIndex].open;
        }

        this.setState(({
            classObj: mutableState
        }));
    };

    render(){
        return(
            <List
            style={{ width: "100%" }}
            disablePadding={true}
            subheader={
                <ListSubheader disableSticky>
                    <Typography
                    id={this.state.classObj.specs ? this.state.classObj.className.toLowerCase().split(" ").join("") : ""} 
                    variant="h6">
                        {this.state.classObj.className}
                    </Typography>
                </ListSubheader>
            }
            >
                {this.state.classObj.specs ? <ListItem button component="a" href={this.state.classObj.discord} target="_blank" rel="noopener noreferrer" dense>
                    <ListItemIcon style={{minWidth: "36px"}}>
                        <DiscordIcon style={{width: "22px", height: "22px"}} />
                    </ListItemIcon>
                    <ListItemText primary={`Class Discord`} />
                </ListItem>
                : null }
                {this.state.classObj.specs ? this.state.classObj.specs.map((obj, index) => {
                    return <div 
                    key={obj.name + " Class Info Spec"} 
                    onMouseEnter={() => this.handleClick(index, true)} 
                    onMouseLeave={() => this.handleClick(index, false)} 
                    style={{width: "100%"}}
                    >
                        <ListItem button dense>
                            <ListItemIcon style={{minWidth: "36px"}}>
                                <img 
                                style={{width: "24px", height: "24px", border: "1px solid black"}}
                                src={obj.specIcon} 
                                alt={obj.name + ' specialization Icon.'}
                                onError={e => {
                                    e.target.src = 'https://render.worldofwarcraft.com/us/icons/56/inv_misc_questionmark.jpg';
                                }}
                                />
                            </ListItemIcon>
                            <ListItemText primary={obj.name} />
                            {this.state.classObj.specs[index].open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.classObj.specs[index].open} timeout="auto">
                            {obj.specInfo.map(infoObj => {
                                return <List key={infoObj.sourceName + ' Spec Source Info'} component="div" disablePadding dense style={{marginLeft: "24px"}}>
                                    <ListItem button component="a" href={infoObj.sourceURL} target="_blank" rel="noopener noreferrer">
                                        {/* <ListItemIcon style={{minWidth: "36px"}}>
                                        <StarBorder />
                                        </ListItemIcon> */}
                                        <ListItemText primary={infoObj.sourceName} />
                                    </ListItem>
                                </List>
                            })}
                        </Collapse>
                    </div>
                }) : null }
            </List>
        );
    }
}

export default ClassInfoList;