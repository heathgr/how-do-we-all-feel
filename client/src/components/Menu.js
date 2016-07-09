import React, { Component, PropTypes } from 'react';
import SignIn from './Menu/SignIn';
import CreateProfile from './Menu/CreateProfile';
import UpdateStatus from './Menu/UpdateStatus';

class Menu extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const getMenuComponent = () => {
      if (this.props.user.authData === null) {
        return null;
      } else if (this.props.user.authData.uid === null) {
        return <SignIn onSignIn={this.props.onSignIn}/>;
      } else if (this.props.user.authData && this.props.user.profile === false) {
        return <CreateProfile
          user={ this.props.user }
          onCreateProfile={ this.props.onCreateProfile }
          onSignOut={ this.props.onSignOut }
        />;
      } else if (this.props.user.authData && this.props.user.statusData) {
        return <UpdateStatus
          user={ this.props.user }
          onUpdateStatus={ this.props.onUpdateStatus }
          onSignOut={ this.props.onSignOut }
        />;
      } else {
        null;
      }
    };

    return <div
      style={{
        background: '#393340',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        textAlign: 'center',
      }}
    >{getMenuComponent()}</div>;
  }
}

Menu.propTypes = {
  user: PropTypes.object,
  onSignIn: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
  onCreateProfile: PropTypes.func.isRequired,
  onUpdateStatus: PropTypes.func.isRequired,
};

const getMenuComponent = () => {
  if (this.props.user.authData === null) {
    return <SignIn onSignIn={this.props.onSignIn}/>;
  } else if (this.props.user.authData && this.props.user.profile === false) {
    return <CreateProfile
      user={ this.props.user }
      onCreateProfile={ this.props.onCreateProfile }
      onSignOut={ this.props.onSignOut }
    />;
  } else if (this.props.user.authData && this.props.user.profile) {
    return <UpdateStatus
      user={ this.props.user }
      onUpdateStatus={ this.props.onUpdateStatus }
      onSignOut={ this.props.onSignOut }
    />;
  } else {
    null;
  }
};

export default Menu;
