import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';

interface CaseStudy {
  id: string;
  data: {
    title: string;
    client: string;
    description: string;
    coverImage?: string;
    posterUrl?: string;
    year?: number;
    category?: string;
    disciplines: string[];
    idea?: string;
    experience?: string;
    technology?: string;
    process?: string;
    venue?: string;
    scope?: string;
    techStack: string[];
  };
}

interface ProjectFilterProps {
  caseStudies: CaseStudy[];
}

const ALL_TAGS = [
  'xr',
  'ux-design',
  'dev',
  'videomapping',
  'interactivity',
  'museography',
  'products',
];

const TAG_LABELS: Record<string, string> = {
  xr: 'XR',
  'ux-design': 'UX Design',
  dev: 'Development',
  videomapping: 'Video Mapping',
  interactivity: 'Interactivity',
  museography: 'Museography',
  products: 'Products',
};

export function ProjectFilter({ caseStudies }: ProjectFilterProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const filteredStudies = useMemo(() => {
    if (activeFilters.length === 0) return caseStudies;
    return caseStudies.filter((study) =>
      activeFilters.some((filter) => study.data.disciplines.includes(filter))
    );
  }, [caseStudies, activeFilters]);

  const toggleFilter = (tag: string) => {
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => setActiveFilters([]);

  return (
    <div>
      {/* Filter Controls */}
      <div className="mb-12 border border-white/8 bg-bg-secondary p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-xs tracking-wider text-accent-primary">FILTER BY TAG</p>
          {activeFilters.length > 0 && (
            <button
              onClick={clearFilters}
              className="font-mono text-xs tracking-wider text-text-secondary transition-colors hover:text-accent-primary"
            >
              CLEAR FILTERS
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {ALL_TAGS.map((tag) => {
            const isActive = activeFilters.includes(tag);
            return (
              <button
                key={tag}
                onClick={() => toggleFilter(tag)}
                className={cn(
                  'border px-3 py-1 font-mono text-xs tracking-wider transition-all',
                  isActive
                    ? 'border-accent-primary bg-accent-primary/10 text-accent-primary'
                    : 'border-white/8 text-text-tertiary hover:border-accent-primary/30 hover:text-text-secondary'
                )}
              >
                {TAG_LABELS[tag]}
              </button>
            );
          })}
        </div>
        {activeFilters.length > 0 && (
          <p className="mt-4 font-mono text-xs tracking-wider text-text-tertiary">
            SHOWING {filteredStudies.length} OF {caseStudies.length} PROJECTS
          </p>
        )}
      </div>

      {/* Projects Grid */}
      {filteredStudies.length === 0 ? (
        <div className="flex min-h-[40vh] items-center justify-center border border-white/8 bg-bg-secondary p-12">
          <p className="font-mono text-sm tracking-wider text-text-tertiary">
            NO PROJECTS MATCH THE SELECTED FILTERS
          </p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredStudies.map((study) => (
            <article
              key={study.id}
              className="group cursor-none border border-white/8 bg-bg-secondary transition-all hover:border-accent-primary/30"
              data-cursor="hover"
            >
              {/* Cover Image */}
              <div className="relative aspect-video overflow-hidden bg-bg-tertiary">
                {study.data.coverImage ? (
                  <img
                    src={study.data.coverImage}
                    alt={study.data.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : study.data.posterUrl ? (
                  <img
                    src={study.data.posterUrl}
                    alt={study.data.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <span className="font-mono text-xs tracking-wider text-text-tertiary">
                      [ MEDIA PENDING ]
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Metadata */}
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-xs tracking-wider text-text-tertiary">
                    {study.data.year || '—'}
                  </span>
                  <span className="font-mono text-xs tracking-wider text-text-tertiary">
                    {study.data.category || 'Project'}
                  </span>
                </div>

                {/* Title */}
                <h3 className="mb-2 font-sans text-lg font-bold tracking-tight text-foreground">
                  {study.data.title}
                </h3>

                {/* Client */}
                <p className="mb-4 font-mono text-xs tracking-wider text-text-secondary">
                  {study.data.client}
                </p>

                {/* Description */}
                <p className="mb-4 font-sans text-sm leading-relaxed text-text-secondary">
                  {study.data.description}
                </p>

                {/* Discipline Tags */}
                {study.data.disciplines.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {study.data.disciplines.map((discipline) => (
                      <span
                        key={discipline}
                        className="border border-white/8 px-2 py-1 font-mono text-[10px] tracking-wider text-text-tertiary"
                      >
                        {discipline.toUpperCase()}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectFilter;
