import React, { Component, PropTypes } from 'react';

class OverallCount extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const textStyle = {
      fill: 'white',
      textAnchor: 'middle',
      dominantBaseline: 'middle',
    };

    return <g transform={this.props.transform}>
      <circle cx={0} cy={0} r={125} />
      <text x={0} y={-30} style={textStyle}>
        There are
      </text>
      <text
        x={0}
        y={0}
        id='overallCountText'
        style={textStyle}
      >
        {this.props.overallCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </text>
      <text x={0} y={30} style={textStyle}>
        users who have let
      </text>
      <text x={0} y={60} style={textStyle}>
        us know how they
      </text>
      <text x={0} y={90} style={textStyle}>
        are feeling.
      </text>
    </g>;
  }
}

OverallCount.propTypes = {
  overallCount: PropTypes.number.isRequired,
  transform: PropTypes.string.isRequired,
};

export default OverallCount;
