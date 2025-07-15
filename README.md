# 📚 Auto-Pilot Lab - 캘린더 기반 학습 일정 관리 시스템

## 🎯 프로젝트 개요

Auto-Pilot Lab은 학생, 크리에이터, 중소기업 사용자들이 AI를 활용하여 블로그 콘텐츠, 교육 콘텐츠, 기업 문서 등을 자동 생성하고, 학습 일정을 시각적으로 관리할 수 있는 캘린더 기반 콘텐츠 자동화 및 학습 시스템입니다.

### ✨ 주요 기능
- 🗓️ **캘린더 기반 콘텐츠 관리**: 시각적 일정 관리
- 🤖 **AI 기반 콘텐츠 자동 생성**: 외부 AI 서비스 연동
- 📊 **학습 진행률 추적**: 실시간 학습 상태 모니터링
- 🔄 **자동 캘린더 채우기**: 키워드 기반 콘텐츠 자동 스케줄링
- 👥 **다중 사용자 역할**: 학생, 크리에이터, 비즈니스 사용자 지원

---

## 🛠️ 기술 스택

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4.1
- **State Management**: Zustand
- **UI Components**: Radix UI + Shadcn/ui

### Backend & Database
- **Database**: Supabase (Cloud Service)
- **Authentication**: Supabase Auth + OAuth2
- **Storage**: Supabase Storage
- **Real-time**: Supabase Realtime

### AI & Automation
- **External AI Services**: OpenAI, Google AI 등
- **Content Generation**: Custom prompts + templates
- **Workflow**: 외부 자동화 서비스 연동

### DevOps & Deployment
- **Frontend**: Vercel
- **Backend**: Supabase
- **Monitoring**: Sentry
- **Testing**: Jest, Playwright, Cypress

---

## 📁 프로젝트 구조

```
auto-pilot-lab/
├── frontend/                 # Next.js 애플리케이션
│   ├── src/
│   │   ├── app/             # App Router 구조
│   │   │   ├── (auth)/      # 인증 관련 페이지
│   │   │   ├── dashboard/   # 대시보드
│   │   │   ├── calendar/    # 캘린더 페이지
│   │   │   ├── content/     # 콘텐츠 관리
│   │   │   └── settings/    # 설정 페이지
│   │   ├── components/      # 재사용 가능한 컴포넌트
│   │   │   ├── ui/         # 기본 UI 컴포넌트
│   │   │   ├── calendar/   # 캘린더 관련 컴포넌트
│   │   │   └── forms/      # 폼 컴포넌트
│   │   ├── lib/            # 유틸리티 함수들
│   │   ├── types/          # TypeScript 타입 정의
│   │   ├── hooks/          # 커스텀 훅
│   │   └── store/          # 상태 관리
│   ├── public/             # 정적 파일
│   └── package.json
├── backend/                 # Supabase 설정 및 API
│   └── supabase/           # Supabase 설정 (Cloud)
├── docs/                   # 프로젝트 문서
├── docker-compose.yml      # 개발 환경 설정
└── README.md
```

---

## 🗄️ 데이터베이스 스키마 (Supabase Cloud)

### Core Tables

```sql
-- 사용자 프로필
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users (id),
  role TEXT CHECK (role IN ('student', 'creator', 'business')),
  preferences JSONB DEFAULT '{}',
  learning_goals JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 콘텐츠 카테고리
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  color TEXT DEFAULT '#3B82F6',
  user_id UUID REFERENCES auth.users (id),
  created_at TIMESTAMP DEFAULT now()
);

-- 콘텐츠
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users (id),
  title TEXT NOT NULL,
  body TEXT,
  keywords TEXT[],
  category_id UUID REFERENCES categories (id),
  status TEXT CHECK (status IN ('draft', 'scheduled', 'published', 'archived')),
  schedule_date DATE,
  progress TEXT CHECK (progress IN ('not_started', 'in_progress', 'completed')),
  learning_time INTEGER DEFAULT 0,
  ai_generated BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 학습 세션
CREATE TABLE learning_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users (id),
  content_id UUID REFERENCES content (id),
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  duration INTEGER,
  notes TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- 자동화 로그
CREATE TABLE automation_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users (id),
  workflow_type TEXT,
  status TEXT CHECK (status IN ('pending', 'running', 'completed', 'failed')),
  input_data JSONB,
  output_data JSONB,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT now()
);
```

---

## 🚀 시작하기

### 1. 환경 설정

```bash
# 저장소 클론
git clone https://github.com/your-username/auto-pilot-lab.git
cd auto-pilot-lab

# 환경 변수 설정
cp .env.example .env.local
```

### 2. 개발 환경 실행

```bash
# Docker Compose로 프론트엔드 실행
docker-compose up -d

# 또는 개별 서비스 실행
cd frontend && npm install && npm run dev
```

### 3. Supabase 설정

```bash
# Supabase 프로젝트 생성 (Cloud)
# https://supabase.com 에서 새 프로젝트 생성

# 환경 변수 설정
# .env.local 파일에 Supabase URL과 API 키 입력
```

---

## 📋 API 엔드포인트

### 인증
- `POST /api/auth/login` - 로그인
- `POST /api/auth/register` - 회원가입
- `POST /api/auth/logout` - 로그아웃

### 콘텐츠 관리
- `GET /api/content` - 콘텐츠 목록 조회
- `POST /api/content` - 콘텐츠 생성
- `PUT /api/content/[id]` - 콘텐츠 수정
- `DELETE /api/content/[id]` - 콘텐츠 삭제

### 캘린더
- `GET /api/calendar` - 캘린더 데이터 조회
- `POST /api/calendar/fill` - 자동 캘린더 채우기

### 학습 관리
- `GET /api/learning/sessions` - 학습 세션 조회
- `POST /api/learning/sessions` - 학습 세션 생성
- `PUT /api/learning/progress` - 학습 진행률 업데이트

---

## 🤖 자동화 워크플로우

### 외부 AI 서비스 연동

1. **콘텐츠 생성 워크플로우**
   - 트리거: 사용자 요청
   - 키워드 분석 → 프롬프트 생성 → AI 서비스 호출 → 결과 저장

2. **캘린더 채우기 워크플로우**
   - 트리거: 사용자 요청
   - 주제 수집 → 일정 생성 → 콘텐츠 배치 → 알림 발송

---

## 🧪 테스트

```bash
# Unit Tests
npm run test

# Integration Tests
npm run test:integration

# E2E Tests
npm run test:e2e
```

---

## 📊 모니터링 및 분석

- **성능 모니터링**: Vercel Analytics
- **에러 추적**: Sentry
- **사용자 분석**: Google Analytics
- **서버 모니터링**: Supabase Dashboard

---

## 🔒 보안

- **인증**: Supabase Auth + JWT
- **데이터 보호**: Row Level Security (RLS)
- **API 보안**: Rate limiting, CORS 설정
- **환경 변수**: 민감한 정보는 환경 변수로 관리

---

## 🚀 배포

### Frontend (Vercel)
```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel --prod
```

### Backend (Supabase)
```bash
# Supabase Dashboard에서 설정
# https://supabase.com/dashboard
```

---

## 📈 향후 계획

### Phase 1 (MVP)
- [x] 기본 인증 시스템
- [x] 캘린더 UI 구현
- [x] 콘텐츠 CRUD 기능
- [ ] AI 콘텐츠 생성

### Phase 2 (확장)
- [ ] 팀 협업 기능
- [ ] 영상 콘텐츠 지원
- [ ] 고급 분석 대시보드
- [ ] 모바일 앱

### Phase 3 (고급 기능)
- [ ] AI 기반 학습 진단
- [ ] 개인화된 학습 경로
- [ ] 실시간 협업 기능

---

## 🤝 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 📞 지원

- **이슈 리포트**: [GitHub Issues](https://github.com/your-username/auto-pilot-lab/issues)
- **문서**: [Wiki](https://github.com/your-username/auto-pilot-lab/wiki)
- **이메일**: support@auto-pilot-lab.com

---

**Made with ❤️ by Auto-Pilot Lab Team** 