import React, { Component, PropTypes } from 'react';
import statuses from '../../../../config/statuses';

class UpdateStatus extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <div>
      <h2>Update Your Status...</h2>
      {
        statuses.map(
          (status, id) => <button
            key={id}
            onClick={this.props.onUpdateStatus.bind(
              null,
              id,
              this.props.user.statusData ? this.props.user.statusData.status : null
            )}
            id={status + 'StatusButton'}
          >
            {'I am feeling ' + status + '.'}
          </button>
        )
      }
      <button onClick = {this.props.onSignOut}>Sign Out</button>
    </div>;
  }
}

UpdateStatus.propTypes = {
  onUpdateStatus: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default UpdateStatus;
