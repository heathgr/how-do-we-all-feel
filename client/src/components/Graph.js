import React, { Component, PropTypes } from 'react';
import TextArc from './Graph/TextArc';

class Graph extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <div>
      <svg width='1000' height='1000'>
        {
          this.props.graphData.titles.map(
            (title, id) => <TextArc
              pathData={title.pathData}
              text={title.text}
              textId={title.textId}
              key={id}
            />
          )
        }
        {
          this.props.graphData.elementLabels.map(
            (element, id) => <TextArc
              pathData={element.pathData}
              text={element.text}
              textId={element.textId}
              key={id}
            />
          )
        }
        {
          this.props.graphData.percentageLabels.map(
            (percentage, id) => <TextArc
              pathData={percentage.pathData}
              text={percentage.text}
              textId={percentage.textId}
              key={id}
            />
          )
        }
        {
          this.props.graphData.icons.map(
            (icon, id) => <path
              d={icon.data}
              transform={icon.transform}
              key={id}
            />
          )
        }
        {
          this.props.graphData.sankey.pathsData.map(
            (path, id) => <path
              d={path}
              style={this.props.graphData.sankey.pathStyles[id]}
              key={id}
            />
          )
        }
        {
          this.props.graphData.sankey.tipsData.map(
            (path, id) => <path
              d={path}
              style={{
                fill: 'red',
                opacity: 0.5,
              }}
              key={id}
            />
          )
        }
      </svg>
    </div>;
  }
}

Graph.propTypes = {
  graphData: PropTypes.object.isRequired,
};

export default Graph;
