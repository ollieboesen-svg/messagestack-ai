"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ArrowLeft,
  Plus,
  Search,
  Edit,
  Trash2,
  Settings,
  Shield,
  Mail,
  Building2,
  Calendar,
  Activity,
  BarChart3,
  UserCheck,
  UserX,
  Crown,
  Database,
  Download,
  Upload,
  Filter,
  MoreVertical,
  Eye,
  Lock,
  Unlock
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: "admin" | "user";
  status: "active" | "inactive" | "pending";
  createdAt: Date;
  lastLogin: Date;
  surveysCreated: number;
  responsesCollected: number;
}

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  role: string;
  isAuthenticated: boolean;
}

export default function AdminPanel() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | "admin" | "user">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive" | "pending">("all");
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showUserActions, setShowUserActions] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    role: "user" as "admin" | "user",
    password: ""
  });

  useEffect(() => {
    // Check if user is authenticated and is admin
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      const user = JSON.parse(storedUserData);
      if (user.role !== "admin") {
        router.push("/dashboard");
        return;
      }
      setUserData(user);
      loadUsers();
    } else {
      router.push("/login");
    }
  }, [router]);

  const loadUsers = () => {
    // Simulate loading users from API
    const mockUsers: User[] = [
      {
        id: "1",
        firstName: "John",
        lastName: "Doe",
        email: "john@demo.com",
        company: "Demo Company",
        role: "user",
        status: "active",
        createdAt: new Date("2024-01-15"),
        lastLogin: new Date("2024-10-03"),
        surveysCreated: 5,
        responsesCollected: 127
      },
      {
        id: "2",
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah@techcorp.com",
        company: "TechCorp Inc",
        role: "user",
        status: "active",
        createdAt: new Date("2024-02-20"),
        lastLogin: new Date("2024-10-02"),
        surveysCreated: 3,
        responsesCollected: 89
      },
      {
        id: "3",
        firstName: "Mike",
        lastName: "Chen",
        email: "mike@startup.io",
        company: "Startup Inc",
        role: "admin",
        status: "active",
        createdAt: new Date("2024-01-10"),
        lastLogin: new Date("2024-10-04"),
        surveysCreated: 12,
        responsesCollected: 245
      },
      {
        id: "4",
        firstName: "Lisa",
        lastName: "Wang",
        email: "lisa@enterprise.com",
        company: "Enterprise Solutions",
        role: "user",
        status: "pending",
        createdAt: new Date("2024-10-01"),
        lastLogin: new Date("2024-10-01"),
        surveysCreated: 0,
        responsesCollected: 0
      }
    ];
    setUsers(mockUsers);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    const user: User = {
      id: Date.now().toString(),
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      company: newUser.company,
      role: newUser.role,
      status: "active",
      createdAt: new Date(),
      lastLogin: new Date(),
      surveysCreated: 0,
      responsesCollected: 0
    };

    setUsers(prev => [...prev, user]);
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      role: "user",
      password: ""
    });
    setShowCreateUser(false);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      setUsers(prev => prev.filter(user => user.id !== userId));
    }
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(prev => prev.map(user =>
      user.id === userId
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    ));
  };

  const handlePromoteUser = (userId: string) => {
    setUsers(prev => prev.map(user =>
      user.id === userId
        ? { ...user, role: user.role === "admin" ? "user" : "admin" }
        : user
    ));
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === "active").length;
  const pendingUsers = users.filter(u => u.status === "pending").length;
  const totalSurveys = users.reduce((sum, u) => sum + u.surveysCreated, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: "linear-gradient(135deg, #8B5CF6 0%, #A855F7 100%)"}}>
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setShowCreateUser(true)}
                className="text-white"
                style={{background: 'linear-gradient(90deg, #8B5CF6 0%, #A855F7 100%)'}}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Users</p>
                  <p className="text-2xl font-bold text-slate-900">{totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Users</p>
                  <p className="text-2xl font-bold text-slate-900">{activeUsers}</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Pending Approval</p>
                  <p className="text-2xl font-bold text-slate-900">{pendingUsers}</p>
                </div>
                <UserX className="h-8 w-8 text-orange-600" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Surveys</p>
                  <p className="text-2xl font-bold text-slate-900">{totalSurveys}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </Card>
          </div>

          {/* User Management */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900">User Management</h2>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Import
                </Button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <div className="relative flex-1 min-w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value as "all" | "admin" | "user")}
                className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admins</option>
                <option value="user">Users</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as "all" | "active" | "inactive" | "pending")}
                className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-4 font-medium text-slate-600">User</th>
                    <th className="text-left p-4 font-medium text-slate-600">Company</th>
                    <th className="text-left p-4 font-medium text-slate-600">Role</th>
                    <th className="text-left p-4 font-medium text-slate-600">Status</th>
                    <th className="text-left p-4 font-medium text-slate-600">Activity</th>
                    <th className="text-left p-4 font-medium text-slate-600">Joined</th>
                    <th className="text-left p-4 font-medium text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                            {user.firstName[0]}{user.lastName[0]}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900">{user.firstName} {user.lastName}</p>
                            <p className="text-sm text-slate-500">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-slate-900">{user.company}</p>
                      </td>
                      <td className="p-4">
                        <Badge className={`${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-100 text-blue-700"
                        }`}>
                          {user.role === "admin" && <Crown className="h-3 w-3 mr-1" />}
                          {user.role}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={`${
                          user.status === "active" ? "bg-green-100 text-green-700" :
                          user.status === "inactive" ? "bg-red-100 text-red-700" :
                          "bg-orange-100 text-orange-700"
                        }`}>
                          {user.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-slate-600">
                          <p>{user.surveysCreated} surveys</p>
                          <p>{user.responsesCollected} responses</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-slate-600">
                          {user.createdAt.toLocaleDateString()}
                        </p>
                      </td>
                      <td className="p-4">
                        <div className="relative">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowUserActions(showUserActions === user.id ? null : user.id)}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>

                          {showUserActions === user.id && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-10">
                              <button
                                onClick={() => {/* Handle view user */}}
                                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </button>
                              <button
                                onClick={() => {/* Handle edit user */}}
                                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit User
                              </button>
                              <button
                                onClick={() => handleToggleUserStatus(user.id)}
                                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center"
                              >
                                {user.status === "active" ? <Lock className="h-4 w-4 mr-2" /> : <Unlock className="h-4 w-4 mr-2" />}
                                {user.status === "active" ? "Deactivate" : "Activate"}
                              </button>
                              <button
                                onClick={() => handlePromoteUser(user.id)}
                                className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center"
                              >
                                <Crown className="h-4 w-4 mr-2" />
                                {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                              </button>
                              <hr className="my-2" />
                              <button
                                onClick={() => {
                                  setShowUserActions(null);
                                  handleDeleteUser(user.id);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete User
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredUsers.length === 0 && (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">No users found matching your criteria</p>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Create New User</h3>
              <Button variant="outline" size="sm" onClick={() => setShowCreateUser(false)}>
                ×
              </Button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                  <input
                    type="text"
                    value={newUser.firstName}
                    onChange={(e) => setNewUser(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    value={newUser.lastName}
                    onChange={(e) => setNewUser(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                <input
                  type="text"
                  value={newUser.company}
                  onChange={(e) => setNewUser(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as "admin" | "user" }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Temporary Password</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="User will be asked to change on first login"
                  required
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 text-white"
                  style={{background: 'linear-gradient(90deg, #8B5CF6 0%, #A855F7 100%)'}}
                >
                  Create User
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateUser(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
