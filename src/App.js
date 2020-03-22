import React from 'react';
import {Component} from 'react';
import * as Firebase from 'firebase'
import './App.scss';

class App extends Component {

  constructor(){
    super();
    this.state = {
      value: "Hello World"
    };
  }

  componentDidMount(){
    const rootRef = Firebase.database().ref().child('test');
    rootRef.on('value', snap => {
      this.setState({value: snap.val()})
    })
  }

  render(){
    return (
      <div className="App">
        {this.state.value}
      </div>
    );
  }
}
export default App;
