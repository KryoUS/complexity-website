import React from 'react';
import { Switch, Route } from 'react-router-dom';
import News from './components/News/News';
import About from './components/Complexity/About';
import Raiders from './components/Complexity/Raiders';
import Members from './components/Complexity/Members';
import Leaderboards from './components/Complexity/Leaderboards';
import Settings from './components/Settings/Settings';
import Logs from './components/Settings/Logs';
import SimulactionCraft from './components/Complexity/SimulationCraft';


export default (
    <Switch>
        <Route component={News}  exact path='/'/>
        <Route component={About} path='/about'/>
        <Route component={Raiders} path='/raiders'/>
        <Route component={Members} path='/members'/>
        <Route component={Leaderboards} path='/leaderboards'/>
        <Route component={Settings} path='/settings' />
        <Route component={Logs} path='/logs' />
        <Route component={SimulactionCraft} path='/simulationcraft'/>
    </Switch>
)