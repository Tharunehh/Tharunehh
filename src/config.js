export const config = {
  username: "Tharunehh",
  name: "Tharun Shamalan",
  role: "SOC Analyst",
  subtitle: "Security Operations · Detection Engineering · Threat Hunting",
  location: "Chennai, India",
  profileImage: "https://github.com/Tharunehh.png?size=256",

  work: {
    summary:
      "I work in a SOC at a managed security services provider, triaging alerts across customer environments and improving the next alert through detection tuning, automation and threat intelligence.",
    impact: [
      ["5+", "Rapid7 automation playbooks", "development → testing → UAT"],
      ["20+", "SIEM correlation rules", "detection use cases tuned"],
      ["30%", "more actionable alerts", "fewer false positives"],
      ["1,000+", "IOCs", "enriched and shared through MISP"],
      ["200+", "users", "phishing awareness campaigns"]
    ],
    investigations:
      "Alert triage, phishing analysis, malware investigation and IOC validation. Participated in a client ransomware investigation by rebuilding the attack timeline, tracing lateral movement and identifying ransom-note artifacts.",
    automation:
      "Selected for a security automation project and built Rapid7 playbooks from development through testing and UAT sign-off.",
    detection:
      "Tuned SIEM correlation rules and detection use cases to improve alert quality and reduce false positives.",
    threatIntel:
      "Set up MISP as a shared threat-intelligence platform and ran GoPhish awareness campaigns with recommendations based on user response."
  },

  focus: [
    "Alert Triage",
    "Detection Engineering",
    "Threat Hunting",
    "Incident Response",
    "Security Automation",
    "Threat Intelligence"
  ],

  stack: [
    "Microsoft Sentinel",
    "FortiSIEM",
    "Rapid7 InsightIDR",
    "FortiEDR",
    "Sophos XDR",
    "Wazuh",
    "MISP",
    "Rapid7 Automation",
    "Forti SOAR",
    "Azure",
    "AWS",
    "Oracle OCI",
    "Python",
    "KQL",
    "PowerShell",
    "MITRE ATT&CK",
    "NIST CSF",
    "Cyber Kill Chain",
    "Power BI",
    "Tableau"
  ],

  projects: [
    {
      name: "Azure Sentinel Honeypot Lab",
      repo: "Azure-Sentinel-Honeypot-Lab",
      theme: "Cloud attack telemetry",
      description:
        "A Windows VM exposed to the internet to capture real RDP brute-force attempts. Logs flow through Log Analytics into Sentinel, with PowerShell-based attacker-IP geolocation and map visualization."
    },
    {
      name: "Wazuh Endpoint Security Lab",
      repo: "Endpoint-security-wazuh-lab",
      theme: "Endpoint detection",
      description:
        "SSH monitoring, file-integrity monitoring, safe EICAR malware validation, dashboards and MITRE ATT&CK mapping, with extensive evidence screenshots."
    },
    {
      name: "API Security From Scratch",
      repo: "Api-Security-From-Scratch",
      theme: "API defense lifecycle",
      description:
        "A FastAPI service hardened in phases: OAuth2/JWT authentication, bcrypt passwords, RBAC, rate limiting and SIEM-shaped security events."
    },
    {
      name: "PowerShell Loader — Vidar-style Analysis",
      repo: "Powershell-loader-Vidar-Analysis",
      theme: "Malware analysis",
      description:
        "A fake-CAPTCHA clipboard-injection chain analyzed from obfuscated PowerShell loader through payload delivery, behavioral validation and ATT&CK mapping."
    },
    {
      name: "REK",
      repo: "rek",
      theme: "Recon automation",
      description:
        "A reconnaissance playbook pipeline spanning enumeration, permutation, DNS resolution, HTTP probing, port scanning, content discovery, JavaScript analysis and reporting."
    },
    {
      name: "NudeNet",
      repo: "nudenet",
      theme: "ML + security tooling",
      description:
        "An enhanced Node.js/browser NSFW detection stack with an API, web dashboard, batch processing and image blurring."
    }
  ],

  credentials: [
    ["Microsoft Certified: Security Operations Analyst Associate (SC-200)", "September 2026"],
    ["FortiSIEM Certified Professional / FortiEDR Certified Professional", "Fortinet · 2025"],
    ["AWS Cloud Practitioner Essentials", "2023"],
    ["B.Tech in Computer Science Engineering (Cyber Security and IoT)", "Sri Ramachandra Faculty of Engineering and Technology · 2025"]
  ],

  awards: [
    ["Best Employee of the Month", "July 2025 · investigation accuracy and client communication"]
  ],

  links: {
    portfolio: "https://tharunshamalan.netlify.app",
    linkedin: "https://linkedin.com/in/tharun-shamalan"
  }
};
