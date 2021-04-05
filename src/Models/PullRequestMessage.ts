export interface PullRequestMessage {
    repositoryName: string;
    title: string;
    url: string;
    waitingSince: string;
    reviewers: string[];
}