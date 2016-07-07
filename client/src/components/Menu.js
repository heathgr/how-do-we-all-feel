import React, { Component, PropTypes } from 'react';
import SignIn from './Menu/SignIn';
import CreateProfile from './Menu/CreateProfile';
import UpdateStatus from './Menu/UpdateStatus';

class Menu extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    let menuComponent;

    if (this.props.user.authData === null) {
      menuComponent = <SignIn onSignIn={this.props.onSignIn}/>;
    } else if (this.props.user.authData && this.props.user.profile === false) {
      menuComponent = <CreateProfile
        user={ this.props.user }
        onCreateProfile={ this.props.onCreateProfile }
        onSignOut={ this.props.onSignOut }
      />;
    } else if (this.props.user.authData && this.props.user.profile) {
      menuComponent = <UpdateStatus
        user={ this.props.user }
        onUpdateStatus={ this.props.onUpdateStatus }
        onSignOut={ this.props.onSignOut }
      />;
    } else {
      menuComponent = null;
    }

    return <div
      style={{
        position: 'absolute',
        bottom: 0,
        height: 100,
      }}
    >{menuComponent}</div>;
  }
}

Menu.propTypes = {
  user: PropTypes.object,
  onSignIn: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
  onCreateProfile: PropTypes.func.isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
};

export default Menu;
