import express from 'express';
import AzureDevopsClient from './AzureDevopsClient'
import SlackClient from './SlackClient'
import Schedule from 'node-schedule'
import * as config from "../config.json";

const ad = new AzureDevopsClient()
const slack = new SlackClient() 


const job = Schedule.scheduleJob(config.schedule, () => {
  ad.getActivePullRequests().then(slack.post)
})

const app = express();
app.listen(4000, () => {
  console.log(`server running on port 4000`);
});