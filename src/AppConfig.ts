import * as config from "../config.json";
import * as dotenv from 'dotenv';

dotenv.config()

export default class AppConfig {
    static project = process.env.PROJECT || config.project
    static organization = process.env.ORGANIZATION || config.organization
    static pat = process.env.PAT || config.pat
    static slackUrl = process.env.SLACK_URL || config.slackUrl
    static schedule = config.schedule
    static port = process.env.PORT || 4000
}
