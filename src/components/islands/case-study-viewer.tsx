import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $activeCaseStudyId, closeCaseStudy } from '@/lib/stores/portfolio';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { VideoPlayerIsland } from '@/components/islands/video-player-island';
import type { VideoConfig } from '@/lib/video/types';
import { trackEvent, AnalyticsEvents } from '@/lib/analytics';

interface CaseStudyData {
  id: string;
  data: {
    title: string;
    client: string;
    description: string;
    coverImage?: string;
    videoUrl?: string;
    posterUrl?: string;
    techStack: string[];
    idea?: string;
    experience?: string;
    technology?: string;
    process?: string;
    venue?: string;
    scope?: string;
  };
}

interface CaseStudyViewerProps {
  caseStudies: CaseStudyData[];
}

export function CaseStudyViewer({ caseStudies }: CaseStudyViewerProps) {
  const activeId = useStore($activeCaseStudyId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const activeStudy = caseStudies.find((study) => study.id === activeId);

  useEffect(() => {
    if (activeId) {
      setIsDialogOpen(true);
      trackEvent({ name: AnalyticsEvents.CASE_STUDY_OPEN, properties: { id: activeId } });
    } else {
      setIsDialogOpen(false);
    }
  }, [activeId]);

  if (!activeStudy) {
    return null;
  }

  const hasVideo = Boolean(activeStudy.data.videoUrl);
  const imageSrc = activeStudy.data.coverImage ?? activeStudy.data.posterUrl;
  const hasBlueprint = Boolean(
    activeStudy.data.idea ||
      activeStudy.data.experience ||
      activeStudy.data.technology ||
      activeStudy.data.process
  );

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeCaseStudy()}>
      <DialogContent className="max-w-4xl border-border bg-secondary">
        <DialogHeader>
          <DialogTitle className="text-2xl">{activeStudy.data.title}</DialogTitle>
          <DialogDescription className="text-foreground/60">
            {activeStudy.data.client}
            {activeStudy.data.venue && ` · ${activeStudy.data.venue}`}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {hasVideo ? (
            <VideoPlayerIsland
              config={
                {
                  src: {
                    mp4: activeStudy.data.videoUrl!,
                    webm: activeStudy.data.videoUrl!.replace('.mp4', '.webm'),
                  },
                  poster: activeStudy.data.posterUrl ?? activeStudy.data.coverImage ?? '',
                  thumbnail:
                    activeStudy.data.posterUrl?.replace('-poster.webp', '-thumb.webp') ??
                    activeStudy.data.coverImage ??
                    '',
                  alt: activeStudy.data.title,
                  autoplay: true,
                  muted: true,
                  loop: false,
                  controls: true,
                  playsInline: true,
                } satisfies VideoConfig
              }
              aspectRatio="16:9"
              forceLoad={true}
            />
          ) : imageSrc ? (
            <div className="overflow-hidden rounded-lg border border-border">
              <img
                src={imageSrc}
                alt={activeStudy.data.title}
                className="aspect-video h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ) : null}
        </div>

        {hasBlueprint ? (
          <div className="mt-6 space-y-6">
            {activeStudy.data.idea && (
              <div>
                <h4 className="mb-2 font-mono text-xs tracking-wider text-accent-primary">
                  01 // THE IDEA
                </h4>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {activeStudy.data.idea}
                </p>
              </div>
            )}
            {activeStudy.data.experience && (
              <div>
                <h4 className="mb-2 font-mono text-xs tracking-wider text-accent-primary">
                  02 // THE EXPERIENCE
                </h4>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {activeStudy.data.experience}
                </p>
              </div>
            )}
            {activeStudy.data.technology && (
              <div>
                <h4 className="mb-2 font-mono text-xs tracking-wider text-accent-primary">
                  03 // THE TECHNOLOGY
                </h4>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {activeStudy.data.technology}
                </p>
              </div>
            )}
            {activeStudy.data.process && (
              <div>
                <h4 className="mb-2 font-mono text-xs tracking-wider text-accent-primary">
                  04 // THE PROCESS
                </h4>
                <p className="text-sm leading-relaxed text-foreground/80">
                  {activeStudy.data.process}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-6">
            <p className="text-sm text-foreground/80">{activeStudy.data.description}</p>
          </div>
        )}

        {activeStudy.data.techStack.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {activeStudy.data.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
