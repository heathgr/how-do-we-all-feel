'use strict';

const statuses = require('../../../../config/statuses');

const modifyUserStatusQuestions = [
  {
    type: 'input',
    name: 'uid',
    message: 'Enter the uid for the user who\'s status you want to set:',
  },
  {
    type: 'list',
    name: 'status',
    message: 'What do you want the user\'s status to be:',
    choices: statuses,
    filter: (input) => statuses.indexOf(input),
  },
];

module.exports = modifyUserStatusQuestions;
