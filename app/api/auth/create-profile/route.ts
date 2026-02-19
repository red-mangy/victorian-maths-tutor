/**
 * Create Student Profile API Route
 *
 * This uses the service role key to bypass RLS for initial profile creation.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, firstName, lastName, gradeLevel, curriculumLevel } = body;

    // Validate required fields
    if (!userId || !firstName || !gradeLevel || !curriculumLevel) {
      return NextResponse.json(
        { error: 'Missing required fields', details: 'userId, firstName, gradeLevel, and curriculumLevel are required' },
        { status: 400 }
      );
    }

    // Use admin client to bypass RLS
    const adminClient = createAdminClient();

    // Check if profile already exists
    const { data: existing } = await adminClient
      .from('students')
      .select('id')
      .eq('auth_user_id', userId)
      .single();

    if (existing) {
      return NextResponse.json(
        { success: true, message: 'Profile already exists' }
      );
    }

    // Create the student profile with admin privileges
    const { data, error } = await adminClient
      .from('students')
      .insert({
        auth_user_id: userId,
        first_name: firstName,
        last_name: lastName || null,
        grade_level: gradeLevel,
        curriculum_level: curriculumLevel,
      } as any)
      .select()
      .single();

    if (error) {
      console.error('Error creating student profile:', error);
      return NextResponse.json(
        { error: 'Failed to create profile', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, student: data });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
