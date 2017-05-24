#!/usr/bin/node
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const childProcess = require('child_process');

const port = process.env.PORT_GIT || 8081;
const repositories = require('./repositories.json');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((request, response) => {
  response.end();
  const hookData = request.body;
  const repositoryName = _.get(hookData, 'repository.full_name', '');

  if (typeof repositories[repositoryName] !== 'undefined') {
    const repository = repositories[repositoryName];
    const cwd = repository.directory;

    if (repository.commands.length > 0) {
      const commands = repository.commands;

      const executeCommand = (commands, cwd) => {
        childProcess.exec(commands[0], {cwd}, (error) => {
          if (error !== null) {
            throw error;
          }

          if (commands.length > 1) {
            executeCommand(commands.slice(1), cwd);
          }
        });
      };

      executeCommand(commands, cwd);
    }
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
