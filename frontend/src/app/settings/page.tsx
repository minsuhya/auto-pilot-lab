"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Bell, Shield, Palette, Globe, Save, Target } from "lucide-react";

export default function SettingsPage() {
  const [userProfile, setUserProfile] = useState({
    name: "사용자",
    email: "user@example.com",
    role: "student",
    preferences: {
      notifications: true,
      emailUpdates: true,
      theme: "light",
      language: "ko",
    },
    learningGoals: [
      { id: 1, title: "React 마스터하기", targetDate: "2024-06-30", progress: 75 },
      { id: 2, title: "TypeScript 기초 완성", targetDate: "2024-05-15", progress: 45 },
      { id: 3, title: "Next.js 프로젝트", targetDate: "2024-07-30", progress: 20 },
    ],
  });

  const [newGoal, setNewGoal] = useState({ title: "", targetDate: "" });

  const addLearningGoal = () => {
    if (newGoal.title && newGoal.targetDate) {
      setUserProfile(prev => ({
        ...prev,
        learningGoals: [
          ...prev.learningGoals,
          {
            id: Date.now(),
            title: newGoal.title,
            targetDate: newGoal.targetDate,
            progress: 0,
          },
        ],
      }));
      setNewGoal({ title: "", targetDate: "" });
    }
  };

  const removeLearningGoal = (id: number) => {
    setUserProfile(prev => ({
      ...prev,
      learningGoals: prev.learningGoals.filter(goal => goal.id !== id),
    }));
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-2">계정 설정과 학습 목표를 관리하세요.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* 프로필 설정 */}
          <Card className="py-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                프로필 설정
              </CardTitle>
              <CardDescription>
                개인 정보와 계정 설정을 관리합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/avatars/01.png" alt="@user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Label htmlFor="name">이름</Label>
                  <Input
                    id="name"
                    value={userProfile.name}
                    onChange={(e) => setUserProfile(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">이메일</Label>
                <Input
                  id="email"
                  type="email"
                  value={userProfile.email}
                  onChange={(e) => setUserProfile(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="role">역할</Label>
                <div className="flex space-x-2 mt-2">
                  {["student", "creator", "business"].map((role) => (
                    <Button
                      key={role}
                      variant={userProfile.role === role ? "default" : "outline"}
                      size="sm"
                      onClick={() => setUserProfile(prev => ({ ...prev, role }))}
                    >
                      {role === "student" ? "학생" : 
                       role === "creator" ? "크리에이터" : "비즈니스"}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 알림 설정 */}
          <Card className="py-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                알림 설정
              </CardTitle>
              <CardDescription>
                알림 및 이메일 업데이트 설정을 관리합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>푸시 알림</Label>
                  <p className="text-sm text-gray-500">새로운 콘텐츠 및 일정 알림</p>
                </div>
                <Button
                  variant={userProfile.preferences.notifications ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserProfile(prev => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      notifications: !prev.preferences.notifications,
                    },
                  }))}
                >
                  {userProfile.preferences.notifications ? "켜짐" : "꺼짐"}
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>이메일 업데이트</Label>
                  <p className="text-sm text-gray-500">주간 학습 리포트 및 업데이트</p>
                </div>
                <Button
                  variant={userProfile.preferences.emailUpdates ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUserProfile(prev => ({
                    ...prev,
                    preferences: {
                      ...prev.preferences,
                      emailUpdates: !prev.preferences.emailUpdates,
                    },
                  }))}
                >
                  {userProfile.preferences.emailUpdates ? "켜짐" : "꺼짐"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 학습 목표 */}
          <Card className="py-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="mr-2 h-5 w-5" />
                학습 목표
              </CardTitle>
              <CardDescription>
                학습 목표를 설정하고 진행 상황을 추적합니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="goal-title">목표 제목</Label>
                  <Input
                    id="goal-title"
                    placeholder="학습 목표를 입력하세요"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="goal-date">목표 날짜</Label>
                  <Input
                    id="goal-date"
                    type="date"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, targetDate: e.target.value }))}
                  />
                </div>
              </div>
              <Button onClick={addLearningGoal} className="w-full">
                목표 추가
              </Button>

              <Separator />

              <div className="space-y-3">
                {userProfile.learningGoals.map((goal) => (
                  <div key={goal.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{goal.title}</h4>
                        <Badge variant="outline">{goal.progress}%</Badge>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        목표일: {goal.targetDate}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLearningGoal(goal.id)}
                    >
                      삭제
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 사이드바 설정 */}
        <div className="space-y-6">
          {/* 테마 설정 */}
          <Card className="py-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="mr-2 h-5 w-5" />
                테마
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["light", "dark", "auto"].map((theme) => (
                  <Button
                    key={theme}
                    variant={userProfile.preferences.theme === theme ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setUserProfile(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, theme },
                    }))}
                  >
                    {theme === "light" ? "라이트" : 
                     theme === "dark" ? "다크" : "자동"}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 언어 설정 */}
          <Card className="py-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                언어
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {["ko", "en"].map((lang) => (
                  <Button
                    key={lang}
                    variant={userProfile.preferences.language === lang ? "default" : "outline"}
                    className="w-full justify-start"
                    onClick={() => setUserProfile(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, language: lang },
                    }))}
                  >
                    {lang === "ko" ? "한국어" : "English"}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 보안 설정 */}
          <Card className="py-3">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                보안
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                비밀번호 변경
              </Button>
              <Button variant="outline" className="w-full">
                2단계 인증 설정
              </Button>
            </CardContent>
          </Card>

          {/* 저장 버튼 */}
          <Button className="w-full">
            <Save className="mr-2 h-4 w-4" />
            설정 저장
          </Button>
        </div>
      </div>
    </div>
  );
} 