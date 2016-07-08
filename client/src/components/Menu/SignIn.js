import React, { Component, PropTypes} from 'react';

class SignIn extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <div>
      <h2>Want to participate?</h2>
      <button onClick={ this.props.onSignIn }>Sign In With Your Google Account</button>
    </div>;
  }
}

SignIn.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

export default SignIn;
