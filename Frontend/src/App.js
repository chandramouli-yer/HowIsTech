import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/login';
import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import './App.css';

const App = () => (
      <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/signup" exact component={Signup} />
                </Switch>
            </div>
        </Router>
);

export default App;
