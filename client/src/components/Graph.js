import React, { Component, PropTypes } from 'react';
import TextArc from './Graph/TextArc';
import StartBadge from './Graph/StartBadge';

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
