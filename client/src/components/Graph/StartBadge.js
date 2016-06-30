import React, { Component, PropTypes } from 'react';

class StartBadge extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    var textStyle = {
      textAnchor: 'middle',
      dominantBaseline: 'central',
    };

    return <g transform={this.props.data.transform}>
      <circle
        cx={0}
        cy={0}
        r={this.props.data.radius}
        style={{
          fill: this.props.data.backgroundColor,
        }}
      />
      {
        this.props.data.textLines.map(
          (line, id) => <text
            style={Object.assign(
              {},
              textStyle,
              {
                fontFamily: this.props.data.fontFamilies[id],
                fontSize: this.props.data.fontSizes[id],
                fill: this.props.data.fontColors[id],
              }
            )}
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
