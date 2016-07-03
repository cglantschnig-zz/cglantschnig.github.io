import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Test from './Test';

export class Main extends React.Component {
  render() {
    return <h1>Hello <Test /></h1>;
  }
}

ReactDOM.render(<Main />, document.getElementById('container'));
