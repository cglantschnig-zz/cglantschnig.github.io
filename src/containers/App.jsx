import React, {
  Component,
  PropTypes
} from "react";

import Appbar from "./Appbar";

export default class App extends Component {

  static propTypes = {
    children: PropTypes.object.isRequired
  };

  // our single and only store is supplied as a context to this root level component.
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render () {
    return (
      <div>
        <Appbar/>
        {this.props.children}
      </div>
    );
  }

}
