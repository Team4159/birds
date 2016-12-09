import React from "react";

import { Provider } from "react-redux";
import { Router, Route, IndexRoute, Redirect } from "react-router";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Main from "./main";
import Home from "./home";
import Login from "./login";
import Register from "./register";
import SelectTeam from "./selectTeam";
import LessonEditor from "./lessonEditor";
import NotFound from "./notfound";

const Root = ({ store, history }) => (
    <MuiThemeProvider>
        <Provider store={store}>
          <Router history={history}>
            <Route path="/" component={Main}>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/selectTeam" component={SelectTeam} />
                <Route path="/lessonEditor" component={LessonEditor} />
                <Route path='/404' component={NotFound} />
                <IndexRoute component={Home} />
                <Redirect from='*' to='/404' />
            </Route>
          </Router>
        </Provider>
    </MuiThemeProvider>
);

export default Root;
