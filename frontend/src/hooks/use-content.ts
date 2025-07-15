import { useState, useEffect } from 'react';

interface Content {
  id: string;
  title: string;
  body?: string;
  keywords?: string[];
  category_id?: string;
  status: 'draft' | 'scheduled' | 'published' | 'archived';
  schedule_date?: string;
  progress: 'not_started' | 'in_progress' | 'completed';
  learning_time: number;
  ai_generated: boolean;
  created_at: string;
  updated_at: string;
}

interface ContentFilters {
  page?: number;
  limit?: number;
  status?: string;
  category?: string;
  search?: string;
}

interface ContentResponse {
  success: boolean;
  data: {
    content: Content[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchContents = async (filters: ContentFilters = {}) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters.page) params.append('page', filters.page.toString());
      if (filters.limit) params.append('limit', filters.limit.toString());
      if (filters.status) params.append('status', filters.status);
      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);

      const response = await fetch(`/api/content?${params}`);
      const data: ContentResponse = await response.json();

      if (data.success) {
        setContents(data.data.content);
        setPagination(data.data.pagination);
      } else {
        setError('콘텐츠를 불러오는 중 오류가 발생했습니다.');
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const createContent = async (contentData: Partial<Content>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contentData),
      });

      const data = await response.json();

      if (data.success) {
        // 새 콘텐츠를 목록에 추가
        setContents(prev => [data.data.content, ...prev]);
        return data.data.content;
      } else {
        setError(data.error || '콘텐츠 생성 중 오류가 발생했습니다.');
        return null;
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (id: string, updates: Partial<Content>) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/content/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (data.success) {
        // 콘텐츠 목록 업데이트
        setContents(prev => 
          prev.map(content => 
            content.id === id ? { ...content, ...updates } : content
          )
        );
        return data.data.content;
      } else {
        setError(data.error || '콘텐츠 업데이트 중 오류가 발생했습니다.');
        return null;
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteContent = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/content/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        // 콘텐츠 목록에서 제거
        setContents(prev => prev.filter(content => content.id !== id));
        return true;
      } else {
        setError(data.error || '콘텐츠 삭제 중 오류가 발생했습니다.');
        return false;
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    contents,
    loading,
    error,
    pagination,
    fetchContents,
    createContent,
    updateContent,
    deleteContent,
  };
} 