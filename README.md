# Victorian Mathematics Learning Platform

An AI-powered web application that helps primary and secondary students in Victoria, Australia learn mathematics aligned with the Victorian Curriculum. The platform uses Anthropic Claude to provide personalized tutoring, adapting to each student's grade level, strengths, and weaknesses.

## Features

- **Personalized Learning**: AI tutor adapts to student's grade level and performance
- **Victorian Curriculum Aligned**: Content mapped to Victorian Curriculum standards (Years 4-10)
- **Progress Tracking**: Track topics mastered, strengths, and areas needing improvement
- **Session Continuity**: Students can resume learning where they left off
- **Adaptive Difficulty**: Question difficulty adjusts based on student performance
- **Conversational Tutor**: Chat with AI tutor for help and hints using Socratic method

## Tech Stack

- **Frontend**: Next.js 14+ with TypeScript and Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **LLM**: Anthropic Claude 3.5 Sonnet
- **Hosting**: Vercel

## Prerequisites

Before you begin, ensure you have:

- Node.js 18+ installed
- npm or yarn package manager
- A Supabase account ([sign up here](https://supabase.com))
- An Anthropic API key ([get one here](https://console.anthropic.com/))

## Getting Started

### 1. Clone and Install

```bash
cd ~/repos/victorian-maths-tutor
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your actual values:
- `NEXT_PUBLIC_SUPABASE_URL`: From your Supabase project settings
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: From your Supabase project settings
- `SUPABASE_SERVICE_ROLE_KEY`: From your Supabase project settings (keep secret!)
- `ANTHROPIC_API_KEY`: From your Anthropic console

### 3. Set Up Database

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. In the SQL Editor, run the migration script: `supabase/migrations/001_initial_schema.sql`
3. Run the seed script to populate curriculum topics: `supabase/seed.sql`
4. Enable Email authentication in Supabase Auth settings

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
victorian-maths-tutor/
├── app/                      # Next.js App Router pages
│   ├── auth/                 # Authentication pages (login, signup)
│   ├── dashboard/            # Student dashboard
│   ├── learn/                # Learning session pages
│   ├── progress/             # Progress tracking page
│   └── api/                  # API routes
│       ├── llm/              # LLM integration endpoints
│       ├── sessions/         # Session management
│       └── progress/         # Progress tracking
├── components/               # React components
│   ├── ui/                   # Reusable UI components
│   ├── auth/                 # Authentication components
│   ├── learning/             # Learning session components
│   └── dashboard/            # Dashboard components
├── lib/                      # Core logic and utilities
│   ├── supabase/             # Supabase client and queries
│   ├── llm/                  # LLM integration (Claude API)
│   ├── curriculum/           # Curriculum data and logic
│   └── utils/                # Utility functions
├── types/                    # TypeScript type definitions
├── hooks/                    # Custom React hooks
├── supabase/                 # Database migrations and seed data
└── scripts/                  # Utility scripts
```

## Development Roadmap

### Week 1: Foundation ✓
- [x] Project setup with Next.js and TypeScript
- [ ] Database schema and Supabase configuration
- [ ] Authentication UI (signup, login)
- [ ] Basic dashboard layout

### Week 2: Core Learning Experience
- [ ] Curriculum data for 10-15 core topics
- [ ] LLM integration (question generation, evaluation)
- [ ] Learning session UI
- [ ] Session management

### Week 3: Progress & Continuity
- [ ] Session continuity (resume learning)
- [ ] Progress tracking and calculation
- [ ] Progress visualization
- [ ] Multi-topic support

### Week 4: Polish
- [ ] Conversational tutor (chat interface)
- [ ] Adaptive difficulty
- [ ] UI/UX improvements
- [ ] Testing and deployment

## Contributing

This is currently a private educational project. Contributions are welcome after MVP release.

## License

Copyright © 2026. All rights reserved.

## Resources

- [Victorian Curriculum Mathematics F-10](https://victoriancurriculum.vcaa.vic.edu.au/mathematics/mathematics/curriculum/f-10)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Anthropic API Documentation](https://docs.anthropic.com/)
