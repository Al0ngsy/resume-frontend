export interface Message {
  role: "user" | "assistant";
  content: string;
}

export const suggestedQuestions = [
  "What technologies does Le Quoc Anh work with?",
  "Tell me about his experience with NestJS",
  "What projects has he worked on?",
  "Describe his backend architecture experience.",
  "How does he use AI and LLMs in production?",
  "What's his experience with PostgreSQL and database optimization?",
  "How does he handle payment integrations?",
  "What's his approach to testing and CI/CD?",
  "Tell me about his experience with Docker and Kubernetes",
  "What is his work philosophy?",
  "How many years of experience does he have?",
  "Is he open to remote work or relocation?",
];

export const STORAGE_KEY = "recruiter-chat-conversation-id";