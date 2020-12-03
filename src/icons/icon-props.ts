import { JSX } from 'preact';

export interface IconProps extends JSX.SVGAttributes<SVGSVGElement> {
  color?: string;
  size?: number;
}
