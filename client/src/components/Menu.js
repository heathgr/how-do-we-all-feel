import React, { Component, PropTypes} from 'react';
import SignIn from './Menu/SignIn';
import CreateProfile from './Menu/CreateProfile';
import UpdateStatus from './Menu/UpdateStatus';

class Menu extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    let menuComponent;

    if (!this.props.user) {
      menuComponent = null;
    } else if (!this.props.user.authData && !this.props.user.profile) {
      menuComponent = <SignIn onSignIn={this.props.onSignIn}/>;
    } else if (this.props.user.authData.uid && !this.props.user.profile) {
      menuComponent = <CreateProfile />;
    } else if (this.props.user.authData.uid && this.props.user.profile) {
      return <UpdateStatus />;
    }

    return <div>{menuComponent}</div>;
  }
}

Menu.propTypes = {
  user: PropTypes.object,
  onSignIn: PropTypes.func.isRequired,
};

export default Menu;
