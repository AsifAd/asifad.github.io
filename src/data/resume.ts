export const profile = {
  name: "Asif Draxi",
  handle: "AsifAd",
  title: "Site Reliability Engineer",
  tagline: "SRE · open source contributor · reliable platforms at scale.",
  location: "Bengaluru, IN",
  email: "asifdraxi@gmail.com",
  phone: "812-388-8525",
  links: {
    github: "https://github.com/AsifAd",
    linkedin: "https://www.linkedin.com/in/asifdraxi/",
    email: "mailto:asifdraxi@gmail.com",
    ossHub: "https://asifad.github.io/opensource-contributions/",
  },
};

export const summary = `Site Reliability Engineer with 6+ years building and operating resilient, large-scale cloud platforms across GCP, AWS, and Azure. Deep practitioner of Kubernetes (GKE), GitOps (ArgoCD), and Infrastructure as Code (Terraform, Ansible), with a track record of sustaining 99.9%+ uptime SLAs and delivering $300K+ in annualized cloud savings. Pioneered AI-driven operational models using MCP-based agentic workflows, cutting MTTR by ~20% and alert fatigue by 15%. Active open source contributor to Ansible, Argo CD, and Jenkins.`;

export const aboutNote = `The work I care most about lives at the boundary: where infrastructure becomes a product for engineers, where alerts become actions, and where upstream open source fixes make the next on-call shift quieter.`;

export type SkillGroup = { label: string; items: string[]; accent: "cyan" | "violet" | "emerald" };

export const skills: SkillGroup[] = [
  {
    label: "Cloud Platforms",
    accent: "cyan",
    items: ["GCP", "AWS", "Azure"],
  },
  {
    label: "AI & Agentic Operations",
    accent: "violet",
    items: ["MCP", "AIOps", "Agentic Automation", "Vertex AI", "LLM-Assisted Incident Response"],
  },
  {
    label: "Containers & Orchestration",
    accent: "emerald",
    items: ["Kubernetes", "GKE", "EKS", "Docker", "Helm"],
  },
  {
    label: "IaC & GitOps",
    accent: "cyan",
    items: ["Terraform", "Ansible", "ArgoCD", "Chef"],
  },
  {
    label: "CI/CD & Automation",
    accent: "violet",
    items: ["Jenkins", "GitHub Actions", "Azure DevOps", "Git"],
  },
  {
    label: "Observability & Incident",
    accent: "emerald",
    items: ["Prometheus", "Grafana", "Dynatrace", "New Relic", "PagerDuty"],
  },
  {
    label: "Systems & Networking",
    accent: "cyan",
    items: ["Linux", "Nginx", "TCP/IP", "DNS", "Load Balancing"],
  },
  {
    label: "Programming & Scripting",
    accent: "violet",
    items: ["Python", "Bash", "Golang", "JavaScript", "Angular"],
  },
];

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "BlackLine",
    role: "Site Reliability Engineer",
    location: "Bengaluru, KA",
    period: "Jun 2024 - Present",
    stack: ["GCP", "AWS", "Kubernetes", "ArgoCD", "Terraform", "Ansible", "New Relic", "PagerDuty", "Vertex AI", "MCP"],
    highlights: [
      "Served as primary on-call and incident commander on a bi-weekly rotation for tier-1 services; resolved major outages, conducted blameless RCAs, and led the strategic onboarding of a NOC team as an L1 first line of defense, drastically reducing engineering escalations.",
      "Built an AI-powered New Relic MCP server that audits alert coverage and dashboard gaps across microservices using Golden Signals (latency, traffic, errors, saturation), improving observability quality and reducing non-actionable alert noise by 15%.",
      "Designed and deployed an On-Call Agent integrating PagerDuty, New Relic, and automated runbooks to classify incidents, execute safe remediations, and escalate only complex cases with context-rich summaries, reducing MTTR by ~20%.",
      "Led foundational platform enablement by provisioning greenfield GCP projects end-to-end: IAM guardrails, networking baselines, CI/CD onboarding, and Vertex AI setup, reducing team onboarding time by 25%.",
      "Spearheaded a cloud cost-optimization initiative involving instance right-sizing, storage tiering, and database upgrades, generating over $300,000 in annualized operational savings.",
      "Managed Kubernetes workloads via GitOps with ArgoCD and Helm, enabling automated drift detection and reducing manual release intervention by 20%.",
      "Established an agentic reliability engineering operating model combining observability intelligence, incident context enrichment, and automated remediation, reducing alert fatigue by 15% and improving on-call efficiency.",
    ],
  },
  {
    company: "Liferay",
    role: "Associate Site Reliability Engineer",
    location: "Bengaluru, KA",
    period: "Dec 2022 - Jun 2024",
    stack: ["GKE", "Prometheus", "Grafana", "Dynatrace", "Jenkins", "Python", "Bash"],
    highlights: [
      "Administered and scaled large-scale Google Kubernetes Engine (GKE) clusters, ensuring optimal resource allocation, security compliance, and fault tolerance for mission-critical portals.",
      "Conducted deep-dive troubleshooting into Linux OS internals, network stacks, and resource scheduling to optimize application performance and stability.",
      "Elevated system observability by instrumenting Prometheus, Grafana, and Dynatrace, establishing proactive thresholds and alerts that addressed performance degradation prior to customer impact.",
      "Restructured and maintained Jenkins CI/CD pipelines, proactively identifying build-stage bottlenecks and troubleshooting faulty deployment mechanics to stabilize daily release trains.",
      "Executed detailed GKE cluster performance analysis to identify compute inefficiencies; implemented node auto-provisioning and proactive node-scale-down strategies to achieve a sustainable 20% footprint cost reduction.",
      "Wrote custom Python and Bash automation scripts to replace tedious daily operational tasks, saving the infrastructure team 10+ hours per week.",
    ],
  },
  {
    company: "Capgemini",
    role: "Senior Software Engineer",
    location: "Mumbai, MH",
    period: "Jun 2019 - Aug 2021",
    stack: ["AWS", "Azure", "ARM Templates", "Azure DevOps", "Angular", "JavaScript"],
    highlights: [
      "Provisioned, secured, and scaled enterprise-grade AWS and Azure cloud infrastructures leveraging VPCs, EC2/VMs, and auto-scaling groups for global client deployments.",
      "Troubleshot and resolved complex network and routing issues, including Load Balancer algorithms, DNS resolution, and TCP/IP bottlenecks, ensuring uncompromised connectivity and low latency.",
      "Drove foundational IaC adoption by developing version-controlled ARM templates and Bash deployment scripts, standardizing cloud environments and reducing manual provisioning errors.",
      "Engineered Python and shell automation suites to govern cloud resource lifecycles, automating snapshot cleanup, instance tracking, and IAM access audits, reducing weekly operational toil across engineering teams.",
      "Delivered CI/CD pipelines via Azure DevOps for multi-environment deployments, enforcing gated release stages and automated rollback triggers to reduce failed deployments.",
    ],
  },
];

export type Project = {
  name: string;
  blurb: string;
  link?: string;
  tags: string[];
  highlight?: boolean;
};

export { openSourceStacks } from "./oss-stacks.generated";
export type { GeneratedOpenSourceStack as OpenSourceStack } from "./oss-stacks.generated";

export const projects: Project[] = [
  {
    name: "Engineering Intelligence Platform",
    blurb:
      "Hackathon 2nd Place. Built a unified internal platform that centralizes multi-team documentation, service dependency mapping, and live service health into a single pane of glass. Reduced cross-team troubleshooting time by 35% and improved incident handoff quality.",
    tags: ["AI", "Python", "Observability", "Internal Tooling"],
    highlight: true,
  },
  {
    name: "MCP On-Call Automation Suite",
    blurb:
      "Engineered MCP-based operational tools (TypeScript + Python) for alert analysis, contextual troubleshooting, and runbook-driven remediation. Integrates New Relic and PagerDuty to accelerate incident handling and improve escalation precision, reducing MTTR by ~20%.",
    tags: ["MCP", "TypeScript", "Python", "New Relic", "PagerDuty"],
    highlight: true,
  },
  {
    name: "Automated Storage Compliance Controller",
    blurb:
      "Python-based automation tool that proactively audits AWS S3 buckets across the organization. Enforces encryption standards, configures intelligent lifecycle policies for cost optimization, and ensures strict IAM access controls for data security.",
    tags: ["Python", "AWS S3", "Automation", "Security"],
  },
  {
    name: "GitOps Fleet Manager",
    blurb:
      "Centralized GitOps deployment workflow using ArgoCD and custom Helm charts to synchronize microservices across multiple Kubernetes clusters, providing automated drift detection and rapid rollback capabilities.",
    tags: ["ArgoCD", "Helm", "Kubernetes", "GitOps"],
  },
  {
    name: "Auto-healing remediation loop",
    blurb:
      "Production system at BlackLine: New Relic alerts trigger PagerDuty events, which fire GitHub Actions workflows running Ansible playbooks against known failure states. Cuts MTTR on common incidents to near-zero.",
    tags: ["New Relic", "PagerDuty", "GitHub Actions", "Ansible"],
  },
  {
    name: "NiFi multi-region orchestration",
    blurb:
      "Migrated Apache NiFi clusters from Chef-based config to Ansible roles, then orchestrated zero-downtime multi-region deployments with consistent configuration drift detection.",
    link: "https://asifad.github.io/opensource-contributions/#roadmap-nifi",
    tags: ["Ansible", "Apache NiFi", "GCP", "Migration"],
  },
  {
    name: "Enterprise K8s Automation Lab",
    blurb:
      "Cloud-hybrid testing environment defined entirely in IaC. Terraform bootstraps the VPC and instances; Ansible configures a working Kubernetes cluster for microservice experimentation.",
    link: "https://github.com/AsifAd",
    tags: ["Terraform", "Ansible", "Kubernetes", "GitOps"],
  },
  {
    name: "Serverless cloud alerting engine",
    blurb:
      "Python + AWS Lambda alert engine. Pulls log errors from S3/CloudWatch, categorizes by severity, dispatches via webhook. Reduced false-positive alert bloat.",
    link: "https://github.com/AsifAd",
    tags: ["Python", "AWS Lambda", "Observability"],
  },
];

export const certifications = [
  { name: "HashiCorp Terraform Associate (003)", issuer: "HashiCorp", link: "https://www.credly.com/earner/earned/badge/59987b27-67e8-4638-ad2a-8b7feeb76faf" },
  {
    name: "Google Professional Cloud Architect",
    issuer: "Google Cloud",
    link: "https://cloud.google.com/certification/cloud-architect",
  },
  {
    name: "Azure DevOps Engineer Expert (AZ-400)",
    issuer: "Microsoft",
    link: "https://learn.microsoft.com/en-us/credentials/certifications/devops-engineer/",
  },
  { name: "AWS Solutions Architect Associate", issuer: "AWS", link: "https://www.youracclaim.com/badges/305c90a5-8131-4b3c-8783-f6fa106cdf93/public_url" },
  { name: "AWS Cloud Practitioner", issuer: "AWS", link: "https://www.youracclaim.com/badges/1c31f0af-faae-4f11-be3c-c7de8e50ff4c/public_url" },
];

export const education = [
  {
    institution: "Reva Institute of Technology and Management",
    location: "Bengaluru, KA",
    degree: "Bachelor of Engineering",
    period: "Jun 2018",
  },
];

export const awards = [
  {
    title: "Star of the Month",
    org: "BlackLine",
    desc: "Recognized for outstanding contributions to AI-driven SRE automation and incident management.",
  },
  {
    title: "Company-Wide Hackathon: 2nd Place",
    org: "BlackLine",
    desc: "Built an AI-enabled engineering intelligence platform for documentation discovery, dependency visibility, and real-time service health insights.",
  },
  {
    title: "Best Performer Award",
    org: "Capgemini",
    desc: "Recognized as a top-performing engineer for rapid upskilling, high project impact, and proactively achieving cloud certifications.",
  },
];

export const focusAreas = [
  { label: "SRE", desc: "Reliability, SLOs, on-call, postmortems" },
  { label: "AI Ops", desc: "MCP agents, AIOps, agentic automation" },
  { label: "Cloud", desc: "GCP · AWS · Azure platform engineering" },
  { label: "DevOps", desc: "CI/CD, GitOps, release engineering" },
  { label: "Open Source", desc: "Ansible, Argo CD, Jenkins · upstream PRs" },
];

/** Upstream work — mirrored on PDF résumé Open Source section */
export const openSourceContributions = [
  {
    stack: "Ansible",
    title: "ini_file comment-line idempotency",
    pr: "community.general#12083",
    link: "https://github.com/ansible-collections/community.general/pull/12083",
  },
  {
    stack: "Ansible",
    title: "nmcli bond ARP check-mode fix",
    pr: "community.general#12085",
    link: "https://github.com/ansible-collections/community.general/pull/12085",
  },
  {
    stack: "Argo CD",
    title: "AppSet UI in non-default namespaces",
    pr: "argo-cd#27931",
    link: "https://github.com/argoproj/argo-cd/pull/27931",
  },
  {
    stack: "Argo CD",
    title: "ApplicationSet Refresh button",
    pr: "argo-cd#27932",
    link: "https://github.com/argoproj/argo-cd/pull/27932",
  },
  {
    stack: "Jenkins",
    title: "kubernetes-plugin multi-container pod cleanup",
    pr: "#2809 in progress",
    link: "https://github.com/jenkinsci/kubernetes-plugin/issues/2809",
  },
] as const;
