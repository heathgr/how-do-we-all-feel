import percentageTextFormatter from './percentageTextFormatter';

const updatePercentageLabels = (labels, percentages) => labels.map(
  (label, id) => Object.assign(
    {},
    label,
    { text: percentageTextFormatter(percentages[id]) }
  )
);

export default updatePercentageLabels;
