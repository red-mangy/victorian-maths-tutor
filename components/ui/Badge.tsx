/**
 * Badge Component
 *
 * Small labeled component for displaying status, skill level, or other categorical information.
 */

import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | 'default'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'not_started'
    | 'learning'
    | 'practicing'
    | 'mastered';
  size?: 'sm' | 'md' | 'lg';
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}: BadgeProps) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full';

  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800',
    // Skill level specific variants
    not_started: 'bg-gray-100 text-gray-600',
    learning: 'bg-blue-100 text-blue-700',
    practicing: 'bg-yellow-100 text-yellow-700',
    mastered: 'bg-green-100 text-green-700',
  };

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * Get appropriate badge variant for skill level
 */
export function getSkillLevelBadgeProps(skillLevel: string): {
  variant: BadgeProps['variant'];
  label: string;
} {
  switch (skillLevel) {
    case 'not_started':
      return { variant: 'not_started', label: 'Not Started' };
    case 'learning':
      return { variant: 'learning', label: 'Learning' };
    case 'practicing':
      return { variant: 'practicing', label: 'Practicing' };
    case 'mastered':
      return { variant: 'mastered', label: 'Mastered' };
    default:
      return { variant: 'default', label: 'Unknown' };
  }
}
