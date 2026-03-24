import { redirect } from 'next/navigation'
import { getCurrentUser, getUserRole } from '@/lib/auth'
import { StatsCard, ActivityItem, DashboardSidebar } from '@/components/dashboard-components'
import { Users, BookOpen, BarChart3, TrendingUp, Clock, Plus, CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { dashboardApi } from '@/lib/api-client'

export default async function TeacherDashboard() {
  const user = await getCurrentUser()
  const role = await getUserRole()

  if (!user || role !== 'teacher') {
    redirect('/login')
  }

  let stats: any = null
  try {
    stats = await dashboardApi.getTeacherDashboard()
  } catch (e) {
    stats = {
      active_classes: 0,
      total_students: 0,
      active_quizzes: 0,
      avg_attendance: 0,
      today_schedule: [],
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 hidden lg:block">
        <DashboardSidebar userRole={role} userName={user.full_name} />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Welcome, {user.full_name}! 👨‍🏫</h1>
          <p className="text-lg text-gray-600">Manage your classes, create quizzes, and track student progress</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-blue-100">Active Classes</CardTitle>
                <Users className="h-5 w-5 text-blue-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">{stats.active_classes}</div>
              <p className="text-blue-200 text-sm">Scheduled today</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-600 to-purple-700 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-purple-100">Total Students</CardTitle>
                <Users className="h-5 w-5 text-purple-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">{stats.total_students}</div>
              <p className="text-purple-200 text-sm">Across all classes</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-green-600 to-green-700 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-green-100">Active Quizzes</CardTitle>
                <BookOpen className="h-5 w-5 text-green-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">{stats.active_quizzes}</div>
              <p className="text-green-200 text-sm">In progress</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-orange-600 to-orange-700 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-orange-100">Avg. Attendance</CardTitle>
                <TrendingUp className="h-5 w-5 text-orange-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">{stats.avg_attendance}%</div>
              <p className="text-orange-200 text-sm">This week</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md h-full">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-green-600" />
                      <span>Today's Schedule</span>
                    </CardTitle>
                    <CardDescription>Your classes and activities</CardDescription>
                  </div>
                  <Button size="sm" variant="ghost">View Week</Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {stats.today_schedule && stats.today_schedule.length ? (
                  stats.today_schedule.map((item: any, idx: number) => (
                    <div key={idx} className="border rounded-lg p-4 hover:bg-green-50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                              <BookOpen className="h-4 w-4 text-green-600" />
                            </span>
                            <p className="font-semibold text-gray-900">{item.class}</p>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 ml-10">
                            <span>⏰ {item.time}</span>
                            <span>📍 Room {item.room}</span>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full">{item.students || 0} students</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">No classes scheduled today</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 auto-rows-max gap-4">
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white justify-start" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Quiz
                </Button>
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white justify-start" size="sm">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Attendance
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white justify-start" size="sm">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Classes
                </Button>
                <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white justify-start" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Class Status Card */}
            <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Class Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Math 101</span>
                    <span className="text-sm font-semibold text-blue-600">28/30</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "93%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Physics 202</span>
                    <span className="text-sm font-semibold text-green-600">25/28</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "89%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Chemistry 150</span>
                    <span className="text-sm font-semibold text-purple-600">22/24</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "92%" }}></div>
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

