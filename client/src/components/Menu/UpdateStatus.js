import React, { Component, PropTypes} from 'react';
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
            onClick={this.props.onUpdateStatus.bind(null, id)}
            id={status + 'StatusButton'}
          >
            {'I am feeling ' + status + '.'}
          </button>
        )
      }
    </div>;
  }
}

UpdateStatus.propTypes = {
  onUpdateStatus: PropTypes.func.isRequired,
};

export default UpdateStatus;
