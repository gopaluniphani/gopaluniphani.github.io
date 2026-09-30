export type TimelineEntry = {
  period: string;
  chapter: string;
  role: string;
  organization: string;
  summary: string;
  capabilities: string[];
};

export type CaseStudy = {
  number: string;
  title: string;
  theme: string;
  context: string;
  role: string;
  approach: string;
  capabilities: string[];
  outcome: string;
};

export type CapabilityGroup = {
  number: string;
  title: string;
  thesis: string;
  technologies: string[];
};

export const profile = {
  name: "Phani Gopaluni",
  location: "Austin, Texas",
  email: "gopaluniphani@gmail.com",
  linkedin: "https://www.linkedin.com/in/phani-g/",
  headline: "I build software that earns trust under real-world constraints.",
  introduction:
    "I’m a software engineer working across enterprise platforms, full-stack products, data systems, and AI-enabled delivery. My focus is practical: make complex systems clearer, safer, and easier for people to operate.",
};

// Selected hero direction with approved job-search positioning.
export const hero = {
  kicker: "Software systems · Product engineering · Applied AI",
  introduction: "I’m a software engineer with experience across enterprise platforms, full-stack products, and applied AI. I build reliable systems and work with teams to make complex software easier to use and maintain.",
  availability: "Open to full-time software engineering roles",
};

export const timeline: TimelineEntry[] = [
  {
    period: "2019 — 2020",
    chapter: "Foundations",
    role: "Security and ML internships",
    organization: "Early industry exposure",
    summary:
      "I explored security, data analysis, and machine learning through hands-on prototypes, learning to connect technical experiments to real user problems.",
    capabilities: ["Security fundamentals", "Python + ML", "React prototypes"],
  },
  {
    period: "2021 — 2023",
    chapter: "Systems at scale",
    role: "Backend Engineer → Data Science Engineer",
    organization: "Quinbay Technologies",
    summary:
      "I moved from backend services into production data and ML for e-commerce, learning how APIs, streaming systems, and model deployment fit together.",
    capabilities: ["Backend systems", "Data products", "MLOps"],
  },
  {
    period: "2023 — 2024",
    chapter: "Product breadth",
    role: "Full-stack Developer / ML Engineer",
    organization: "University of Cincinnati ITAC",
    summary:
      "I built full-stack product features and secure account flows while taking on technical mentorship and working across teams.",
    capabilities: ["Full-stack delivery", "Technical mentorship", "Applied AI"],
  },
  {
    period: "2025 — Now",
    chapter: "Enterprise platforms",
    role: "Enterprise Platform Engineer",
    organization: "Infosys · enterprise client work",
    summary:
      "I work on enterprise platform features, modernization, and release readiness, with a focus on reliability, secure delivery, and AI-assisted engineering workflows.",
    capabilities: ["Platform reliability", "Secure delivery", "AI-assisted workflows"],
  },
];

export const caseStudies: CaseStudy[] = [
  {
    number: "01",
    title: "Loading the data users need first",
    theme: "Operational diagnostics · Frontend performance",
    context:
      "A diagnostics page waited for a large set of live results before becoming useful. Support users needed to start investigating without loading every detail up front.",
    role:
      "I redesigned the React interface's state and loading behavior using Redux Toolkit, pagination, and reuse of previously viewed results.",
    approach:
      "I separated the initial list from detailed results and loaded diagnostics for the visible page. Previously viewed pages stayed available, with an explicit refresh action so users could choose when to request fresh data.",
    capabilities: ["React", "Redux Toolkit", "Progressive loading", "Pagination", "State management"],
    outcome:
      "Users could begin reviewing the selected page without waiting for the entire dataset. I applied the same loading approach across the diagnostic views, making investigation and return visits more responsive.",
  },
  {
    number: "02",
    title: "Building a secure, guided workflow product",
    theme: "Product development · Full-stack engineering",
    context:
      "A guided learning product needed structured, branching conversations alongside secure accounts and a custom web interface.",
    role:
      "I built features across React, Express, PostgreSQL, and Botpress OSS. I took ownership of authentication and account management, including password reset, sessions, roles, and authenticator-based two-factor authentication.",
    approach:
      "I connected the custom interface and backend APIs to conversation flows that followed defined rules and user choices. I implemented the account lifecycle and refined product features in response to user acceptance testing.",
    capabilities: ["React", "Express", "PostgreSQL", "Botpress OSS", "TOTP / 2FA"],
    outcome:
      "The product reached user acceptance testing and was close to release when my involvement ended. My contribution combined the account-management system with features across the guided product experience.",
  },
  {
    number: "03",
    title: "Taking image models into production",
    theme: "ML platforms · Backend engineering",
    context:
      "An e-commerce catalog team needed image-quality checks and product attributes in a form its publishing workflow could use.",
    role:
      "I owned model-serving and orchestration services, deployment, and ongoing operations. I later expanded into model fine-tuning alongside the data-science team.",
    approach:
      "I built Python services with FastAPI and Ray Serve, coordinated inference, and combined model outputs into usable results. I worked on batching, monitoring, and deployment so the models could be operated as a production system.",
    capabilities: ["Python", "FastAPI", "Ray Serve", "Kafka", "Docker", "Model serving"],
    outcome:
      "The services supported production catalog image qualification and metadata enrichment. My work extended beyond serving predictions to maintaining the running system and bringing additional model capabilities into it.",
  },
  {
    number: "04",
    title: "Turning purchase history into recommendations",
    theme: "Recommendation systems · Applied ML",
    context:
      "An e-commerce experience relied on manually curated product suggestions. The team needed recommendations informed by what customers were likely to buy.",
    role:
      "I developed SQL features, trained and compared purchase-likelihood models in BigQuery ML, and implemented filtering and ranking. I collaborated with a team lead on complex queries and validation.",
    approach:
      "I evaluated order history and category affinity, used feature importance to remove weaker inputs, and filtered unsuitable candidates before ranking. I delivered the recommendations as a repeatable batch output for the product team.",
    capabilities: ["SQL", "BigQuery", "BigQuery ML", "XGBoost", "Feature engineering"],
    outcome:
      "The rankings were used in the customer-facing recommendation experience. The project connected model development to a usable product output, with a repeatable delivery process for downstream teams.",
  },
];

export const capabilityGroups: CapabilityGroup[] = [
  {
    number: "A",
    title: "Responsive product interfaces",
    thesis: "I turn data-heavy workflows into responsive React interfaces with deliberate state, pagination, and progressive loading.",
    technologies: ["React", "TypeScript", "Redux Toolkit", "JavaScript", "Next.js"],
  },
  {
    number: "B",
    title: "Secure backend services",
    thesis: "I build APIs and account flows across Java and Python services—from authentication and access rules to model-serving endpoints.",
    technologies: ["Spring Boot", "Python", "FastAPI", "Java", "Express", "REST APIs"],
  },
  {
    number: "C",
    title: "Data & production ML",
    thesis: "I connect SQL features and ranking models to product workflows, and operate the services that deliver model predictions.",
    technologies: ["PostgreSQL", "Kafka", "BigQuery", "SQL", "Ray Serve", "XGBoost", "MongoDB"],
  },
  {
    number: "D",
    title: "Delivery & platform engineering",
    thesis: "I work across deployment, runtime configuration, monitoring, and release readiness to keep software maintainable in production.",
    technologies: ["Docker", "GitHub Actions", "Kubernetes", "CI/CD", "Cloud Foundry", "NGINX"],
  },
];

export const projectPlaceholders = [
  {
    number: "01",
    label: "Public build",
    title: "Your strongest shipped side project",
    description: "Add a verified repository, live demo, the problem it solves, your role, and two or three technical decisions.",
  },
  {
    number: "02",
    label: "Technical experiment",
    title: "A focused engineering exploration",
    description: "Add a small, inspectable experiment that demonstrates system design, AI workflows, platform work, or applied ML.",
  },
  {
    number: "03",
    label: "Field note",
    title: "A useful technical write-up",
    description: "Add a concise article that shows how you reason about a difficult tradeoff, incident, architecture, or developer workflow.",
  },
];

export const principles = [
  ["01", "Make the system legible", "Clear boundaries and observable behavior make software easier to operate and safer to change."],
  ["02", "Design for review", "The best engineering work makes assumptions, tradeoffs, and verification visible to other people."],
  ["03", "Treat delivery as product", "Build, test, release, and recovery paths shape the quality users actually experience."],
];
