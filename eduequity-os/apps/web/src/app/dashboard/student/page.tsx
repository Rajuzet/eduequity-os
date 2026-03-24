import { redirect } from 'next/navigation'
import { getCurrentUser, getUserRole } from '@/lib/auth'
import { StatsCard, ActivityItem, DashboardSidebar } from '@/components/dashboard-components'
import { TrendingUp, BookOpen, Clock, CheckCircle, AlertCircle, Award, Flame, Target, Calendar } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { dashboardApi } from '@/lib/api-client'

export default async function StudentDashboard() {
  const user = await getCurrentUser()
  const role = await getUserRole()

  if (!user || role !== 'student') {
    redirect('/login')
  }

  // Fetch live dashboard data from API
  let stats: any = null
  try {
    stats = await dashboardApi.getStudentDashboard()
  } catch (e) {
    // If API fails, fall back to placeholder values
    stats = {
      attendance_rate: 0,
      quizzes_completed: 0,
      average_score: 0,
      learning_streak_days: 0,
      recent_activity: [],
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 hidden lg:block">
        <DashboardSidebar userRole={role} userName={user.full_name} />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Welcome back, {user.full_name}! 👋</h1>
            <div className="hidden md:block text-right">
              <p className="text-sm text-gray-600"><Calendar className="h-4 w-4 inline mr-2" />{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <p className="text-lg text-gray-600">Here's your learning progress overview</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-blue-100">Attendance Rate</CardTitle>
                <CheckCircle className="h-5 w-5 text-blue-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">{stats.attendance_rate}%</div>
              <p className="text-blue-200 text-sm">This semester</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-green-600 to-green-700 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-green-100">Quizzes Completed</CardTitle>
                <BookOpen className="h-5 w-5 text-green-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">{stats.quizzes_completed}</div>
              <p className="text-green-200 text-sm">Achievement unlocked</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-600 to-purple-700 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-purple-100">Average Score</CardTitle>
                <TrendingUp className="h-5 w-5 text-purple-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">{stats.average_score}%</div>
              <p className="text-purple-200 text-sm">Overall performance</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-orange-600 to-orange-700 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-orange-100">Learning Streak</CardTitle>
                <Flame className="h-5 w-5 text-orange-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">{stats.learning_streak_days}</div>
              <p className="text-orange-200 text-sm">Days active</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity - Larger */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md h-full">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Recent Activity</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {stats.recent_activity && stats.recent_activity.length ? (
                  <div className="space-y-4">
                    {stats.recent_activity.map((item: any, idx: number) => (
                      <div key={idx} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{item.title}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <p className="text-xs text-gray-500 whitespace-nowrap ml-4">{item.timestamp}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No recent activity yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 auto-rows-max gap-4">
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Take a Quiz
                </Button>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="sm" variant="outline">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Attendance
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white" size="sm" variant="outline">
                  <Award className="h-4 w-4 mr-2" />
                  View Certificates
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Study Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Mathematics</span>
                    <span className="text-blue-600 font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">Science</span>
                    <span className="text-green-600 font-semibold">72%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "72%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">English</span>
                    <span className="text-purple-600 font-semibold">90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

