import React, { Component, PropTypes } from 'react';

class TextPath extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    var textStyle = {
      textAnchor: 'middle',
      dominantBaseline: 'middle',
    }

    return <g>
      <defs>
        <path id={this.props.textId} d={this.props.pathData}/>
      </defs>
      <text style={textStyle}>
        <textPath xlinkHref={'#' + this.props.textId} startOffset='50%'>
          {this.props.text}
        </textPath>
      </text>
    </g>;
  }
}

TextPath.propTypes = {
  pathData: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  textId: PropTypes.string.isRequired,
};

export default TextPath;
