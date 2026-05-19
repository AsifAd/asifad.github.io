export const profile = {
  name: "Asif Draxi",
  handle: "AsifAd",
  title: "Site Reliability Engineer",
  tagline: "Building reliable cloud platforms at scale.",
  location: "Bengaluru, IN",
  email: "asifdraxi@gmail.com",
  phone: "812-388-8525",
  links: {
    github: "https://github.com/AsifAd",
    linkedin: "https://www.linkedin.com/in/asifdraxi/",
    email: "mailto:asifdraxi@gmail.com",
  },
};

export const summary = `Site Reliability Engineer with 5+ years architecting and automating cloud platforms across GCP, AWS, and Azure. I specialize in Kubernetes, Infrastructure as Code, and the observability + automation loops that turn 2 AM pages into self-healing systems. Track record of 99.99% uptime SLAs, $250K+ quarterly cost optimization, and CI/CD pipelines that ship safely.`;

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
    items: ["Terraform", "Ansible", "Chef", "GitOps"],
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
    items: ["Python", "Bash", "JavaScript", "PL/SQL"],
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

export const projects: Project[] = [
  {
    name: "community.general — ini_file bugfix",
    blurb:
      "Upstream Ansible contribution: fixed the ini_file module deleting comment-only lines that contained the option name (e.g. '; output_buffering' in php.ini). Added regression tests and changelog fragment.",
    link: "https://github.com/ansible-collections/community.general/pull/12083",
    tags: ["Ansible", "Python", "Open Source", "Bugfix"],
    highlight: true,
  },
  {
    name: "Auto-healing remediation loop",
    blurb:
      "Production system at BlackLine: New Relic alerts trigger PagerDuty events, which fire GitHub Actions workflows running Ansible playbooks against known failure states. Cuts MTTR on common incidents to near-zero.",
    tags: ["New Relic", "PagerDuty", "GitHub Actions", "Ansible"],
    highlight: true,
  },
  {
    name: "NiFi multi-region orchestration",
    blurb:
      "Migrated Apache NiFi clusters from Chef-based config to Ansible roles, then orchestrated zero-downtime multi-region deployments with consistent configuration drift detection.",
    tags: ["Ansible", "Apache NiFi", "GCP", "Migration"],
  },
  {
    name: "Enterprise K8s Automation Lab",
    blurb:
      "Cloud-hybrid testing environment defined entirely in IaC. Terraform bootstraps the VPC and instances; Ansible configures a working Kubernetes cluster for microservice experimentation.",
    tags: ["Terraform", "Ansible", "Kubernetes", "GitOps"],
  },
  {
    name: "Serverless cloud alerting engine",
    blurb:
      "Python + AWS Lambda alert engine. Pulls log errors from S3/CloudWatch, categorizes by severity, dispatches via webhook. Reduced false-positive alert bloat.",
    tags: ["Python", "AWS Lambda", "Observability"],
  },
];

export const certifications = [
  { name: "HashiCorp Terraform Associate (003)", issuer: "HashiCorp", link: "https://www.credly.com/earner/earned/badge/59987b27-67e8-4638-ad2a-8b7feeb76faf" },
  { name: "Google Professional Cloud Architect", issuer: "Google Cloud" },
  { name: "Azure DevOps Engineer Expert (AZ-400)", issuer: "Microsoft" },
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
  { label: "AI", desc: "LLM-assisted ops, automation, runbooks" },
];
