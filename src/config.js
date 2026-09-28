export const config = {
  username: "Tharunehh",
  name: "Tharun Shamalan",
  role: "Cybersecurity Analyst",
  subtitle: "SOC Analyst • Detection • Threat Hunting",
  location: "Chennai, India",
  portfolio: "https://tharunshamalan.netlify.app/",
  linkedin: "https://linkedin.com/in/tharun-shamalan",

  focus: [
    "Security Operations",
    "Incident Response",
    "Threat Hunting",
    "Detection Engineering",
    "Malware Investigation",
    "Threat Intelligence"
  ],

  stack: [
    "Rapid7 InsightIDR",
    "FortiEDR",
    "Sophos XDR",
    "Microsoft Sentinel",
    "FortiSIEM",
    "Forti SOAR",
    "Trace cat",
    "MISP",
    "IOC Validation",
    "IOC Management",
    "Hunting Queries",
    "Malware Triage",
    "Power BI",
    "Tableau",
    "Dashboard Building",
    "Reporting Automation",
    "Python",
    "KQL",
    "AWS",
    "Azure",
    "Oracle OCI Logs",
    "MITRE ATT&CK",
    "NIST Cybersecurity Framework (CSF)",
    "Cyber Kill Chain",
    "IOC / IOA Analysis"
  ],

  work: {
    impact: [
      ["5+", "Rapid7 playbooks", "built + tested through UAT"],
      ["20+", "SIEM detections", "rules / use cases tuned"],
      ["30%", "more actionable alerts", "from detection tuning"],
      ["1000+", "IOCs", "centralized through MISP"],
      ["200+", "users", "security-awareness campaigns"]
    ]
  },

  about: "I work in an MSSP environment, investigating and triaging security alerts across customer environments. My day-to-day work includes phishing analysis, IOC validation, malware investigation, SIEM administration and log-source integration. The part I enjoy most is turning noisy telemetry into a useful explanation of what happened and what should happen next.",

  currentWork: [
    "Investigating alerts across Microsoft Sentinel, FortiSIEM and Rapid7 InsightIDR.",
    "Running malware investigations, phishing analysis and IOC validation during incident triage.",
    "Building and testing Rapid7 automation playbooks to remove repetitive SOC work.",
    "Tuning SIEM correlation rules and detection use cases to reduce noise and improve alert quality.",
    "Using MISP to enrich and share threat intelligence, and using GoPhish campaign results to improve security awareness."
  ],

  projects: [
    {
      name: "Azure Sentinel Honeypot Lab",
      repo: "Azure-Sentinel-Honeypot-Lab",
      intro: "A small cloud SOC built around a deliberately exposed Windows VM. It captures real RDP brute-force activity, pushes the telemetry into Log Analytics and Sentinel, enriches attacker IPs with geolocation and visualizes the result.",
      tags: ["Azure", "Sentinel", "PowerShell", "KQL"]
    },
    {
      name: "Endpoint Security Wazuh Lab",
      repo: "Endpoint-security-wazuh-lab",
      intro: "A defensive lab for endpoint visibility: SSH monitoring, file-integrity monitoring, suspicious-process detection, safe EICAR testing, dashboards and MITRE ATT&CK mapping.",
      tags: ["Wazuh", "FIM", "MITRE ATT&CK", "Blue Team"]
    },
    {
      name: "API Security From Scratch",
      repo: "Api-Security-From-Scratch",
      intro: "An API that evolves from an unauthenticated baseline into a hardened design with OAuth2/JWT, RBAC, rate limiting, token protections and SIEM-ready security events.",
      tags: ["API Security", "JWT", "RBAC", "Rate Limiting"]
    },
    {
      name: "PowerShell Loader — Vidar-style Analysis",
      repo: "Powershell-loader-Vidar-Analysis",
      intro: "A fake-CAPTCHA clipboard attack chain analysed from user execution and obfuscated PowerShell through payload delivery and ATT&CK mapping.",
      tags: ["PowerShell", "Malware Analysis", "ATT&CK", "CyberChef"]
    },
    {
      name: "REK",
      repo: "rek",
      intro: "A reconnaissance automation pipeline joining discovery, permutation, DNS resolution, HTTP probing, port scanning, content discovery, JavaScript analysis and reporting.",
      tags: ["Recon", "Automation", "Python", "Web Security"]
    },
    {
      name: "NudeNet",
      repo: "nudenet",
      intro: "An ML-powered Node.js/browser detection project with a REST API, web dashboard, batch processing and image blurring.",
      tags: ["Node.js", "TensorFlow.js", "Express", "ML"]
    }
  ],

  education: "B.Tech Computer Science Engineering (Cyber Security and IoT) • Sri Ramachandra Faculty of Engineering and Technology • 2021–2025",
  certifications: [
    "FortiSIEM Certified Professional • Fortinet • 2025",
    "FortiEDR Certified Professional • Fortinet • 2025",
    "AWS cloud Practitioner Essentials • Amazon • 2023",
    "TryHackMe Level 1 • 2026"
  ],
  award: "Best Employee of the Month • July 2025",
  recognitionNote: "Built for the moments after the alert: turning raw telemetry into a timeline, a hypothesis into a detection, and a detection into repeatable SOC work."
};
