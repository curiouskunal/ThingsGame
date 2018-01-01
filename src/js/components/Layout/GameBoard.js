import React from "react";
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';

// import Title from "./Machine/Title";
import JButton from "./GameBoard/JButton";
import ScreenWelcome from "./GameBoard/Screens/Screen_Welcome";
import ScreenLocal from "./GameBoard/Screens/Screen_Local";
import ScreenOnline from "./GameBoard/Screens/Screen_Online";


const queryString = require('query-string');
//var $ = require('jquery');

export default class GameBoard extends React.Component {


  render() {
    return (
      <div id="content-wrapper">
           <Switch>
                <Route path="/" exact render={props => <ScreenWelcome {...props} />}/>
                <Route path="/local" exact render={props => <ScreenLocal {...props} />}/>
                <Route path="/online" exact render={props => <ScreenOnline {...props} />}/>
            </Switch>

      </div>
    );
  }
}
