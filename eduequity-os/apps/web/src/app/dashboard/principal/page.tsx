import { redirect } from 'next/navigation'
import { getCurrentUser, getUserRole } from '@/lib/auth'
import { StatsCard, DashboardSidebar } from '@/components/dashboard-components'
import { dashboardApi } from '@/lib/api-client'
import { School, Users, BarChart3, TrendingUp, AlertCircle, CheckCircle, Bell, LineChart } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default async function PrincipalDashboard() {
  const user = await getCurrentUser()
  const role = await getUserRole()

  if (!user || role !== 'principal') {
    redirect('/login')
  }

  let stats: any = null
  try {
    stats = await dashboardApi.getPrincipalDashboard()
  } catch (e) {
    stats = {
      schools: 0,
      teachers: 0,
      students: 0,
      avg_attendance: 0,
      alerts: [],
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 hidden lg:block">
        <DashboardSidebar userRole={role} userName={user.full_name} />
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 p-4 md:p-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">District Overview</h1>
          <p className="text-lg text-gray-600">High-level metrics across your schools and institutions</p>
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-600 to-blue-700 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-blue-100">Schools</CardTitle>
                <School className="h-5 w-5 text-blue-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">{stats.schools}</div>
              <p className="text-blue-200 text-sm">Total in district</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-600 to-purple-700 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-purple-100">Teachers</CardTitle>
                <Users className="h-5 w-5 text-purple-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">{stats.teachers}</div>
              <p className="text-purple-200 text-sm">Across district</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-green-600 to-green-700 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-green-100">Students</CardTitle>
                <BarChart3 className="h-5 w-5 text-green-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">{stats.students}</div>
              <p className="text-green-200 text-sm">Total enrollment</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md hover:shadow-lg transition-shadow bg-gradient-to-br from-orange-600 to-orange-700 text-white">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold text-orange-100">Attendance</CardTitle>
                <TrendingUp className="h-5 w-5 text-orange-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold mb-1">{stats.avg_attendance}%</div>
              <p className="text-orange-200 text-sm">Average this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* District Metrics */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-md h-full">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center space-x-2">
                      <LineChart className="h-5 w-5 text-purple-600" />
                      <span>District Analytics</span>
                    </CardTitle>
                    <CardDescription>Key performance indicators</CardDescription>
                  </div>
                  <Button size="sm" variant="ghost">Export Report</Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {/* Attendance Trend */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">Attendance Trend</h4>
                      <span className="text-green-600 font-semibold">↑ 2.3%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full" style={{ width: "78%" }}></div>
                    </div>
                  </div>

                  {/* Student Performance */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">Student Performance</h4>
                      <span className="text-blue-600 font-semibold">82.4%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full" style={{ width: "82%" }}></div>
                    </div>
                  </div>

                  {/* Teacher Engagement */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">Teacher Engagement</h4>
                      <span className="text-green-600 font-semibold">89.7%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full" style={{ width: "90%" }}></div>
                    </div>
                  </div>

                  {/* Quiz Completion */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">Quiz Completion Rate</h4>
                      <span className="text-orange-600 font-semibold">76.5%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div className="h-2 bg-gradient-to-r from-orange-600 to-red-600 rounded-full" style={{ width: "77%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts & Notifications */}
          <div className="grid grid-cols-1 auto-rows-max gap-4">
            <Card className="border-0 shadow-md">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center space-x-2">
                  <Bell className="h-5 w-5 text-orange-600" />
                  <span>Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {stats.alerts && stats.alerts.length ? (
                  stats.alerts.map((a: any, i: number) => (
                    <div key={i} className="p-3 border border-orange-200 bg-orange-50 rounded-lg text-sm">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{a}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">All systems operating normally</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Program Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="font-medium text-sm">Active Schools</span>
                  <span className="text-lg font-bold text-purple-600">{stats.schools}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="font-medium text-sm">Registered Users</span>
                  <span className="text-lg font-bold text-blue-600">{(stats.teachers + stats.students)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="font-medium text-sm">System Health</span>
                  <span className="inline-flex items-center space-x-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-semibold text-green-600">100%</span>
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

