import React from "react";


//var $ = require('jquery');

export default class JButton extends React.Component {
    constructor(){
        super();
    }

    handleClick(){
        console.log("button with text: " + this.props.text + "  ---  " );
        console.log(this.props);

        if(this.props.click!=null){
            this.props.args==null ? this.props.click() : this.props.click.apply(this,this.props.args);
        }

        if(this.props.nav!=null)
            // if(this.props.navdelay==null)
                this.navigate();
            // else{
            //
            //     setTimeout(()=>{
            //
            //         this.navigate();
            //     },this.props.navdelay);
            // }
    }

  navigate(){
      if(this.props.requirements!=null && !this.props.requirements.apply(this, this.props.reqargs))
          return;

      if(this.props.nav.toString() == "../"){
           this.props.history.goBack();
          return;
      }
      if(this.props.nav.toString() == "/"){
           this.props.history.replace("/");
          return;
      }

      this.props.history.push(this.props.nav.toString());
  }

  render() {
    return (
       <div class={this.props.outerdiv ? null : this.props.outerdiv}>
        <button class={this.props.buttonclass==null? "" : this.props.buttonclass} onClick={(e) => {this.handleClick();}}>
            <i class={this.props.icon==null? "invis" : ("fa "+ this.props.icon) } aria-hidden="true"></i>
            <span>{this.props.text == null? "default button": this.props.text}</span>
        </button>
        </div>
    );
  }
}
