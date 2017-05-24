# timonlukas.me-git
A small application which can be used to execute various tasks triggered by Github hooks

## Installation
```bash
> git clone https://github.com/TimonLukas/timonlukas.me-git.git
> yarn
```

## Setup
You have to define actions for each repository you want to do something for:

```javascript
/* repositories.json */
{
  "REPOSITORY_OWNER/REPOSITORY_NAME": {
    "directory": "CWD", // The directory in which the commands are executed
    "commands": [ // Commands are executed one after the other
      "COMMAND1", // As many commands as you want
      "COMMAND2",
      "COMMAND3"
    ]
  }
}
```

For example, for my main website module the configuration file looks like this:

```javascript
{
  "TimonLukas/timonlukas.me-main": {
    "directory": "/var/www/projects/timonlukas.me-main",
    "commands": [
      "git pull",
      "yarn",
      "yarn run production"
    ]
  }
}
```

## Drawbacks
Don't use this for anything important.

Like, really. **Don't**. This is just a simple script because I'm too lazy to SSH into my server every single time I push something.

Don't be lazy.