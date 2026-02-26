/**
 * Forgot Password Page
 *
 * Public page for users to request a password reset.
 */

import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export const metadata = {
  title: 'Forgot Password | Victorian Maths Tutor',
  description: 'Reset your password to regain access to your account',
};

export default function ForgotPasswordPage() {
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
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
