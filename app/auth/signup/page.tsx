/**
 * Signup Page
 *
 * Public page for new users to create an account.
 */

import { SignupForm } from '@/components/auth/SignupForm';

export const metadata = {
  title: 'Sign Up | Victorian Maths Tutor',
  description: 'Create your account and start learning mathematics',
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Victorian Maths Tutor
          </h1>
          <p className="text-gray-600">
            Join thousands of students learning mathematics with AI
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
