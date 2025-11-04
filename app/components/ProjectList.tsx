'use client';

import { Project } from '@/lib/types';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

export default function ProjectList({ projects, onEdit, onDelete }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#E0E0E0] text-lg">Geen projecten gevonden</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project) => (
        <div
          key={project.id}
          className="bg-[#0a0a1e] border-2 border-[#AA61FF]/30 rounded-xl p-6 hover:border-[#AA61FF] transition-all duration-300"
        >
          <div className="mb-4">
            {project.image && (
              <div
                className="w-full h-32 rounded-lg mb-4 flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: project.colors?.background || '#1a1a2e' }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white text-[20px] font-semibold">
                {project.title}
              </h3>
              {project.status === 'in-progress' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-[#AA61FF]/20 text-[#AA61FF] border border-[#AA61FF]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#AA61FF] animate-pulse"></span>
                  In ontwikkeling
                </span>
              )}
              {project.status === 'coming-soon' && (
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-[#AA61FF]/20 text-[#AA61FF] border border-[#AA61FF]/40">
                  Binnenkort
                </span>
              )}
            </div>
            <p className="text-[#E0E0E0] text-sm line-clamp-2">
              {project.description.nl}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(project)}
              className="flex-1 px-4 py-2 bg-[#AA61FF] text-white font-medium rounded-lg hover:bg-[#8844FF] transition-all duration-300"
            >
              Bewerken
            </button>
            <button
              onClick={() => onDelete(project.id)}
              className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-all duration-300"
            >
              Verwijderen
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}



