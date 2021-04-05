import * as config from "../config.json";
import { PullRequestMessage } from "./Models/PullRequestMessage"
import axios from "axios";

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
        const message = SlackClient.createMessage(pullRequests)    
        console.log(message)    
        axios.post(config.slackUrl, {            
        blocks: [
            {
            type: 'section',
            text: { type: 'mrkdwn', text: message },                
            }              
        ]
        });     
    }
}