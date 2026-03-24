"use client";

import Head from "next/head";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Users, BarChart, Shield, CheckCircle, ArrowRight, Zap, Award, TrendingUp, GraduationCap, ClipboardCheck, Brain, LineChart, Sparkles, Rocket } from "lucide-react";

const features = [
  {
    icon: ClipboardCheck,
    title: "Smart Attendance",
    description: "QR code-based attendance tracking with real-time analytics and automated reporting.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    items: [
      { text: "Instant QR code generation", icon: CheckCircle },
      { text: "Mobile-friendly check-in", icon: CheckCircle },
      { text: "Automated absence alerts", icon: CheckCircle },
    ],
  },
  {
    icon: Brain,
    title: "Quiz Management",
    description: "Create engaging quizzes with instant feedback and comprehensive analytics.",
    color: "text-green-600",
    bgColor: "bg-green-50",
    items: [
      { text: "Multiple question types", icon: CheckCircle },
      { text: "Automated grading", icon: CheckCircle },
      { text: "Performance insights", icon: CheckCircle },
    ],
  },
  {
    icon: LineChart,
    title: "Learning Analytics",
    description: "AI-powered insights to identify learning gaps and track student progress.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    items: [
      { text: "Progress dashboards", icon: CheckCircle },
      { text: "Gap analysis", icon: CheckCircle },
      { text: "Custom reports", icon: CheckCircle },
    ],
  },
];

const roles = [
  {
    icon: GraduationCap,
    title: "Students",
    description: "Track attendance, take quizzes, submit approvals, and monitor your learning journey.",
    color: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: BookOpen,
    title: "Teachers",
    description: "Manage classes, create quizzes, track attendance, and support student success.",
    color: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: Shield,
    title: "Administrators",
    description: "School-wide analytics, resource allocation, and comprehensive reporting.",
    color: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

const stats = [
  { value: "50K+", label: "Active Students" },
  { value: "2,500+", label: "Teachers" },
  { value: "500+", label: "Schools" },
  { value: "98%", label: "Satisfaction" },
];

const Home = () => {
  return (
    <>
      <Head>
        <title>EduEquity OS - Educational Equity Platform</title>
        <meta name="description" content="Promoting equity in education through smart attendance, quizzes, and analytics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl md:text-2xl font-bold text-gray-900">EduEquity OS</span>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Features</a>
                <a href="#roles" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">For Every Role</a>
                <a href="#stats" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Impact</a>
              </nav>

              {/* CTA Buttons */}
              <div className="flex items-center space-x-3">
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-700 hover:text-blue-600">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-white py-16 md:py-24 lg:py-32">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-8">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">Transforming Education Through Technology</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Education for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Everyone</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Empowering educators and students with smart attendance tracking, 
                quiz management, and learning analytics to promote educational equity.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <Link href="/register">
                  <Button size="lg" className="w-full sm:w-auto h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/20 font-semibold">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 border-gray-300 hover:bg-gray-50 font-semibold">
                    Watch Demo
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image / Dashboard Preview */}
            <div className="mt-16 relative">
              <div className="bg-gray-900 rounded-2xl shadow-2xl shadow-gray-900/20 p-2 md:p-4 lg:p-6 max-w-5xl mx-auto">
                <div className="bg-gray-800 rounded-xl overflow-hidden">
                  <div className="bg-gray-900 px-4 py-3 flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-gray-800 to-gray-900 min-h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <BarChart className="h-10 w-10 text-blue-500" />
                      </div>
                      <p className="text-gray-400">Interactive Dashboard Preview</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Key Features</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Everything you need to manage your educational institution effectively
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="pb-4">
                      <div className={`w-14 h-14 ${feature.bgColor} rounded-xl flex items-center justify-center mb-4`}>
                        <Icon className={`h-7 w-7 ${feature.color}`} />
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {feature.items.map((item, idx) => {
                          const ItemIcon = item.icon;
                          return (
                            <li key={idx} className="flex items-center text-sm text-gray-600">
                              <ItemIcon className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                              {item.text}
                            </li>
                          );
                        })}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Role-Based Access Section */}
        <section id="roles" className="py-20 md:py-28 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">For Every Role</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Tailored features and dashboards for each user type
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {roles.map((role, index) => {
                const Icon = role.icon;
                return (
                  <Card key={index} className="border-0 shadow-lg shadow-gray-200/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center">
                    <CardHeader className="pb-4">
                      <div className={`w-20 h-20 ${role.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                        <Icon className={`h-10 w-10 ${role.iconColor}`} />
                      </div>
                      <CardTitle className="text-xl">{role.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">
                        {role.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
              
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Transform Education?
                </h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                  Join thousands of educators promoting equity in their schools.
                </p>
                <Link href="/register">
                  <Button size="lg" className="h-14 px-10 bg-white text-blue-600 hover:bg-blue-50 font-semibold text-lg shadow-xl">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-10">
              <div className="md:col-span-1">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">EduEquity OS</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Promoting educational equity through technology and data-driven insights.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-white">Product</h4>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-white">Resources</h4>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4 text-white">Company</h4>
                <ul className="space-y-3 text-gray-400 text-sm">
                  <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
              © 2024 EduEquity OS. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Home;

 