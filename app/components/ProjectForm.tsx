'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/lib/types';

interface ProjectFormProps {
  project?: Project | null;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProjectForm({ project, onSave, onCancel }: ProjectFormProps) {
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: { nl: '', en: '' },
    longDescription: { nl: '', en: '' },
    image: '',
    images: [],
    link: '',
    technologies: [],
    role: { nl: '', en: '' },
    year: '',
    colors: {
      border: '#AA61FF',
      background: '#1a1a2e',
      title: '#ffffff',
      description: '#E0E0E0',
    },
  });

  const [newTechnology, setNewTechnology] = useState('');
  const [newImage, setNewImage] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        ...project,
        images: project.images || [],
        technologies: project.technologies || [],
      });
    }
  }, [project]);

  const handleChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof Project] as any),
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleColorChange = (colorField: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      colors: {
        ...prev.colors!,
        [colorField]: value,
      },
    }));
  };

  const handleAddTechnology = () => {
    if (newTechnology.trim()) {
      setFormData(prev => ({
        ...prev,
        technologies: [...(prev.technologies || []), newTechnology.trim()],
      }));
      setNewTechnology('');
    }
  };

  const handleRemoveTechnology = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleAddImage = () => {
    if (newImage.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...(prev.images || []), newImage.trim()],
      }));
      setNewImage('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images?.filter((_, i) => i !== index) || [],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = project 
        ? `/api/projects/${project.id}` 
        : '/api/projects';
      
      const method = project ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(project ? 'Project bijgewerkt!' : 'Project aangemaakt!');
        onSave();
      } else {
        const error = await response.json();
        alert(error.error || 'Fout bij opslaan');
      }
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Fout bij opslaan van project');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block text-white font-semibold mb-2">Titel *</label>
        <input
          type="text"
          value={formData.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          required
          className="w-full px-4 py-2 bg-[#0a0a1e] border border-[#AA61FF]/30 rounded-lg text-white focus:outline-none focus:border-[#AA61FF]"
        />
      </div>

      {/* Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-semibold mb-2">Beschrijving (NL) *</label>
          <textarea
            value={formData.description?.nl || ''}
            onChange={(e) => handleChange('description.nl', e.target.value)}
            required
            rows={3}
            className="w-full px-4 py-2 bg-[#0a0a1e] border border-[#AA61FF]/30 rounded-lg text-white focus:outline-none focus:border-[#AA61FF]"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">Beschrijving (EN) *</label>
          <textarea
            value={formData.description?.en || ''}
            onChange={(e) => handleChange('description.en', e.target.value)}
            required
            rows={3}
            className="w-full px-4 py-2 bg-[#0a0a1e] border border-[#AA61FF]/30 rounded-lg text-white focus:outline-none focus:border-[#AA61FF]"
          />
        </div>
      </div>

      {/* Long Descriptions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-semibold mb-2">Uitgebreide Beschrijving (NL)</label>
          <textarea
            value={formData.longDescription?.nl || ''}
            onChange={(e) => handleChange('longDescription.nl', e.target.value)}
            rows={4}
            className="w-full px-4 py-2 bg-[#0a0a1e] border border-[#AA61FF]/30 rounded-lg text-white focus:outline-none focus:border-[#AA61FF]"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">Uitgebreide Beschrijving (EN)</label>
          <textarea
            value={formData.longDescription?.en || ''}
            onChange={(e) => handleChange('longDescription.en', e.target.value)}
            rows={4}
            className="w-full px-4 py-2 bg-[#0a0a1e] border border-[#AA61FF]/30 rounded-lg text-white focus:outline-none focus:border-[#AA61FF]"
          />
        </div>
      </div>

      {/* Image */}
      <div>
        <label className="block text-white font-semibold mb-2">Hoofdafbeelding URL</label>
        <input
          type="text"
          value={formData.image || ''}
          onChange={(e) => handleChange('image', e.target.value)}
          className="w-full px-4 py-2 bg-[#0a0a1e] border border-[#AA61FF]/30 rounded-lg text-white focus:outline-none focus:border-[#AA61FF]"
        />
      </div>

      {/* Images Array */}
      <div>
        <label className="block text-white font-semibold mb-2">Extra Afbeeldingen</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newImage}
            onChange={(e) => setNewImage(e.target.value)}
            placeholder="Afbeelding URL"
            className="flex-1 px-4 py-2 bg-[#0a0a1e] border border-[#AA61FF]/30 rounded-lg text-white focus:outline-none focus:border-[#AA61FF]"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="px-4 py-2 bg-[#AA61FF] text-white rounded-lg hover:bg-[#8844FF] transition-colors"
          >
            +
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.images?.map((img, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#0a0a1e] border border-[#AA61FF]/30 rounded-lg text-white text-sm flex items-center gap-2"
            >
              <span className="truncate max-w-xs">{img}</span>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="text-red-400 hover:text-red-300"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Link */}
      <div>
        <label className="block text-white font-semibold mb-2">Link</label>
        <input
          type="text"
          value={formData.link || ''}
          onChange={(e) => handleChange('link', e.target.value)}
          className="w-full px-4 py-2 bg-[#0a0a1e] border border-[#AA61FF]/30 rounded-lg text-white focus:outline-none focus:border-[#AA61FF]"
        />
      </div>

      {/* Technologies */}
      <div>
        <label className="block text-white font-semibold mb-2">Technologieën</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newTechnology}
            onChange={(e) => setNewTechnology(e.target.value)}
            placeholder="Nieuwe technologie"
            className="flex-1 px-4 py-2 bg-[#0a0a1e] border border-[#AA61FF]/30 rounded-lg text-white focus:outline-none focus:border-[#AA61FF]"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology())}
          />
          <button
            type="button"
            onClick={handleAddTechnology}
            className="px-4 py-2 bg-[#AA61FF] text-white rounded-lg hover:bg-[#8844FF] transition-colors"
          >
            +
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.technologies?.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-[#0a0a1e] border border-[#AA61FF]/30 rounded-lg text-white text-sm flex items-center gap-2"
            >
              {tech}
              <button
                type="button"
                onClick={() => handleRemoveTechnology(index)}
                className="text-red-400 hover:text-red-300"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Role */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white font-semibold mb-2">Rol (NL)</label>
          <input
            type="text"
            value={formData.role?.nl || ''}
            onChange={(e) => handleChange('role.nl', e.target.value)}
            className="w-full px-4 py-2 bg-[#0a0a1e] border border-[#AA61FF]/30 rounded-lg text-white focus:outline-none focus:border-[#AA61FF]"
          />
        </div>
        <div>
          <label className="block text-white font-semibold mb-2">Rol (EN)</label>
          <input
            type="text"
            value={formData.role?.en || ''}
            onChange={(e) => handleChange('role.en', e.target.value)}
            className="w-full px-4 py-2 bg-[#0a0a1e] border border-[#AA61FF]/30 rounded-lg text-white focus:outline-none focus:border-[#AA61FF]"
          />
        </div>
      </div>

      {/* Year */}
      <div>
        <label className="block text-white font-semibold mb-2">Jaar</label>
        <input
          type="text"
          value={formData.year || ''}
          onChange={(e) => handleChange('year', e.target.value)}
          className="w-full px-4 py-2 bg-[#0a0a1e] border border-[#AA61FF]/30 rounded-lg text-white focus:outline-none focus:border-[#AA61FF]"
        />
      </div>

      {/* Colors */}
      <div>
        <label className="block text-white font-semibold mb-4">Kleuren</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-[#E0E0E0] text-sm mb-1">Border</label>
            <input
              type="color"
              value={formData.colors?.border || '#AA61FF'}
              onChange={(e) => handleColorChange('border', e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-[#E0E0E0] text-sm mb-1">Achtergrond</label>
            <input
              type="color"
              value={formData.colors?.background || '#1a1a2e'}
              onChange={(e) => handleColorChange('background', e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-[#E0E0E0] text-sm mb-1">Titel</label>
            <input
              type="color"
              value={formData.colors?.title || '#ffffff'}
              onChange={(e) => handleColorChange('title', e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-[#E0E0E0] text-sm mb-1">Beschrijving</label>
            <input
              type="color"
              value={formData.colors?.description || '#E0E0E0'}
              onChange={(e) => handleColorChange('description', e.target.value)}
              className="w-full h-10 rounded-lg cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 px-6 py-3 bg-[#AA61FF] text-white font-semibold rounded-lg hover:bg-[#8844FF] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? 'Opslaan...' : project ? 'Bijwerken' : 'Aanmaken'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 bg-[#2a2a2a] text-white font-semibold rounded-lg hover:bg-[#3a3a3a] transition-all duration-300"
        >
          Annuleren
        </button>
      </div>
    </form>
  );
}

