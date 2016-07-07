import React, { Component, PropTypes } from 'react';
import TextArc from './Graph/TextArc';
import StartBadge from './Graph/StartBadge';
import Icon from './Graph/Icon';

class Graph extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 100,
        }}
      >
      <svg width='100%' height='100%' preserveAspectRatio='xMidYMid' viewBox='0 0 1000 1000'>
        <circle cx={500} cy={500} r={500} />
        {
          this.props.graphData.titles.map(
            (title, id) => <TextArc
              pathData={title.pathData}
              text={title.text}
              textId={title.textId}
              style={title.style}
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
              style={element.style}
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
              style={percentage.style}
              key={id}
            />
          )
        }
        {
          this.props.graphData.icons.map(
            (icon, id) => <Icon
              icon={icon}
              key={id}
            />
          )
        }
        {
          this.props.graphData.sankey.splitPathsData.map(
            (path, id) => <path
              d={path}
              style={this.props.graphData.sankey.splitPathStyles[id]}
              key={id}
            />
          )
        }
        {
          this.props.graphData.sankey.tipsData.map(
            (path, id) => <path
              d={path}
              style={this.props.graphData.sankey.tipStyles[id]}
              key={id}
            />
          )
        }
        {
          this.props.graphData.sankey.startPathsData.map(
            (path, id) => <path
              style={this.props.graphData.sankey.startPathStyles[id]}
              d={path}
              key={id}
            />
          )
        }
        <StartBadge data={this.props.graphData.startBadge}/>
      </svg>
    </div>;
  }
}

Graph.propTypes = {
  graphData: PropTypes.object.isRequired,
};

export default Graph;
