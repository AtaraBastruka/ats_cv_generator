export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  summary?: string;
  experience: Array<{
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    bullets: string[];
  }>;
  education: Array<{
    degree: string;
    school: string;
    location: string;
    graduationDate: string;
    gpa?: string;
    honors?: string;
  }>;
  skills: {
    technical?: string[];
    languages?: string[];
  };
  certifications?: Array<{
    name: string;
    institution: string;
    date: string;
  }>;
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
  references?: Array<{
    name: string;
    position: string;
    phone?: string;
    email?: string;
    linkedin?: string;
    website?: string;
    summary?: string;
  }>;
}

export interface CvTitles {
  sumary: string;
  experience: string;
  education: string;
  gpa: string;
  skills: string;
  stechnical: string;
  slanguages: string;
  projects: string;
  ptechnologies: string;
  references: string;
  certificates: string;
}

// -----------------------------------------------------------------------------
// Títulos por idioma
// -----------------------------------------------------------------------------
const es_titles: CvTitles = {
  sumary: 'Resumen',
  experience: 'Experiencia',
  education: 'Educación',
  gpa: 'Nota final',
  skills: 'Habilidades',
  stechnical: 'Técnico',
  slanguages: 'Lenguajes',
  projects: 'Proyectos',
  ptechnologies: 'Tecnologías',
  references: 'Referencias',
  certificates: 'Certificaciones',
};
const en_titles: CvTitles = {
  sumary: 'Summary',
  experience: 'Experience',
  education: 'Education',
  gpa: 'GPA',
  skills: 'Skills',
  stechnical: 'Technical',
  slanguages: 'Languages',
  projects: 'Projects',
  ptechnologies: 'Technologies',
  references: 'References',
  certificates: 'Certificates',
};

export { es_titles, en_titles };