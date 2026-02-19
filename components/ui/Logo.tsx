/**
 * Victorian Maths Tutor Logo
 *
 * SVG logo combining mathematical and educational elements
 */

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 40, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle */}
      <circle cx="50" cy="50" r="48" fill="#2563EB" />

      {/* Graduation Cap */}
      <path
        d="M50 25L20 35L50 45L80 35L50 25Z"
        fill="#FCD34D"
        stroke="#F59E0B"
        strokeWidth="2"
      />
      <path
        d="M50 45V55"
        stroke="#FCD34D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="50" cy="58" r="3" fill="#FCD34D" />

      {/* Mathematical symbols */}
      <text
        x="35"
        y="75"
        fontFamily="Arial, sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="white"
      >
        π
      </text>
      <text
        x="55"
        y="75"
        fontFamily="Arial, sans-serif"
        fontSize="20"
        fontWeight="bold"
        fill="white"
      >
        +
      </text>

      {/* Border */}
      <circle
        cx="50"
        cy="50"
        r="48"
        stroke="#1E40AF"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export function LogoIcon({ size = 32, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Simplified version for small sizes */}
      <circle cx="50" cy="50" r="48" fill="#2563EB" />

      {/* Math symbols */}
      <text
        x="25"
        y="65"
        fontFamily="Arial, sans-serif"
        fontSize="36"
        fontWeight="bold"
        fill="white"
      >
        π
      </text>
      <text
        x="60"
        y="65"
        fontFamily="Arial, sans-serif"
        fontSize="32"
        fontWeight="bold"
        fill="white"
      >
        +
      </text>

      <circle
        cx="50"
        cy="50"
        r="48"
        stroke="#1E40AF"
        strokeWidth="3"
        fill="none"
      />
    </svg>
  );
}
