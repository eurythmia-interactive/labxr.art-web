import { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { $activeServiceId, closeService } from '@/lib/stores/service';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { VideoPlayerIsland } from '@/components/islands/video-player-island';
import { LucideIcon } from '@/components/islands/lucide-icon';
import type { VideoConfig } from '@/lib/video/types';

interface ServiceData {
  id: string;
  data: {
    title: string;
    slug: string;
    description: string;
    icon: string;
    previewVideoUrl?: string;
    previewPosterUrl?: string;
    disciplines: string[];
    capabilities: string[];
  };
}

interface ServiceViewerProps {
  services: ServiceData[];
}

export function ServiceViewer({ services }: ServiceViewerProps) {
  const activeId = useStore($activeServiceId);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const activeService = services.find((service) => service.id === activeId);

  useEffect(() => {
    if (activeId) {
      setIsDialogOpen(true);
    } else {
      setIsDialogOpen(false);
    }
  }, [activeId]);

  if (!activeService) {
    return null;
  }

  const hasVideo = Boolean(activeService.data.previewVideoUrl);

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => !open && closeService()}>
      <DialogContent className="max-w-3xl border-border bg-secondary">
        {/* Sticky Header - Always Visible */}
        <div className="flex-shrink-0 border-b border-border bg-secondary p-6 pb-4">
          <DialogHeader>
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <LucideIcon name={activeService.data.icon} className="h-6 w-6" />
            </div>
            <DialogTitle className="text-2xl">{activeService.data.title}</DialogTitle>
            <DialogDescription className="text-foreground/60">
              {activeService.data.description}
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Scrollable Content */}
        <DialogBody>
          <div className="mt-2">
            {hasVideo ? (
              <VideoPlayerIsland
                config={
                  {
                    src: {
                      mp4: activeService.data.previewVideoUrl!,
                      webm: activeService.data.previewVideoUrl!.replace('.mp4', '.webm'),
                    },
                    poster: activeService.data.previewPosterUrl ?? '',
                    thumbnail: activeService.data.previewPosterUrl ?? '',
                    alt: activeService.data.title,
                    autoplay: true,
                    muted: true,
                    loop: true,
                    controls: true,
                    playsInline: true,
                  } satisfies VideoConfig
                }
                aspectRatio="16:9"
                forceLoad={true}
              />
            ) : null}
          </div>

          {/* Capabilities */}
          {activeService.data.capabilities.length > 0 && (
            <div className="mt-6">
              <h4 className="mb-3 font-mono text-xs tracking-wider text-accent-primary">
                CAPABILITIES
              </h4>
              <ul className="space-y-2">
                {activeService.data.capabilities.map((capability) => (
                  <li
                    key={capability}
                    className="flex items-start gap-2 text-sm text-foreground/80"
                  >
                    <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-accent-primary" />
                    {capability}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Discipline Tags */}
          {activeService.data.disciplines.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {activeService.data.disciplines.map((discipline) => (
                <span
                  key={discipline}
                  className="border border-white/8 px-2 py-1 font-mono text-[10px] tracking-wider text-text-tertiary"
                >
                  {discipline.toUpperCase()}
                </span>
              ))}
            </div>
          )}
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}
