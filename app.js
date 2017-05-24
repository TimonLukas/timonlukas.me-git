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
  const version = _.get(hookData, 'release.tag_name');

  if (typeof repositories[repositoryName] !== 'undefined') {
    console.log(`Deploying new version '${version}' of '${repositoryName}'`);
    const repository = repositories[repositoryName];
    const cwd = repository.directory;

    if (repository.commands.length > 0) {
      const commands = repository.commands;

      const executeCommand = (commands, cwd) => {
        console.log(`Executing '${commands[0]}'...`);
        childProcess.exec(commands[0], {cwd}, (error) => {
          if (error !== null) {
            throw error;
          }

          console.log(`'${commands[0]}' successfully finished!`);

          if (commands.length > 1) {
            executeCommand(commands.slice(1), cwd);
          } else {
            console.log(`Version '${version}' of '${repositoryName}' was successfully deployed!\n\n`);
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
