"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, BookOpen, Clock, Target, ChevronLeft, ChevronRight, Sparkles, Pencil, FileText, CheckSquare } from "lucide-react";
import { isSameDay } from "date-fns";

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedView, setSelectedView] = useState<'calendar' | 'table'>('calendar');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [autoPilot, setAutoPilot] = useState(false);

  const events = [
    {
      id: 1,
      title: "React 세미나",
      date: new Date(2025, 6, 2),
      status: "published",
      duration: 60,
    },
    {
      id: 2,
      title: "Next.js 워크숍",
      date: new Date(2025, 6, 2),
      status: "scheduled",
      duration: 90,
    },
    {
      id: 3,
      title: "AI 비즈니스 회의",
      date: new Date(2025, 6, 10),
      status: "drafted",
      duration: 45,
    },
    {
      id: 4,
      title: "팀 프로젝트 발표",
      date: new Date(2025, 6, 15),
      status: "published",
      duration: 120,
    },
    {
      id: 5,
      title: "UI/UX 리뷰",
      date: new Date(2025, 6, 20),
      status: "scheduled",
      duration: 30,
    },
    {
      id: 6,
      title: "기획 회의",
      date: new Date(2025, 6, 25),
      status: "drafted",
      duration: 60,
    },
    // 기존 샘플도 유지
    {
      id: 7,
      title: "Mastering Replit for MVP Development",
      date: new Date(2025, 6, 10),
      status: "scheduled",
      duration: 60,
    },
    {
      id: 8,
      title: "How to Start an AI Business in 2025: Complete Guide",
      date: new Date(2025, 6, 13),
      status: "published",
      duration: 45,
    },
    {
      id: 9,
      title: "Top 10 Lucrative AI Business Ideas You Can Start Today",
      date: new Date(2025, 6, 14),
      status: "scheduled",
      duration: 90,
    },
    {
      id: 10,
      title: "Your 28-Day Roadmap to AI Business Success",
      date: new Date(2025, 6, 15),
      status: "scheduled",
      duration: 75,
    },
    {
      id: 11,
      title: "Start Your AI Business: From Idea to Launch",
      date: new Date(2025, 6, 16),
      status: "scheduled",
      duration: 60,
    },
    {
      id: 12,
      title: "Exploring AI Business Opportunities in 2025",
      date: new Date(2025, 6, 17),
      status: "scheduled",
      duration: 45,
    },
    {
      id: 13,
      title: "How to Turn Your AI Business Idea into Reality",
      date: new Date(2025, 6, 18),
      status: "scheduled",
      duration: 90,
    },
    {
      id: 14,
      title: "Why Replit is the Best Platform for AI Development",
      date: new Date(2025, 6, 19),
      status: "scheduled",
      duration: 60,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-teal-500";
      case "drafted":
        return "bg-amber-400";
      case "scheduled":
        return "bg-purple-500";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return "Published";
      case "drafted":
        return "Drafted";
      case "scheduled":
        return "Scheduled";
      default:
        return "Draft";
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // 이전 달의 마지막 날들
    const prevMonth = new Date(year, month, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = startingDay - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
        events: []
      });
    }
    
    // 현재 달의 날들
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const dayEvents = events.filter(event => 
        event.date.toDateString() === currentDate.toDateString()
      );
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        events: dayEvents
      });
    }
    
    // 다음 달의 첫 날들
    const remainingDays = 42 - days.length; // 6주 고정
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
        events: []
      });
    }
    
    return days;
  };

  const calendarDays = getDaysInMonth(currentMonth);
  const today = new Date();

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
            <p className="text-gray-600 mt-2">달력을 통해 콘텐츠 생성 및 관리를 할 수 있습니다.</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-6">
              {/* Status Filters */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                  <span className="text-sm font-medium">Published</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <span className="text-sm font-medium">Drafted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm font-medium">Scheduled</span>
                </div>
              </div>
              
              {/* Bulk Select */}
              <div className="flex items-center space-x-2">
                <CheckSquare className="h-4 w-4" />
                <span className="text-sm font-medium">Bulk Select</span>
              </div>
              
              {/* View Toggle */}
              <div className="flex bg-gray-200 rounded-lg p-1">
                <Button
                  variant={selectedView === 'calendar' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedView('calendar')}
                  className="text-xs"
                >
                  Calendar
                </Button>
                <Button
                  variant={selectedView === 'table' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedView('table')}
                  className="text-xs"
                >
                  Table
                </Button>
              </div>
            </div>
            
            {/* Fill Calendar Button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-teal-600 hover:bg-teal-700">
                  Fill Calendar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Sparkles className="mr-2 h-4 w-4" />
                  I'm feeling lucky
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Pencil className="mr-2 h-4 w-4" />
                  Topic Brainstorm
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Import Keywords
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Auto-pilot Toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Auto-pilot</span>
              <Button
                variant={autoPilot ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAutoPilot(!autoPilot)}
                className="w-12 h-6 rounded-full"
              >
                {autoPilot ? 'ON' : 'OFF'}
              </Button>
            </div>
            
            {/* Month Navigation */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => {
                setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
              }}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </span>
              <Button variant="ghost" size="sm" onClick={() => {
                setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
              }}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-lg shadow-sm border">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-px">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="bg-gray-200 p-3 text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-px bg-gray-200">
          {calendarDays.map((day, index) => {
            const isToday = day.date.toDateString() === today.toDateString();
            const isSelected = day.date.toDateString() === new Date(2025, 3, 10).toDateString();
            // 해당 날짜의 이벤트만 필터링
            console.log(events[0].date);
            const dayEvents = events.filter(event => isSameDay(event.date, day.date));
            return (
              <div
                key={index}
                className={`bg-white min-h-[120px] p-2 ${
                  !day.isCurrentMonth ? 'text-gray-300' : ''
                } ${
                  isToday ? 'bg-blue-50 border-2 border-blue-200' : ''
                } ${
                  isSelected ? 'border-2 border-blue-300' : ''
                } hover:bg-gray-100 transition-colors duration-200`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-sm font-medium ${
                    isToday ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
                  }`}>
                    {day.date.getDate()}
                  </span>
                </div>
                {/* Events for this day */}
                {dayEvents.map(event => (
                  <Card key={event.id} className="mb-1 w-full h-10">
                    <CardContent className="h-10">
                      <div className="flex items-start space-x-2">
                        <div className={`w-3 h-3 rounded-full mt-1 ${getStatusColor(event.status)}`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-900 truncate">{event.title}</p>
                          <p className="text-[10px] text-gray-500 mt-0.5">
                            {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            );
          })}
        </div>
        <div className="bg-gray-100 h-2"></div>
      </div>
    </div>
  );
} 