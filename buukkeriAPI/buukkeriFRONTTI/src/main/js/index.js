import React from 'react';
import ReactDOM from 'react-dom';
// Import routing components
import {Router, Route, hashHistory} from 'react-router';

import App from "./Application";
import Main from "./app";
import LogReg from "./Signin";
import header from './Header';
render(
     <Router history={hashHistory}>

            <Route path="/" component={App}>
             <Route path="/app" component={signin}/>
            </Route>
        </Router>,
        document.getElementById('react')
    );
