'use strict';

const creatUser = require('../actions/createUser');
const ageRanges = require('../../../../config/ageRanges');
const genders = require('../../../../config/genders');

const createUserQuestions = [
  {
    type: 'input',
    name: 'uid',
    message: 'What is the user\'s uid:',
  },
  {
    type: 'input',
    name: 'displayName',
    message: 'What is the user\'s display name:',
    validate: (input) => new Promise(
      (resolve, reject) => resolve(true)
    ),
  },
  {
    type: 'list',
    name: 'ageRange',
    message: 'What is the user\'s age range:',
    choices: ageRanges,
    filter: (input) => ageRanges.indexOf(input),
  },
  {
    type: 'list',
    name: 'gender',
    message: 'What is the user\'s gender:',
    choices: genders,
    filter: (input) => genders.indexOf(input),
  },
];

module.exports = createUserQuestions;
