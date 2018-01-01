import React from "react";
// import Title from "../Title";
import JButton from "../JButton";

//var $ = require('jquery');

export default class ScreenWelcome extends React.Component {
   // componentWillMount(){
   //     this.props.history.push('/welcome?ijustgotpushed=true');
   // }
  render() {
    return (
    <div id="screen-welcome">
        <h2> GAME SCREEN </h2>
        <div class="buttonHolder">
            <JButton text="Local Game" buttonclass="button left" nav="/local" {...this.props}/>
            <JButton text="Online Game" buttonclass="button right" nav="/online" {...this.props}/>
        </div>
    </div>
    );
  }
}
