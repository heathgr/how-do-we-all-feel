import React, { Component, PropTypes} from 'react';
import statuses from '../../../config/statuses';

class Graph extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <div>
      <h2>The Count</h2>
      {
        statuses.map(
          (status, id) => <div key={id}>{status + ': ' + this.props.totals.statusTotals.overall[id]}</div>
        )
      }
    </div>;
  }
}

Graph.propTypes = {
  totals: PropTypes.object.isRequired,
};

export default Graph;
