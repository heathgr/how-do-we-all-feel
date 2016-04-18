import React, { Component, PropTypes} from 'react';
import Graph from './Graph';
import Menu from './Menu';
import Notifications from './Notifications';

import * as authActions from '../actions/AuthActions';
import * as statusActions from '../actions/StatusActions';

class App extends Component {
  constructor (props) {
    super(props);
  }

  componentDidMount () {
    this.props.dispatch(authActions.listenToAuth());
    this.props.dispatch(statusActions.listenToTotals());
  }

  render () {
    return <div>
      <Notifications/>
      <Graph/>
      <Menu/>
    </div>;
  }
}

App.propTypes = {

};

export default App;
