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

export const summary = `Site Reliability Engineer and open source contributor with 5+ years on GCP, AWS, and Azure. I build Kubernetes platforms, Infrastructure as Code (Terraform, Ansible), and observability loops that turn 2 AM pages into self-healing systems, plus upstream PRs to Ansible, Argo CD, and Jenkins. Track record: 99.9% uptime SLAs, $250K+ quarterly GCP savings, and 40% less release toil.`;

export const aboutNote = `The work I care most about lives at the boundary: where infrastructure becomes a product for engineers, where alerts become actions, and where upstream open source fixes make the next on-call shift quieter.`;

export type SkillGroup = { label: string; items: string[]; accent: "cyan" | "violet" | "emerald" };

export const skills: SkillGroup[] = [
  {
    label: "Cloud Platforms",
    accent: "cyan",
    items: ["GCP", "AWS", "Azure"],
  },
  {
    label: "Containers & Orchestration",
    accent: "violet",
    items: ["Kubernetes", "GKE", "EKS", "Docker", "Helm"],
  },
  {
    label: "IaC & GitOps",
    accent: "emerald",
    items: ["Terraform", "Ansible", "ArgoCD", "Chef"],
  },
  {
    label: "CI/CD & Automation",
    accent: "cyan",
    items: ["Jenkins", "GitHub Actions", "Azure DevOps", "Git"],
  },
  {
    label: "Observability & Incident",
    accent: "violet",
    items: ["Prometheus", "Grafana", "Dynatrace", "New Relic", "PagerDuty"],
  },
  {
    label: "Systems & Networking",
    accent: "emerald",
    items: ["Linux", "Nginx", "TCP/IP", "DNS", "Load Balancing"],
  },
  {
    label: "Programming & Scripting",
    accent: "cyan",
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
    stack: ["GCP", "AWS", "Kubernetes", "ArgoCD", "Terraform", "Ansible", "New Relic", "PagerDuty"],
    highlights: [
      "Engineered and maintained high-availability production infrastructure, consistently achieving and exceeding 99.9% uptime SLAs while executing robust on-call incident management protocols and blameless post-mortems.",
      "Architected petabyte-scale object storage management across GCP (GCS) and AWS (S3), implementing S3 Intelligent-Tiering, cross-region replication (CRR), and strict IAM/bucket policies to ensure SOC 2/GDPR compliance and reduce storage footprint.",
      "Spearheaded a massive cloud cost-optimization initiative, involving instance right-sizing, storage tiering, and database upgrades, generating over $250,000 in operational savings within a single quarter.",
      "Managed Kubernetes workloads utilizing GitOps principles with ArgoCD and Helm, streamlining deployment processes, enabling automated drift detection, and reducing manual release intervention by 40%.",
      "Invented and deployed an intelligent auto-healing system that seamlessly integrates New Relic telemetry, PagerDuty alerts, and Python/Bash automation tools to instantly remediate known failure states, drastically reducing operational toil and MTTR.",
      "Led the zero-downtime structural migration of Apache NiFi clusters from Chef-based configuration management to Ansible, subsequently orchestrating automated multi-region NiFi deployments.",
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
      "Introduced and standardized Infrastructure as Code practices using Git-managed ARM templates and robust scripting resources to version-control primary infrastructure components.",
      "Collaborated within cross-functional Agile teams to design and develop robust front-end user interaction portals using Angular (6+), JavaScript, HTML5, and CSS3, bridging user experience gaps with backend systems.",
      "Integrated seamless code delivery utilizing Azure DevOps CI/CD pipelines, minimizing integration code-conflicts.",
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
    name: "Automated Storage Compliance Controller",
    blurb:
      "Developed a Python-based automation tool to proactively audit AWS S3 buckets across the organization. Enforced encryption standards, configured intelligent lifecycle policies for cost optimization, and ensured strict IAM access controls for data security.",
    tags: ["Python", "AWS S3", "Automation", "Security"],
    highlight: true,
  },
  {
    name: "GitOps Fleet Manager",
    blurb:
      "Architected a centralized GitOps deployment workflow using ArgoCD and custom Helm charts to synchronize microservices across multiple Kubernetes clusters, providing automated drift detection and rapid rollback capabilities.",
    tags: ["ArgoCD", "Helm", "Kubernetes", "GitOps"],
    highlight: true,
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

export const focusAreas = [
  { label: "SRE", desc: "Reliability, SLOs, on-call, postmortems" },
  { label: "DevOps", desc: "CI/CD, GitOps, release engineering" },
  { label: "Cloud", desc: "GCP · AWS · Azure platform engineering" },
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
