export interface Project {
  title: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  challenges: string;
  lessons: string;
  github?: string;
  liveUrl?: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface SiteData {
  name: string;
  title: string;
  introduction: string;
  email: string;
  github: string;
  linkedin: string;
  projects: Project[];
  experience: Experience[];
  skills: Skill[];
  philosophy: string;
  careerSummary: string;
}