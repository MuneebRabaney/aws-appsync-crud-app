import React, { Component } from 'react';
import CreatePrinter from './createPrinter';
import List from "./list";

class Home extends Component {
  render() {
    return (
      <div className="App">
        <div style={{ textAlign: "center" }}>
          hello world :)    
        </div>
        <CreatePrinter />
        <List />
      </div>
    );
  }
}

export default Home;
