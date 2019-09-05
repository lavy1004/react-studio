
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Main, About, Login, App, MyPage, MyBoard, Join} from './index';


const Router = () => (
    <Switch>
        <Route exact path="/" component={Main} />
        <Route  path="/about" component={About} />
        <Route  path="/login" component={Login} />
        <Route  path="/app" component={App} />
        <Route  path="/mypage" component={MyPage} />
        <Route  path="/myboard" component={MyBoard} />
        <Route  path="/join" component={Join} />
    </Switch>
);

export default Router;