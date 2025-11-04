'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/lib/types';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';

export default function ProjectManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      alert('Fout bij het ophalen van projecten');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreate = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Weet je zeker dat je dit project wilt verwijderen?')) {
      return;
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchProjects();
        alert('Project succesvol verwijderd');
      } else {
        const error = await response.json();
        alert(error.error || 'Fout bij het verwijderen van project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Fout bij het verwijderen van project');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleFormSubmit = async () => {
    await fetchProjects();
    handleFormClose();
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-[#E0E0E0] text-lg">Laden...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-white text-[24px] font-semibold">
          Projecten ({projects.length})
        </h2>
        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-[#AA61FF] text-white font-semibold rounded-lg hover:bg-[#8844FF] transition-all duration-300 hover:scale-105"
        >
          + Nieuw Project
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#1a1a2e] border-2 border-[#AA61FF] rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[#AA61FF] text-[28px] font-semibold">
                {editingProject ? 'Project Bewerken' : 'Nieuw Project'}
              </h3>
              <button
                onClick={handleFormClose}
                className="text-[#E0E0E0] hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <ProjectForm
              project={editingProject}
              onSave={handleFormSubmit}
              onCancel={handleFormClose}
            />
          </div>
        </div>
      )}

      <ProjectList
        projects={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

