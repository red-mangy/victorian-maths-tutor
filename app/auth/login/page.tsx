/**
 * Login Page
 *
 * Public page for existing users to sign in.
 */

import { LoginForm } from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Login | Victorian Maths Tutor',
  description: 'Sign in to continue your mathematics learning journey',
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Victorian Maths Tutor
          </h1>
          <p className="text-gray-600">
            Your personalized AI mathematics tutor
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
