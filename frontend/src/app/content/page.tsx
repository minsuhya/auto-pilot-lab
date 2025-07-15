"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Search, Filter, Edit, Trash2, Eye } from "lucide-react";

export default function ContentPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const contents = [
    {
      id: 1,
      title: "React Hooks 완벽 가이드",
      description: "React Hooks의 모든 것을 배워보세요",
      status: "published",
      category: "Programming",
      scheduleDate: "2024-01-15",
      progress: "completed",
      learningTime: 60,
      keywords: ["react", "hooks", "javascript"],
    },
    {
      id: 2,
      title: "TypeScript 기초",
      description: "TypeScript의 기본 개념과 사용법",
      status: "scheduled",
      category: "Programming",
      scheduleDate: "2024-01-20",
      progress: "in_progress",
      learningTime: 45,
      keywords: ["typescript", "javascript", "programming"],
    },
    {
      id: 3,
      title: "Next.js App Router",
      description: "Next.js 13+ App Router 완벽 가이드",
      status: "draft",
      category: "Programming",
      scheduleDate: null,
      progress: "not_started",
      learningTime: 0,
      keywords: ["nextjs", "react", "app-router"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress: string) => {
    switch (progress) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "not_started":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return "발행됨";
      case "scheduled":
        return "예정됨";
      case "draft":
        return "초안";
      default:
        return "대기";
    }
  };

  const getProgressText = (progress: string) => {
    switch (progress) {
      case "completed":
        return "완료";
      case "in_progress":
        return "진행중";
      case "not_started":
        return "시작안함";
      default:
        return "대기";
    }
  };

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || content.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content</h1>
            <p className="text-gray-600 mt-2">콘텐츠를 생성하고 관리하세요.</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                새 콘텐츠
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>새 콘텐츠 생성</DialogTitle>
                <DialogDescription>
                  새로운 학습 콘텐츠를 생성합니다.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">제목</label>
                  <Input placeholder="콘텐츠 제목을 입력하세요" />
                </div>
                <div>
                  <label className="text-sm font-medium">설명</label>
                  <Input placeholder="콘텐츠 설명을 입력하세요" />
                </div>
                <div>
                  <label className="text-sm font-medium">카테고리</label>
                  <Input placeholder="카테고리를 입력하세요" />
                </div>
                <div>
                  <label className="text-sm font-medium">키워드</label>
                  <Input placeholder="키워드를 쉼표로 구분하여 입력하세요" />
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1">저장</Button>
                  <Button variant="outline" className="flex-1">취소</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="콘텐츠 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            필터
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContents.map((content) => (
          <Card key={content.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{content.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {content.description}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">상태</span>
                  <Badge className={getStatusColor(content.status)}>
                    {getStatusText(content.status)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">진행률</span>
                  <Badge className={getProgressColor(content.progress)}>
                    {getProgressText(content.progress)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">카테고리</span>
                  <span className="text-sm font-medium">{content.category}</span>
                </div>
                {content.scheduleDate && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">예정일</span>
                    <span className="text-sm font-medium">{content.scheduleDate}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">학습 시간</span>
                  <span className="text-sm font-medium">{content.learningTime}분</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {content.keywords.map((keyword, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
} 