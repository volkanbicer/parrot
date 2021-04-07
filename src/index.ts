import express from 'express';
import AzureDevopsClient from './AzureDevopsClient'
import SlackClient from './SlackClient'
import Schedule from 'node-schedule'
import AppConfig from './AppConfig';

const ad = new AzureDevopsClient()
const slack = new SlackClient() 

const job = Schedule.scheduleJob(AppConfig.schedule, () => {
  ad.getActivePullRequests().then(slack.post)
})

const app = express();

app.get('/', (req, res) => {
  res.send('Up and running! 💪')
})

app.get('/post', (req, res) => {
  ad.getActivePullRequests().then(slack.post)
  res.send('Done!')
})


app.listen(AppConfig.port, () => {
  console.log(`server running on port ${AppConfig.port}`);
});