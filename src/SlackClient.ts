import { PullRequestMessage } from "./Models/PullRequestMessage"
import axios from "axios";
import AppConfig from "./AppConfig";

export default class SlackClient {

    private static createMessage(pullRequests: PullRequestMessage[]): string {
        let message = ""       
        
        pullRequests.forEach(pr => {
          let text = "*["+ pr.repositoryName + "]* 👉 <"+pr.url+" |"+pr.title+">\n" + pr.waitingSince + " - Waiting on " + pr.reviewers.join(', ')
          if (message == "") {
              message = text
          } else {
              message += "\n\n" + text
          }
        });
        
        return message
    }
    

    async post(pullRequests: PullRequestMessage[])  {
        if (pullRequests.length == 0) return
        const message = SlackClient.createMessage(pullRequests)    
        console.log('Date:', new Date(), message)    
        axios.post(AppConfig.slackUrl, {            
        blocks: [
            {
            type: 'section',
            text: { type: 'mrkdwn', text: message },                
            }              
        ]
        });     
    }
}