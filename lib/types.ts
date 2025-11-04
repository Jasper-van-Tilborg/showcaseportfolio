export interface Project {
  id: number;
  title: string;
  description: {
    nl: string;
    en: string;
  };
  longDescription?: {
    nl: string;
    en: string;
  };
  image?: string;
  images?: string[];
  link?: string;
  technologies?: string[];
  role?: {
    nl: string;
    en: string;
  };
  year?: string;
  colors?: {
    border: string;
    background: string;
    title: string;
    description: string;
    gradient?: string;
  };
}

export interface ProjectData {
  projects: Project[];
}

