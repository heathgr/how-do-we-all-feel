import React, { Component, PropTypes} from 'react';
import Graph from './Graph';
import Menu from './Menu';
import Notifications from './Notifications';

import * as authActions from '../actions/AuthActions';
import * as statusActions from '../actions/StatusActions';

class App extends Component {
  constructor (props) {
    super(props);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.onCreateProfile = this.onCreateProfile.bind(this);
  }

  componentDidMount () {
    this.props.dispatch(authActions.listenToAuth());
    this.props.dispatch(statusActions.listenToTotals());
  }

  onSignIn () {
    this.props.dispatch(authActions.signIn());
  }

  onSignOut () {
    this.props.dispatch(authActions.signOut());
  }

  onCreateProfile (ageRange, gender) {
    this.props.dispatch(authActions.createProfile(ageRange, gender));
  }

  render () {
    return <div>
      <Notifications/>
      <Graph/>
      <Menu
        user={this.props.user}
        onSignIn={this.onSignIn}
        onSignOut={this.onSignOut}
        onCreateProfile={this.onCreateProfile}
      />
    </div>;
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default App;
