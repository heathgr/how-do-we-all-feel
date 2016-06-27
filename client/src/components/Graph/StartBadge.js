import React, { Component, PropTypes } from 'react';

class StartBadge extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    var textStyle = {
      textAnchor: 'middle',
      dominantBaseline: 'middle',
      fill: 'white',
    };

    return <g transform={this.props.data.transform}>
      <circle cx={0} cy={0} r={this.props.data.radius} />
      {
        this.props.data.textLines.map(
          (line, id) => <text
            style={textStyle}
            x={0}
            y={this.props.data.textPlacements[id]}
            key={id}>
              {line}
            </text>
        )
      }
    </g>;
  }
}

StartBadge.propTypes = {
  data: PropTypes.object.isRequired,
};

export default StartBadge;
