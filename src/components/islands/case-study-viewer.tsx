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
    videoUrl: string;
    posterUrl: string;
    techStack: string[];
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

  const videoConfig: VideoConfig = {
    src: {
      mp4: activeStudy.data.videoUrl,
      webm: activeStudy.data.videoUrl.replace('.mp4', '.webm'),
    },
    poster: activeStudy.data.posterUrl,
    thumbnail: activeStudy.data.posterUrl.replace('-poster.webp', '-thumb.webp'),
    alt: activeStudy.data.title,
    autoplay: true,
    muted: true,
    loop: false,
    controls: true,
    playsInline: true,
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeCaseStudy()}>
      <DialogContent className="max-w-4xl border-border bg-secondary">
        <DialogHeader>
          <DialogTitle className="text-2xl">{activeStudy.data.title}</DialogTitle>
          <DialogDescription className="text-foreground/60">
            {activeStudy.data.client}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <VideoPlayerIsland config={videoConfig} aspectRatio="16:9" forceLoad={true} />
        </div>
        <div className="mt-6">
          <p className="text-sm text-foreground/80">{activeStudy.data.description}</p>
        </div>
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
      </DialogContent>
    </Dialog>
  );
}
