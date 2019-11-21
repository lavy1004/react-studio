
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Main, DaysOfMonth, Login, App, MyPage, DaysOfWeek, Join} from './index';


const Router = () => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route  path="/daysofmonth" component={DaysOfMonth} />
        <Route  path="/login" component={Login} />
        <Route  path="/app" component={App} />
        <Route  path="/mypage" component={MyPage} />
        <Route  path="/daysofweek" component={DaysOfWeek} />
        <Route  path="/join" component={Join} />
    </Switch>
);

export default Router;