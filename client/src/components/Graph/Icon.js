import React, { Component, PropTypes } from 'react';

class Icon extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    let iconStyle = {
      fill: this.props.icon.style.color,
    };
    let backgroundStyle = this.props.icon.style.background ?
      {
        fill: this.props.icon.style.background,
      } :
      null;
    let background = backgroundStyle ?
      <circle cx={0} cy={0} r={40} style={backgroundStyle}/> :
      null;

    return <g transform={this.props.icon.transform}>
      {
        background
      }
      <path
        style={iconStyle}
        d={this.props.icon.data}
      />
    </g>;
  }
}

Icon.propTypes = {
  icon: PropTypes.object.isRequired,
};

export default Icon;
