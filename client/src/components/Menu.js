import React, { Component, PropTypes} from 'react';
import SignIn from './Menu/SignIn';
import CreateProfile from './Menu/CreateProfile';
import UpdateStatus from './Menu/UpdateStatus';

class Menu extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <div>
      {
        (() => {
          if (!this.props.authData) {
            return <SignIn />;
          } else if (this.props.authData.uid && !this.props.profile) {
            return <CreateProfile />;
          } else if (this.props.authData.uid && this.props.profile) {
            return <UpdateStatus />;
          }
        })()
      }
    </div>;
  }
}

Menu.propTypes = {
  authData: PropTypes.object,
  profile: PropTypes.object,
};

export default Menu;
