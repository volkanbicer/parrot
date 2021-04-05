// To parse this data:
//
//   import { Convert, PullRequestResponse } from "./file";
//
//   const pullRequestResponse = Convert.toPullRequestResponse(json);

export interface PullRequestResponse {
    value: PullRequest[];
    count: number;
}

export interface PullRequest {
    repository:            Repository;
    pullRequestId:         number;
    codeReviewId:          number;
    status:                string;
    createdBy:             CreatedBy;
    creationDate:          Date;
    title:                 string;
    description:           string;
    sourceRefName:         string;
    targetRefName:         string;
    mergeStatus:           string;
    isDraft:               boolean;
    mergeId:               string;
    lastMergeSourceCommit: LastMergeCommit;
    lastMergeTargetCommit: LastMergeCommit;
    reviewers:             Reviewer[];
    url:                   string;
    supportsIterations:    boolean;
}

export interface CreatedBy {
    displayName: string;
    url:         string;
    _links:      Links;
    id:          string;
    uniqueName:  string;
    imageUrl:    string;
    descriptor:  string;
}

export interface Links {
    avatar: Avatar;
}

export interface Avatar {
    href: string;
}

export interface LastMergeCommit {
    commitId: string;
    url:      string;
}

export interface Repository {
    id:      string;
    name:    string;
    url:     string;
    project: Project;
}

export interface Project {
    id:             string;
    name:           string;
    state:          string;
    visibility:     string;
    lastUpdateTime: Date;
}

export interface Reviewer {
    reviewerUrl: string;
    vote:        number;
    hasDeclined: boolean;
    isFlagged:   boolean;
    displayName: string;
    url:         string;
    _links:      Links;
    id:          string;
    uniqueName:  string;
    imageUrl:    string;
    isRequired?: boolean;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toPullRequestResponse(json: string): PullRequestResponse {
        return JSON.parse(json);
    }

    public static pullRequestResponseToJson(value: PullRequestResponse): string {
        return JSON.stringify(value);
    }
}
