'use client';

/**
 * Topic Grid Component
 *
 * Displays available mathematics topics organized by year level and strand.
 */

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge, getSkillLevelBadgeProps } from '@/components/ui/Badge';
import { formatYearLevel } from '@/lib/utils/format';
import type { CurriculumTopic, StudentProgress } from '@/types/database';

interface TopicGridProps {
  topics: Array<{
    topic: CurriculumTopic;
    progress: StudentProgress | null;
  }>;
  studentLevel: number;
}

export function TopicGrid({ topics, studentLevel }: TopicGridProps) {
  const [selectedStrand, setSelectedStrand] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<number | 'all'>(studentLevel);

  // Get unique strands and levels
  const strands = ['all', ...new Set(topics.map((t) => t.topic.strand))];
  const levels = [
    'all',
    ...Array.from(new Set(topics.map((t) => t.topic.level))).sort((a, b) => a - b),
  ];

  // Filter topics based on selected filters
  const filteredTopics = topics.filter((item) => {
    const strandMatch =
      selectedStrand === 'all' || item.topic.strand === selectedStrand;
    const levelMatch =
      selectedLevel === 'all' || item.topic.level === selectedLevel;
    return strandMatch && levelMatch;
  });

  // Group topics by level
  const topicsByLevel = filteredTopics.reduce((acc, item) => {
    const level = item.topic.level;
    if (!acc[level]) {
      acc[level] = [];
    }
    acc[level].push(item);
    return acc;
  }, {} as Record<number, typeof filteredTopics>);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Strand Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Strand
          </label>
          <div className="flex flex-wrap gap-2">
            {strands.map((strand) => (
              <button
                key={strand}
                onClick={() => setSelectedStrand(strand)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedStrand === strand
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {strand === 'all' ? 'All Strands' : strand}
              </button>
            ))}
          </div>
        </div>

        {/* Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Year
          </label>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedLevel(level as number | 'all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedLevel === level
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {level === 'all' ? 'All Years' : formatYearLevel(level)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Topics by Level */}
      {Object.entries(topicsByLevel)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([level, levelTopics]) => (
          <div key={level} className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {formatYearLevel(Number(level))}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {levelTopics
                .sort(
                  (a, b) =>
                    (a.topic.difficulty_order || 0) -
                    (b.topic.difficulty_order || 0)
                )
                .map(({ topic, progress }) => (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    progress={progress}
                    isRecommended={topic.level === studentLevel}
                  />
                ))}
            </div>
          </div>
        ))}

      {filteredTopics.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No topics found matching your filters.
        </div>
      )}
    </div>
  );
}

function TopicCard({
  topic,
  progress,
  isRecommended,
}: {
  topic: CurriculumTopic;
  progress: StudentProgress | null;
  isRecommended: boolean;
}) {
  const skillLevel = progress?.skill_level || 'not_started';
  const { variant, label } = getSkillLevelBadgeProps(skillLevel);

  const accuracy = progress
    ? progress.questions_attempted > 0
      ? Math.round(
          (progress.questions_correct / progress.questions_attempted) * 100
        )
      : 0
    : 0;

  return (
    <Link href={`/learn/${topic.id}`}>
      <Card hover variant="outlined" className="h-full">
        <CardHeader>
          <div className="flex items-start justify-between mb-2">
            <Badge variant={variant} size="sm">
              {label}
            </Badge>
            {isRecommended && !progress && (
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                Recommended
              </span>
            )}
          </div>
          <CardTitle className="text-lg">{topic.title}</CardTitle>
          <CardDescription>
            <span className="inline-flex items-center text-xs">
              <span className="font-medium">{topic.code}</span>
              <span className="mx-2">•</span>
              <span>{topic.strand}</span>
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            {topic.description}
          </p>

          {progress && progress.questions_attempted > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">
                {progress.questions_attempted} questions
              </span>
              <span
                className={`font-medium ${
                  accuracy >= 70 ? 'text-green-600' : 'text-yellow-600'
                }`}
              >
                {accuracy}% correct
              </span>
            </div>
          )}

          {!progress && (
            <div className="text-sm text-gray-500">
              Click to start learning
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
