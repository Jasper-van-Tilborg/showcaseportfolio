import { promises as fs } from 'fs';
import path from 'path';
import { ProjectData, Project } from '../types';

const dataDirectory = path.join(process.cwd(), 'lib/data');
const filePath = path.join(dataDirectory, 'projects.json');

export async function getProjects(): Promise<Project[]> {
  try {
    const fileContents = await fs.readFile(filePath, 'utf8');
    const data: ProjectData = JSON.parse(fileContents);
    return data.projects;
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}

export async function getProjectById(id: number): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find(p => p.id === id) || null;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find(p => 
    p.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === slug
  ) || null;
}

export async function saveProjects(projects: Project[]): Promise<void> {
  try {
    const data: ProjectData = { projects };
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving projects:', error);
    throw new Error('Failed to save projects');
  }
}

export async function createProject(project: Omit<Project, 'id'>): Promise<Project> {
  const projects = await getProjects();
  const newId = projects.length > 0 
    ? Math.max(...projects.map(p => p.id)) + 1 
    : 1;
  
  const newProject: Project = {
    ...project,
    id: newId,
  };
  
  projects.push(newProject);
  await saveProjects(projects);
  return newProject;
}

export async function updateProject(id: number, updates: Partial<Project>): Promise<Project | null> {
  const projects = await getProjects();
  const index = projects.findIndex(p => p.id === id);
  
  if (index === -1) {
    return null;
  }
  
  projects[index] = { ...projects[index], ...updates };
  await saveProjects(projects);
  return projects[index];
}

export async function deleteProject(id: number): Promise<boolean> {
  const projects = await getProjects();
  const filteredProjects = projects.filter(p => p.id !== id);
  
  if (filteredProjects.length === projects.length) {
    return false; // Project not found
  }
  
  await saveProjects(filteredProjects);
  return true;
}

