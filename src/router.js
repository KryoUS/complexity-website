
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import News from './components/News/News';
import About from './components/Complexity/About';


export default (
    <Switch>
        <Route component={News}  exact path='/'/>
        <Route component={About} path='/about'/>
    </Switch>
)