const sessionLibrary = {
  "ai-service-request": {
    id: "ai-service-request",
    title: "Build an AI service request assistant",
    strapline: "From intake to orchestration for internal support workflows",
    track: "AI and agents",
    audience: "Architects",
    duration: "52 min",
    date: "April 18, 2026",
    hosts: "Mia Chen and Daniel Reeves",
    outcome: "Working intake UI, orchestration map, approval path, and repo handoff",
    level: "Intermediate",
    description:
      "A hands-on walkthrough for shaping an intake flow with agent prompts, approvals, and routing rules. The session focuses on how to keep the first release practical while still showing a believable agentic workflow.",
    summary:
      "This episode shows how a technical team can move from a vague request-management idea to a specific implementation path with clear decisions around prompts, orchestration, escalation, and governance.",
    videoId: "BIL-001",
    thumbnailTheme: "theme-ai",
    repoLink: "#repo-ai-service-request",
    watchLink: "#watch-ai-service-request",
    slidesLink: "#slides-ai-service-request",
    notesLink: "#notes-ai-service-request",
    topics: ["AI intake", "Approvals", "Routing", "Ops workflows"],
    takeaways: [
      "Structure intake so the assistant improves triage instead of replacing process logic.",
      "Use orchestration to separate prompt logic from approval and routing rules.",
      "Define a first release that can be demoed and extended without redesign."
    ],
    assets: [
      "Starter repo with intake UI and service request model",
      "Prompt and orchestration notes",
      "Architecture diagram for request routing"
    ],
    questions: [
      {
        author: "Jordan P.",
        role: "Solutions architect",
        text: "How much of the approval logic would you keep in the app versus pushing into a workflow service?"
      },
      {
        author: "Megan T.",
        role: "Platform lead",
        text: "Would you start with retrieval for policy answers in v1, or keep the assistant focused on structured tasks first?"
      }
    ],
    related: ["ai-blueprint-starter", "onboarding-automation"]
  },
  "lob-integration": {
    id: "lob-integration",
    title: "Connect a line-of-business app to core systems",
    strapline: "A practical integration-first build for real operational data",
    track: "Integrations",
    audience: "Developers",
    duration: "41 min",
    date: "April 11, 2026",
    hosts: "Priya Nair",
    outcome: "API mapping, sync job scaffolding, and integration design notes",
    level: "Intermediate",
    description:
      "A practical build showing how to shape APIs, map data, and create a manageable sync workflow between an operational app and core enterprise systems.",
    summary:
      "This session covers the unglamorous but important work of integration planning: field mapping, retry behavior, sync ownership, and where to draw boundaries in a first release.",
    videoId: "BIL-002",
    thumbnailTheme: "theme-integration",
    repoLink: "#repo-lob-integration",
    watchLink: "#watch-lob-integration",
    slidesLink: "#slides-lob-integration",
    notesLink: "#notes-lob-integration",
    topics: ["APIs", "Data sync", "Mapping", "Operational systems"],
    takeaways: [
      "Model sync ownership early so the app remains maintainable.",
      "Design integration jobs around recovery and visibility, not just happy-path success.",
      "Keep the first build narrow enough to validate the system boundary."
    ],
    assets: [
      "Integration scaffold repo",
      "Field mapping worksheet",
      "Operational retry pattern notes"
    ],
    questions: [
      {
        author: "Alex M.",
        role: "Engineer",
        text: "Would you expose the sync job status directly in the admin UI for first-line support teams?"
      }
    ],
    related: ["identity-governance", "case-management-portal"]
  },
  "onboarding-automation": {
    id: "onboarding-automation",
    title: "Automate a new-employee onboarding flow",
    strapline: "Task orchestration, approvals, and operational visibility",
    track: "Automation",
    audience: "Technical leads",
    duration: "48 min",
    date: "April 4, 2026",
    hosts: "Sofia Martinez",
    outcome: "Approval workflow, notifications, dashboard shell, and starter repo",
    level: "Beginner to intermediate",
    description:
      "A build focused on approvals, task orchestration, and making a cross-team process easier to run without relying on brittle email handoffs.",
    summary:
      "This session is meant to feel like a realistic first automation project: high visibility, clear stakeholders, and enough complexity to demonstrate orchestration without becoming a platform rewrite.",
    videoId: "BIL-003",
    thumbnailTheme: "theme-automation",
    repoLink: "#repo-onboarding-automation",
    watchLink: "#watch-onboarding-automation",
    slidesLink: "#slides-onboarding-automation",
    notesLink: "#notes-onboarding-automation",
    topics: ["Automation", "Approvals", "HR workflows", "Notifications"],
    takeaways: [
      "Automate the handoffs that slow teams down before polishing every edge case.",
      "Build operational visibility into the workflow from day one.",
      "Use this pattern as a starter for other approval-driven processes."
    ],
    assets: [
      "Workflow starter repo",
      "Notification matrix",
      "Operational dashboard wireframe"
    ],
    questions: [
      {
        author: "Chris V.",
        role: "Delivery manager",
        text: "How would you handle regional onboarding variations without turning the process model into a maze?"
      }
    ],
    related: ["ai-service-request", "case-management-portal"]
  },
  "case-management-portal": {
    id: "case-management-portal",
    title: "Build a responsive case management portal",
    strapline: "A cleaner app experience for status visibility and task handling",
    track: "Experience and apps",
    audience: "Developers",
    duration: "36 min",
    date: "March 28, 2026",
    hosts: "Elena Brooks",
    outcome: "Responsive shell, dashboard cards, and case-status UI patterns",
    level: "Beginner",
    description:
      "A practical app-focused session centered on navigation, case status visibility, and responsive layouts that still feel enterprise-ready.",
    summary:
      "This session focuses less on deep architecture and more on how to make a realistic first application feel polished, navigable, and immediately useful for business users.",
    videoId: "BIL-004",
    thumbnailTheme: "theme-experience",
    repoLink: "#repo-case-management-portal",
    watchLink: "#watch-case-management-portal",
    slidesLink: "#slides-case-management-portal",
    notesLink: "#notes-case-management-portal",
    topics: ["Responsive UI", "Case dashboards", "UX patterns", "First apps"],
    takeaways: [
      "Focus first on visibility, state clarity, and navigational confidence.",
      "Use a compact, repeatable design system for operational applications.",
      "Treat responsiveness as part of the default build path, not a later task."
    ],
    assets: [
      "Responsive app repo",
      "UI component notes",
      "Case status pattern guide"
    ],
    questions: [
      {
        author: "Rachel H.",
        role: "Frontend engineer",
        text: "Do you recommend separate mobile layouts here, or just a flexible dashboard stack for v1?"
      }
    ],
    related: ["lob-integration", "onboarding-automation"]
  },
  "ai-blueprint-starter": {
    id: "ai-blueprint-starter",
    title: "Turn an AI blueprint into a scoped starter build",
    strapline: "From abstract roadmap to concrete technical milestone",
    track: "AI and agents",
    audience: "Technical leads",
    duration: "44 min",
    date: "March 21, 2026",
    hosts: "Daniel Reeves",
    outcome: "Feasibility checklist, starter scope, and technical next-step plan",
    level: "Strategy to implementation",
    description:
      "A session about translating abstract AI ideas into a sequence of real technical decisions and a practical first milestone.",
    summary:
      "This walkthrough helps teams avoid vague AI planning by anchoring the conversation in use-case fit, workflow boundaries, operational constraints, and what deserves to be built first.",
    videoId: "BIL-005",
    thumbnailTheme: "theme-ai-alt",
    repoLink: "#repo-ai-blueprint-starter",
    watchLink: "#watch-ai-blueprint-starter",
    slidesLink: "#slides-ai-blueprint-starter",
    notesLink: "#notes-ai-blueprint-starter",
    topics: ["Blueprinting", "Feasibility", "Scoping", "AI roadmap"],
    takeaways: [
      "Use blueprints to narrow a build path, not just inspire one.",
      "Scope the first implementation around operational learning and measurable value.",
      "Document technical assumptions before committing to architecture."
    ],
    assets: [
      "Blueprint-to-build worksheet",
      "Scoping checklist",
      "Starter repo outline"
    ],
    questions: [
      {
        author: "Nadia S.",
        role: "Enterprise architect",
        text: "What signals tell you a team should do a blueprint session before asking for a demo?"
      }
    ],
    related: ["ai-service-request", "identity-governance"]
  },
  "identity-governance": {
    id: "identity-governance",
    title: "Wire identity and governance into a first solution",
    strapline: "SSO, roles, and enterprise controls early in the build path",
    track: "Integrations",
    audience: "Architects",
    duration: "39 min",
    date: "March 14, 2026",
    hosts: "Marcus Lee",
    outcome: "Identity integration notes, role model, and governance-first setup",
    level: "Advanced foundation",
    description:
      "A session on shaping SSO, user roles, and enterprise controls early instead of adding them at the end when they are hardest to retrofit.",
    summary:
      "This is the session for teams that want to move fast without creating a governance problem later. It focuses on sensible identity boundaries and a first role model that scales.",
    videoId: "BIL-006",
    thumbnailTheme: "theme-governance",
    repoLink: "#repo-identity-governance",
    watchLink: "#watch-identity-governance",
    slidesLink: "#slides-identity-governance",
    notesLink: "#notes-identity-governance",
    topics: ["SSO", "Roles", "Governance", "Enterprise setup"],
    takeaways: [
      "Model identity and role boundaries before teams expand the app footprint.",
      "Treat governance as a product requirement, not an admin afterthought.",
      "Use the first implementation to prove operational controls as well as user value."
    ],
    assets: [
      "Identity starter repo",
      "Role model template",
      "Governance setup notes"
    ],
    questions: [
      {
        author: "Ben C.",
        role: "Security engineer",
        text: "How much role complexity do you allow in the first release before you force consolidation?"
      }
    ],
    related: ["lob-integration", "ai-blueprint-starter"]
  }
};
