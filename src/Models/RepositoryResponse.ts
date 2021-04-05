export interface RepositoryResponse {
    value: Repository[];
    count: number;
}

export interface Repository {
    id:            string;
    name:          string;
    url:           string;
    project:       Project;
    defaultBranch: string;
    size:          number;
    remoteUrl:     string;
    sshUrl:        string;
    webUrl:        string;
    isDisabled:    boolean;
}

export interface Project {
    id:             string;
    name:           string;
    description:    string;
    url:            string;
    state:          string;
    revision:       number;
    visibility:     string;
    lastUpdateTime: Date;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toRepositories(json: string): RepositoryResponse {
        return JSON.parse(json);
    }

    public static repositoriesToJson(value: RepositoryResponse): string {
        return JSON.stringify(value);
    }
}