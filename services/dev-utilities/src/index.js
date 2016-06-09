'use strict';

const figlet = require('figlet');
const initialQuestion = require('./questions/initialQuestion');
const createUserQuestions = require('./questions/createUserQuestions');
const modifyUserStatusQuestions = require('./questions/modifyUserStatusQuestions');
const createUser = require('./actions/createUser');
const modifyStatus = require('./actions/modifyStatus');
const inquirer = require('inquirer');

const start = () => {
  console.log('');
  inquirer.prompt(initialQuestion).then(
    (res) => {
      switch (res.initialQuestion) {
        case 0:
          inquirer.prompt(createUserQuestions).then(
            (res) => {
              createUser(res).then(
                () => {
                  console.log('[ USER CREATED SUCCESSFULLY ]');
                  start();
                }
              );
            }
          );
          return;
        case 1:
          inquirer.prompt(modifyUserStatusQuestions).then(
            (res) => {
              modifyStatus(res).then(
                () => {
                  console.log('[ STATUS MODIFIED SUCCESSFULLY ]');
                  start();
                }
              );
            }
          );
          return;
        default:
          process.exit();
          return;
      }
    }
  );
};

console.log(figlet.textSync('[   HDWAF - DEV TOOLS   ]', {
  font: 'rectangles',
  horizontalLayout: 'default',
  verticalLayout: 'default',
}));

start();
