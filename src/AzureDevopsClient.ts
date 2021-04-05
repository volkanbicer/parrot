import * as config from "../config.json";
import axios, { AxiosResponse }  from 'axios';
import { RepositoryResponse } from "./Models/RepositoryResponse";
import { PullRequest, PullRequestResponse } from "./Models/PullRequestResponse";
import { PullRequestMessage } from "./Models/PullRequestMessage";
import Wizard from "./Wizard";

axios.defaults.headers.common['Authorization'] = "Basic " + config.pat;


export default class AzureDevopsClient {

    private getRepositories(): Promise<AxiosResponse> {
        return axios.get(`https://dev.azure.com/${config.organizaiton}/${config.project}/_apis/git/repositories?api-version=4.1`)
    }

    private getPullRequests(response: AxiosResponse<RepositoryResponse>): Promise<AxiosResponse<PullRequestResponse>[]> {        
        let requests = response.data.value.map((repo => {
            return axios.get(`https://dev.azure.com/${config.organizaiton}/${config.project}/_apis/git/repositories/${repo.name}/pullrequests?api-version=6.0`)
        }))
        return axios.all(requests)
    }

    private createMessages(responses: AxiosResponse<PullRequestResponse>[]): PullRequestMessage[] {
        let prs = responses.reduce<PullRequest[]>((accumulator, current) => {
            return accumulator.concat(current.data.value)
        }, [])        
        return prs.map(pr => {                
            let message: PullRequestMessage = {
                repositoryName : pr.repository.name,
                title: pr.title,
                url: `https://${config.organizaiton}.visualstudio.com/${config.project}/_git/${pr.repository.name}/pullRequest/${pr.pullRequestId}`,
                waitingSince: Wizard.waitingSince(new Date(pr.creationDate)),
                reviewers: pr.reviewers.map(user => user.displayName.split(' ')[0])                
            }
            return message
        })  
    }

    async getActivePullRequests(): Promise<PullRequestMessage[]> {
        const responses = await this.getRepositories().then(this.getPullRequests)
        return Promise.resolve(this.createMessages(responses))
    }

}