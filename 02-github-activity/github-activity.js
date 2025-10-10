#!/usr/bin/env node
import { error } from "console";
import https from "https";
import { use } from "react";

const username = process.argv[2];

if(!username) {
    console.log("Please provide a GitHub username.");
    process.exit(1);
}

const url = `https://api.github.com/users/${username}/events`;

// GitHub API needs a user-agent header
const options = {
    headers: {
        'User-Agent': 'node.js'
    }
};

https.get(url, options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
        data += chunk;
    });

    res.on("end", () => {
        if(res.statusCode === 404) {
            console.log(`User "${username}" not found.`);
            return;
        }

        try {
            const events = JSON.parse(data);

            if(events.length === 0) {
                console.log(`No recent activity found for user "${username}".`);
                return;
            }

            console.log(`\n Recent activity for GitHub user: ${username}\n`);

            events.slice(0, 10).forEach(event => {
                const repo = event.repo.name? event.repo.name : "Unknown repository";

                switch(event.type){
                    case "PushEvent":
                        console.log(`Pushed ${event.payload.commits.length} commit(s) to ${repo}`);
                        break;
                    case "CreateEvent":
                        if (event.payload.ref_type === "repository") {
                            console.log(`Created new repository ${repo}`);
                        } else if (event.payload.ref_type === "branch") {
                            console.log(`Created new branch ${event.payload.ref} in ${repo}`);
                        }
                        break;
                    case "WatchEvent":
                        console.log(`Starred ${repo}`);
                        break;
                    case "ForkEvent":
                        console.log(`Forked ${repo}`);
                        break;
                    case "IssuesEvent":
                        console.log(`${event.payload.action} an issue in ${repo}`);
                        break;
                    case "PullRequestEvent":
                        console.log(`${event.payload.action} a pull request in ${repo}`);
                        break;
                    default:
                        console.log(`${event.type} in ${repo}`);
                        break;
                }
            });

            console.log("\n Done!\n");
            
            
            
        } catch (error) {
            console.log("Error parsing response:", error.message);
            
        }
    })
}).on("error", (error) => {
    console.log("failed to fetch data: ", error.message);
})