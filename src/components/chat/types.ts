import type { Locale } from "@/i18n/config";

export interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean; // true while assistant tokens are being received
}

export const suggestedQuestionsByLocale: Record<Locale, string[]> = {
  en: [
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
  ],
  de: [
    "Mit welchen Technologien arbeitet Le Quoc Anh?",
    "Erzählen Sie mir von seiner Erfahrung mit NestJS",
    "An welchen Projekten hat er gearbeitet?",
    "Beschreiben Sie seine Backend-Architektur-Erfahrung.",
    "Wie setzt er KI und LLMs in Produktion ein?",
    "Wie ist seine Erfahrung mit PostgreSQL und Datenbankoptimierung?",
    "Wie geht er mit Zahlungsintegrationen um?",
    "Wie ist sein Ansatz für Testing und CI/CD?",
    "Erzählen Sie mir von seiner Erfahrung mit Docker und Kubernetes",
    "Was ist seine Arbeitsphilosophie?",
    "Wie viele Jahre Erfahrung hat er?",
    "Ist er offen für Remote-Arbeit oder Umzug?",
  ],
  vi: [
    "Le Quoc Anh làm việc với những công nghệ nào?",
    "Kể về kinh nghiệm NestJS của anh ấy",
    "Anh ấy đã làm những dự án nào?",
    "Mô tả kinh nghiệm kiến trúc backend của anh ấy.",
    "Anh ấy dùng AI và LLM trong production như thế nào?",
    "Kinh nghiệm với PostgreSQL và tối ưu database của anh ấy?",
    "Anh ấy xử lý tích hợp thanh toán như thế nào?",
    "Cách tiếp cận của anh ấy với testing và CI/CD?",
    "Kể về kinh nghiệm Docker và Kubernetes của anh ấy",
    "Triết lý làm việc của anh ấy là gì?",
    "Anh ấy có bao nhiêu năm kinh nghiệm?",
    "Anh ấy có sẵn sàng làm remote hoặc chuyển nơi làm không?",
  ],
};

export const STORAGE_KEY = "recruiter-chat-conversation-id";