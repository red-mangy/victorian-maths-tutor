/**
 * Victorian Maths Tutor Logo
 *
 * Application logo using the VicMathsTutor brand image
 */

import Image from 'next/image';

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 40, className = '' }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="VicMathsTutor Logo"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}

export function LogoIcon({ size = 32, className = '' }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="VicMathsTutor Logo"
      width={size}
      height={size}
      className={className}
    />
  );
}
