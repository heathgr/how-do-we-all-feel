import React, { Component, PropTypes } from 'react';
import Graph from './Graph';
import Menu from './Menu';
import Notifications from './Notifications';

import * as authActions from '../actions/AuthActions';
import * as totalsActions from '../actions/TotalsActions';
import * as profileActions from '../actions/ProfileActions';
import * as statusActions from '../actions/statusActions';

class App extends Component {
  constructor (props) {
    super(props);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.onCreateProfile = this.onCreateProfile.bind(this);
    this.onUpdateStatus = this.onUpdateStatus.bind(this);
  }

  componentDidMount () {
    this.props.dispatch(authActions.listenToAuthState());
    this.props.dispatch(profileActions.listenToProfile());
    this.props.dispatch(totalsActions.listenToTotals());
    this.props.dispatch(statusActions.listenToStatus());
  }

  onSignIn () {
    this.props.dispatch(authActions.signIn());
  }

  onSignOut () {
    this.props.dispatch(authActions.signOut());
  }

  onCreateProfile (ageRange, gender) {
    this.props.dispatch(profileActions.createProfile(ageRange, gender));
  }

  onUpdateStatus (status, previousStatus) {
    this.props.dispatch(statusActions.updateStatus(status, previousStatus));
  }

  render () {
    return <div>
      <Notifications/>
      <Graph
        graphData={this.props.graphData}
      />
      <Menu
        user={this.props.user}
        onSignIn={this.onSignIn}
        onSignOut={this.onSignOut}
        onCreateProfile={this.onCreateProfile}
        onUpdateStatus={this.onUpdateStatus}
      />
    </div>;
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default App;
