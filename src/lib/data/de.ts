import { SiteData } from "@/types";

const siteDataDe: SiteData = {
  name: "Le Quoc Anh Tran",
  title: "Backend Software Engineer",
  introduction:
    "Backend-Entwickler mit über 6 Jahren Erfahrung im Aufbau verteilter Microservice-Architekturen und cloudbasierter SaaS-Anwendungen. Fokus auf TypeScript, NestJS und PostgreSQL — Entwurf performanter RESTful APIs und skalierbarer Backend-Systeme.",
  email: "lequocanhtr@gmail.com",
  github: "https://github.com/Al0ngsy",
  linkedin: "https://linkedin.com/in/lequocanhtr",
  philosophy:
    "Ich glaube, dass großartige Backend-Systeme auf drei Säulen ruhen: Einfachheit, Zuverlässigkeit und tiefem Verständnis der Domäne. Jede API sollte intuitiv sein, jede Datenbankabfrage bewusst, und jedes System sollte so gestaltet sein, dass es ohne technische Schulden wachsen kann.",
  careerSummary:
    "Backend Software Engineer mit über 6 Jahren Erfahrung im gesamten Backend-Stack — von Zahlungsintegrationen und Authentifizierungssystemen über CMS-Plattformen und öffentliche APIs bis hin zu KI-gestützten Diensten. Ich habe an einer B2B-SaaS-Video-on-Demand-Plattform für mehrere Unternehmenskunden gearbeitet, die jährlich über 100.000 Zahlungsvorgänge verarbeitet. Aktuell fokussiert auf die Entwicklung KI-integrierter Backend-Services mit NestJS, LangChain und OpenAI.",
  projects: [
    {
      title: "KI-Microservice",
      description:
        "Ein REST-API-Microservice für KI-Funktionen mit Retrieval-Augmented Generation (RAG), Embeddings und Tool/Function Calling.",
      problem:
        "Die Plattform benötigte intelligente Funktionen — semantische Suche, Dokument-Fragenbeantwortung und KI-gestützte Workflows — hatte aber keine bestehende KI-Infrastruktur.",
      solution:
        "Entwurf und Aufbau eines NestJS-basierten Microservices mit LangChain, OpenAI API, pgvector für Vektorspeicherung und einer RAG-Pipeline. Implementierung von Tool-Calling- und Function-Calling-Patterns für strukturierte KI-Interaktionen.",
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
        "Balance zwischen Antwortqualität und Latenz sowie Entwurf einer Embedding-Pipeline, die mit sich ändernden Informationen synchronisiert bleibt.",
      lessons:
        "RAG-Pipelines erfordern sorgfältige Chunking-Strategien und Prompt Engineering. Vektorsuche allein reicht nicht — hybride Retrieval-Methoden (Keyword + semantisch) liefern bessere Ergebnisse. Deduplizierung ist unerlässlich, um redundante Informationen in Antworten zu vermeiden.",
    },
    {
      title: "PostgreSQL-Migrationsframework",
      description:
        "Ein optimierter Migrationsprozess für Produktions-PostgreSQL-Datenbanken mit automatischer Schema-Rekonziliation und Änderungsverfolgung.",
      problem:
        "Bestehende Datenbankmigrationen verursachten häufig Deadlocks in der Produktion, die die Stabilität störten und Deployments unvorhersehbar machten.",
      solution:
        "Entwicklung eines Migrationsframeworks mit automatischer Schema-Rekonziliation, Änderungsverfolgung und Leistungsoptimierungen. Reduzierte Ausfallzeiten und machte Migrationen zuverlässig und wiederholbar.",
      technologies: ["PostgreSQL", "TypeScript", "Node.js", "Database Design"],
      challenges:
        "Zero-Downtime-Migrationen auf live Produktionsdatenbanken mit Millionen von Zeilen ohne Tabellensperren.",
      lessons:
        "Datenbankmigrationen in der Produktion erfordern einen völlig anderen Ansatz als in der Entwicklung. Batching, Lock-free-Strategien und umfassende Rollback-Pläne sind essenziell.",
    },
    {
      title: "B2B SaaS VOD-Plattform Backend",
      description:
        "Kern-Backend-Services für eine Multi-Tenant-Video-on-Demand-Plattform für Unternehmenskunden inklusive Samsung und Waipu.",
      problem:
        "Mehrere B2B-Kunden benötigten ein einheitliches Backend, das unterschiedliche Content-Ingestion, Zahlungsmodelle (SVOD, TVOD, EST) und Drittanbieter-Integrationen bewältigen konnte.",
      solution:
        "Entwicklung und Wartung eines umfassenden Backend-Service-Stacks inklusive CMS, Zahlungsservices (PayPal, Stripe, Apple/Google/Amazon/Roku IAP), Reporting und einer öffentlichen RESTful Feed API für externe Partner.",
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
        "Gleichzeitige Unterstützung mehrerer Zahlungsanbieter und Abo-Modelle bei gleichzeitiger Wartung einer sauberen Event-Driven-Architektur.",
      lessons:
        "Event-Driven-Architekturen mit Webhooks und Message-Queues sind essenziell für die Zahlungsabwicklung. Idempotenz ist unverhandelbar bei der Verarbeitung finanzieller Transaktionen.",
    },
    {
      title: "Optionshandels-Plattform Prototyp",
      description:
        "Ein Full-Stack-Prototyp für eine Optionshandels-Plattform mit Microservice-Backend, Datenbankdesign und Monitoring-Dashboard.",
      problem:
        "Das Unternehmen wollte Optionshandel als neue Produktlinie erkunden, benötigte aber einen schnellen Prototyp zur Validierung der technischen Machbarkeit.",
      solution:
        "Aufbau eines Prototyps mit der Alpaca Trading API für Marktdaten und Orderausführung, Prisma ORM für typsicheren Datenbankzugriff und einem Microservice-Backend mit Monitoring-Dashboard.",
      technologies: [
        "TypeScript",
        "Node.js",
        "Prisma ORM",
        "PostgreSQL",
        "Alpaca API",
        "Microservices",
      ],
      challenges:
        "Echtzeit-Verarbeitung von Marktdaten und Gewährleistung der Orderausführungszuverlässigkeit unter simulierter Last.",
      lessons:
        "Handelssysteme haben einzigartige Anforderungen an Idempotenz, Audit-Logging und Exactly-Once-Verarbeitung, die sich signifikant von Standard-CRUD-Anwendungen unterscheiden.",
    },
  ],
  experience: [
    {
      title: "Software Developer",
      company: "simpleTechs GmbH",
      period: "Jul 2024 — Heute",
      description:
        "Entwurf und Implementierung von REST-API-Microservices für KI-gestützte Funktionen mit NestJS, LangChain und OpenAI API. Entwicklung optimierter PostgreSQL-Migrationsprozesse, Aufbau von Backend-Services für eine Goldhandelsplattform und Prototyp einer Optionshandelsplattform. Automatisierte Tests mit Jest und CI/CD-Pipelines via Docker und Bitbucket Pipelines.",
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
      title: "Werkstudent — Softwareentwicklung",
      company: "simpleTechs GmbH",
      period: "Sep 2019 — Jun 2024",
      description:
        "Beiträge zum gesamten Backend-Stack einer B2B-SaaS-VOD-Plattform. Erweiterung der CMS-Funktionen mit automatisierter Content-Ingestion aus AWS S3. Entwicklung Event-Driven-Zahlungs-Workflows mit 100K+ Transaktionen/Jahr über PayPal, Stripe und große App-Store-IAPs. Entwurf und Wartung einer öffentlichen RESTful Feed API für Partner inklusive Samsung und Waipu. Optimierung von Datenbankschemas, Queries und Reporting-Funktionen.",
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
      category: "Sprachen",
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
      category: "Datenbanken",
      items: [
        "PostgreSQL",
        "pgvector",
        "Prisma ORM",
        "Database Design",
        "Query Optimization",
      ],
    },
    {
      category: "KI & ML",
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
      category: "Lernen",
      items: ["Python", "C#"],
    },
  ],
};

export default siteDataDe;