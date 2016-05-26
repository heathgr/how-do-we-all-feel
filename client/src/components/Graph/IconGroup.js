import React, { Component, PropTypes } from 'react';

class IconGroup extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <g>
    {
      this.props.svgData.map(
        (data, id) => <path
          key={id}
          transform={this.props.svgTransforms[id]}
          d={data}
        />
      )
    }
    </g>;
  }
}

IconGroup.propTypes = {
  svgData: PropTypes.array.isRequired,
  svgTransforms: PropTypes.array.isRequired,
};

export default IconGroup;
