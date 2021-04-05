# Parrot 

Parrot is slack the pull request reminder for git repositories which are hosted on Azure Devops




### Getting started

Before you run please update `config.json` file 

```json
{
    "project": "PROJECT_NAME", 
    "organizaiton": "ORGANIZATION",
    "pat": "PERSONAL_ACCESS_TOKEN",
    "slackUrl": "SLACK_INCOMING_WEBHOOK",       
    "schedule": "0 10 9,13,16 ? * MON,TUE,WED,THU,FRI *"
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

### Run on docker container
```
make up
```

### Requirements
* [Nodejs](https://nodejs.org/en/)