/**
 * Landing Page
 *
 * Public home page introducing the platform and directing users to sign up or log in.
 */

import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
              Victorian Maths Tutor
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">
              Your Personalized AI Mathematics Tutor
            </p>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Learn mathematics aligned with the Victorian Curriculum through
              personalized AI tutoring that adapts to your level and learning pace.<br />
              This AI tutor uses Socrates method to guide you through questions, 
              helping you understand concepts deeply rather than just giving answers.
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/auth/signup">
              <Button variant="primary" size="lg">
                Get Started Free
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <FeatureCard
              icon="🎯"
              title="Personalized Learning"
              description="AI adapts to your grade level, strengths, and areas needing improvement"
            />
            <FeatureCard
              icon="📚"
              title="Curriculum Aligned"
              description="Content mapped to Victorian Curriculum standards for Years 4-10"
            />
            <FeatureCard
              icon="🤖"
              title="AI Tutor"
              description="Interactive tutoring using Socratic method to guide your learning"
            />
            <FeatureCard
              icon="📊"
              title="Track Progress"
              description="Monitor your progress, see topics mastered, and identify areas to improve"
            />
            <FeatureCard
              icon="💪"
              title="Adaptive Difficulty"
              description="Questions adjust to your performance for optimal learning challenge"
            />
            <FeatureCard
              icon="⏰"
              title="Learn at Your Pace"
              description="Resume where you left off anytime, anywhere"
            />
          </div>

          {/* How It Works */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              How It Works
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <StepCard
                number="1"
                title="Sign Up"
                description="Create your account and tell us your grade level"
              />
              <StepCard
                number="2"
                title="Choose Topic"
                description="Select a mathematics topic you want to learn"
              />
              <StepCard
                number="3"
                title="Learn & Practice"
                description="Answer questions with AI tutor guidance"
              />
              <StepCard
                number="4"
                title="Track Growth"
                description="See your progress and master new topics"
              />
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-20 p-8 bg-white rounded-2xl shadow-lg">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-gray-600 mb-6">
              Join students across Victoria mastering mathematics with AI
            </p>
            <Link href="/auth/signup">
              <Button variant="primary" size="lg">
                Create Your Free Account
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2026 Victorian Maths Tutor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="text-center">
      <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
