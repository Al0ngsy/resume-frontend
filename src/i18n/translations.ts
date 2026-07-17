import type { Locale } from "./config";

/**
 * UI string translations — short labels, headings, and messages that appear
 * in the chrome of the site (nav, buttons, section headings, etc.).
 *
 * Long-form content (bio, project descriptions, experience) lives in
 * src/lib/data/{en,de,vi}.ts and is served per-locale via useSiteData().
 */
export type Translation = {
  nav: {
    home: string;
    about: string;
    projects: string;
    resume: string;
    contact: string;
  };
  hero: {
    viewProjects: string;
    getInTouch: string;
  };
  home: {
    featuredProjects: string;
    featuredProjectsSubtitle: string;
    skills: string;
    skillsSubtitle: string;
    chatTitle: string;
    chatSubtitleLive: (name: string) => string;
    chatSubtitlePlaceholder: (name: string) => string;
    askPrompt: string;
  };
  about: {
    title: string;
    experience: string;
    technologies: string;
  };
  projects: {
    title: string;
    subtitle: string;
    problem: string;
    solution: string;
    challengesLessons: string;
    code: string;
    live: string;
  };
  resume: {
    title: string;
    subtitle: string;
    downloadCvDe: string;
    downloadCvEn: string;
    professionalExperience: string;
    skills: string;
  };
  contact: {
    title: string;
    subtitle: string;
    github: string;
    linkedin: string;
  };
  footer: {
    copyright: string;
    frontend: string;
    backend: string;
  };
  chat: {
    aiAgentSuffix: string; // appended after name, e.g. "'s AI Agent"
    aiAgentSubtitle: string; // prepended before name, ends with space
    placeholder: string;
    wakingUp: string;
    wakingUpPlaceholder: string;
    suggestedQuestions: string;
    suggestedQuestionsLeft: (n: number) => string;
    askToStart: string;
    errorTitle: string;
    errorMessage: string;
    disclaimer: string; // before contact link
    disclaimerContactPrefix: string; // before name
    disclaimerContactSuffix: string; // after name + link
    rateLimitMessage: string;
    connectionError: string;
    placeholderTitlePrefix: string; // before name
    placeholderTitleSuffix: string; // after name
    placeholderBodyPrefix: string; // before name
    placeholderBodySuffix: string; // after name, before "."
    underProgress: string;
  };
};

const en: Translation = {
  nav: {
    home: "Home",
    about: "About",
    projects: "Projects",
    resume: "Resume",
    contact: "Contact",
  },
  hero: {
    viewProjects: "View Projects",
    getInTouch: "Get in Touch",
  },
  home: {
    featuredProjects: "Featured Projects",
    featuredProjectsSubtitle:
      "A selection of projects that showcase my approach to building reliable, scalable backend systems.",
    skills: "Skills & Technologies",
    skillsSubtitle: "Tools and technologies I work with daily.",
    chatTitle: "Ask the AI Agent",
    chatSubtitleLive: (name) =>
      `Chat with an AI assistant that knows everything about ${name}'s experience, skills, and projects.`,
    chatSubtitlePlaceholder: (name) =>
      `An AI-powered chatbot is being built so recruiters can ask questions about ${name} directly.`,
    askPrompt: "Ask a question to get started:",
  },
  about: {
    title: "About",
    experience: "Experience",
    technologies: "Technologies",
  },
  projects: {
    title: "Projects",
    subtitle:
      "Detailed case studies of systems I've built, including the problems they solved and the lessons learned along the way.",
    problem: "Problem",
    solution: "Solution",
    challengesLessons: "Challenges & Lessons",
    code: "Code",
    live: "Live",
  },
  resume: {
    title: "Resume",
    subtitle: "Professional experience and skills.",
    downloadCvDe: "Download CV (DE)",
    downloadCvEn: "Download CV (EN)",
    professionalExperience: "Professional Experience",
    skills: "Skills",
  },
  contact: {
    title: "Contact",
    subtitle:
      "I'm always open to discussing new opportunities, collaborations, or interesting backend engineering challenges.",
    github: "GitHub",
    linkedin: "LinkedIn",
  },
  footer: {
    copyright: "Le Quoc Anh Tran.",
    frontend: "Frontend",
    backend: "Backend",
  },
  chat: {
    aiAgentSuffix: "'s AI Agent",
    aiAgentSubtitle: "Ask questions about experience, skills, and projects of ",
    placeholder: "Ask about experience, skills, projects...",
    wakingUp: "Starting up the AI agent — this can take up to 30 seconds.",
    wakingUpPlaceholder: "Type your question while the agent starts up...",
    suggestedQuestions: "Suggested questions",
    suggestedQuestionsLeft: (n) => `Suggested questions (${n} left)`,
    askToStart: "Ask a question to get started:",
    errorTitle: "Backend Unreachable",
    errorMessage:
      "Could not connect to the resume-backend. Make sure the server is running.",
    disclaimer: "AI can make mistakes — better ",
    disclaimerContactPrefix: "contact ",
    disclaimerContactSuffix: " directly for important matters.",
    rateLimitMessage:
      "I've reached the message limit for this session. Please reach out directly via LinkedIn or email to continue the conversation.",
    connectionError: "Sorry, I'm having trouble connecting. Please try again.",
    placeholderTitlePrefix: "AI Agent of ",
    placeholderTitleSuffix: "",
    placeholderBodyPrefix:
      "This feature is currently under development. Soon you'll be able to ask questions about ",
    placeholderBodySuffix:
      "'s experience, skills, and projects — powered by an AI assistant trained on his resume and portfolio.",
    underProgress: "Under Progress",
  },
};

const de: Translation = {
  nav: {
    home: "Startseite",
    about: "Über mich",
    projects: "Projekte",
    resume: "Lebenslauf",
    contact: "Kontakt",
  },
  hero: {
    viewProjects: "Projekte ansehen",
    getInTouch: "Kontakt aufnehmen",
  },
  home: {
    featuredProjects: "Projekte",
    featuredProjectsSubtitle:
      "Eine Auswahl von Projekten, die meinen Ansatz für zuverlässige, skalierbare Backend-Systeme zeigen.",
    skills: "Fähigkeiten & Technologien",
    skillsSubtitle: "Werkzeuge und Technologien, mit denen ich täglich arbeite.",
    chatTitle: "Fragen Sie den KI-Agenten",
    chatSubtitleLive: (name) =>
      `Chatten Sie mit einem KI-Assistenten, der alles über ${name}s Erfahrung, Fähigkeiten und Projekte weiß.`,
    chatSubtitlePlaceholder: (name) =>
      `Ein KI-gestützter Chatbot wird entwickelt, damit Personalvermittler Fragen zu ${name} direkt stellen können.`,
    askPrompt: "Stellen Sie eine Frage, um zu beginnen:",
  },
  about: {
    title: "Über mich",
    experience: "Berufserfahrung",
    technologies: "Technologien",
  },
  projects: {
    title: "Projekte",
    subtitle:
      "Detaillierte Fallstudien von Systemen, die ich gebaut habe, einschließlich der gelösten Probleme und der gewonnenen Erkenntnisse.",
    problem: "Problem",
    solution: "Lösung",
    challengesLessons: "Herausforderungen & Erkenntnisse",
    code: "Code",
    live: "Live",
  },
  resume: {
    title: "Lebenslauf",
    subtitle: "Berufserfahrung und Fähigkeiten.",
    downloadCvDe: "CV herunterladen (DE)",
    downloadCvEn: "CV herunterladen (EN)",
    professionalExperience: "Berufserfahrung",
    skills: "Fähigkeiten",
  },
  contact: {
    title: "Kontakt",
    subtitle:
      "Ich bin immer offen für neue Möglichkeiten, Kooperationen oder interessante Backend-Engineering-Herausforderungen.",
    github: "GitHub",
    linkedin: "LinkedIn",
  },
  footer: {
    copyright: "Le Quoc Anh Tran.",
    frontend: "Frontend",
    backend: "Backend",
  },
  chat: {
    aiAgentSuffix: "s KI-Agent",
    aiAgentSubtitle: "Fragen Sie über Erfahrungen, Fähigkeiten und Projekte von ",
    placeholder: "Fragen Sie über Erfahrung, Fähigkeiten, Projekte...",
    wakingUp: "KI-Agent wird gestartet — das kann bis zu 30 Sekunden dauern.",
    wakingUpPlaceholder: "Tippen Sie Ihre Frage, während der Agent startet...",
    suggestedQuestions: "Vorgeschlagene Fragen",
    suggestedQuestionsLeft: (n) => `Vorgeschlagene Fragen (${n} übrig)`,
    askToStart: "Stellen Sie eine Frage, um zu beginnen:",
    errorTitle: "Backend nicht erreichbar",
    errorMessage:
      "Verbindung zum resume-backend konnte nicht hergestellt werden. Stellen Sie sicher, dass der Server läuft.",
    disclaimer: "KI kann Fehler machen — besser ",
    disclaimerContactPrefix: "",
    disclaimerContactSuffix: " direkt kontaktieren für wichtige Angelegenheiten.",
    rateLimitMessage:
      "Das Nachrichtenlimit für diese Sitzung wurde erreicht. Bitte kontaktieren Sie mich direkt über LinkedIn oder E-Mail, um das Gespräch fortzusetzen.",
    connectionError: "Entschuldigung, beim Verbinden ist ein Problem aufgetreten. Bitte versuchen Sie es erneut.",
    placeholderTitlePrefix: "KI-Agent von ",
    placeholderTitleSuffix: "",
    placeholderBodyPrefix:
      "Diese Funktion befindet sich in Entwicklung. Bald können Sie Fragen zu ",
    placeholderBodySuffix:
      "s Erfahrung, Fähigkeiten und Projekten stellen — unterstützt von einem KI-Assistenten, der auf seinem Lebenslauf und Portfolio trainiert ist.",
    underProgress: "In Bearbeitung",
  },
};

const vi: Translation = {
  nav: {
    home: "Trang chủ",
    about: "Giới thiệu",
    projects: "Dự án",
    resume: "CV",
    contact: "Liên hệ",
  },
  hero: {
    viewProjects: "Xem dự án",
    getInTouch: "Liên hệ",
  },
  home: {
    featuredProjects: "Dự án nổi bật",
    featuredProjectsSubtitle:
      "Một số dự án thể hiện cách tiếp cận của tôi trong việc xây dựng các hệ thống backend đáng tin cậy và có khả năng mở rộng.",
    skills: "Kỹ năng & Công nghệ",
    skillsSubtitle: "Các công cụ và công nghệ tôi sử dụng hàng ngày.",
    chatTitle: "Hỏi AI Agent",
    chatSubtitleLive: (name) =>
      `Trò chuyện với trợ lý AI biết mọi thứ về kinh nghiệm, kỹ năng và dự án của ${name}.`,
    chatSubtitlePlaceholder: (name) =>
      `Một chatbot AI đang được phát triển để nhà tuyển dụng có thể hỏi trực tiếp về ${name}.`,
    askPrompt: "Hỏi một câu để bắt đầu:",
  },
  about: {
    title: "Giới thiệu",
    experience: "Kinh nghiệm",
    technologies: "Công nghệ",
  },
  projects: {
    title: "Dự án",
    subtitle:
      "Phân tích chi tiết các hệ thống tôi đã xây dựng, bao gồm vấn đề đã giải quyết và bài học rút ra.",
    problem: "Vấn đề",
    solution: "Giải pháp",
    challengesLessons: "Thách thức & Bài học",
    code: "Mã nguồn",
    live: "Live",
  },
  resume: {
    title: "CV",
    subtitle: "Kinh nghiệm làm việc và kỹ năng.",
    downloadCvDe: "Tải CV (DE)",
    downloadCvEn: "Tải CV (EN)",
    professionalExperience: "Kinh nghiệm làm việc",
    skills: "Kỹ năng",
  },
  contact: {
    title: "Liên hệ",
    subtitle:
      "Tôi luôn sẵn sàng trao đổi về cơ hội mới, hợp tác hoặc các bài toán backend thú vị.",
    github: "GitHub",
    linkedin: "LinkedIn",
  },
  footer: {
    copyright: "Le Quoc Anh Tran.",
    frontend: "Frontend",
    backend: "Backend",
  },
  chat: {
    aiAgentSuffix: " — AI Agent",
    aiAgentSubtitle: "Hỏi về kinh nghiệm, kỹ năng và dự án của ",
    placeholder: "Hỏi về kinh nghiệm, kỹ năng, dự án...",
    wakingUp: "Đang khởi động AI Agent — có thể mất đến 30 giây.",
    wakingUpPlaceholder: "Nhập câu hỏi của bạn trong khi agent khởi động...",
    suggestedQuestions: "Câu hỏi gợi ý",
    suggestedQuestionsLeft: (n) => `Câu hỏi gợi ý (còn ${n})`,
    askToStart: "Hỏi một câu để bắt đầu:",
    errorTitle: "Không thể kết nối Backend",
    errorMessage:
      "Không thể kết nối đến resume-backend. Hãy đảm bảo server đang chạy.",
    disclaimer: "AI có thể sai — tốt nhất nên ",
    disclaimerContactPrefix: "liên hệ ",
    disclaimerContactSuffix: " trực tiếp cho các vấn đề quan trọng.",
    rateLimitMessage:
      "Đã đạt giới hạn tin nhắn cho phiên này. Vui lòng liên hệ trực tiếp qua LinkedIn hoặc email để tiếp tục.",
    connectionError: "Xin lỗi, đang gặp lỗi kết nối. Vui lòng thử lại.",
    placeholderTitlePrefix: "AI Agent của ",
    placeholderTitleSuffix: "",
    placeholderBodyPrefix:
      "Tính năng này đang được phát triển. Sớm thôi bạn sẽ có thể hỏi về ",
    placeholderBodySuffix:
      " về kinh nghiệm, kỹ năng và dự án — được hỗ trợ bởi trợ lý AI huấn luyện trên CV và portfolio của anh ấy.",
    underProgress: "Đang phát triển",
  },
};

export const translations: Record<Locale, Translation> = { en, de, vi };