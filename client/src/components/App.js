import React, { Component, PropTypes} from 'react';
import Graph from './Graph';
import Menu from './Menu';
import Notifications from './Notifications';

import * as authActions from '../actions/AuthActions';
import * as totalsActions from '../actions/TotalsActions';
import * as profileActions from '../actions/ProfileActions';

class App extends Component {
  constructor (props) {
    super(props);

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignOut = this.onSignOut.bind(this);
    this.onCreateProfile = this.onCreateProfile.bind(this);
    this.onUpdateStatus = this.onUpdateStatus.bind(this);
  }

  componentDidMount () {
    this.props.dispatch(authActions.listenToAuth());
    this.props.dispatch(totalsActions.listenToTotals());
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

  onUpdateStatus (status) {
    console.log('update status shit: ' + status);
    this.props.dispatch(profileActions.updateStatus(status));
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
        onUpdateStatus={this.onUpdateStatus}
      />
    </div>;
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default App;
