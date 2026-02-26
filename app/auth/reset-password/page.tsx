/**
 * Reset Password Page
 *
 * Page where users land after clicking the reset link in their email.
 */

import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';

export const metadata = {
  title: 'Reset Password | Victorian Maths Tutor',
  description: 'Set a new password for your account',
};

export default function ResetPasswordPage() {
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
        <ResetPasswordForm />
      </div>
    </div>
  );
}
