import React from "react";
// import Title from "../Title";
import JButton from "../JButton";

//var $ = require('jquery');

export default class ScreenOnline extends React.Component {
   // componentWillMount(){
   //     this.props.history.push('/welcome?ijustgotpushed=true');
   // }
  render() {
    return (
      <div id="screen-local">
      <h2> ONLINE SCREEN </h2>
      <JButton text="Back" nav="../" {...this.props}/>
    </div>
    );
  }
}
