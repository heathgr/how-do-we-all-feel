const choices = [
  'Create a new user',
  'Modify a user\'s status',
  'Exit',
];
const initialQuestion = {
  type: 'list',
  name: 'initialQuestion',
  message: 'What do you want to do:',
  choices: choices,
  filter: (val) => choices.indexOf(val),
};

module.exports = initialQuestion;
