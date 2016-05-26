
//Takes a number between zero and one then converts it to a percentage string. example: 0.03 => '3%''

const percentageTextFormatter = (percentage, decimalPlace = 1) => {
  const m100 = percentage * 100;

  return m100 % 1 ? m100.toFixed(decimalPlace) + '%' : m100 + '%';
};

export default percentageTextFormatter;
