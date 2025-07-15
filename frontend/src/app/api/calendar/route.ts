import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const month = searchParams.get('month');
    const view = searchParams.get('view') || 'month';

    let query = supabase
      .from('content')
      .select('*')
      .eq('user_id', 'temp-user-id'); // 실제로는 인증된 사용자 ID 사용

    if (year && month) {
      const startDate = `${year}-${month.padStart(2, '0')}-01`;
      const endDate = `${year}-${month.padStart(2, '0')}-31`;
      query = query.gte('schedule_date', startDate).lte('schedule_date', endDate);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json(
        { error: '캘린더 데이터를 불러오는 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    // 이벤트 데이터 변환
    const events = data?.map(item => ({
      id: item.id,
      title: item.title,
      date: item.schedule_date,
      type: 'learning',
      status: item.status,
      duration: item.learning_time || 0,
      content_id: item.id,
    })) || [];

    // 통계 계산
    const statistics = {
      total_events: events.length,
      completed: events.filter(e => e.status === 'published').length,
      in_progress: events.filter(e => e.status === 'scheduled').length,
      scheduled: events.filter(e => e.status === 'draft').length,
    };

    return NextResponse.json({
      success: true,
      data: {
        events,
        statistics,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { method, keywords, start_date, end_date, frequency } = body;

    // 실제로는 AI 서비스를 호출하여 콘텐츠를 생성
    // 여기서는 더미 데이터를 생성
    const generatedContent = [
      {
        title: `${keywords?.[0] || 'React'} 완벽 가이드`,
        body: `${keywords?.[0] || 'React'}에 대한 상세한 학습 가이드입니다.`,
        keywords: keywords || ['react', 'javascript'],
        status: 'scheduled',
        schedule_date: start_date,
        user_id: 'temp-user-id',
      },
      {
        title: `${keywords?.[1] || 'TypeScript'} 기초`,
        body: `${keywords?.[1] || 'TypeScript'}의 기본 개념을 배워보세요.`,
        keywords: keywords || ['typescript', 'javascript'],
        status: 'scheduled',
        schedule_date: start_date,
        user_id: 'temp-user-id',
      },
    ];

    // 생성된 콘텐츠를 데이터베이스에 저장
    const { data, error } = await supabase
      .from('content')
      .insert(generatedContent)
      .select();

    if (error) {
      return NextResponse.json(
        { error: '캘린더 채우기 중 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        generated_content: data?.length || 0,
        scheduled_events: data?.length || 0,
        workflow_id: `workflow-${Date.now()}`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 