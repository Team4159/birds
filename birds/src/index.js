import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

// Setup Redux
import configureStore from "./store/configureStore";
import * as c from "./store/constants.js";
import * as a from "./store/actions.js";
const store = configureStore();

// Load some components
import Main from "./ui/main.js";
import Home from "./ui/home/index.js";
import Register from "./ui/register/index.js";

// Create and append a div
const appDiv = document.createElement('div');
document.body.appendChild(appDiv);

// Render the page
ReactDOM.render(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path="/" component={Main}>
          <Route path="/register" component={Register} />
          <IndexRoute component={Home} />
        </Route>
      </Router>
    </Provider>,
    appDiv
);
