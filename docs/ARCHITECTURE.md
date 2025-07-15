# 🏗️ Auto-Pilot Lab 시스템 아키텍처

## 📋 개요

Auto-Pilot Lab은 캘린더 기반 학습 일정 관리와 AI 기반 콘텐츠 자동 생성을 결합한 현대적인 웹 애플리케이션입니다.

## 🎯 시스템 목표

1. **사용자 경험**: 직관적이고 반응성 있는 캘린더 인터페이스
2. **확장성**: 마이크로서비스 아키텍처로 수평 확장 가능
3. **성능**: 빠른 로딩 시간과 실시간 업데이트
4. **보안**: 강력한 인증 및 데이터 보호
5. **자동화**: AI 기반 콘텐츠 생성 및 스케줄링

## 🏛️ 아키텍처 다이어그램

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Automation    │
│   (Next.js)     │◄──►│   (Supabase)    │◄──►│   (n8n + Ollama)│
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel CDN    │    │   PostgreSQL    │    │   Local LLM     │
│   (Static)      │    │   (Database)    │    │   (Ollama)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🧩 컴포넌트 상세 설명

### 1. Frontend Layer (Next.js 14)

#### 구조
```
frontend/
├── src/
│   ├── app/                    # App Router
│   │   ├── (auth)/            # 인증 그룹
│   │   ├── dashboard/         # 대시보드
│   │   ├── calendar/          # 캘린더 페이지
│   │   ├── content/           # 콘텐츠 관리
│   │   └── settings/          # 설정
│   ├── components/            # 재사용 컴포넌트
│   ├── lib/                   # 유틸리티
│   ├── hooks/                 # 커스텀 훅
│   └── store/                 # 상태 관리
```

#### 주요 기능
- **Server Components**: SEO 최적화 및 초기 로딩 성능
- **Client Components**: 인터랙티브 UI 요소
- **Streaming**: 실시간 데이터 업데이트
- **Caching**: React Cache 및 Next.js 캐싱

### 2. Backend Layer (Supabase)

#### 데이터베이스 설계
```sql
-- 사용자 관리
profiles (사용자 프로필)
├── id (UUID, PK)
├── role (student|creator|business)
├── preferences (JSONB)
└── learning_goals (JSONB)

-- 콘텐츠 관리
content (콘텐츠)
├── id (UUID, PK)
├── user_id (UUID, FK)
├── title (TEXT)
├── body (TEXT)
├── status (draft|scheduled|published)
├── schedule_date (DATE)
└── progress (not_started|in_progress|completed)

-- 학습 추적
learning_sessions (학습 세션)
├── id (UUID, PK)
├── user_id (UUID, FK)
├── content_id (UUID, FK)
├── start_time (TIMESTAMP)
├── end_time (TIMESTAMP)
└── duration (INTEGER)
```

#### 보안
- **Row Level Security (RLS)**: 사용자별 데이터 격리
- **JWT Authentication**: 토큰 기반 인증
- **OAuth2 Integration**: 소셜 로그인 지원

### 3. Automation Layer (n8n + Ollama)

#### n8n 워크플로우
```
1. 콘텐츠 생성 워크플로우
   트리거: Webhook
   ↓
   키워드 분석
   ↓
   프롬프트 생성
   ↓
   Ollama API 호출
   ↓
   결과 저장 (Supabase)

2. 캘린더 채우기 워크플로우
   트리거: 사용자 요청
   ↓
   주제 수집
   ↓
   일정 생성
   ↓
   콘텐츠 배치
   ↓
   알림 발송
```

#### Ollama 통합
- **로컬 LLM**: 프라이버시 보호
- **모델 관리**: 다양한 모델 지원
- **API 통신**: HTTP REST API

## 🔄 데이터 플로우

### 1. 사용자 인증 플로우
```
1. 사용자 로그인 요청
2. Supabase Auth 처리
3. JWT 토큰 발급
4. 클라이언트에 토큰 저장
5. API 요청 시 토큰 포함
```

### 2. 콘텐츠 생성 플로우
```
1. 사용자가 콘텐츠 생성 요청
2. n8n 웹훅 트리거
3. 키워드/주제 분석
4. Ollama에 프롬프트 전송
5. AI 콘텐츠 생성
6. Supabase에 저장
7. 캘린더 업데이트
8. 사용자에게 알림
```

### 3. 학습 세션 플로우
```
1. 사용자가 콘텐츠 학습 시작
2. 세션 시작 시간 기록
3. 실시간 진행률 업데이트
4. 학습 완료 시 세션 종료
5. 학습 데이터 분석
6. 개인화된 추천 생성
```

## 🚀 성능 최적화

### 1. Frontend 최적화
- **Code Splitting**: 동적 임포트
- **Image Optimization**: Next.js Image 컴포넌트
- **Bundle Analysis**: webpack-bundle-analyzer
- **Lazy Loading**: 컴포넌트 지연 로딩

### 2. Backend 최적화
- **Connection Pooling**: Supabase 연결 풀
- **Query Optimization**: 인덱스 최적화
- **Caching**: Redis 캐싱 레이어
- **CDN**: Vercel Edge Network

### 3. Database 최적화
```sql
-- 인덱스 생성
CREATE INDEX idx_content_user_status ON content(user_id, status);
CREATE INDEX idx_content_schedule ON content(schedule_date);
CREATE INDEX idx_learning_sessions_user ON learning_sessions(user_id);

-- 파티셔닝 (대용량 데이터)
CREATE TABLE content_2024 PARTITION OF content
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
```

## 🔒 보안 아키텍처

### 1. 인증 및 권한
- **Multi-factor Authentication**: 2FA 지원
- **Session Management**: JWT 토큰 관리
- **Role-based Access Control**: 사용자 역할별 권한

### 2. 데이터 보호
- **Encryption at Rest**: 데이터베이스 암호화
- **Encryption in Transit**: TLS/SSL 통신
- **Data Masking**: 민감 정보 마스킹

### 3. API 보안
- **Rate Limiting**: 요청 제한
- **CORS Policy**: 크로스 오리진 정책
- **Input Validation**: 입력 데이터 검증

## 📊 모니터링 및 로깅

### 1. 애플리케이션 모니터링
- **Vercel Analytics**: 성능 메트릭
- **Sentry**: 에러 추적
- **Supabase Dashboard**: 데이터베이스 모니터링

### 2. 로깅 전략
```typescript
// 구조화된 로깅
interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  service: string;
  message: string;
  metadata: Record<string, any>;
}
```

## 🔄 배포 전략

### 1. CI/CD 파이프라인
```
Git Push → GitHub Actions → 테스트 → 빌드 → 배포
```

### 2. 환경별 배포
- **Development**: 로컬 Docker 환경
- **Staging**: Vercel Preview
- **Production**: Vercel Production

### 3. 롤백 전략
- **Blue-Green Deployment**: 무중단 배포
- **Database Migrations**: 순차적 마이그레이션
- **Feature Flags**: 기능 토글

## 🚀 확장성 고려사항

### 1. 수평 확장
- **Load Balancing**: 트래픽 분산
- **Database Sharding**: 데이터베이스 분할
- **Microservices**: 서비스 분리

### 2. 캐싱 전략
- **Redis Cluster**: 분산 캐싱
- **CDN**: 정적 콘텐츠 캐싱
- **Browser Caching**: 클라이언트 캐싱

### 3. 데이터베이스 최적화
- **Read Replicas**: 읽기 전용 복제본
- **Connection Pooling**: 연결 풀 관리
- **Query Optimization**: 쿼리 최적화

## 📈 성능 메트릭

### 1. 핵심 지표
- **Page Load Time**: < 2초
- **Time to Interactive**: < 3초
- **API Response Time**: < 500ms
- **Database Query Time**: < 100ms

### 2. 모니터링 대시보드
- **Real-time Metrics**: 실시간 성능 지표
- **Error Rates**: 에러율 추적
- **User Experience**: 사용자 경험 메트릭

## 🔮 향후 개선 계획

### 1. 단기 목표 (3-6개월)
- [ ] 실시간 협업 기능
- [ ] 모바일 앱 개발
- [ ] 고급 분석 대시보드

### 2. 중기 목표 (6-12개월)
- [ ] AI 기반 학습 진단
- [ ] 개인화된 학습 경로
- [ ] 팀 관리 기능

### 3. 장기 목표 (1년+)
- [ ] 엔터프라이즈 기능
- [ ] API 마켓플레이스
- [ ] 글로벌 확장

---

이 아키텍처는 확장성, 성능, 보안을 고려하여 설계되었으며, 사용자 경험을 최우선으로 하는 현대적인 웹 애플리케이션의 모범 사례를 따릅니다. 