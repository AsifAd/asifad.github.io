import type { LucideIcon } from "lucide-react";
import {
  Award,
  Briefcase,
  Code,
  ExternalLink,
  FileText,
  FolderKanban,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Monitor,
  Moon,
  Sun,
  User,
  Wrench,
} from "lucide-react";
import {
  certifications,
  education,
  experience,
  focusAreas,
  openSourceContributions,
  profile,
  projects,
  skills,
  summary,
  aboutNote,
} from "../data/resume";
import { openSourceStacks } from "../data/oss-stacks.generated";

export type SearchAction =
  | { type: "navigate"; hash: string }
  | { type: "external"; url: string }
  | { type: "resume" }
  | { type: "email" }
  | { type: "theme" };

export type SearchEntry = {
  id: string;
  title: string;
  subtitle?: string;
  group: string;
  icon: LucideIcon;
  keywords: string[];
  action: SearchAction;
};

const SECTIONS: SearchEntry[] = [
  {
    id: "sec-about",
    title: "About",
    subtitle: "Summary, stats, and background",
    group: "Pages",
    icon: User,
    keywords: ["about", "bio", "summary", "sre", "reliability"],
    action: { type: "navigate", hash: "#about" },
  },
  {
    id: "sec-skills",
    title: "Skills",
    subtitle: "Cloud, Kubernetes, IaC, observability",
    group: "Pages",
    icon: Layers,
    keywords: ["skills", "tech", "stack", "tools"],
    action: { type: "navigate", hash: "#skills" },
  },
  {
    id: "sec-experience",
    title: "Experience",
    subtitle: "Work history and impact",
    group: "Pages",
    icon: Briefcase,
    keywords: ["experience", "jobs", "work", "career", "blackline", "liferay", "capgemini"],
    action: { type: "navigate", hash: "#experience" },
  },
  {
    id: "sec-projects",
    title: "Projects",
    subtitle: "Selected production work",
    group: "Pages",
    icon: FolderKanban,
    keywords: ["projects", "work", "shipped", "nifi", "terraform"],
    action: { type: "navigate", hash: "#projects" },
  },
  {
    id: "sec-oss",
    title: "Open Source",
    subtitle: "Upstream PRs and OSS hub",
    group: "Pages",
    icon: Code,
    keywords: ["open source", "oss", "upstream", "ansible", "argo", "jenkins", "contributions"],
    action: { type: "navigate", hash: "#opensource" },
  },
  {
    id: "sec-contact",
    title: "Contact",
    subtitle: "Email, LinkedIn, GitHub, résumé",
    group: "Pages",
    icon: Mail,
    keywords: ["contact", "email", "hire", "reach", "linkedin"],
    action: { type: "navigate", hash: "#contact" },
  },
];

function entry(
  partial: Omit<SearchEntry, "keywords"> & { keywords?: string[] },
): SearchEntry {
  const base = [partial.title, partial.subtitle, partial.group].filter(Boolean).join(" ");
  return {
    ...partial,
    keywords: [...(partial.keywords ?? []), ...base.toLowerCase().split(/\s+/)],
  };
}

export function buildPortfolioSearchIndex(): SearchEntry[] {
  const items: SearchEntry[] = [
    ...SECTIONS,
    entry({
      id: "content-hero",
      title: "I build the platforms that keep production calm at 2 AM, and contribute upstream to open source along the way.",
      subtitle: "Hero",
      group: "Content",
      icon: FileText,
      keywords: ["hero", "platforms", "production", "calm", "2 AM", "open source", "SRE", "DevOps", "Cloud", "GCP", "AWS", "Azure"],
      action: { type: "navigate", hash: "#top" },
    }),
    entry({
      id: "content-about-summary",
      title: summary,
      subtitle: "About",
      group: "Content",
      icon: FileText,
      keywords: ["about", "summary", "Site Reliability Engineer", "open source", "GCP", "AWS", "Azure", "Kubernetes", "Terraform", "Ansible", "observability", "self-healing", "upstream", "PRs", "Argo CD", "Jenkins", "uptime", "SLAs", "savings", "release toil"],
      action: { type: "navigate", hash: "#about" },
    }),
    entry({
      id: "content-about-note",
      title: aboutNote,
      subtitle: "About",
      group: "Content",
      icon: FileText,
      keywords: ["about", "note", "infrastructure", "product", "engineers", "alerts", "actions", "upstream", "open source", "fixes", "on-call", "shift"],
      action: { type: "navigate", hash: "#about" },
    }),
    entry({
      id: "content-about-stats",
      title: "5+ Years in SRE · 99.9% Uptime SLA · $250K+ Quarterly savings · 40% Release toil reduced",
      subtitle: "About Stats",
      group: "Content",
      icon: FileText,
      keywords: ["about", "stats", "years", "SRE", "uptime", "SLA", "savings", "release", "toil", "reduced"],
      action: { type: "navigate", hash: "#about" },
    }),
    entry({
      id: "content-contact",
      title: "Have a system to keep running? I'm open to SRE, platform, and OSS collaboration.",
      subtitle: "Contact",
      group: "Content",
      icon: FileText,
      keywords: ["contact", "system", "running", "SRE", "platform", "OSS", "collaboration", "email", "linkedin"],
      action: { type: "navigate", hash: "#contact" },
    }),
    entry({
      id: "content-skills-heading",
      title: "What I work with.",
      subtitle: "Skills",
      group: "Content",
      icon: FileText,
      keywords: ["skills", "work", "with", "stack"],
      action: { type: "navigate", hash: "#skills" },
    }),
    entry({
      id: "content-experience-heading",
      title: "A timeline of the systems I've kept running.",
      subtitle: "Experience",
      group: "Content",
      icon: FileText,
      keywords: ["experience", "timeline", "systems", "running"],
      action: { type: "navigate", hash: "#experience" },
    }),
    entry({
      id: "content-opensource-heading",
      title: "Upstream work I'm building in public.",
      subtitle: "Open Source",
      group: "Content",
      icon: FileText,
      keywords: ["upstream", "work", "building", "public", "open source"],
      action: { type: "navigate", hash: "#opensource" },
    }),
    entry({
      id: "content-opensource-desc",
      title: "PRs, roadmaps, and repro notes for each stack, synced from the live dashboard below.",
      subtitle: "Open Source",
      group: "Content",
      icon: FileText,
      keywords: ["prs", "roadmaps", "repro", "notes", "stack", "synced", "live", "dashboard"],
      action: { type: "navigate", hash: "#opensource" },
    }),
    entry({
      id: "content-credentials-heading",
      title: "Certifications & Education",
      subtitle: "Credentials",
      group: "Content",
      icon: FileText,
      keywords: ["certifications", "education", "credentials"],
      action: { type: "navigate", hash: "#credentials" },
    }),
    entry({
      id: "action-resume",
      title: "Preview résumé",
      subtitle: "Open PDF in viewer",
      group: "Actions",
      icon: FileText,
      keywords: ["resume", "cv", "pdf", "download"],
      action: { type: "resume" },
    }),
    entry({
      id: "action-theme",
      title: "Toggle light / dark theme",
      group: "Actions",
      icon: Sun,
      keywords: ["theme", "dark", "light", "mode", "appearance"],
      action: { type: "theme" },
    }),
    entry({
      id: "action-email",
      title: "Send email",
      subtitle: profile.email,
      group: "Actions",
      icon: Mail,
      keywords: ["email", "mail", "contact"],
      action: { type: "email" },
    }),
    entry({
      id: "ext-github",
      title: "GitHub profile",
      subtitle: profile.links.github,
      group: "Links",
      icon: ExternalLink,
      keywords: ["github", "asifad", "code"],
      action: { type: "external", url: profile.links.github },
    }),
    entry({
      id: "ext-linkedin",
      title: "LinkedIn",
      subtitle: "Professional profile",
      group: "Links",
      icon: ExternalLink,
      keywords: ["linkedin", "network"],
      action: { type: "external", url: profile.links.linkedin },
    }),
    entry({
      id: "ext-oss-hub",
      title: "OSS contributions hub",
      subtitle: "Live upstream tracker",
      group: "Links",
      icon: ExternalLink,
      keywords: ["oss", "contributions", "tracker", "prs"],
      action: { type: "external", url: profile.links.ossHub },
    }),
    entry({
      id: "profile-location",
      title: profile.location,
      subtitle: `${profile.title} · ${profile.name}`,
      group: "Profile",
      icon: MapPin,
      keywords: ["bengaluru", "india", "location"],
      action: { type: "navigate", hash: "#contact" },
    }),
  ];

  for (const f of focusAreas) {
    items.push(
      entry({
        id: `focus-${f.label}`,
        title: f.label,
        subtitle: f.desc,
        group: "Focus areas",
        icon: Monitor,
        keywords: [f.label, f.desc],
        action: { type: "navigate", hash: "#about" },
      }),
    );
  }

  for (const g of skills) {
    for (const skill of g.items) {
      items.push(
        entry({
          id: `skill-${g.label}-${skill}`,
          title: skill,
          subtitle: g.label,
          group: "Skills",
          icon: Wrench,
          keywords: [skill, g.label, "skill"],
          action: { type: "navigate", hash: "#skills" },
        }),
      );
    }
  }

  for (const job of experience) {
    items.push(
      entry({
        id: `job-${job.company}`,
        title: `${job.role} at ${job.company}`,
        subtitle: `${job.period} · ${job.location}`,
        group: "Experience",
        icon: Briefcase,
        keywords: [job.company, job.role, job.location, ...job.stack],
        action: { type: "navigate", hash: "#experience" },
      }),
    );
    for (const [i, h] of job.highlights.entries()) {
      items.push(
        entry({
          id: `job-${job.company}-h${i}`,
          title: h,
          subtitle: `${job.company} · ${job.role}`,
          group: "Experience",
          icon: Briefcase,
          keywords: [job.company, job.role, ...job.stack, h],
          action: { type: "navigate", hash: "#experience" },
        }),
      );
    }
  }

  for (const p of projects) {
    items.push(
      entry({
        id: `project-${p.name}`,
        title: p.name,
        subtitle: p.blurb,
        group: "Projects",
        icon: FolderKanban,
        keywords: [p.name, p.blurb, ...p.tags],
        action: p.link
          ? p.link.startsWith("#")
            ? { type: "navigate", hash: p.link }
            : { type: "external", url: p.link }
          : { type: "navigate", hash: "#projects" },
      }),
    );
  }

  for (const c of certifications) {
    items.push(
      entry({
        id: `cert-${c.name}`,
        title: c.name,
        subtitle: c.issuer,
        group: "Certifications",
        icon: Award,
        keywords: [c.name, c.issuer, "certification", "cert"],
        action: { type: "external", url: c.link },
      }),
    );
  }

  for (const e of education) {
    items.push(
      entry({
        id: `edu-${e.institution}`,
        title: e.degree,
        subtitle: `${e.institution} · ${e.period}`,
        group: "Education",
        icon: GraduationCap,
        keywords: [e.institution, e.degree, e.location],
        action: { type: "navigate", hash: "#about" },
      }),
    );
  }

  for (const s of openSourceStacks) {
    items.push(
      entry({
        id: `oss-stack-${s.tech}`,
        title: `${s.name} stack`,
        subtitle: `${s.statusLabel} · ${s.focus}`,
        group: "Open Source",
        icon: Code,
        keywords: [s.name, s.tech, s.status, s.focus, s.statusLabel],
        action: { type: "external", url: s.hubLink },
      }),
    );
  }

  for (const [i, c] of openSourceContributions.entries()) {
    items.push(
      entry({
        id: `oss-pr-${i}`,
        title: c.title,
        subtitle: `${c.stack} · ${c.pr}`,
        group: "Open Source",
        icon: Code,
        keywords: [c.stack, c.title, c.pr, "pr", "pull request"],
        action: { type: "external", url: c.link },
      }),
    );
  }

  return items;
}

export function searchValue(entry: SearchEntry): string {
  return [entry.title, entry.subtitle, entry.group, ...entry.keywords].filter(Boolean).join(" ");
}
