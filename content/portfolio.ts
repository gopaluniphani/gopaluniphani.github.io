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
    title: "Modernizing how software moves",
    theme: "Enterprise platform modernization",
    context:
      "A mature multi-environment application needed to move toward a more portable, maintainable delivery model without disrupting established operational controls.",
    role:
      "Worked across frontend, backend, and delivery concerns to investigate constraints, compare options, and guide an implementation path through review.",
    approach:
      "Separated environment concerns from the application build, clarified system boundaries, and aligned the design with pipeline, runtime, and support needs.",
    capabilities: ["Architecture tradeoffs", "CI/CD", "React", "Spring Boot", "Runtime configuration"],
    outcome:
      "Created a workable modernization path while preserving the controls expected in a reliability-sensitive enterprise environment.",
  },
  {
    number: "02",
    title: "Turning operational wait into flow",
    theme: "Operational tools and performance",
    context:
      "A data-heavy diagnostics experience made time-sensitive investigation slower and harder than it needed to be.",
    role:
      "Traced the experience across UI state, API behavior, data access, and the way operators moved through the workflow.",
    approach:
      "Introduced deliberate state management, caching, pagination, and more efficient data-loading patterns across the stack.",
    capabilities: ["Performance analysis", "React", "Redux Toolkit", "API design", "MongoDB"],
    outcome:
      "Transformed a slow operational workflow into a responsive experience that better supported investigation and decision-making.",
  },
  {
    number: "03",
    title: "Security as a delivery property",
    theme: "Secure backend and API engineering",
    context:
      "Platform features and release pipelines required access controls, protected workflows, and remediation practices that could stand up to enterprise review.",
    role:
      "Contributed across authentication, authorization, API behavior, security remediation, testing, and release readiness.",
    approach:
      "Made controls explicit at system boundaries, paired implementation with verification, and treated pipeline feedback as part of product quality.",
    capabilities: ["AuthN / AuthZ", "Java", "Spring Security", "REST APIs", "Quality gates"],
    outcome:
      "Strengthened secure delivery while keeping application workflows maintainable for engineers and predictable for users.",
  },
  {
    number: "04",
    title: "Agents with judgment built in",
    theme: "AI-assisted engineering workflows",
    context:
      "AI coding tools created leverage, but teams needed repeatable workflows that kept architecture, quality, and human judgment visible.",
    role:
      "Designed reusable agentic workflows spanning discovery, design, implementation, testing, documentation, and security review.",
    approach:
      "Added design-first sequencing, human checkpoints, reusable guidance, explicit constraints, and verification loops instead of treating generation as the finish line.",
    capabilities: ["Agent design", "Human-in-the-loop", "Guardrails", "Developer enablement", "Quality controls"],
    outcome:
      "Made AI-assisted delivery more consistent, reviewable, and useful across different engineering tasks and contributors.",
  },
  {
    number: "05",
    title: "From model notebook to usable system",
    theme: "Applied ML and data systems",
    context:
      "E-commerce and product teams needed analytical models to become dependable inputs for real product and operational decisions.",
    role:
      "Worked across feature engineering, model experimentation, APIs, streaming data, serving, and deployment patterns.",
    approach:
      "Connected model quality to the surrounding system: data contracts, repeatable pipelines, serving behavior, observability, and stakeholder feedback.",
    capabilities: ["Python", "BigQuery", "Kafka", "TensorFlow / PyTorch", "Model serving"],
    outcome:
      "Helped move ML work beyond isolated experiments toward practical, production-oriented data products.",
  },
];

export const capabilityGroups: CapabilityGroup[] = [
  {
    number: "A",
    title: "Product interfaces",
    thesis: "Interfaces that keep complex workflows legible and responsive.",
    technologies: ["TypeScript", "JavaScript", "React", "Next.js", "Redux Toolkit", "Accessible UI"],
  },
  {
    number: "B",
    title: "Service foundations",
    thesis: "Secure, explicit service boundaries built for change.",
    technologies: ["Java", "Spring Boot", "Python", "FastAPI", "Express.js", "REST", "AuthN / AuthZ"],
  },
  {
    number: "C",
    title: "Data and intelligence",
    thesis: "Data systems that connect models to dependable product behavior.",
    technologies: ["SQL", "BigQuery", "PostgreSQL", "MongoDB", "Kafka", "TensorFlow", "PyTorch", "scikit-learn"],
  },
  {
    number: "D",
    title: "Delivery and operations",
    thesis: "Delivery systems designed around reliability, visibility, and recovery.",
    technologies: ["Docker", "Kubernetes", "Cloud Foundry", "GitHub Actions", "CI/CD", "NGINX", "Operational tooling"],
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
