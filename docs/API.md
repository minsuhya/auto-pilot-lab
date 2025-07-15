# 📚 Auto-Pilot Lab API 문서

## 🔗 기본 정보

- **Base URL**: `https://your-domain.vercel.app/api`
- **Authentication**: Bearer Token (JWT)
- **Content-Type**: `application/json`

## 🔐 인증

### 로그인
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "student"
    },
    "token": "jwt_token_here"
  }
}
```

### 회원가입
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "student",
  "preferences": {
    "topics": ["programming", "design"],
    "learning_goals": ["master-react", "improve-design"]
  }
}
```

### 로그아웃
```http
POST /api/auth/logout
```

**Headers:**
```
Authorization: Bearer <token>
```

## 📝 콘텐츠 관리

### 콘텐츠 목록 조회
```http
GET /api/content?page=1&limit=10&status=published
```

**Query Parameters:**
- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 항목 수 (기본값: 10)
- `status`: 콘텐츠 상태 필터
- `category`: 카테고리 필터
- `search`: 검색어

**Response:**
```json
{
  "success": true,
  "data": {
    "content": [
      {
        "id": "uuid",
        "title": "React Hooks 완벽 가이드",
        "body": "React Hooks에 대한 상세한 설명...",
        "status": "published",
        "schedule_date": "2024-01-15",
        "progress": "completed",
        "category": {
          "id": "uuid",
          "name": "Programming",
          "color": "#3B82F6"
        },
        "created_at": "2024-01-10T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "totalPages": 3
    }
  }
}
```

### 콘텐츠 생성
```http
POST /api/content
```

**Request Body:**
```json
{
  "title": "새로운 콘텐츠 제목",
  "body": "콘텐츠 내용...",
  "keywords": ["react", "hooks", "tutorial"],
  "category_id": "uuid",
  "status": "draft",
  "schedule_date": "2024-01-20"
}
```

### 콘텐츠 수정
```http
PUT /api/content/{id}
```

**Request Body:**
```json
{
  "title": "수정된 제목",
  "body": "수정된 내용...",
  "status": "scheduled"
}
```

### 콘텐츠 삭제
```http
DELETE /api/content/{id}
```

## 📅 캘린더 관리

### 캘린더 데이터 조회
```http
GET /api/calendar?year=2024&month=1
```

**Query Parameters:**
- `year`: 년도
- `month`: 월
- `view`: `month` | `week` | `day`

**Response:**
```json
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "uuid",
        "title": "React Hooks 학습",
        "date": "2024-01-15",
        "type": "learning",
        "status": "scheduled",
        "duration": 60,
        "content_id": "uuid"
      }
    ],
    "statistics": {
      "total_events": 15,
      "completed": 8,
      "in_progress": 4,
      "scheduled": 3
    }
  }
}
```

### 자동 캘린더 채우기
```http
POST /api/calendar/fill
```

**Request Body:**
```json
{
  "method": "keywords", // "keywords" | "topics" | "lucky"
  "keywords": ["react", "typescript", "nextjs"],
  "start_date": "2024-01-15",
  "end_date": "2024-01-31",
  "frequency": "daily" // "daily" | "weekly" | "custom"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "generated_content": 7,
    "scheduled_events": 7,
    "workflow_id": "n8n_workflow_id"
  }
}
```

## 📚 학습 관리

### 학습 세션 시작
```http
POST /api/learning/sessions
```

**Request Body:**
```json
{
  "content_id": "uuid",
  "notes": "학습 노트..."
}
```

### 학습 세션 종료
```http
PUT /api/learning/sessions/{id}/end
```

**Request Body:**
```json
{
  "duration": 45,
  "notes": "학습 완료 노트...",
  "progress": "completed"
}
```

### 학습 진행률 업데이트
```http
PUT /api/learning/progress
```

**Request Body:**
```json
{
  "content_id": "uuid",
  "progress": "in_progress", // "not_started" | "in_progress" | "completed"
  "learning_time": 30
}
```

### 학습 통계 조회
```http
GET /api/learning/statistics?period=month
```

**Query Parameters:**
- `period`: `week` | `month` | `year`

**Response:**
```json
{
  "success": true,
  "data": {
    "total_learning_time": 1200, // 분 단위
    "completed_content": 15,
    "average_session_duration": 45,
    "learning_streak": 7,
    "topics": [
      {
        "name": "React",
        "time_spent": 480,
        "content_count": 8
      }
    ]
  }
}
```

## 🏷️ 카테고리 관리

### 카테고리 목록 조회
```http
GET /api/categories
```

### 카테고리 생성
```http
POST /api/categories
```

**Request Body:**
```json
{
  "name": "Programming",
  "color": "#3B82F6"
}
```

## 🤖 자동화 관리

### 워크플로우 상태 조회
```http
GET /api/automation/status/{workflow_id}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "workflow_id": "uuid",
    "status": "running", // "pending" | "running" | "completed" | "failed"
    "progress": 75,
    "estimated_completion": "2024-01-15T14:30:00Z",
    "generated_content": 5
  }
}
```

### 워크플로우 취소
```http
POST /api/automation/cancel/{workflow_id}
```

## 👤 사용자 프로필

### 프로필 조회
```http
GET /api/profile
```

### 프로필 업데이트
```http
PUT /api/profile
```

**Request Body:**
```json
{
  "preferences": {
    "topics": ["react", "typescript"],
    "learning_goals": ["master-react", "improve-design"]
  },
  "learning_goals": [
    {
      "id": "uuid",
      "title": "React 마스터하기",
      "target_date": "2024-06-30",
      "progress": 60
    }
  ]
}
```

## 📊 분석 및 통계

### 대시보드 데이터
```http
GET /api/analytics/dashboard
```

**Response:**
```json
{
  "success": true,
  "data": {
    "recent_activity": [
      {
        "type": "content_created",
        "title": "React Hooks 완벽 가이드",
        "timestamp": "2024-01-15T10:00:00Z"
      }
    ],
    "learning_progress": {
      "weekly_goal": 300,
      "current_progress": 240,
      "remaining": 60
    },
    "content_statistics": {
      "total": 25,
      "published": 15,
      "draft": 8,
      "scheduled": 2
    }
  }
}
```

## ⚠️ 에러 응답

### 에러 응답 형식
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "입력 데이터가 유효하지 않습니다.",
    "details": {
      "field": "title",
      "issue": "제목은 필수입니다."
    }
  }
}
```

### 에러 코드 목록
- `AUTHENTICATION_ERROR`: 인증 실패
- `AUTHORIZATION_ERROR`: 권한 없음
- `VALIDATION_ERROR`: 입력 데이터 검증 실패
- `NOT_FOUND`: 리소스를 찾을 수 없음
- `RATE_LIMIT_EXCEEDED`: 요청 제한 초과
- `INTERNAL_SERVER_ERROR`: 서버 내부 오류

## 🔄 웹훅

### n8n 웹훅 엔드포인트
```http
POST /api/webhooks/n8n
```

**Request Body:**
```json
{
  "workflow_id": "uuid",
  "status": "completed",
  "data": {
    "generated_content": [
      {
        "title": "생성된 콘텐츠 제목",
        "body": "생성된 콘텐츠 내용...",
        "keywords": ["react", "tutorial"]
      }
    ]
  }
}
```

## 📝 사용 예시

### JavaScript/TypeScript
```typescript
// API 클라이언트 예시
class AutoPilotAPI {
  private baseURL = 'https://your-domain.vercel.app/api';
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
        ...options.headers,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'API 요청 실패');
    }

    return data;
  }

  // 콘텐츠 목록 조회
  async getContent(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }) {
    const queryString = new URLSearchParams(params as Record<string, string>);
    return this.request(`/content?${queryString}`);
  }

  // 콘텐츠 생성
  async createContent(content: {
    title: string;
    body: string;
    keywords?: string[];
    category_id?: string;
    status?: string;
    schedule_date?: string;
  }) {
    return this.request('/content', {
      method: 'POST',
      body: JSON.stringify(content),
    });
  }

  // 캘린더 채우기
  async fillCalendar(options: {
    method: 'keywords' | 'topics' | 'lucky';
    keywords?: string[];
    start_date: string;
    end_date: string;
    frequency: 'daily' | 'weekly' | 'custom';
  }) {
    return this.request('/calendar/fill', {
      method: 'POST',
      body: JSON.stringify(options),
    });
  }
}

// 사용 예시
const api = new AutoPilotAPI('your-jwt-token');

// 콘텐츠 목록 조회
const content = await api.getContent({ page: 1, limit: 10 });

// 캘린더 자동 채우기
const result = await api.fillCalendar({
  method: 'keywords',
  keywords: ['react', 'typescript'],
  start_date: '2024-01-15',
  end_date: '2024-01-31',
  frequency: 'daily'
});
```

### cURL 예시
```bash
# 로그인
curl -X POST https://your-domain.vercel.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'

# 콘텐츠 목록 조회
curl -X GET https://your-domain.vercel.app/api/content \
  -H "Authorization: Bearer your-jwt-token"

# 캘린더 채우기
curl -X POST https://your-domain.vercel.app/api/calendar/fill \
  -H "Authorization: Bearer your-jwt-token" \
  -H "Content-Type: application/json" \
  -d '{
    "method": "keywords",
    "keywords": ["react", "typescript"],
    "start_date": "2024-01-15",
    "end_date": "2024-01-31",
    "frequency": "daily"
  }'
```

---

이 API 문서는 Auto-Pilot Lab의 모든 엔드포인트와 사용법을 포함하고 있습니다. 추가적인 질문이나 기능 요청이 있으시면 언제든지 연락해 주세요. 