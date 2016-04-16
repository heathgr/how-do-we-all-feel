import React, { Component, PropTypes} from 'react';
import Graph from './Graph';
import Menu from './Menu';
import Notifications from './Notifications';

class App extends Component {
  constructor (props) {
    super(props);
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
