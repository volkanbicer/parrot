# Parrot 

Parrot is the slack pull request reminder for git repositories which are hosted on Azure Devops




### Getting started

Before you run please update `config.json` file

```json
{
    "project": "PROJECT_NAME", 
    "organizaiton": "ORGANIZATION",
    "pat": "PERSONAL_ACCESS_TOKEN",
    "slackUrl": "SLACK_INCOMING_WEBHOOK",       
    "schedule": "10 6,12 * * 1-5"
}
```

It uses [crone](https://en.wikipedia.org/wiki/Cron) format for scheduling, you could provide any format. 


### Install Dependencies
```
npm install
```


### Run 
```
npm run dev
```

### Dockerize

Run development container
```
make up
```

Run production container
```
make up-prod
```

### Requirements
* [Nodejs](https://nodejs.org/en/)