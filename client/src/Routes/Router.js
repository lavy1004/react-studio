
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Main, Login, App, MyPage, Join} from './index';


const Router = () => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route  path="/login" component={Login} />
        <Route  path="/app" component={App} />
        <Route  path="/join" component={Join} />
    </Switch>
);

export default Router;