'use client'

import React from 'react'
import Link from 'next/link'
import { UseFormFieldConfig, FieldValues, ControllerRenderProps, ControllerFieldState, UseFormStateReturn } from 'react-hook-form'
import { Users, BarChart3, BookOpen, Settings, LogOut } from 'lucide-react'
import { Button } from './ui/button'

interface DashboardSidebarProps {
  userRole?: string
  userName?: string
}

export function DashboardSidebar({ userRole = 'student', userName = 'User' }: DashboardSidebarProps) {
  const getDashboardLinks = (role: string) => {
    const baseLinks = [
      { href: `/dashboard/${role}`, label: 'Dashboard', icon: BarChart3 },
    ]

    const roleLinks: Record<string, Array<{ href: string; label: string; icon: React.ElementType }>> = {
      student: [
        { href: '/dashboard/student', label: 'My Dashboard', icon: BarChart3 },
        { href: '/dashboard/student/attendance', label: 'Attendance', icon: BookOpen },
        { href: '/dashboard/student/quizzes', label: 'Quizzes', icon: BookOpen },
      ],
      teacher: [
        { href: '/dashboard/teacher', label: 'My Dashboard', icon: BarChart3 },
        { href: '/dashboard/teacher/classes', label: 'My Classes', icon: Users },
        { href: '/dashboard/teacher/quizzes', label: 'Quizzes', icon: BookOpen },
        { href: '/dashboard/teacher/attendance', label: 'Attendance', icon: BookOpen },
      ],
      principal: [
        { href: '/dashboard/principal', label: 'Analytics', icon: BarChart3 },
        { href: '/dashboard/principal/schools', label: 'Schools', icon: Users },
        { href: '/dashboard/principal/reports', label: 'Reports', icon: BarChart3 },
      ],
    }

    return roleLinks[role] || baseLinks
  }

  const links = getDashboardLinks(userRole)

  return (
    <div className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-700">
        <div className="text-sm text-gray-300 mb-2">Welcome,</div>
        <div className="font-semibold text-lg text-white truncate">{userName}</div>
        <div className="text-xs text-gray-400 mt-1 capitalize">{userRole}</div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link href={link.href} key={link.href}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-gray-200 hover:bg-gray-700 hover:text-white"
                >
                  <Icon className="h-4 w-4 mr-3" />
                  {link.label}
                </Button>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 space-y-2">
        <Link href="/settings">
          <Button variant="ghost" className="w-full justify-start text-gray-200 hover:bg-gray-700">
            <Settings className="h-4 w-4 mr-3" />
            Settings
          </Button>
        </Link>
        <button
          onClick={() => {
            document.cookie = 'user_role=; Max-Age=0'
            window.location.href = '/login'
          }}
          className="w-full text-left px-4 py-2 rounded-md text-gray-200 hover:bg-red-600 flex items-center transition"
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </button>
      </div>
    </div>
  )
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendUp,
}: {
  title: string
  value: string | number
  description: string
  icon: React.ElementType
  trend?: string
  trendUp?: boolean
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          <p className="text-xs text-gray-500 mt-2">{description}</p>
          {trend && (
            <p className={`text-sm mt-2 font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
              {trendUp ? '↑' : '↓'} {trend}
            </p>
          )}
        </div>
        <div className="rounded-lg bg-blue-50 p-3">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
    </div>
  )
}

export function ActivityItem({
  title,
  description,
  icon: Icon,
  timestamp,
  status,
}: {
  title: string
  description: string
  icon: React.ElementType
  timestamp: string
  status?: 'success' | 'pending' | 'warning'
}) {
  const statusColors = {
    success: 'bg-green-50 text-green-700',
    pending: 'bg-yellow-50 text-yellow-700',
    warning: 'bg-red-50 text-red-700',
  }

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
      <div className={`rounded-lg p-2 ${status ? statusColors[status] : 'bg-blue-50 text-blue-600'}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <p className="text-xs text-gray-500 whitespace-nowrap">{timestamp}</p>
    </div>
  )
}
