import { mkdir, writeFile } from "node:fs/promises";
import { config } from "./config.js";

const token = process.env.GITHUB_TOKEN;
if (!token) throw new Error("GITHUB_TOKEN is required");

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  Authorization: `Bearer ${token}`
};

async function github(path) {
  const response = await fetch(`https://api.github.com${path}`, { headers });
  if (!response.ok) throw new Error(`GitHub API ${response.status}: ${await response.text()}`);
  return response.json();
}

const user = await github(`/users/${config.username}`);
const repos = (await github(`/users/${config.username}/repos?per_page=100&sort=updated`))
  .filter((repo) => !repo.fork);

const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
const languages = [...new Set(repos.map((repo) => repo.language).filter(Boolean))];

await mkdir("generated", { recursive: true });

const terminalSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="300" viewBox="0 0 900 300">
<rect width="900" height="300" rx="16" fill="#0d1117"/>
<text x="32" y="55" fill="#58a6ff" font-family="monospace" font-size="22">tharun@github:~$ ./security-profile</text>
<text x="32" y="100" fill="#c9d1d9" font-family="monospace" font-size="20">&gt; blue_team       [ACTIVE]</text>
<text x="32" y="135" fill="#c9d1d9" font-family="monospace" font-size="20">&gt; purple_team     [ACTIVE]</text>
<text x="32" y="170" fill="#c9d1d9" font-family="monospace" font-size="20">&gt; threat_hunting  [ACTIVE]</text>
<text x="32" y="205" fill="#c9d1d9" font-family="monospace" font-size="20">&gt; detection_eng   [ACTIVE]</text>
<text x="32" y="240" fill="#3fb950" font-family="monospace" font-size="20">&gt; github_sync     [OK]</text>
</svg>`;

const statsSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="180" viewBox="0 0 900 180">
<rect width="900" height="180" rx="16" fill="#0d1117"/>
<text x="35" y="48" fill="#58a6ff" font-family="monospace" font-size="20">LIVE GITHUB TELEMETRY</text>
<text x="35" y="92" fill="#c9d1d9" font-family="monospace" font-size="18">repositories: ${repos.length}</text>
<text x="300" y="92" fill="#c9d1d9" font-family="monospace" font-size="18">followers: ${user.followers}</text>
<text x="560" y="92" fill="#c9d1d9" font-family="monospace" font-size="18">stars: ${totalStars}</text>
<text x="35" y="130" fill="#8b949e" font-family="monospace" font-size="16">languages: ${languages.join(" · ") || "not detected"}</text>
</svg>`;

await writeFile("generated/terminal.svg", terminalSvg);
await writeFile("generated/stats.svg", statsSvg);

const featured = config.featuredRepositories
  .map((name) => repos.find((repo) => repo.name === name))
  .filter(Boolean)
  .map((repo) => `- [${repo.name}](${repo.html_url}) — ${repo.description || "Security project"}`)
  .join("\n");

const readme = `# ${config.name}

> **${config.role}** · ${config.location}

![Security profile](./generated/terminal.svg)

## Security Focus

${config.focus.map((item) => `- ${item}`).join("\n")}

## Security Stack

${config.stack.join(" · ")}

## Live GitHub Profile

![GitHub telemetry](./generated/stats.svg)

- Public repositories: **${repos.length}**
- Followers: **${user.followers}**
- Total stars across owned non-fork repositories: **${totalStars}**
- Languages detected: **${languages.join(", ") || "None"}**

## Selected Security Work

${featured || "- No featured repositories found yet."}

## Certification

**Microsoft Certified: Security Operations Analyst Associate**  
Earned: **28 September 2026** · Expires: **29 September 2027**

---

<sub>Generated automatically from GitHub data by GitHub Actions.</sub>
`;

await writeFile("README.md", readme);
console.log(`Generated profile for ${config.username}: ${repos.length} repos, ${totalStars} stars.`);
