/**
 * Landing Page
 *
 * Public home page introducing the platform and directing users to sign up or log in.
 */

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Logo size={40} />
              <span className="text-xl font-bold text-gray-900">Victorian Maths Tutor</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="outline" size="md">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="primary" size="md">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Building Strong Minds Through Mathematics
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
              Empowering Victorian students to excel in mathematics, develop logical thinking,
              and master problem-solving skills that last a lifetime.
            </p>
            <div className="bg-blue-600 text-white px-6 py-3 rounded-full inline-block mb-8 font-semibold">
              100% Free • Victorian Curriculum Aligned • Years 4-10
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup">
                <Button variant="primary" size="lg" className="min-w-[200px]">
                  Start Learning Today
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" size="lg" className="min-w-[200px]">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 md:p-12 rounded-2xl shadow-sm">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed mb-6">
                We believe that every student deserves access to high-quality mathematics education.
                Mathematics is more than numbers and formulas—it's a gateway to developing critical
                thinking, logical reasoning, and problem-solving abilities that are essential for
                success in school, career, and life.
              </p>
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed">
                Our AI-powered platform provides personalized, adaptive learning experiences that
                meet students where they are and guide them to where they want to be. Through
                intelligent tutoring aligned with the Victorian Curriculum, we're making quality
                mathematics education accessible to every Victorian student, completely free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Victorian Maths Tutor?
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <BenefitCard
                title="Build Mathematical Confidence"
                description="Master fundamental concepts through adaptive practice that adjusts to your skill level, ensuring steady progress without frustration or boredom."
                icon="🎯"
              />
              <BenefitCard
                title="Develop Logical Thinking"
                description="Learn to approach problems systematically, identify patterns, and construct logical arguments—skills that transfer to every area of study and work."
                icon="🧠"
              />
              <BenefitCard
                title="Enhance Problem-Solving Skills"
                description="Practice breaking down complex problems into manageable steps, evaluating strategies, and developing persistence when facing challenges."
                icon="🔍"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                How We Support Your Learning
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon="📚"
                title="Victorian Curriculum Aligned"
                description="Every topic and question is carefully mapped to Victorian Curriculum content descriptors for Years 4-10, ensuring your learning aligns with school requirements."
              />
              <FeatureCard
                icon="🤖"
                title="Intelligent AI Tutoring"
                description="Our AI tutor uses the Socratic method to guide your learning through thoughtful questions, helping you discover solutions and understand concepts deeply."
              />
              <FeatureCard
                icon="📊"
                title="Personalized Learning Path"
                description="The platform adapts to your grade level, tracks your progress, identifies strengths and weaknesses, and adjusts difficulty to optimize your learning journey."
              />
              <FeatureCard
                icon="💡"
                title="Concept Mastery Focus"
                description="Instead of repetitive practice, we track what you've learned and introduce new concepts progressively, ensuring continuous growth and preventing stagnation."
              />
              <FeatureCard
                icon="⚖️"
                title="Adaptive Difficulty"
                description="Questions intelligently adjust based on your performance—slowing down when you struggle, stepping back to fundamentals when needed, and challenging you when you excel."
              />
              <FeatureCard
                icon="⏰"
                title="Learn at Your Own Pace"
                description="Study anytime, anywhere, and resume exactly where you left off. No time pressure, no deadlines—just you and your learning journey."
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Getting Started Is Simple
              </h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-4 gap-6">
              <StepCard
                number="1"
                title="Create Your Account"
                description="Sign up with your email and select your current grade level. It takes less than a minute."
              />
              <StepCard
                number="2"
                title="Choose a Topic"
                description="Browse mathematics topics aligned with your curriculum and select what you'd like to learn."
              />
              <StepCard
                number="3"
                title="Learn with AI Guidance"
                description="Work through personalized questions with intelligent hints and feedback from your AI tutor."
              />
              <StepCard
                number="4"
                title="Track Your Progress"
                description="Watch your skills grow, see topics you've mastered, and identify areas for improvement."
              />
            </div>
          </div>
        </div>
      </section>

      {/* For Parents/Teachers Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 md:p-12 rounded-2xl">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                For Parents and Educators
              </h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p className="flex items-start">
                  <span className="text-blue-600 mr-3 text-2xl">✓</span>
                  <span><strong>Safe and Focused:</strong> A distraction-free learning environment designed specifically for mathematical education.</span>
                </p>
                <p className="flex items-start">
                  <span className="text-blue-600 mr-3 text-2xl">✓</span>
                  <span><strong>Curriculum Compliant:</strong> All content aligns with Victorian Curriculum F-10 standards and requirements.</span>
                </p>
                <p className="flex items-start">
                  <span className="text-blue-600 mr-3 text-2xl">✓</span>
                  <span><strong>Transparent Progress:</strong> Students can see their improvement over time, building confidence and motivation.</span>
                </p>
                <p className="flex items-start">
                  <span className="text-blue-600 mr-3 text-2xl">✓</span>
                  <span><strong>Free Forever:</strong> No subscriptions, no hidden costs, no paywalls. Quality education should be accessible to everyone.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Your Learning Journey Today
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join Victorian students who are building mathematical confidence,
              developing critical thinking skills, and discovering the joy of problem-solving.
            </p>
            <Link href="/auth/signup">
              <Button
                variant="outline"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 border-white min-w-[250px]"
              >
                Create Your Free Account
              </Button>
            </Link>
            <p className="mt-6 text-blue-100 text-sm">
              No credit card required • 100% free • Start learning in under 2 minutes
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center text-gray-600 space-y-2">
              <p className="font-semibold text-gray-900">Victorian Maths Tutor</p>
              <p>Aligned with Victorian Curriculum F-10 Mathematics</p>
              <p className="text-sm">Supporting students in Years 4-10 across Victoria, Australia</p>
              <p className="text-sm text-gray-500 mt-4">© 2026 Victorian Maths Tutor. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function BenefitCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{description}</p>
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
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
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
    <div className="text-center bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 shadow-lg">
        {number}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
