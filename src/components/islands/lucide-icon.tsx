import { iconRegistry } from './icon-registry';

interface LucideIconProps {
  name: string;
  className?: string;
}

export function LucideIcon({ name, className }: LucideIconProps) {
  const IconComponent = iconRegistry[name];

  if (!IconComponent) {
    if (import.meta.env.DEV) {
      console.warn(`[LucideIcon] Icon "${name}" not found in registry`);
    }
    const FallbackIcon = iconRegistry.Circle;
    return <FallbackIcon className={className} />;
  }

  return <IconComponent className={className} />;
}
