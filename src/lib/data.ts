import { SiteData } from "@/types";

const siteData: SiteData = {
  name: "Le Quoc Anh Tran",
  title: "Backend Software Engineer",
  introduction:
    "Backend developer with over 6 years of experience building distributed microservice architectures and cloud-based SaaS applications. Focused on TypeScript, NestJS, and PostgreSQL — designing performant RESTful APIs and scalable backend systems.",
  email: "lequocanhtr@gmail.com",
  github: "https://github.com/Al0ngsy",
  linkedin: "https://linkedin.com/in/lequocanhtr",
  philosophy:
    "I believe great backend systems are built on three pillars: simplicity, reliability, and deep understanding of the domain. Every API should be intuitive, every database query should be intentional, and every system should be designed to grow gracefully without accumulating technical debt.",
  careerSummary:
    "Backend Software Engineer with 6+ years of experience across the full backend stack — from payment integrations and authentication systems to CMS platforms, public APIs, and AI-powered services. I've worked on a B2B SaaS video-on-demand platform serving multiple enterprise clients, processing over 100,000 payment transactions annually. Currently focused on building AI-integrated backend services using NestJS, LangChain, and OpenAI.",
  projects: [
    {
      title: "AI Microservice",
      description:
        "A REST API microservice powering AI features with Retrieval-Augmented Generation (RAG), embeddings, and tool/function calling.",
      problem:
        "The platform needed intelligent features — semantic search, document Q&A, and AI-assisted workflows — but had no existing AI infrastructure.",
      solution:
        "Designed and built a NestJS-based microservice using LangChain, OpenAI API, pgvector for vector storage, and a RAG pipeline. Implemented tool-calling and function-calling patterns for structured AI interactions.",
      technologies: [
        "NestJS",
        "TypeScript",
        "LangChain",
        "OpenAI API",
        "pgvector",
        "PostgreSQL",
        "RAG",
      ],
      challenges:
        "Balancing response quality with latency, and designing an embedding pipeline that stays in sync with changing informations.",
      lessons:
        "RAG pipelines require careful chunking strategies and prompt engineering. Vector search alone isn't enough — hybrid retrieval (keyword + semantic) yields better results. Deduplication is a must to avoid redundant information in responses.",
    },
    {
      title: "PostgreSQL Migration Framework",
      description:
        "An optimized migration process for production PostgreSQL databases with automatic schema reconciliation and change tracking.",
      problem:
        "Existing database migrations caused frequent deadlocks on production, disrupting stability and making deployments unpredictable.",
      solution:
        "Developed a migration framework with automatic schema reconciliation, change tracking, and performance optimizations. Reduced downtime and made migrations reliable and repeatable.",
      technologies: ["PostgreSQL", "TypeScript", "Node.js", "Database Design"],
      challenges:
        "Handling zero-downtime migrations on live production databases with millions of rows without locking tables.",
      lessons:
        "Database migrations in production require a completely different approach than development. Batching, lock-free strategies, and comprehensive rollback plans are essential.",
    },
    {
      title: "B2B SaaS VOD Platform Backend",
      description:
        "Core backend services for a multi-tenant video-on-demand platform serving enterprise clients including Samsung and Waipu.",
      problem:
        "Multiple B2B clients needed a unified backend that could handle diverse content ingestion, payment models (SVOD, TVOD, EST), and third-party integrations.",
      solution:
        "Developed and maintained a comprehensive backend service stack including CMS, payment services (PayPal, Stripe, Apple/Google/Amazon/Roku IAP), reporting, and a public RESTful Feed API for external partners.",
      technologies: [
        "NestJS",
        "TypeScript",
        "PostgreSQL",
        "React Admin",
        "Google Pub/Sub",
        "AWS S3",
        "Docker",
        "Kubernetes",
      ],
      challenges:
        "Supporting multiple payment providers and subscription models simultaneously while maintaining a clean event-driven architecture.",
      lessons:
        "Event-driven architectures with webhooks and message queues are essential for payment processing. Idempotency is non-negotiable when handling financial transactions.",
    },
    {
      title: "Options Trading Platform Prototype",
      description:
        "A full-stack prototype for an options trading platform with microservice backend, database design, and monitoring dashboard.",
      problem:
        "The business wanted to explore options trading as a new product line, but needed a rapid prototype to validate technical feasibility.",
      solution:
        "Built a prototype using the Alpaca Trading API for market data and order execution, Prisma ORM for type-safe database access, and a microservice backend with a monitoring dashboard.",
      technologies: [
        "TypeScript",
        "Node.js",
        "Prisma ORM",
        "PostgreSQL",
        "Alpaca API",
        "Microservices",
      ],
      challenges:
        "Real-time market data processing and ensuring order execution reliability under simulated load.",
      lessons:
        "Trading systems have unique requirements around idempotency, audit logging, and exactly-once processing that differ significantly from standard CRUD applications.",
    },
  ],
  experience: [
    {
      title: "Software Developer",
      company: "simpleTechs GmbH",
      period: "Jul 2024 — Present",
      description:
        "Designing and implementing REST API microservices for AI-powered features using NestJS, LangChain, and OpenAI API. Developed optimized PostgreSQL migration processes, built backend services for a gold trading platform, and prototyped an options trading platform. Automated testing with Jest and managed CI/CD pipelines via Docker and Bitbucket Pipelines.",
      technologies: [
        "NestJS",
        "TypeScript",
        "LangChain",
        "OpenAI",
        "PostgreSQL",
        "pgvector",
        "Docker",
        "Kubernetes",
        "Helm",
        "Jest",
      ],
    },
    {
      title: "Working Student — Software Development",
      company: "simpleTechs GmbH",
      period: "Sep 2019 — Jun 2024",
      description:
        "Contributed to the full backend stack of a B2B SaaS VOD platform. Extended CMS features with automated content ingestion from AWS S3. Developed event-driven payment workflows handling 100K+ transactions/year across PayPal, Stripe, and major app store IAPs. Designed and maintained a public RESTful Feed API for partners including Samsung and Waipu. Optimized database schemas, queries, and reporting functionalities.",
      technologies: [
        "TypeScript",
        "PostgreSQL",
        "React Admin",
        "Google Pub/Sub",
        "AWS S3",
        "PayPal",
        "Stripe",
        "Docker",
      ],
    },
  ],
  skills: [
    {
      category: "Languages",
      items: ["TypeScript", "JavaScript", "SQL", "PL/pgSQL"],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "NestJS",
        "REST APIs",
        "Microservices",
        "Event-Driven Architecture",
      ],
    },
    {
      category: "Databases",
      items: [
        "PostgreSQL",
        "pgvector",
        "Prisma ORM",
        "Database Design",
        "Query Optimization",
      ],
    },
    {
      category: "AI & ML",
      items: ["LangChain", "OpenAI API", "RAG", "Embeddings", "LLMs"],
    },
    {
      category: "Cloud & DevOps",
      items: [
        "Docker",
        "Kubernetes",
        "Helm",
        "AWS S3",
        "Google Pub/Sub",
        "Bitbucket Pipelines",
        "CI/CD",
      ],
    },
    {
      category: "Frontend",
      items: ["React", "React Admin", "Vite"],
    },
    {
      category: "Testing",
      items: ["Jest", "Unit Testing", "Integration Testing"],
    },
    {
      category: "Learning",
      items: ["Python", "C#"],
    },
  ],
};

export default siteData;
