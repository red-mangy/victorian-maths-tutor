/**
 * Card Component
 *
 * Reusable card container component for displaying content sections.
 */

import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  hover = false,
  className = '',
  ...props
}: CardProps) {
  const baseStyles = 'rounded-lg transition-all';

  const variantStyles = {
    default: 'bg-white shadow',
    outlined: 'bg-white border-2 border-gray-200',
    elevated: 'bg-white shadow-lg',
  };

  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  const hoverStyles = hover
    ? 'cursor-pointer hover:shadow-md hover:scale-105'
    : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardHeader({
  children,
  className = '',
  ...props
}: CardHeaderProps) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
}

export interface CardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {}

export function CardTitle({
  children,
  className = '',
  ...props
}: CardTitleProps) {
  return (
    <h3 className={`text-xl font-semibold text-gray-900 ${className}`} {...props}>
      {children}
    </h3>
  );
}

export interface CardDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export function CardDescription({
  children,
  className = '',
  ...props
}: CardDescriptionProps) {
  return (
    <p className={`text-sm text-gray-600 mt-1 ${className}`} {...props}>
      {children}
    </p>
  );
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardContent({
  children,
  className = '',
  ...props
}: CardContentProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function CardFooter({
  children,
  className = '',
  ...props
}: CardFooterProps) {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`} {...props}>
      {children}
    </div>
  );
}
