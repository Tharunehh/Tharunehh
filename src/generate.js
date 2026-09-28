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

const esc = (value = "") => String(value)
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;");

const user = await github(`/users/${config.username}`);
const repos = (await github(`/users/${config.username}/repos?per_page=100&sort=updated`))
  .filter((repo) => !repo.fork);

const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
const languages = [...new Set(repos.map((repo) => repo.language).filter(Boolean))];
const updatedRepo = repos[0];

await mkdir("generated", { recursive: true });

const focusLines = config.focus.map((item, index) => {
  const y = 142 + index * 42;
  const key = item.toLowerCase().replaceAll(" ", "_");
  return `
    <text x="64" y="${y}" class="muted">&gt;</text>
    <text x="92" y="${y}" class="body">${esc(key.padEnd(22, " "))}</text>
    <text x="410" y="${y}" class="ok">[ ONLINE ]</text>`;
}).join("");

const terminalSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="390" viewBox="0 0 1000 390">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#0b1017"/><stop offset="1" stop-color="#101923"/>
  </linearGradient>
  <linearGradient id="glow" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0" stop-color="#39ff88"/><stop offset="1" stop-color="#58a6ff"/>
  </linearGradient>
  <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
    <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#ffffff" stroke-opacity=".035"/>
  </pattern>
  <style>
    .body{font:18px monospace;fill:#dbe7f3}.muted{font:18px monospace;fill:#6b7d90}
    .ok{font:18px monospace;fill:#39ff88}.title{font:bold 22px monospace;fill:#f0f6fc}
    .small{font:13px monospace;fill:#718096}.blue{font:14px monospace;fill:#58a6ff}
  </style>
</defs>
<rect width="1000" height="390" rx="22" fill="url(#bg)"/>
<rect width="1000" height="390" rx="22" fill="url(#grid)"/>
<rect x="24" y="24" width="952" height="342" rx="16" fill="none" stroke="#233244"/>
<circle cx="52" cy="54" r="6" fill="#ff5f56"/><circle cx="72" cy="54" r="6" fill="#ffbd2e"/><circle cx="92" cy="54" r="6" fill="#27c93f"/>
<text x="120" y="60" class="title">THARUN // SECURITY OPERATIONS CONSOLE</text>
<text x="64" y="102" class="blue">root@tharunehh.github.io:~$ ./profile --live</text>
<line x1="64" y1="116" x2="936" y2="116" stroke="url(#glow)" stroke-opacity=".55"/>
${focusLines}
<rect x="650" y="138" width="260" height="158" rx="12" fill="#0a0f14" stroke="#263747"/>
<text x="674" y="166" class="small">LIVE TELEMETRY</text>
<text x="674" y="204" class="title">${repos.length}</text><text x="740" y="204" class="small">REPOS</text>
<text x="674" y="238" class="title">${user.followers}</text><text x="740" y="238" class="small">FOLLOWERS</text>
<text x="674" y="272" class="title">${totalStars}</text><text x="740" y="272" class="small">STARS</text>
<text x="64" y="340" class="small">github_sync: OK  //  api: github.com  //  mode: autonomous</text>
</svg>`;

const statsSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="260" viewBox="0 0 1000 260">
<defs><linearGradient id="line" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#39ff88"/><stop offset="1" stop-color="#58a6ff"/></linearGradient></defs>
<rect width="1000" height="260" rx="22" fill="#0b1017"/>
<rect x="22" y="22" width="956" height="216" rx="16" fill="#0f1720" stroke="#233244"/>
<text x="52" y="58" font-family="monospace" font-size="15" fill="#718096">GITHUB // LIVE SYSTEM TELEMETRY</text>
<line x1="52" y1="76" x2="948" y2="76" stroke="#233244"/>
<g font-family="monospace">
  <text x="52" y="116" font-size="30" fill="#f0f6fc">${repos.length}</text><text x="52" y="140" font-size="13" fill="#718096">REPOSITORIES</text>
  <text x="270" y="116" font-size="30" fill="#f0f6fc">${user.followers}</text><text x="270" y="140" font-size="13" fill="#718096">FOLLOWERS</text>
  <text x="488" y="116" font-size="30" fill="#f0f6fc">${totalStars}</text><text x="488" y="140" font-size="13" fill="#718096">STARS</text>
  <text x="706" y="116" font-size="30" fill="#f0f6fc">${totalForks}</text><text x="706" y="140" font-size="13" fill="#718096">FORKS</text>
  <text x="52" y="188" font-size="13" fill="#718096">LANGUAGES</text>
  <text x="160" y="188" font-size="14" fill="#58a6ff">${esc(languages.join("  ·  ") || "SCANNING")}</text>
  <text x="52" y="216" font-size="13" fill="#718096">LAST SYNC</text>
  <text x="160" y="216" font-size="14" fill="#39ff88">${esc(updatedRepo?.name || "profile")} // ${esc(updatedRepo?.pushed_at?.slice(0,10) || "now")}</text>
</g>
<rect x="52" y="229" width="896" height="2" fill="url(#line)"/>
</svg>`;

const featuredRepos = config.featuredRepositories
  .map((name) => repos.find((repo) => repo.name === name))
  .filter(Boolean);

const repoCards = featuredRepos.map((repo) => `
<tr>
<td width="50%" valign="top">

### [${repo.name}](${repo.html_url})

${repo.description || "Security engineering project."}

` + ["JavaScript","Python","PowerShell","KQL","HTML","Shell"].includes(repo.language) ? "" : "" + `
</td>
<td width="50%" valign="top">

**${repo.language || "Security"}** · ★ ${repo.stargazers_count} · ${repo.forks_count} forks

</td>
</tr>`).join("\n");

const stackBadges = config.stack.map((item) =>
  `<img src="https://img.shields.io/badge/${encodeURIComponent(item).replaceAll("%20","-")}-111827?style=for-the-badge&logoColor=white" alt="${esc(item)}">`
).join(" ");

const readme = `<div align="center">

<img src="${config.profileImage}" width="140" alt="Tharun profile image">\n\n# ${config.name}

### SECURITY OPERATIONS · BLUE TEAM · PURPLE TEAM

**Threat Hunting · Detection Engineering · SIEM**

<img src="./generated/terminal.svg" alt="Security operations console">

<p>
<a href="https://github.com/${config.username}"><img src="https://img.shields.io/badge/GitHub-Tharunehh-111827?style=for-the-badge&logo=github"></a>
<a href="https://github.com/${config.username}?tab=repositories"><img src="https://img.shields.io/badge/Repositories-${repos.length}-111827?style=for-the-badge"></a>
<a href="https://github.com/${config.username}?tab=followers"><img src="https://img.shields.io/github/followers/${config.username}?style=for-the-badge&label=Followers&color=111827"></a>
</p>

</div>

---

## // OPERATING PROFILE

SOC • THREAT HUNTING • DETECTION ENGINEERING • INCIDENT RESPONSE

> Building practical security labs, detections, telemetry pipelines and defensive tooling.

### Core Stack

<p>
${stackBadges}
</p>

---

## // PROJECT INTELLIGENCE\n\n<img src="./generated/ops-map.svg" alt="Project intelligence map">\n\n## // LIVE TELEMETRY

<img src="./generated/stats.svg" alt="Live GitHub telemetry">

---

## // SELECTED OPERATIONS

<table>
<tr>
<td width="50%" valign="top">

### [Azure Sentinel Honeypot Lab](https://github.com/Tharunehh/Azure-Sentinel-Honeypot-Lab)

Azure Sentinel + honeypot telemetry + Log Analytics + attacker behavior analysis.

</td>
<td width="50%" valign="top">

### [Wazuh Endpoint Security Lab](https://github.com/Tharunehh/Endpoint-security-wazuh-lab)

Endpoint monitoring, FIM, safe malware simulation, dashboards and MITRE ATT&CK mapping.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### [API Security From Scratch](https://github.com/Tharunehh/Api-Security-From-Scratch)

Security-first API evolution covering authentication, authorization and abuse prevention.

</td>
<td width="50%" valign="top">

### [PowerShell Loader Analysis](https://github.com/Tharunehh/Powershell-loader-Vidar-Analysis)

PowerShell-focused security analysis and reverse-engineering work.

</td>
</tr>
</table>

---

## // LAB EVIDENCE\n\n<div align="center">\n\n<img src="https://github.com/user-attachments/assets/4866cfa1-1f2f-48cc-84d8-56f1efa20732" width="46%" alt="Azure Sentinel evidence">\n<img src="https://github.com/user-attachments/assets/16b2e829-2295-4d37-9bc8-05318f6537a9" width="46%" alt="Azure Sentinel threat map evidence">\n<img src="https://github.com/user-attachments/assets/7c717e25-94b5-449a-b109-4dcf156123d4" width="46%" alt="Wazuh evidence">\n<img src="https://github.com/user-attachments/assets/1faa62c0-30ea-4dcb-82c1-a0edb9fe4beb" width="46%" alt="Malware detection evidence">\n\n</div>\n\n## // CERTIFICATION

**Microsoft Certified: Security Operations Analyst Associate**

Earned: **28 September 2026** · Expires: **29 September 2027**

---

<div align="center">

### `SYSTEM STATUS: ONLINE`

`BLUE TEAM` · `PURPLE TEAM` · `THREAT HUNTING` · `DETECTION ENGINEERING`

<sub>Profile generated automatically from GitHub telemetry by GitHub Actions.</sub>

</div>
`;

await writeFile("generated/terminal.svg", terminalSvg);
await writeFile("generated/stats.svg", statsSvg);
await writeFile("README.md", readme);
console.log(`Generated cyber profile for ${config.username}: ${repos.length} repos, ${totalStars} stars.`);
