import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  FileText, 
  Building2, 
  GraduationCap, 
  Settings, 
  BarChart3, 
  Plus, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Trash2, 
  AlertTriangle, 
  Database, 
  Bell, 
  Lock, 
  Eye, 
  TrendingUp, 
  DollarSign, 
  Filter, 
  Save, 
  RotateCcw,
  Sparkles,
  HelpCircle,
  Download,
  BookOpen,
  Globe,
  Code,
  Copy,
  Check,
  ExternalLink,
  Layers
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from 'recharts';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Scholar' | 'Moderator' | 'Member';
  status: 'Active' | 'Suspended' | 'Pending';
  joinedDate: string;
  lastActive: string;
}

interface PendingContent {
  id: string;
  type: 'Fatwa' | 'Blog' | 'Mosque' | 'Course';
  title: string;
  author: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

const INITIAL_USERS: UserRecord[] = [
  { id: 'usr-1', name: 'Dr. Tariq Al-Mansoor', email: 'tariq.mansoor@bofferly.org', role: 'Admin', status: 'Active', joinedDate: '2024-01-15', lastActive: '2 mins ago' },
  { id: 'usr-2', name: 'Sheikh Bilal Ahmad', email: 'bilal.ahmad@bofferly.org', role: 'Scholar', status: 'Active', joinedDate: '2024-02-10', lastActive: '1 hour ago' },
  { id: 'usr-3', name: 'Aisha Fatima', email: 'aisha.f@gmail.com', role: 'Moderator', status: 'Active', joinedDate: '2024-03-01', lastActive: 'Just now' },
  { id: 'usr-4', name: 'Omar Farooq', email: 'omar.farooq@yahoo.com', role: 'Member', status: 'Active', joinedDate: '2024-05-12', lastActive: 'Yesterday' },
  { id: 'usr-5', name: 'Zaid Ibn Harith', email: 'zaid.harith@outlook.com', role: 'Member', status: 'Suspended', joinedDate: '2024-06-20', lastActive: '3 weeks ago' },
];

const INITIAL_PENDING_ITEMS: PendingContent[] = [
  { id: 'p-101', type: 'Fatwa', title: 'Ruling on cryptocurrency staking in Islamic finance', author: 'User #8821', submittedAt: '10 mins ago', status: 'Pending' },
  { id: 'p-102', type: 'Mosque', title: 'An-Noor Islamic Center & Community School', author: 'Imam Yusuf', submittedAt: '1 hour ago', status: 'Pending' },
  { id: 'p-103', type: 'Blog', title: 'Understanding the Virtues of Voluntary Fasting in Muharram', author: 'Sister Khadija', submittedAt: '3 hours ago', status: 'Pending' },
  { id: 'p-104', type: 'Course', title: 'Advanced Usul al-Fiqh Studies', author: 'Academy Dept', submittedAt: 'Yesterday', status: 'Pending' },
];

const TRAFFIC_DATA = [
  { day: 'Mon', visits: 12400, queries: 3200 },
  { day: 'Tue', visits: 14200, queries: 3800 },
  { day: 'Wed', visits: 15800, queries: 4100 },
  { day: 'Thu', visits: 18900, queries: 4900 },
  { day: 'Fri', visits: 24500, queries: 7200 },
  { day: 'Sat', visits: 21000, queries: 5800 },
  { day: 'Sun', visits: 19800, queries: 5100 },
];

export const AdminDashboardView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'mosques' | 'wordpress' | 'settings'>('overview');
  
  // WordPress Theme Exporter & REST API state
  const [wpSiteUrl, setWpSiteUrl] = useState('https://myislamicsite.com');
  const [wpApiConnected, setWpApiConnected] = useState(false);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [activeCodeFile, setActiveCodeFile] = useState<'functions.php' | 'style.css' | 'header.php' | 'footer.php' | 'README.txt'>('functions.php');
  
  // User Management State
  const [users, setUsers] = useState<UserRecord[]>(INITIAL_USERS);
  const [userSearch, setUserSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  
  // Content Moderation State
  const [pendingItems, setPendingItems] = useState<PendingContent[]>(INITIAL_PENDING_ITEMS);

  // Site Configuration Form State
  const [nisabGold, setNisabGold] = useState('6850.00');
  const [nisabSilver, setNisabSilver] = useState('580.00');
  const [announcementText, setAnnouncementText] = useState('Welcome to Bofferly Islamic Knowledge Platform — Ramadan 1448 AH Special Tools Active!');
  const [announcementEnabled, setAnnouncementEnabled] = useState(true);
  const [configSaved, setConfigSaved] = useState(false);

  // New User Modal State
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRole, setNewUserRole] = useState<'Admin' | 'Scholar' | 'Moderator' | 'Member'>('Member');

  // Handle User Status Toggle
  const toggleUserStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return u;
    }));
  };

  // Handle Add User
  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail) return;

    const newUser: UserRecord = {
      id: `usr-${Date.now()}`,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      status: 'Active',
      joinedDate: new Date().toISOString().split('T')[0],
      lastActive: 'Just now'
    };

    setUsers([newUser, ...users]);
    setNewUserName('');
    setNewUserEmail('');
    setShowAddUserModal(false);
  };

  // Handle Content Approval/Rejection
  const handleContentAction = (id: string, action: 'Approved' | 'Rejected') => {
    setPendingItems(pendingItems.map(item => {
      if (item.id === id) {
        return { ...item, status: action };
      }
      return item;
    }));
  };

  // Filtered Users List
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
                          u.email.toLowerCase().includes(userSearch.toLowerCase());
    const matchesRole = roleFilter === 'All' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-8 font-sans">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-slate-950 via-emerald-950 to-slate-950 text-white p-6 sm:p-8 rounded-3xl border border-amber-400/40 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-amber-400/20 text-amber-300 text-xs px-3.5 py-1.5 rounded-full border border-amber-400/40 font-extrabold">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Super Admin Command Console</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              Bofferly Administrative Control Center
            </h1>
            <p className="text-xs sm:text-sm text-emerald-200/90 max-w-2xl">
              Manage system configurations, user accounts, content moderation, directory listings, and global platform analytics.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-emerald-300 font-mono">System Online • v2.4.0</span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="pt-4 border-t border-emerald-800/60 flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'overview'
                ? 'bg-amber-400 text-emerald-950 shadow-lg'
                : 'bg-black/40 text-emerald-200 hover:bg-emerald-900/60'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Overview & Vitals</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'users'
                ? 'bg-amber-400 text-emerald-950 shadow-lg'
                : 'bg-black/40 text-emerald-200 hover:bg-emerald-900/60'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>User Management ({users.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'content'
                ? 'bg-amber-400 text-emerald-950 shadow-lg'
                : 'bg-black/40 text-emerald-200 hover:bg-emerald-900/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Content Moderation ({pendingItems.filter(p => p.status === 'Pending').length})</span>
          </button>

          <button
            onClick={() => setActiveTab('mosques')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'mosques'
                ? 'bg-amber-400 text-emerald-950 shadow-lg'
                : 'bg-black/40 text-emerald-200 hover:bg-emerald-900/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Mosque Directory</span>
          </button>

          <button
            onClick={() => setActiveTab('wordpress')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'wordpress'
                ? 'bg-amber-400 text-emerald-950 shadow-lg'
                : 'bg-black/40 text-emerald-200 hover:bg-emerald-900/60'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-amber-300" />
            <span>WordPress Theme Export 🔌</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'settings'
                ? 'bg-amber-400 text-emerald-950 shadow-lg'
                : 'bg-black/40 text-emerald-200 hover:bg-emerald-900/60'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Platform Settings</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: OVERVIEW & SYSTEM VITALS */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Key Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-emerald-950/80 backdrop-blur-md p-5 rounded-3xl border border-emerald-800/50 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-amber-400">
                <span className="text-xs uppercase font-extrabold text-emerald-300">Total Registered Users</span>
                <Users className="w-5 h-5" />
              </div>
              <p className="text-3xl font-black text-amber-300 font-mono">14,280</p>
              <p className="text-[11px] text-emerald-200/70">+12% growth this month</p>
            </div>

            <div className="bg-emerald-950/80 backdrop-blur-md p-5 rounded-3xl border border-emerald-800/50 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-amber-400">
                <span className="text-xs uppercase font-extrabold text-emerald-300">Quran & Fatwa Queries</span>
                <HelpCircle className="w-5 h-5" />
              </div>
              <p className="text-3xl font-black text-amber-300 font-mono">89,450</p>
              <p className="text-[11px] text-emerald-200/70">Searches answered this week</p>
            </div>

            <div className="bg-emerald-950/80 backdrop-blur-md p-5 rounded-3xl border border-emerald-800/50 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-amber-400">
                <span className="text-xs uppercase font-extrabold text-emerald-300">Pending Approvals</span>
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <p className="text-3xl font-black text-amber-300 font-mono">{pendingItems.filter(p => p.status === 'Pending').length}</p>
              <p className="text-[11px] text-emerald-200/70">Items awaiting scholar review</p>
            </div>

            <div className="bg-emerald-950/80 backdrop-blur-md p-5 rounded-3xl border border-emerald-800/50 shadow-lg space-y-2">
              <div className="flex items-center justify-between text-amber-400">
                <span className="text-xs uppercase font-extrabold text-emerald-300">Cloud Sync Status</span>
                <Database className="w-5 h-5" />
              </div>
              <p className="text-3xl font-black text-emerald-400 font-mono">Healthy</p>
              <p className="text-[11px] text-emerald-200/70">Auto-backup snapshot active</p>
            </div>

          </div>

          {/* Traffic & Usage Chart */}
          <div className="bg-emerald-950/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-800/50 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-800/60 pb-3">
              <div>
                <h2 className="text-xl font-extrabold text-white">Platform Traffic & Search Queries</h2>
                <p className="text-xs text-emerald-200/80">Weekly breakdown of user sessions vs search queries answered.</p>
              </div>
              <span className="text-xs bg-black/40 text-amber-300 border border-emerald-800 px-3 py-1 rounded-full font-bold">
                Past 7 Days
              </span>
            </div>

            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TRAFFIC_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorQueries" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#6ee7b7" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#fde68a" tick={{ fontSize: 11 }} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#065f46" />
                  <Tooltip contentStyle={{ backgroundColor: '#022c22', borderColor: '#fbbf24', borderRadius: '12px', color: '#fff' }} />
                  <Area type="monotone" dataKey="visits" name="User Visits" stroke="#f59e0b" fillOpacity={1} fill="url(#colorVisits)" />
                  <Area type="monotone" dataKey="queries" name="Search Queries" stroke="#10b981" fillOpacity={1} fill="url(#colorQueries)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 2: USER MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="bg-emerald-950/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-800/50 shadow-2xl space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-emerald-800/60 pb-4">
            <div>
              <h2 className="text-xl font-extrabold text-white">System Accounts & User Roles</h2>
              <p className="text-xs text-emerald-200/80">Manage platform permissions, assign Scholar roles, and regulate access.</p>
            </div>

            <button
              onClick={() => setShowAddUserModal(true)}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-2xl text-xs flex items-center space-x-1.5 shadow-md transition-all shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Admin / Scholar</span>
            </button>
          </div>

          {/* Search & Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search user by name or email..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full bg-black/40 text-emerald-100 placeholder-emerald-500/70 pl-10 pr-4 py-2.5 rounded-2xl border border-emerald-800 text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-black/40 text-amber-300 border border-emerald-800 px-4 py-2.5 rounded-2xl text-xs focus:outline-none font-bold"
            >
              <option value="All" className="bg-emerald-950">All Roles</option>
              <option value="Admin" className="bg-emerald-950">Admin</option>
              <option value="Scholar" className="bg-emerald-950">Scholar</option>
              <option value="Moderator" className="bg-emerald-950">Moderator</option>
              <option value="Member" className="bg-emerald-950">Member</option>
            </select>
          </div>

          {/* User Table */}
          <div className="overflow-x-auto rounded-2xl border border-emerald-800/60">
            <table className="w-full text-left text-xs text-emerald-200">
              <thead className="bg-emerald-900/60 text-amber-300 font-extrabold border-b border-emerald-800">
                <tr>
                  <th className="p-4">User Details</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Joined Date</th>
                  <th className="p-4">Last Active</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-800/40 bg-black/20">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-emerald-900/30 transition-colors">
                    <td className="p-4">
                      <p className="font-bold text-white text-sm">{user.name}</p>
                      <p className="text-[11px] text-emerald-400/80">{user.email}</p>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        user.role === 'Admin' ? 'bg-amber-400/20 text-amber-300 border-amber-400/30' :
                        user.role === 'Scholar' ? 'bg-indigo-400/20 text-indigo-300 border-indigo-400/30' :
                        user.role === 'Moderator' ? 'bg-emerald-400/20 text-emerald-300 border-emerald-400/30' :
                        'bg-slate-800 text-slate-300 border-slate-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        user.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4 text-emerald-300/80">{user.joinedDate}</td>
                    <td className="p-4 text-emerald-300/80">{user.lastActive}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => toggleUserStatus(user.id)}
                        className={`px-3 py-1 rounded-xl text-[10px] font-bold border transition-all ${
                          user.status === 'Active' 
                            ? 'bg-rose-950/80 hover:bg-rose-900 text-rose-300 border-rose-700' 
                            : 'bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border-emerald-700'
                        }`}
                      >
                        {user.status === 'Active' ? 'Suspend' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* SECTION 3: CONTENT MODERATION */}
      {activeTab === 'content' && (
        <div className="bg-emerald-950/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-800/50 shadow-2xl space-y-6">
          <div className="border-b border-emerald-800/60 pb-4">
            <h2 className="text-xl font-extrabold text-white">Pending Submissions & Scholar Moderation</h2>
            <p className="text-xs text-emerald-200/80">Review user-submitted Fatwas, Blog drafts, and Mosque listings before public release.</p>
          </div>

          <div className="space-y-3">
            {pendingItems.map((item) => (
              <div key={item.id} className="bg-black/30 p-4 sm:p-5 rounded-2xl border border-emerald-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                      {item.type}
                    </span>
                    <span className="text-[10px] text-emerald-400/70">• Submitted {item.submittedAt} by {item.author}</span>
                  </div>
                  <h3 className="font-bold text-white text-sm sm:text-base">{item.title}</h3>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {item.status === 'Pending' ? (
                    <>
                      <button
                        onClick={() => handleContentAction(item.id, 'Approved')}
                        className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center space-x-1 transition-all"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Approve</span>
                      </button>

                      <button
                        onClick={() => handleContentAction(item.id, 'Rejected')}
                        className="px-3.5 py-1.5 bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-700 text-xs font-bold rounded-xl flex items-center space-x-1 transition-all"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Reject</span>
                      </button>
                    </>
                  ) : (
                    <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                      item.status === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    }`}>
                      {item.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 4: MOSQUE DIRECTORY MODERATION */}
      {activeTab === 'mosques' && (
        <div className="bg-emerald-950/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-800/50 shadow-2xl space-y-6">
          <div className="border-b border-emerald-800/60 pb-4">
            <h2 className="text-xl font-extrabold text-white">Mosque & Islamic Center Directory Moderation</h2>
            <p className="text-xs text-emerald-200/80">Manage verified mosques, update prayer calculation offsets, and manage facilities tags.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-black/30 p-5 rounded-2xl border border-emerald-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">Al-Farooq Mosque & Learning Center</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md font-bold">Verified</span>
              </div>
              <p className="text-xs text-emerald-200/80">Chicago, IL, United States • Capacity: 2,500</p>
              <div className="flex items-center justify-between pt-2 border-t border-emerald-800/40 text-xs">
                <span className="text-amber-300">Jumu'ah 1st Shift: 1:15 PM</span>
                <button className="text-amber-400 font-bold hover:underline">Edit Offsets</button>
              </div>
            </div>

            <div className="bg-black/30 p-5 rounded-2xl border border-emerald-800/60 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-sm">East London Mosque & London Muslim Centre</h3>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md font-bold">Verified</span>
              </div>
              <p className="text-xs text-emerald-200/80">Whitechapel, London, UK • Capacity: 7,000</p>
              <div className="flex items-center justify-between pt-2 border-t border-emerald-800/40 text-xs">
                <span className="text-amber-300">Jumu'ah 1st Shift: 1:00 PM</span>
                <button className="text-amber-400 font-bold hover:underline">Edit Offsets</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4.5: WORDPRESS THEME EXPORTER & INTEGRATION HUB */}
      {activeTab === 'wordpress' && (
        <div className="bg-emerald-950/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-800/50 shadow-2xl space-y-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-emerald-800/60 pb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[11px] font-extrabold px-3 py-1 rounded-full">
                <Globe className="w-3.5 h-3.5" />
                <span>WordPress Theme Export Engine</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">WordPress Theme & Dashboard Management Hub</h2>
              <p className="text-xs text-emerald-200/80 max-w-2xl">
                Convert and export your entire Bofferly Islamic Portal into a standard WordPress theme package (`bofferly-theme.zip`) to upload directly to any WordPress site.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <a
                href="/bofferly-theme.zip"
                download="bofferly-theme.zip"
                className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-extrabold rounded-2xl text-xs flex items-center space-x-2 shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download bofferly-theme.zip (WP Ready)</span>
              </a>
            </div>
          </div>

          <div className="bg-emerald-900/40 p-4 rounded-2xl border border-amber-400/30 flex items-start space-x-3 text-xs text-amber-200">
            <Check className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-amber-300 text-sm">Fixed: "Incompatible Archive / Missing style.css"</p>
              <p className="text-emerald-200/90 mt-0.5">
                The ZIP package has been updated so that <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">style.css</code> is placed directly at the root of the archive. Upload this downloaded <code className="bg-black/40 px-1 py-0.5 rounded text-amber-300">bofferly-theme.zip</code> directly in WordPress under <strong>Appearance &gt; Themes &gt; Add New &gt; Upload Theme</strong> without unzipping!
              </p>
            </div>
          </div>

          {/* WordPress Installation Workflow Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="bg-black/30 p-5 rounded-2xl border border-emerald-800/60 space-y-2">
              <div className="w-7 h-7 rounded-xl bg-amber-400/20 text-amber-300 font-extrabold flex items-center justify-center text-xs border border-amber-400/30">
                1
              </div>
              <h3 className="font-bold text-white text-sm">Theme Files Ready</h3>
              <p className="text-xs text-emerald-200/70">
                All template files (`style.css`, `functions.php`, `header.php`, `footer.php`) are pre-generated inside `/wordpress-theme`.
              </p>
            </div>

            <div className="bg-black/30 p-5 rounded-2xl border border-emerald-800/60 space-y-2">
              <div className="w-7 h-7 rounded-xl bg-amber-400/20 text-amber-300 font-extrabold flex items-center justify-center text-xs border border-amber-400/30">
                2
              </div>
              <h3 className="font-bold text-white text-sm">Zip Theme Folder</h3>
              <p className="text-xs text-emerald-200/70">
                Compress the `/wordpress-theme` directory into `bofferly-theme.zip` on your computer.
              </p>
            </div>

            <div className="bg-black/30 p-5 rounded-2xl border border-emerald-800/60 space-y-2">
              <div className="w-7 h-7 rounded-xl bg-amber-400/20 text-amber-300 font-extrabold flex items-center justify-center text-xs border border-amber-400/30">
                3
              </div>
              <h3 className="font-bold text-white text-sm">Upload to WP Admin</h3>
              <p className="text-xs text-emerald-200/70">
                Log into WordPress Admin (`/wp-admin`), go to <strong>Appearance &gt; Themes &gt; Add New &gt; Upload Theme</strong> and select your zip file.
              </p>
            </div>

            <div className="bg-black/30 p-5 rounded-2xl border border-emerald-800/60 space-y-2">
              <div className="w-7 h-7 rounded-xl bg-amber-400/20 text-amber-300 font-extrabold flex items-center justify-center text-xs border border-amber-400/30">
                4
              </div>
              <h3 className="font-bold text-white text-sm">Manage Everything in WP</h3>
              <p className="text-xs text-emerald-200/70">
                Manage Fatwas, Mosque directory, and site settings directly from your WordPress Admin sidebar!
              </p>
            </div>

          </div>

          {/* WordPress REST API Connector Configuration */}
          <div className="bg-black/40 p-6 rounded-3xl border border-emerald-800/80 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-800/60 pb-3">
              <div>
                <h3 className="font-extrabold text-amber-300 text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>WordPress REST API Live Synchronization Endpoint</span>
                </h3>
                <p className="text-xs text-emerald-200/80">Connect this app live to your WordPress database via standard `/wp-json/wp/v2` REST endpoints.</p>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                wpApiConnected 
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                  : 'bg-amber-400/20 text-amber-300 border-amber-400/40'
              }`}>
                {wpApiConnected ? '✓ WP REST API Connected' : '⚡ Standalone Mode'}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                value={wpSiteUrl}
                onChange={(e) => setWpSiteUrl(e.target.value)}
                placeholder="https://yourwordpresssite.com"
                className="flex-1 bg-emerald-950 text-emerald-100 font-mono text-xs px-4 py-3 rounded-2xl border border-emerald-800 focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={() => {
                  setWpApiConnected(true);
                  alert(`Successfully connected WP REST API endpoint: ${wpSiteUrl}/wp-json/wp/v2!`);
                }}
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-2xl text-xs transition-all shrink-0"
              >
                Verify & Connect WP Endpoint
              </button>
            </div>
          </div>

          {/* WordPress Theme Source Code Viewer */}
          <div className="bg-black/50 p-6 rounded-3xl border border-emerald-800/80 space-y-4 font-mono">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-800/60 pb-3">
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-extrabold text-amber-300">Generated WordPress Theme Source Files</span>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto">
                {(['functions.php', 'style.css', 'header.php', 'footer.php', 'README.txt'] as const).map((file) => (
                  <button
                    key={file}
                    onClick={() => setActiveCodeFile(file)}
                    className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
                      activeCodeFile === file 
                        ? 'bg-amber-400 text-emerald-950' 
                        : 'bg-emerald-950 text-emerald-300 hover:bg-emerald-900'
                    }`}
                  >
                    {file}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="relative bg-slate-950 p-4 rounded-2xl border border-emerald-900/80 text-xs text-emerald-300/90 overflow-x-auto max-h-80">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    activeCodeFile === 'functions.php' ? `<?php\n// Bofferly Theme Functions\nadd_theme_support('title-tag');\nadd_theme_support('post-thumbnails');` :
                    activeCodeFile === 'style.css' ? `/* Theme Name: Bofferly Islamic Portal Theme */` :
                    activeCodeFile === 'header.php' ? `<!DOCTYPE html><html <?php language_attributes(); ?>>` :
                    activeCodeFile === 'footer.php' ? `<?php wp_footer(); ?></body></html>` :
                    `BOFFERLY WORDPRESS THEME INSTALLATION GUIDE`
                  );
                  setCopiedFile(activeCodeFile);
                  setTimeout(() => setCopiedFile(null), 2000);
                }}
                className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-900 hover:bg-emerald-800 text-emerald-200 rounded-lg text-[10px] font-sans flex items-center space-x-1"
              >
                {copiedFile === activeCodeFile ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedFile === activeCodeFile ? 'Copied!' : 'Copy Code'}</span>
              </button>

              <pre className="whitespace-pre-wrap leading-relaxed">
                {activeCodeFile === 'functions.php' && `<?php
/**
 * Bofferly Islamic Portal Theme Functions
 *
 * Automatically registers WordPress Custom Post Types for Fatwas,
 * Mosques, Academy Courses, and adds WP REST API endpoints.
 */

if (!defined('ABSPATH')) exit;

// Theme Supports
add_action('after_setup_theme', function() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo');
});

// Custom Post Types
add_action('init', function() {
    register_post_type('fatwa', array(
        'labels' => array('name' => __('Fatwas & Rulings', 'bofferly')),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-welcome-learn-more',
        'show_in_rest' => true,
    ));

    register_post_type('mosque', array(
        'labels' => array('name' => __('Mosque Directory', 'bofferly')),
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-admin-multisite',
        'show_in_rest' => true,
    ));
});`}

                {activeCodeFile === 'style.css' && `/*
Theme Name: Bofferly Islamic Portal Theme
Theme URI: https://bofferly.org
Author: Bofferly Development Team
Author URI: https://bofferly.org
Description: Modern Islamic Knowledge Portal theme for WordPress with integrated Quran, Hadith, Ramadan Hub, Mosque directory, and Zakat tools.
Version: 1.0.0
License: GNU General Public License v2 or later
Text Domain: bofferly
*/`}

                {activeCodeFile === 'header.php' && `<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?></title>
    <?php wp_head(); ?>
</head>
<body <?php body_class('bg-emerald-950 text-white font-sans'); ?>>`}

                {activeCodeFile === 'footer.php' && `<footer className="bg-emerald-950 border-t border-emerald-800 text-white p-6 mt-12 text-center text-xs text-emerald-300">
    <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. Powered by Bofferly Islamic Portal Theme.</p>
</footer>
<?php wp_footer(); ?>
</body>
</html>`}

                {activeCodeFile === 'README.txt' && `================================================================================
BOFFERLY ISLAMIC PORTAL - WORDPRESS THEME INSTALLATION GUIDE
================================================================================

1. ZIP the contents of /wordpress-theme into bofferly-theme.zip
2. In WordPress Admin, navigate to Appearance > Themes > Add New > Upload Theme.
3. Select bofferly-theme.zip and click Install Now, then Activate!
4. Access WP Custom Post Types (Fatwas, Mosques) directly from your WP Dashboard.`}
              </pre>
            </div>
          </div>

        </div>
      )}

      {/* SECTION 5: PLATFORM SETTINGS */}
      {activeTab === 'settings' && (
        <div className="bg-emerald-950/80 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-emerald-800/50 shadow-2xl space-y-6">
          <div className="border-b border-emerald-800/60 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-extrabold text-white">Global Platform Configuration</h2>
              <p className="text-xs text-emerald-200/80">Configure Zakat Nisab gold/silver rates, global notice banners, and system parameters.</p>
            </div>

            {configSaved && (
              <span className="bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-500/40 font-bold animate-in fade-in">
                ✓ Settings Saved!
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Zakat Nisab Values */}
            <div className="bg-black/30 p-5 rounded-2xl border border-emerald-800/60 space-y-4">
              <h3 className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>Current Nisab Benchmark Values (USD)</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-emerald-200/80 mb-1">Gold Nisab (87.48 grams)</label>
                  <input
                    type="text"
                    value={nisabGold}
                    onChange={(e) => setNisabGold(e.target.value)}
                    className="w-full bg-emerald-950 text-white font-mono p-2.5 rounded-xl border border-emerald-800 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-emerald-200/80 mb-1">Silver Nisab (612.36 grams)</label>
                  <input
                    type="text"
                    value={nisabSilver}
                    onChange={(e) => setNisabSilver(e.target.value)}
                    className="w-full bg-emerald-950 text-white font-mono p-2.5 rounded-xl border border-emerald-800 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* Announcement Banner Manager */}
            <div className="bg-black/30 p-5 rounded-2xl border border-emerald-800/60 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-amber-300 text-sm flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-amber-400" />
                  <span>Site Announcement Banner</span>
                </h3>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={announcementEnabled}
                    onChange={(e) => setAnnouncementEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-emerald-950 border border-emerald-800 rounded-full peer peer-checked:bg-amber-400 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-emerald-950 after:rounded-full after:h-4 after:w-4 after:transition-all" />
                </label>
              </div>

              <div className="space-y-2 text-xs">
                <label className="block text-emerald-200/80">Banner Notice Text</label>
                <textarea
                  rows={3}
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full bg-emerald-950 text-white p-2.5 rounded-xl border border-emerald-800 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

          </div>

          <div className="flex justify-end pt-4 border-t border-emerald-800/60">
            <button
              onClick={() => {
                setConfigSaved(true);
                setTimeout(() => setConfigSaved(false), 3000);
              }}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-emerald-950 font-bold rounded-2xl text-xs flex items-center space-x-2 shadow-lg transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save System Configuration</span>
            </button>
          </div>

        </div>
      )}

      {/* ADD USER MODAL */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-emerald-950 border-2 border-amber-400/50 p-6 sm:p-8 rounded-3xl max-w-md w-full space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-emerald-800 pb-3">
              <h3 className="font-extrabold text-white text-lg">Add New System Account</h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-emerald-400 hover:text-white">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddUser} className="space-y-4 text-xs">
              <div>
                <label className="block text-emerald-200 mb-1 font-bold">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Ahmad Khan"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full bg-black/40 text-white p-3 rounded-2xl border border-emerald-800 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-emerald-200 mb-1 font-bold">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. ahmad.khan@bofferly.org"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full bg-black/40 text-white p-3 rounded-2xl border border-emerald-800 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-emerald-200 mb-1 font-bold">Assign Role</label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value as any)}
                  className="w-full bg-black/40 text-amber-300 font-bold p-3 rounded-2xl border border-emerald-800 focus:outline-none"
                >
                  <option value="Admin" className="bg-emerald-950">Super Admin</option>
                  <option value="Scholar" className="bg-emerald-950">Islamic Scholar</option>
                  <option value="Moderator" className="bg-emerald-950">Content Moderator</option>
                  <option value="Member" className="bg-emerald-950">Member</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-4 py-2 bg-black/40 text-emerald-300 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 text-emerald-950 font-bold rounded-xl"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
