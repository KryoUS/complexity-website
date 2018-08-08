
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import News from './components/News/News';
import About from './components/Complexity/About';
import Raiders from './components/Complexity/Raiders';
import Members from './components/Complexity/Members';


export default (
    <Switch>
        <Route component={News}  exact path='/'/>
        <Route component={About} path='/about'/>
        <Route component={Raiders} path='/raiders'/>
        <Route component={Members} path='/members'/>
    </Switch>
)