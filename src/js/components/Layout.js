import React from "react";
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom';

import Footer from "./Footer";
import Header from "./Header";
import GameBoard from "./Layout/GameBoard";

export default class Layout extends React.Component {

    componentWillMount(){
        window.root="/";
    }

      render() {
    return (
      <div>
       <BrowserRouter>
       <div>
            <Header />

            <Switch>
                <Route render={props => <GameBoard {...props}/> }/>
            </Switch>

            {/* <Footer /> */}
        </div>
        </BrowserRouter>
      </div>
    );
  }
}
