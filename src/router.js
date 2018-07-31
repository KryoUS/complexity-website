
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import News from './components/News/News';


export default (
    <Switch>
        <Route component={News}  path='/'/>
    </Switch>
)