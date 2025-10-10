#!/usr/bin/env node
const username = process.argv[2];

if (!username) {
  console.log("Please provide a GitHub username.");
  console.log("Usage: node github-activity.js <username>");
  process.exit(1);
}

const url = `https://api.github.com/users/${username}/events`;

(async () => {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "node.js", // GitHub API requires a User-Agent header
      },
    });

    if (response.status === 404) {
      console.log(`User "${username}" not found.`);
      return;
    }

    if (!response.ok) {
      console.log(`Failed to fetch data: ${response.statusText}`);
      return;
    }

    const events = await response.json();

    if (events.length === 0) {
      console.log(`No recent activity found for user "${username}".`);
      return;
    }

    console.log(`\n Recent activity for GitHub user: ${username}\n`);

    events.slice(0, 10).forEach((event) => {
      const repo = event.repo?.name || "Unknown repository";

      switch (event.type) {
        case "PushEvent":
          console.log(`- Pushed ${event.payload.commits.length} commit(s) to ${repo}`);
          break;
        case "CreateEvent":
          if (event.payload.ref_type === "repository") {
            console.log(`- Created new repository ${repo}`);
          } else if (event.payload.ref_type === "branch") {
            console.log(`- Created new branch ${event.payload.ref} in ${repo}`);
          }
          break;
        case "WatchEvent":
          console.log(`- Starred ${repo}`);
          break;
        case "ForkEvent":
          console.log(`- Forked ${repo}`);
          break;
        case "IssuesEvent":
          console.log(`- ${event.payload.action} an issue in ${repo}`);
          break;
        case "PullRequestEvent":
          console.log(`- ${event.payload.action} a pull request in ${repo}`);
          break;
        default:
          console.log(`- ${event.type} in ${repo}`);
      }
    });

    console.log("\n Done!\n");
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
})();
