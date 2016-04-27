import React, { Component, PropTypes} from 'react';

class UpdateStatus extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <div>
      <h2>Update Your Status...</h2>
      <button>I am happy</button>
      <button>I am sad</button>
      <button>I am bored</button>
      <button>I am angry</button>
      <button>I am horny</button>
    </div>;
  }
}

UpdateStatus.propTypes = {

};

export default UpdateStatus;
