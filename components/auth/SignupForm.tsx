'use client';

/**
 * Signup Form Component
 *
 * Handles user registration with email, password, and student profile information.
 */

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { GRADE_LEVELS } from '@/types/learning';

export function SignupForm() {
  const router = useRouter();
  const supabase = createClient();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (!gradeLevel) {
      setError('Please select your grade level');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Sign up the user with Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        setError(signUpError.message);
        setIsLoading(false);
        return;
      }

      if (!authData.user) {
        setError('Failed to create account. Please try again.');
        setIsLoading(false);
        return;
      }

      // 2. Create student profile via API route (bypasses RLS)
      const curriculumLevel = parseInt(gradeLevel.replace('Year_', ''));

      const profileResponse = await fetch('/api/auth/create-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: authData.user.id, // Pass user ID explicitly
          firstName,
          lastName,
          gradeLevel,
          curriculumLevel,
        }),
      });

      const profileData = await profileResponse.json();

      if (!profileResponse.ok || !profileData.success) {
        console.error('Error creating student profile:', profileData);
        setError(`Failed to create profile: ${profileData.error || 'Unknown error'}. Details: ${profileData.details || 'None'}`);
        setIsLoading(false);
        return;
      }

      // 3. Redirect to dashboard
      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      console.error('Signup error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create Your Account</CardTitle>
        <CardDescription>
          Start your personalized mathematics learning journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              label="First Name"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              fullWidth
              autoComplete="given-name"
            />

            <Input
              type="text"
              label="Last Name"
              placeholder="Smith"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              autoComplete="family-name"
            />
          </div>

          <div>
            <label
              htmlFor="grade-level"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Grade Level <span className="text-red-500">*</span>
            </label>
            <select
              id="grade-level"
              value={gradeLevel}
              onChange={(e) => setGradeLevel(e.target.value)}
              required
              className="block w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select your grade level</option>
              {GRADE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          <Input
            type="email"
            label="Email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            autoComplete="email"
          />

          <Input
            type="password"
            label="Password"
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            autoComplete="new-password"
            helperText="Must be at least 6 characters"
          />

          <Input
            type="password"
            label="Confirm Password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
            autoComplete="new-password"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={isLoading}
          >
            Create Account
          </Button>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in here
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
