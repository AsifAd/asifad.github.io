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

export const summary = `Site Reliability Engineer and open source contributor with 5+ years on GCP, AWS, and Azure. I build Kubernetes platforms, Infrastructure as Code (Terraform, Ansible), and observability loops that turn 2 AM pages into self-healing systems — plus upstream PRs to Ansible, Argo CD, and Jenkins. Track record: 99.9% uptime SLAs, $250K+ quarterly GCP savings, and 40% less release toil.`;

export const aboutNote = `The work I care most about lives at the boundary: where infrastructure becomes a product for engineers, where alerts become actions, and where upstream open source fixes make the next on-call shift quieter.`;

export type SkillGroup = { label: string; items: string[]; accent: "cyan" | "violet" | "emerald" };

export const skills: SkillGroup[] = [
  {
    label: "Cloud",
    accent: "cyan",
    items: ["GCP", "AWS", "Azure", "VPC", "IAM", "Load Balancing"],
  },
  {
    label: "Containers & Orchestration",
    accent: "violet",
    items: ["Kubernetes", "GKE", "EKS", "Docker", "Helm"],
  },
  {
    label: "Infrastructure as Code",
    accent: "emerald",
    items: ["Terraform", "Ansible", "GitOps"],
  },
  {
    label: "CI/CD & Automation",
    accent: "cyan",
    items: ["GitHub Actions", "Jenkins", "Azure DevOps", "Git"],
  },
  {
    label: "Observability",
    accent: "violet",
    items: ["New Relic", "Dynatrace", "Pingdom", "PagerDuty", "Opsgenie"],
  },
  {
    label: "Languages",
    accent: "emerald",
    items: ["Python", "Bash", "JavaScript"],
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
    period: "Jun 2024 — Present",
    stack: ["GCP", "Kubernetes", "Ansible", "GitHub Actions", "New Relic", "PagerDuty"],
    highlights: [
      "Operating high-availability production infrastructure with 99.9%+ uptime SLAs and on-call incident management.",
      "Led GCP cost optimization across right-sizing, resource auditing, and database upgrades — $250K+ saved in a single quarter.",
      "Migrated legacy release pipelines to GitHub Actions, reducing manual release intervention by 40%.",
      "Built an auto-healing system wiring New Relic telemetry → PagerDuty → GitHub Actions → Ansible runbooks for instant remediation of known failures.",
      "Led zero-downtime migration of Apache NiFi clusters from Chef to Ansible, then orchestrated automated multi-region deployments.",
    ],
  },
  {
    company: "Liferay",
    role: "Associate Site Reliability Engineer",
    location: "Bengaluru, KA",
    period: "Dec 2022 — Jun 2024",
    stack: ["GKE", "Dynatrace", "Jenkins", "Python", "Bash"],
    highlights: [
      "Scaled GKE clusters for mission-critical portals — resource allocation, security compliance, fault tolerance.",
      "Deployed Dynatrace + Pingdom with proactive thresholds, catching degradation before customer impact.",
      "Restructured Jenkins pipelines, removing build-stage bottlenecks to stabilize daily release trains.",
      "Node-pooling + auto-scaling strategy delivered a sustainable 20% compute footprint reduction.",
      "Authored runbooks and custom Python/Bash automation, saving the team 10+ hours per week.",
    ],
  },
  {
    company: "Capgemini",
    role: "Senior Software Engineer",
    location: "Mumbai, MH",
    period: "Jun 2019 — Aug 2021",
    stack: ["AWS", "Azure", "Angular", "Azure DevOps", "ARM"],
    highlights: [
      "Provisioned and secured enterprise AWS/Azure infrastructure — VPCs, EC2/VMs, auto-scaling groups for global clients.",
      "Troubleshot complex network and routing issues — Load Balancer algorithms, DNS resolution, TCP/IP bottlenecks.",
      "Introduced IaC practices with Git-managed ARM templates and scripting.",
      "Built Angular front-ends and integrated Azure DevOps CI/CD pipelines for cross-functional Agile teams.",
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
    name: "Auto-healing remediation loop",
    blurb:
      "Production system at BlackLine: New Relic alerts trigger PagerDuty events, which fire GitHub Actions workflows running Ansible playbooks against known failure states. Cuts MTTR on common incidents to near-zero.",
    link: "#opensource",
    tags: ["New Relic", "PagerDuty", "GitHub Actions", "Ansible"],
    highlight: true,
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

export const focusAreas = [
  { label: "SRE", desc: "Reliability, SLOs, on-call, postmortems" },
  { label: "DevOps", desc: "CI/CD, GitOps, release engineering" },
  { label: "Cloud", desc: "GCP · AWS · Azure platform engineering" },
  { label: "Open Source", desc: "Ansible, Argo CD, Jenkins — upstream PRs" },
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
