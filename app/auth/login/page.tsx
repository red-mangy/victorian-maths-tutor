/**
 * Login Page
 *
 * Public page for existing users to sign in.
 */

import Link from 'next/link';
import { LoginForm } from '@/components/auth/LoginForm';
import { Logo } from '@/components/ui/Logo';

export const metadata = {
  title: 'Login | Victorian Maths Tutor',
  description: 'Sign in to continue your mathematics learning journey',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Logo and Title */}
        <Link href="/" className="block text-center mb-8 hover:opacity-80 transition-opacity">
          <div className="flex items-center justify-center mb-3">
            <Logo size={56} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Victorian Maths Tutor
          </h1>
          <p className="text-gray-600">
            Your personalized AI mathematics tutor
          </p>
        </Link>

        <LoginForm />
      </div>
    </div>
  );
}
