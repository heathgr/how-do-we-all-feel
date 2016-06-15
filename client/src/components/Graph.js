import React, { Component, PropTypes } from 'react';
import IconGroup from './Graph/IconGroup';
import TextArc from './Graph/TextArc';
import OverallCount from './Graph/OverallCount';
import percentageTextFormatter from '../helpers/graph/percentageTextFormatter';

class Graph extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return <svg width='1000' height='1000'>
      <IconGroup
        svgData={this.props.graphData.statusIcons}
        svgTransforms={this.props.graphData.statusIconTransforms}
      />
      <IconGroup
        svgData={this.props.graphData.ageRangeIcons}
        svgTransforms={this.props.graphData.ageRangeIconTransforms}
      />
      <IconGroup
        svgData={this.props.graphData.genderIcons}
        svgTransforms={this.props.graphData.genderIconTransforms}
      />
      <TextArc
        pathData={this.props.graphData.statusTextPaths.title}
        text='How Do We All Feel?'
        textId='StatusesTitle'
      />
      <TextArc
        pathData={this.props.graphData.ageRangeTextPaths.title}
        text='How old is everyone?'
        textId='AgeRangeTitle'
      />
      <TextArc
        pathData={this.props.graphData.genderTextPaths.title}
        text='What about gender?'
        textId='GenderTitle'
      />
      {
        this.props.graphData.statuses.map(
          (status, id) => <TextArc
            key={id}
            pathData={this.props.graphData.statusTextPaths.components[id]}
            text={status}
            textId={'statusComponentLabel-' + id}
          />
        )
      }
      {
        this.props.graphData.ageRanges.map(
          (ageRange, id) => <TextArc
            key={id}
            pathData={this.props.graphData.ageRangeTextPaths.components[id]}
            text={ageRange}
            textId={'ageRangeComponentLabel-' + id}
          />
        )
      }
      {
        this.props.graphData.genders.map(
          (gender, id) => <TextArc
            key={id}
            pathData={this.props.graphData.genderTextPaths.components[id]}
            text={gender}
            textId={'genderComponentLabel-' + id}
          />
        )
      }
      {
        this.props.graphData.statuses.map(
          (status, id) => <TextArc
            key={id}
            pathData={this.props.graphData.statusTextPaths.percentages[id]}
            text={percentageTextFormatter(this.props.graphData.percentages.statuses.overall[id])}
            textId={'statusPercentageLabel-' + id}
          />
        )
      }
      {
        this.props.graphData.ageRanges.map(
          (status, id) => <TextArc
            key={id}
            pathData={this.props.graphData.ageRangeTextPaths.percentages[id]}
            text={percentageTextFormatter(this.props.graphData.percentages.ageRanges.overall[id])}
            textId={'ageRangePercentageLabel-' + id}
          />
        )
      }
      {
        this.props.graphData.genders.map(
          (status, id) => <TextArc
            key={id}
            pathData={this.props.graphData.genderTextPaths.percentages[id]}
            text={percentageTextFormatter(this.props.graphData.percentages.genders.overall[id])}
            textId={'genderPercentageLabel-' + id}
          />
        )
      }
      <OverallCount
        overallCount={this.props.totals.overallCount}
        transform={this.props.graphData.overallTransform}
      />

      {this.props.graphData.sankeyPaths.statuses.map(
        (sankeyPath) => <path
          style={{ fill: 'none', stroke: 'black', strokeWidth: '1px' }}
          d={sankeyPath}
        />
      )}
      {
        this.props.graphData.sankeyTips.statuses.map(
          (sankeyTip) => <path
            style={{ fill: 'none', stroke: 'red', strokeWidth: '3px' }}
            d={sankeyTip}
          />
        )
      }
    </svg>;
  }
}

Graph.propTypes = {
  totals: PropTypes.object.isRequired,
  graphData: PropTypes.object.isRequired,
};

export default Graph;
