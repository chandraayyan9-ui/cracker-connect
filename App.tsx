
import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  Users, 
  Terminal, 
  Lock, 
  ChevronRight,
  Menu,
  X,
  Activity,
  Zap,
  Save,
  Trash2,
  Plus,
  LayoutDashboard,
  Eye,
  Settings,
  Database,
  ArrowLeft,
  User,
  Key,
  LogOut,
  Bell,
  Calendar as CalendarIcon,
  FileText,
  Briefcase,
  Skull,
  Target,
  AlertTriangle,
  Layers,
  Send,
  Mic,
  Video,
  Paperclip,
  ImageIcon,
  MoreVertical,
  Search,
  ChevronLeft,
  Crown,
  Sword,
  EyeOff,
  Hammer,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Edit3,
  UserPlus,
  Camera,
  Reply,
  MessageSquare,
  History,
  UserCheck
} from 'lucide-react';

// --- Types ---
interface Mission {
  id: string;
  title: string;
  status: 'PENDING' | 'ACTIVE' | 'COMPLETE';
}

interface TargetEntity {
  id: string;
  name: string;
  threatLevel: number;
  status: 'ALIVE' | 'TERMINATED';
}

interface UserProfile {
  name: string;
  password: string;
  primaryTitle: string;
  secondaryTitle: string;
  avatar: string;
}

interface ChatMessage {
  id: string;
  senderName: string;
  senderRole: string;
  content: string;
  timestamp: string;
  replyToId?: string;
  replyToText?: string;
  replyToSender?: string;
}

interface PrivateConversation {
  id: string;
  participants: string[]; 
  messages: ChatMessage[];
  lastMessageTimestamp: number;
}

interface NavLinkProps {
  label: string;
  onClick: () => void;
  active: boolean;
  icon?: React.ReactNode;
}

type ViewState = 'landing' | 'login' | 'dashboard' | 'details' | 'chat' | 'hierarchy' | 'portfolio' | 'private-chat';

// --- Constants ---
const INITIAL_USERS: UserProfile[] = [
  {
    name: "CHANDEL GABI",
    password: "chandrayyan",
    primaryTitle: "EMPEROR CRACKER",
    secondaryTitle: "SUPREME ADMINISTRATOR",
    avatar: "https://images.unsplash.com/photo-1550246140-5119ae4790b8?q=80&w=600&h=800&auto=format&fit=crop"
  },
  {
    name: "AYUSHMAN DEKA",
    password: "2369",
    primaryTitle: "HEAD OF COUNCILLORS",
    secondaryTitle: "MASTER TERMINATOR",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&h=800&auto=format&fit=crop"
  },
  {
    name: "JEFFERSON",
    password: "1112",
    primaryTitle: "KING CRACKER",
    secondaryTitle: "KING OF CRACKERS",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&h=800&auto=format&fit=crop"
  }
];

const HIERARCHY_ORDER = [
  'EMPEROR CRACKER', 'KING CRACKER', 'HEAD OF COUNCILLORS', 
  'HEAD OF SYMBOLS', 'COUNCILLORS', 'LEADERS', 
  'SOLDIERS', 'SPIES', 'WORKERS'
];

const ADMIN_CREATOR_NAMES = ['CHANDEL GABI', 'JEFFERSON', 'AYUSHMAN DEKA'];

const HIERARCHY_ROLES = [
  { level: 'LEGENDARY', role: 'EMPEROR CRACKER', icon: <Crown className="text-yellow-500" />, desc: 'THE ULTIMATE AUTHORITY' },
  { level: 'ELITE', role: 'KING CRACKER', icon: <Crown className="text-slate-400" />, desc: 'SOVEREIGN COMMANDER' },
  { level: 'COMMAND', role: 'HEAD OF COUNCILLORS', icon: <Shield className="text-[#1a237e]" />, desc: 'STRATEGIC DIRECTORY' },
  { level: 'SENIOR', role: 'COUNCILLORS', icon: <Users className="text-[#1a237e]" />, desc: 'DECISION MAKERS' },
  { level: 'OFFICER', role: 'LEADERS', icon: <Target className="text-[#1a237e]" />, desc: 'OPERATIONAL COMMANDS' },
  { level: 'FIELD', role: 'SOLDIERS', icon: <Sword className="text-[#1a237e]" />, desc: 'FRONT-LINE ENFORCEMENT' },
  { level: 'SUPPORT', role: 'WORKERS', icon: <Hammer className="text-[#1a237e]" />, desc: 'INFRASTRUCTURE MAINTENANCE' },
];

const NavLink: React.FC<NavLinkProps> = ({ label, onClick, active, icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full md:w-auto px-4 py-3 md:py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-lg md:rounded-none ${
      active 
        ? 'bg-[#1a237e] text-white md:bg-transparent md:border-b-2 md:border-[#1a237e]' 
        : 'text-gray-400 hover:text-white hover:bg-white/5 md:hover:bg-transparent'
    }`}
  >
    {icon && <span className="md:hidden">{icon}</span>}
    {label}
  </button>
);

const CrackerGangLogo = () => (
  <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-[450px] lg:h-[450px] group transition-transform duration-700 hover:scale-105">
    <div className="absolute inset-0 rounded-full border-[6px] md:border-[12px] border-[#333] shadow-[0_0_50px_rgba(0,0,0,0.8)_inset,0_0_20px_rgba(0,0,0,0.5)] bg-[#111]"></div>
    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#0a0a0f] via-[#1a237e22] to-black flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-red-600/10 animate-pulse-red"></div>
      <div className="relative z-10 text-center px-4">
        <h2 className="text-red-600 text-xl sm:text-2xl md:text-4xl lg:text-5xl font-oswald font-black uppercase tracking-tighter drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">
          CRACKER GANG
        </h2>
        <p className="text-white text-[8px] sm:text-[10px] md:text-xs lg:text-sm font-bold tracking-[0.3em] uppercase mt-1 opacity-80">
          CHAPTER ARCTOS
        </p>
      </div>
      <div className="absolute -inset-full bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 animate-shine"></div>
    </div>
  </div>
);

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  // States
  const [users, setUsers] = useState<UserProfile[]>(() => {
    const saved = localStorage.getItem('cracker_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });
  const [missions, setMissions] = useState<Mission[]>(() => JSON.parse(localStorage.getItem('cracker_missions') || '[]'));
  const [terminationList, setTerminationList] = useState<TargetEntity[]>(() => JSON.parse(localStorage.getItem('cracker_targets') || '[]'));
  const [globalMessages, setGlobalMessages] = useState<ChatMessage[]>(() => JSON.parse(localStorage.getItem('cracker_global_messages') || '[]'));
  const [privateConversations, setPrivateConversations] = useState<PrivateConversation[]>(() => JSON.parse(localStorage.getItem('cracker_private_convos') || '[]'));

  useEffect(() => {
    localStorage.setItem('cracker_users', JSON.stringify(users));
    localStorage.setItem('cracker_missions', JSON.stringify(missions));
    localStorage.setItem('cracker_targets', JSON.stringify(terminationList));
    localStorage.setItem('cracker_global_messages', JSON.stringify(globalMessages));
    localStorage.setItem('cracker_private_convos', JSON.stringify(privateConversations));
  }, [users, missions, terminationList, globalMessages, privateConversations]);

  const [loggedInUser, setLoggedInUser] = useState<UserProfile | null>(null);
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [newMessage, setNewMessage] = useState('');
  const [replyingTo, setReplyingTo] = useState<ChatMessage | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePrivateConvoId, setActivePrivateConvoId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [isAddingTarget, setIsAddingTarget] = useState(false);
  const [newTargetName, setNewTargetName] = useState('');
  const [newTargetThreat, setNewTargetThreat] = useState('1');
  const [newTargetStatus, setNewTargetStatus] = useState<'ALIVE' | 'TERMINATED'>('ALIVE');
  const [editingThreatId, setEditingThreatId] = useState<string | null>(null);
  const [editingThreatValue, setEditingThreatValue] = useState('');

  const [isAddingMission, setIsAddingMission] = useState(false);
  const [newMissionTitle, setNewMissionTitle] = useState('');

  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [newAvatarUrl, setNewAvatarUrl] = useState('');

  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberPassword, setNewMemberPassword] = useState('');
  const [newMemberRole, setNewMemberRole] = useState(HIERARCHY_ORDER[HIERARCHY_ORDER.length - 1]);

  const isMainAdmin = loggedInUser?.name === 'CHANDEL GABI';
  const canAddMembers = loggedInUser && ADMIN_CREATOR_NAMES.includes(loggedInUser.name.toUpperCase());

  useEffect(() => { setIsVisible(true); }, []);
  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [globalMessages, activePrivateConvoId, currentView]);

  const navigateTo = (view: ViewState) => {
    setIsMenuOpen(false);
    setIsVisible(false);
    setTimeout(() => {
      setCurrentView(view);
      setIsVisible(true);
    }, 300);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.name.toUpperCase() === loginUsername.toUpperCase() && u.password === loginPassword);
    if (user) {
      setLoggedInUser(user);
      setLoginError('');
      navigateTo('dashboard');
    } else {
      setLoginError('AUTH FAILED');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    navigateTo('landing');
  };

  const handleSendGlobalMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !loggedInUser) return;
    const msg: ChatMessage = {
      id: Date.now().toString(),
      senderName: loggedInUser.name,
      senderRole: loggedInUser.primaryTitle,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      replyToId: replyingTo?.id,
      replyToText: replyingTo?.content,
      replyToSender: replyingTo?.senderName
    };
    setGlobalMessages([...globalMessages, msg]);
    setNewMessage('');
    setReplyingTo(null);
  };

  const startPrivateConvo = (targetUserName: string) => {
    if (!loggedInUser || targetUserName === loggedInUser.name) return;
    const existing = privateConversations.find(c => c.participants.includes(loggedInUser.name) && c.participants.includes(targetUserName));
    if (existing) {
      setActivePrivateConvoId(existing.id);
    } else {
      const newConvo: PrivateConversation = {
        id: `convo_${Date.now()}`,
        participants: [loggedInUser.name, targetUserName],
        messages: [],
        lastMessageTimestamp: Date.now()
      };
      setPrivateConversations([...privateConversations, newConvo]);
      setActivePrivateConvoId(newConvo.id);
    }
    navigateTo('private-chat');
  };

  const handleSendPrivateMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !loggedInUser || !activePrivateConvoId) return;
    const msg: ChatMessage = {
      id: Date.now().toString(),
      senderName: loggedInUser.name,
      senderRole: loggedInUser.primaryTitle,
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setPrivateConversations(privateConversations.map(c => c.id === activePrivateConvoId ? { ...c, messages: [...c.messages, msg], lastMessageTimestamp: Date.now() } : c));
    setNewMessage('');
  };

  const activeConvo = privateConversations.find(c => c.id === activePrivateConvoId);
  const otherParticipant = activeConvo?.participants.find(p => p !== loggedInUser?.name);

  return (
    <div className="min-h-screen h-full flex flex-col relative bg-black selection:bg-[#1a237e] selection:text-white font-inter pb-safe pt-safe">
      
      {/* Responsive Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-white/5 px-4 md:px-6 py-3 md:py-4 h-16 md:h-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigateTo('landing')}>
            <Shield className="w-7 h-7 md:w-8 md:h-8 text-[#1a237e] group-hover:text-white transition-colors" />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-oswald font-black tracking-tighter uppercase italic group-hover:text-blue-400 transition-colors">
                CRACKER <span className="text-[#1a237e]">CONNECT</span>
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8">
            {loggedInUser ? (
              <>
                <NavLink label="Dashboard" onClick={() => navigateTo('dashboard')} active={currentView === 'dashboard'} />
                <NavLink label="Details" onClick={() => navigateTo('details')} active={currentView === 'details'} />
                <NavLink label="Feed" onClick={() => navigateTo('chat')} active={currentView === 'chat'} />
                <NavLink label="Hierarchy" onClick={() => navigateTo('hierarchy')} active={currentView === 'hierarchy'} />
                <NavLink label="Portfolio" onClick={() => navigateTo('portfolio')} active={currentView === 'portfolio' || currentView === 'private-chat'} />
                <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-1.5 bg-red-900/20 text-red-500 rounded-lg text-[10px] font-bold uppercase border border-red-900/30">
                  <LogOut size={14} /> Out
                </button>
              </>
            ) : (
              <button onClick={() => navigateTo('login')} className="bg-[#1a237e] px-6 py-2 rounded-lg font-bold uppercase text-xs">Login</button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-16 bg-black z-40 flex flex-col p-6 space-y-4 md:hidden animate-fade-in overflow-y-auto">
            {loggedInUser ? (
              <>
                <NavLink label="Dashboard" onClick={() => navigateTo('dashboard')} active={currentView === 'dashboard'} icon={<LayoutDashboard size={18}/>} />
                <NavLink label="Details" onClick={() => navigateTo('details')} active={currentView === 'details'} icon={<Skull size={18}/>} />
                <NavLink label="Global Feed" onClick={() => navigateTo('chat')} active={currentView === 'chat'} icon={<Zap size={18}/>} />
                <NavLink label="Hierarchy" onClick={() => navigateTo('hierarchy')} active={currentView === 'hierarchy'} icon={<Shield size={18}/>} />
                <NavLink label="Portfolio" onClick={() => navigateTo('portfolio')} active={currentView === 'portfolio'} icon={<Users size={18}/>} />
                <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 text-red-500 font-bold uppercase text-xs bg-red-900/10 rounded-lg">
                  <LogOut size={18} /> Logout Session
                </button>
              </>
            ) : (
              <button onClick={() => navigateTo('login')} className="bg-[#1a237e] w-full py-4 rounded-xl font-bold uppercase text-sm">Login to Secure Hub</button>
            )}
          </div>
        )}
      </nav>

      {/* Content Area */}
      <div className={`flex-grow flex flex-col pt-16 md:pt-20 transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Landing Page */}
        {currentView === 'landing' && (
          <main className="flex-grow flex flex-col md:flex-row p-6 md:p-12 gap-8 items-center justify-center">
            <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
              <div className="mb-4 flex items-center gap-2 opacity-60">
                <span className="w-8 md:w-12 h-0.5 bg-[#1a237e]"></span>
                <span className="text-[#1a237e] font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm">Authorized Only</span>
              </div>
              <h2 className="text-gray-400 font-oswald text-2xl sm:text-3xl lg:text-5xl italic uppercase mb-2">WE CRACK.SMASH.REPEAT</h2>
              <h1 className="text-white font-oswald font-black text-4xl sm:text-6xl lg:text-9xl leading-none uppercase mb-8">
                CRACKER <span className="text-[#1a237e]">CONNECT</span>
              </h1>
              <button onClick={() => navigateTo('login')} className="bg-[#1a237e] px-10 md:px-12 py-4 md:py-5 font-bold uppercase text-base md:text-lg hover:bg-blue-800 transition-all rounded-xl shadow-xl shadow-blue-900/20 active:scale-95">Access Hub</button>
            </div>
            <div className="flex-1 flex justify-center items-center py-8">
              <CrackerGangLogo />
            </div>
          </main>
        )}

        {/* Login Page */}
        {currentView === 'login' && (
          <main className="flex-grow flex items-center justify-center p-4">
            <div className="bg-[#0a0a0f] border border-white/5 p-8 md:p-12 w-full max-w-lg shadow-2xl rounded-2xl md:rounded-3xl">
              <h2 className="text-2xl md:text-3xl font-oswald font-black uppercase text-white mb-8 text-center md:text-left">Secure Identity</h2>
              <form className="space-y-6" onSubmit={handleLogin}>
                {loginError && <div className="text-red-500 text-xs font-bold uppercase mb-4 animate-pulse text-center">ACCESS DENIED</div>}
                <input required type="text" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#1a237e] transition-all" placeholder="Agent Identity" />
                <input required type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full bg-black border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#1a237e] transition-all" placeholder="Encrypted Key" />
                <button type="submit" className="w-full py-4 md:py-5 bg-[#1a237e] text-white font-black uppercase rounded-xl hover:shadow-lg hover:shadow-blue-900/30 transition-all active:scale-95">Initiate Connection</button>
              </form>
            </div>
          </main>
        )}

        {/* Dashboard */}
        {currentView === 'dashboard' && loggedInUser && (
          <main className="flex-grow p-4 md:p-8 lg:p-12 overflow-y-auto pt-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              
              <div className="space-y-6">
                <div className="bg-[#0a0a0f] border border-white/5 p-6 md:p-8 rounded-2xl shadow-xl text-center">
                  <div className="relative mx-auto mb-6 w-40 h-40 md:w-48 md:h-48">
                    <img src={loggedInUser.avatar} className="w-full h-full rounded-full border-4 border-[#1a237e] object-cover shadow-2xl" alt="Profile" />
                    <button onClick={() => setIsUpdatingAvatar(!isUpdatingAvatar)} className="absolute bottom-1 right-1 p-2.5 bg-[#1a237e] rounded-full border-2 border-black active:scale-90"><Camera size={18}/></button>
                  </div>
                  {isUpdatingAvatar && (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (newAvatarUrl.trim()) {
                        setUsers(users.map(u => u.name === loggedInUser.name ? { ...u, avatar: newAvatarUrl } : u));
                        setLoggedInUser({ ...loggedInUser, avatar: newAvatarUrl });
                        setNewAvatarUrl('');
                        setIsUpdatingAvatar(false);
                      }
                    }} className="space-y-3 bg-black/50 p-4 border border-[#1a237e]/40 rounded-xl mb-4">
                      <input value={newAvatarUrl} onChange={(e) => setNewAvatarUrl(e.target.value)} className="w-full bg-black border border-white/10 p-2 text-[10px] rounded-lg" placeholder="Avatar URL..." />
                      <button type="submit" className="w-full bg-[#1a237e] py-2 text-[10px] font-black uppercase rounded-lg">Apply</button>
                    </form>
                  )}
                  <h1 className="text-2xl md:text-3xl font-oswald font-black text-[#1a237e] uppercase">{loggedInUser.name}</h1>
                  <p className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest mt-1 opacity-70">{loggedInUser.primaryTitle}</p>
                </div>

                {canAddMembers && (
                  <div className="bg-[#0a0a0f] border-2 border-[#1a237e] p-6 rounded-2xl">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-[11px] font-black uppercase text-white tracking-widest flex items-center gap-2">
                          <UserPlus size={16} className="text-[#1a237e]"/> Recruitment
                        </h3>
                        <button onClick={() => setIsAddingMember(!isAddingMember)} className="text-[#1a237e]">
                          {isAddingMember ? <X size={20}/> : <Plus size={20}/>}
                        </button>
                     </div>
                     {isAddingMember && (
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!newMemberName.trim() || !newMemberPassword.trim()) return;
                        const newUser: UserProfile = {
                          name: newMemberName.toUpperCase(),
                          password: newMemberPassword,
                          primaryTitle: newMemberRole,
                          secondaryTitle: "RECRUITED OPERATIVE",
                          avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&h=200&auto=format&fit=crop`
                        };
                        setUsers([...users, newUser]);
                        setNewMemberName('');
                        setNewMemberPassword('');
                        setIsAddingMember(false);
                      }} className="space-y-4">
                          <input required value={newMemberName} onChange={(e) => setNewMemberName(e.target.value)} className="w-full bg-black border border-white/10 p-3 rounded-lg text-xs" placeholder="Identity Name" />
                          <input required type="password" value={newMemberPassword} onChange={(e) => setNewMemberPassword(e.target.value)} className="w-full bg-black border border-white/10 p-3 rounded-lg text-xs" placeholder="Password" />
                          <select value={newMemberRole} onChange={(e) => setNewMemberRole(e.target.value)} className="w-full bg-black border border-white/10 p-3 rounded-lg text-xs">
                            {HIERARCHY_ORDER.map(role => <option key={role} value={role}>{role}</option>)}
                          </select>
                          <button type="submit" className="w-full bg-[#1a237e] py-3 text-[10px] font-black uppercase rounded-lg">Finalize Recruiting</button>
                      </form>
                     )}
                  </div>
                )}
              </div>

              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg md:text-xl font-oswald font-black uppercase italic">Deployment Status</h3>
                    {isMainAdmin && <button onClick={() => setIsAddingMission(!isAddingMission)} className="bg-[#1a237e] p-2 rounded-lg"><Plus size={16}/></button>}
                  </div>
                  {isAddingMission && (
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (newMissionTitle.trim()) {
                        setMissions([...missions, { id: Date.now().toString(), title: newMissionTitle, status: 'PENDING' }]);
                        setNewMissionTitle('');
                        setIsAddingMission(false);
                      }
                    }} className="mb-4 flex gap-2">
                      <input required value={newMissionTitle} onChange={(e) => setNewMissionTitle(e.target.value)} className="flex-grow bg-black border border-white/10 p-3 rounded-lg text-sm" placeholder="Mission Codename..." />
                      <button type="submit" className="bg-[#1a237e] px-4 rounded-lg"><Plus size={16}/></button>
                    </form>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {missions.map(m => (
                      <div key={m.id} className="bg-black/40 p-4 border border-white/5 rounded-xl flex justify-between items-center group hover:border-[#1a237e] transition-colors">
                        <span className="text-xs font-bold uppercase truncate">{m.title}</span>
                        <span className="text-[9px] text-[#1a237e] font-black uppercase">{m.status}</span>
                      </div>
                    ))}
                    {missions.length === 0 && <p className="col-span-full text-center text-xs text-gray-600 py-10 uppercase font-bold italic">Clear skies. No active missions.</p>}
                  </div>
                </div>
              </div>

            </div>
          </main>
        )}

        {/* Global Chat View */}
        {currentView === 'chat' && loggedInUser && (
          <main className="flex-grow flex flex-col p-4 md:p-6 overflow-hidden h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]">
            <div className="max-w-5xl mx-auto w-full flex-grow flex flex-col bg-[#0a0a0f] border border-white/5 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/5 bg-black/50 flex justify-between items-center">
                <h2 className="font-oswald font-bold uppercase tracking-widest text-sm md:text-base">Organization Feed</h2>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                   <span className="text-[8px] md:text-[10px] font-black text-[#1a237e] uppercase">Sync Verified</span>
                </div>
              </div>
              <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-hide">
                {globalMessages.map(msg => (
                  <div key={msg.id} className={`flex flex-col ${msg.senderName === loggedInUser.name ? 'items-end' : 'items-start'} animate-fade-in`}>
                    <span className="text-[8px] font-black uppercase text-gray-600 mb-1">{msg.senderName} • {msg.senderRole}</span>
                    {msg.replyToId && (
                      <div className="bg-white/5 border-l-2 border-[#1a237e] px-3 py-1 text-[9px] mb-1 italic opacity-60 rounded-r-lg max-w-[80%]">
                        @{msg.replyToSender}: {msg.replyToText}
                      </div>
                    )}
                    <div className={`max-w-[85%] px-4 py-3 rounded-2xl relative group ${msg.senderName === loggedInUser.name ? 'bg-[#1a237e] text-white rounded-tr-none' : 'bg-[#111] border border-white/5 text-gray-300 rounded-tl-none'}`}>
                      <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
                      <span className="text-[8px] opacity-40 block mt-1 text-right">{msg.timestamp}</span>
                      <button onClick={() => setReplyingTo(msg)} className="absolute -bottom-6 right-0 text-[8px] font-black uppercase text-[#1a237e] opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-all md:p-1 active:scale-90">
                        <Reply size={10}/> Reply
                      </button>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              {replyingTo && (
                <div className="bg-[#1a237e]/20 px-6 py-2 border-t border-[#1a237e]/40 flex justify-between items-center text-[10px] animate-fade-in">
                  <span>Responding to <strong>{replyingTo.senderName}</strong></span>
                  <button onClick={() => setReplyingTo(null)} className="p-1"><X size={14}/></button>
                </div>
              )}
              <form onSubmit={handleSendGlobalMessage} className="p-3 md:p-4 bg-black/40 border-t border-white/5 flex gap-2">
                <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-grow bg-black border border-white/10 p-3 rounded-xl text-sm outline-none focus:border-[#1a237e] text-white" placeholder="Broadcast to Gang..." />
                <button type="submit" className="bg-[#1a237e] p-4 text-white rounded-xl active:scale-90 transition-transform"><Send size={18}/></button>
              </form>
            </div>
          </main>
        )}

        {/* Generic View Wrapper for Portfolio/Hierarchy/Details */}
        {(currentView === 'portfolio' || currentView === 'hierarchy' || currentView === 'details') && (
           <main className="flex-grow p-4 md:p-8 lg:p-12 overflow-y-auto pt-6">
              <div className="max-w-6xl mx-auto animate-fade-in">
                
                {currentView === 'portfolio' && (
                  <>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                      <h1 className="text-3xl md:text-5xl font-oswald font-black uppercase italic">MEMBERS <span className="text-[#1a237e]">HUB</span></h1>
                      <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16}/>
                        <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-black border border-white/10 p-3 pl-10 rounded-xl text-xs text-white outline-none focus:border-[#1a237e]" placeholder="Search Identity..." />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
                      {users.filter(u => u.name.toLowerCase().includes(searchQuery.toLowerCase())).map(u => (
                        <div key={u.name} className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl flex flex-col items-center group relative overflow-hidden transition-all hover:border-[#1a237e] active:scale-95 cursor-pointer" onClick={() => startPrivateConvo(u.name)}>
                          <div className="absolute top-3 right-3">
                            <div className={`w-2 h-2 rounded-full ${u.name.length % 2 === 0 ? 'bg-green-500' : 'bg-gray-700'}`}></div>
                          </div>
                          <img src={u.avatar} className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-[#1a237e] mb-4 object-cover shadow-lg" alt="" />
                          <h3 className="text-lg font-oswald font-bold text-white uppercase">{u.name}</h3>
                          <p className="text-[10px] font-black text-[#1a237e] uppercase mb-4 tracking-widest">{u.primaryTitle}</p>
                          <div className="flex items-center gap-2 px-6 py-2 bg-[#1a237e]/10 text-[#1a237e] text-[9px] font-black uppercase rounded-lg group-hover:bg-[#1a237e] group-hover:text-white transition-all">
                             <MessageSquare size={12}/> Secure DM
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {currentView === 'hierarchy' && (
                  <div className="max-w-3xl mx-auto space-y-4">
                    <h1 className="text-3xl md:text-5xl font-oswald font-black uppercase italic mb-8 border-b-2 border-[#1a237e] pb-2">CHAIN <span className="text-[#1a237e]">OF COMMAND</span></h1>
                    {HIERARCHY_ROLES.map((role, idx) => (
                      <div key={idx} className="bg-[#0a0a0f] border border-white/5 p-5 md:p-6 rounded-2xl flex items-center gap-4 md:gap-6 group hover:border-[#1a237e] transition-all">
                        <div className="p-3 md:p-4 bg-black border border-white/5 rounded-xl text-[#1a237e] group-hover:text-white transition-colors">{role.icon}</div>
                        <div>
                          <span className="text-[8px] font-black text-gray-500 tracking-[0.2em] uppercase">{role.level} TIER</span>
                          <h3 className="text-lg md:text-xl font-oswald font-black text-white uppercase italic">{role.role}</h3>
                          <p className="text-[9px] md:text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-1">{role.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {currentView === 'details' && (
                  <>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-white/5 pb-6">
                      <h1 className="text-3xl md:text-5xl font-oswald font-black uppercase italic">GANG <span className="text-[#1a237e]">MANIFEST</span></h1>
                      {isMainAdmin && <button onClick={() => setIsAddingTarget(!isAddingTarget)} className="w-full sm:w-auto bg-[#1a237e] px-6 py-3 rounded-xl text-xs font-black uppercase flex items-center justify-center gap-2 active:scale-95 transition-transform"><Plus size={16}/> New Target</button>}
                    </div>
                    {isAddingTarget && (
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (newTargetName.trim()) {
                          setTerminationList([...terminationList, { id: Date.now().toString(), name: newTargetName, threatLevel: parseInt(newTargetThreat), status: newTargetStatus }]);
                          setNewTargetName('');
                          setIsAddingTarget(false);
                        }
                      }} className="bg-[#0a0a0f] border border-[#1a237e] p-6 rounded-2xl grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8 animate-fade-in">
                        <input required value={newTargetName} onChange={(e) => setNewTargetName(e.target.value)} className="bg-black border border-white/10 p-3 rounded-xl text-sm" placeholder="Identity" />
                        <input type="number" min="1" max="10" value={newTargetThreat} onChange={(e) => setNewTargetThreat(e.target.value)} className="bg-black border border-white/10 p-3 rounded-xl text-sm" placeholder="Threat 1-10" />
                        <select value={newTargetStatus} onChange={(e) => setNewTargetStatus(e.target.value as any)} className="bg-black border border-white/10 p-3 rounded-xl text-sm">
                          <option value="ALIVE">ALIVE</option>
                          <option value="TERMINATED">TERMINATED</option>
                        </select>
                        <button type="submit" className="bg-[#1a237e] py-3 rounded-xl text-xs font-black uppercase">Confirm</button>
                      </form>
                    )}
                    <div className="space-y-4">
                      {terminationList.map(t => (
                        <div key={t.id} className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <h4 className={`text-xl font-oswald font-bold uppercase ${t.status === 'TERMINATED' ? 'text-red-600 line-through opacity-50' : 'text-white'}`}>{t.name}</h4>
                            <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mt-1">
                              THREAT: <span className="text-white">{t.threatLevel}</span> | STATUS: <span className={t.status === 'TERMINATED' ? 'text-red-500' : 'text-green-500'}>{t.status}</span>
                            </p>
                          </div>
                          {isMainAdmin && (
                            <div className="flex gap-2 w-full sm:w-auto">
                              <button onClick={() => setTerminationList(terminationList.map(item => item.id === t.id ? {...item, status: item.status === 'ALIVE' ? 'TERMINATED' : 'ALIVE'} : item))} className="flex-1 sm:flex-none p-3 border border-white/5 rounded-xl hover:bg-white/5 transition-colors"><CheckCircle size={18}/></button>
                              <button onClick={() => setTerminationList(terminationList.filter(item => item.id !== t.id))} className="flex-1 sm:flex-none p-3 border border-white/5 rounded-xl text-red-500 hover:bg-red-900/10 transition-colors"><Trash2 size={18}/></button>
                            </div>
                          )}
                        </div>
                      ))}
                      {terminationList.length === 0 && <p className="text-center text-xs text-gray-600 py-12 uppercase font-black italic">Manifest clear. No hostile targets.</p>}
                    </div>
                  </>
                )}

              </div>
           </main>
        )}

        {/* Private Chat View */}
        {currentView === 'private-chat' && loggedInUser && activeConvo && (
          <main className="flex-grow flex flex-col p-4 md:p-6 overflow-hidden h-[calc(100vh-64px)] md:h-[calc(100vh-80px)]">
            <div className="max-w-4xl mx-auto w-full flex-grow flex flex-col bg-[#0a0a0f] border border-[#1a237e]/30 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden relative">
              <div className="px-6 py-4 border-b border-white/5 bg-black/50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <button onClick={() => navigateTo('portfolio')} className="hover:text-[#1a237e] active:scale-90 transition-transform"><ArrowLeft size={22}/></button>
                  <div>
                    <h2 className="font-oswald font-bold uppercase tracking-widest text-sm md:text-base">{otherParticipant}</h2>
                    <span className="text-[8px] md:text-[9px] font-black text-green-500 uppercase">Secure Connection Established</span>
                  </div>
                </div>
              </div>
              <div className="flex-grow overflow-y-auto p-4 md:p-6 space-y-4 scrollbar-hide">
                {activeConvo.messages.map(msg => (
                  <div key={msg.id} className={`flex flex-col ${msg.senderName === loggedInUser.name ? 'items-end' : 'items-start'} animate-fade-in`}>
                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-lg ${msg.senderName === loggedInUser.name ? 'bg-[#1a237e] text-white rounded-tr-none' : 'bg-white/5 border border-white/10 text-gray-300 rounded-tl-none'}`}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <span className="text-[8px] opacity-40 block text-right mt-1">{msg.timestamp}</span>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>
              <form onSubmit={handleSendPrivateMessage} className="p-3 md:p-4 bg-black/40 border-t border-white/5 flex gap-2">
                <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-grow bg-black border border-white/10 p-3 rounded-xl text-sm outline-none focus:border-[#1a237e] text-white" placeholder="Encrypted message..." />
                <button type="submit" className="bg-[#1a237e] p-3 md:p-4 text-white rounded-xl active:scale-90 transition-transform"><Send size={18}/></button>
              </form>
            </div>
          </main>
        )}

      </div>

      {/* Footer / Mobile Safety Area */}
      <footer className="hidden md:flex bg-black border-t border-white/5 py-4 px-12 z-30 justify-between items-center">
        <span className="text-[10px] font-bold tracking-widest text-gray-600 uppercase">CRACKER GANG v5.0 INTL HUB</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">AES-256 SECURED</span>
        </div>
      </footer>
      
      {/* Visual Accents */}
      <div className="fixed -bottom-48 -left-48 w-96 h-96 bg-[#1a237e] rounded-full blur-[180px] opacity-10 pointer-events-none"></div>
      <div className="fixed -top-48 -right-48 w-96 h-96 bg-red-900/10 rounded-full blur-[180px] opacity-5 pointer-events-none"></div>
    </div>
  );
};

export default App;
