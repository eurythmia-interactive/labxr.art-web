import { type LucideProps } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { type ForwardRefExoticComponent, type RefAttributes, type SVGProps } from 'react';

interface LucideIconProps {
  name: string;
  className?: string;
}

type IconComponent = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

export function LucideIcon({ name, className }: LucideIconProps) {
  const IconComponent = LucideIcons[name as keyof typeof LucideIcons] as IconComponent | undefined;

  if (!IconComponent) {
    return null;
  }

  return <IconComponent className={className} />;
}
