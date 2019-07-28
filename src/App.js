import './styles/reset.css';
import './styles/fonts.css';
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Switch, Route } from "react-router-dom";

import {
  Home,
  List,
  Single,
  EditPrinter,
  createPrinter
} from "./pages";

class App extends Component {
  render() {
    return (
      <Switch>
        <Fragment>
          <Route exact path="/" component={Home} />
          <Route path="/printer/:id" component={Single} />
          <Route path="/printers/" component={List} />
          <Route path="/create" component={createPrinter} />
          <Route path="/edit/:id" component={EditPrinter} />
        </Fragment>
      </Switch>
    );
  }
}

export default App;
