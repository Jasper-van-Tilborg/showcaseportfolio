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
  figmaLink?: string;
  githubLink?: string;
  technologies?: string[];
  role?: {
    nl: string;
    en: string;
  };
  year?: string;
  status?: 'completed' | 'in-progress' | 'coming-soon';
  colors?: {
    border: string;
    background: string;
    title: string;
    description: string;
    gradient?: string;
    hoverOverlay?: string;
  };
}

export interface ProjectData {
  projects: Project[];
}



