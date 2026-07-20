"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Upload,
  Mic,
  AtSign,
  Zap,
  Smile,
  Menu,
  X,
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  MoreVertical,
  Copy,
  RotateCcw,
  Plus,
  MessageSquare,
  Share2,
  ThumbsUp,
  Pin,
  GitBranch,
} from "lucide-react";

export default function WorkspacePage() {
  const [messages, setMessages] = useState([
    {
      id: "1",
      author: "Alex",
      avatar: "A",
      isAI: false,
      isStreaming: false,
      content:
        "Can someone optimize this API? It's taking 3+ seconds to respond.",
      timestamp: "10:34 AM",
      reactions: [],
      isPinned: false,
      branches: 0,
    },
    {
      id: "2",
      author: "Sarah",
      avatar: "S",
      isAI: false,
      isStreaming: false,
      content:
        "I think caching would help. Redis maybe? We could cache the most frequent queries.",
      timestamp: "10:35 AM",
      reactions: ["👍"],
      isPinned: false,
      branches: 0,
    },
    {
      id: "3",
      author: "Coding Agent",
      avatar: "⚙️",
      isAI: true,
      isStreaming: true,
      content:
        "Based on your implementation, here are three improvements:\n\n1. **Implement Redis Caching** - Cache frequently accessed endpoints for 5-10 minutes\n2. **Add Database Indexing** - Create indexes on query columns\n3. **Optimize N+1 Queries** - Use batch operations\n\nHere's an optimized endpoint:\n\n```javascript\nconst cachedResult = await redis.get(`query:${params}`);\nif (cachedResult) return cachedResult;\n\nconst result = await db.query(params);\nawait redis.setex(`query:${params}`, 300, result);\nreturn result;\n```\n\nThis should reduce response time to under 500ms.",
      timestamp: "10:36 AM",
      reactions: [],
      isPinned: false,
      branches: 1,
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isDark, setIsDark] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [rightPanelTab, setRightPanelTab] = useState<
    "team" | "agents" | "knowledge" | "activity" | "analytics"
  >("team");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: String(messages.length + 1),
        author: "You",
        avatar: "Y",
        isAI: false,
        isStreaming: false,
        content: inputValue,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        reactions: [],
        isPinned: false,
        branches: 0,
      };
      setMessages([...messages, newMessage]);
      setInputValue("");
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    }
  };

  const togglePin = (id: string) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, isPinned: !msg.isPinned } : msg,
      ),
    );
  };

  const toggleReaction = (id: string, emoji: string) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === id) {
          const reactions = msg.reactions.includes(emoji)
            ? msg.reactions.filter((r) => r !== emoji)
            : [...msg.reactions, emoji];
          return { ...msg, reactions };
        }
        return msg;
      }),
    );
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Left Sidebar */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} bg-sidebar border-r border-border transition-all duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-3 justify-between">
            <div
              className={`${!sidebarOpen && "hidden"} flex items-center gap-2`}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-sm">Orbit AI</span>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 hover:bg-border rounded-lg"
            >
              {sidebarOpen ? (
                <Menu className="w-4 h-4" />
              ) : (
                <Menu className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button className="w-full bg-gradient-to-r from-primary to-accent text-white rounded-lg py-2 px-3 text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2 justify-center">
            <Plus className="w-4 h-4" />
            {sidebarOpen && "New Chat"}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-3 py-4">
          {[
            { icon: "📊", label: "Dashboard" },
            { icon: "💬", label: "AI Chats" },
            { icon: "👥", label: "Team Rooms" },
            { icon: "📚", label: "Knowledge Base" },
            { icon: "🤖", label: "AI Agents" },
            { icon: "📄", label: "Documents" },
            { icon: "🔖", label: "Bookmarks" },
            { icon: "⏱️", label: "History" },
            { icon: "⚙️", label: "Settings" },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                item.label === "AI Chats"
                  ? "bg-primary/20 text-primary"
                  : "hover:bg-border text-sidebar-foreground"
              }`}
              title={!sidebarOpen ? item.label : undefined}
            >
              <span className="text-lg">{item.icon}</span>
              {sidebarOpen && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Storage & Plan */}
        <div className="p-4 border-t border-border space-y-3">
          <div className={`${!sidebarOpen && "hidden"}`}>
            <p className="text-xs text-muted-foreground mb-2">Storage Used</p>
            <div className="w-full bg-border rounded-full h-2 overflow-hidden">
              <div className="bg-accent h-full" style={{ width: "65%" }} />
            </div>
            <p className="text-xs text-muted-foreground mt-1">6.5 GB / 10 GB</p>
          </div>
          <div
            className={`${!sidebarOpen && "hidden"} p-3 bg-border/50 rounded-lg border border-primary/20`}
          >
            <p className="text-xs font-semibold text-primary">Pro Plan</p>
            <p className="text-xs text-muted-foreground mt-1">
              Upgrade for unlimited storage
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <div className="h-16 bg-background border-b border-border px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1">
            {/* Workspace Switcher */}
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-border rounded-lg transition-colors">
              <span className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center text-xs font-bold">
                W
              </span>
              <span className="text-sm font-medium">Workspace</span>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex items-center gap-2 flex-1 max-w-md px-3 py-2 bg-border/50 rounded-lg border border-border/50">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search conversations..."
                className="flex-1 bg-transparent text-sm outline-none placeholder-muted-foreground"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* AI Model Selector */}
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm hover:bg-border rounded-lg transition-colors border border-border/50">
              <span className="font-mono text-xs font-semibold">GPT-5.5</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-border rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 hover:bg-border rounded-lg transition-colors"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Moon className="w-5 h-5 text-muted-foreground" />
              )}
            </button>

            {/* User Avatar */}
            <button className="flex items-center gap-2 px-3 py-2 hover:bg-border rounded-lg transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-bold text-white">
                Y
              </div>
              <ChevronDown className="w-4 h-4 hidden sm:block" />
            </button>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="group">
                <div className="flex gap-4">
                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      message.isAI
                        ? "bg-accent/20 text-accent"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {message.avatar}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-sm">
                        {message.author}
                      </span>
                      {message.isAI && (
                        <span className="text-xs px-2 py-0.5 rounded bg-accent/20 text-accent font-medium">
                          AI
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {message.timestamp}
                      </span>
                      {message.branches > 0 && (
                        <GitBranch
                          className="w-3 h-3 text-accent"
                          title={`${message.branches} branch(es)`}
                        />
                      )}
                    </div>

                    {/* Message Content */}
                    <div className="prose prose-invert max-w-none text-sm leading-relaxed">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      {message.isStreaming && (
                        <span className="inline-block w-2 h-5 bg-accent/60 animate-pulse ml-1" />
                      )}
                    </div>

                    {/* Reactions */}
                    {message.reactions.length > 0 && (
                      <div className="flex gap-2 mt-3">
                        {message.reactions.map((emoji) => (
                          <button
                            key={emoji}
                            onClick={() => toggleReaction(message.id, emoji)}
                            className="px-2 py-1 rounded bg-border hover:bg-border/80 text-xs font-medium transition-colors"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Message Actions */}
                    <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity flex-wrap">
                      <button className="px-2 py-1 text-xs rounded hover:bg-border transition-colors flex items-center gap-1">
                        <Copy className="w-3 h-3" />
                        Copy
                      </button>
                      {message.isAI && (
                        <>
                          <button className="px-2 py-1 text-xs rounded hover:bg-border transition-colors flex items-center gap-1">
                            <RotateCcw className="w-3 h-3" />
                            Retry
                          </button>
                          <button className="px-2 py-1 text-xs rounded hover:bg-border transition-colors flex items-center gap-1">
                            <Plus className="w-3 h-3" />
                            Continue
                          </button>
                        </>
                      )}
                      <button className="px-2 py-1 text-xs rounded hover:bg-border transition-colors flex items-center gap-1">
                        <Share2 className="w-3 h-3" />
                        Share
                      </button>
                      <button
                        onClick={() => togglePin(message.id)}
                        className={`px-2 py-1 text-xs rounded transition-colors flex items-center gap-1 ${
                          message.isPinned
                            ? "bg-accent/20 text-accent"
                            : "hover:bg-border"
                        }`}
                      >
                        <Pin className="w-3 h-3" />
                        {message.isPinned ? "Pinned" : "Pin"}
                      </button>
                      <button
                        onClick={() => toggleReaction(message.id, "👍")}
                        className="px-2 py-1 text-xs rounded hover:bg-border transition-colors flex items-center gap-1"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        React
                      </button>
                      <button className="px-2 py-1 text-xs rounded hover:bg-border transition-colors flex items-center gap-1">
                        <GitBranch className="w-3 h-3" />
                        Branch
                      </button>
                    </div>
                  </div>

                  {/* Dropdown Menu */}
                  <button className="p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-border rounded">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center text-sm font-bold flex-shrink-0">
                  🤖
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-muted-foreground">
                    Coding Agent is typing
                  </span>
                  <div className="flex gap-1 ml-2">
                    <div
                      className="w-2 h-2 rounded-full bg-accent/60 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-accent/60 animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-2 h-2 rounded-full bg-accent/60 animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Right Sidebar */}
          <div className="w-80 border-l border-border bg-background flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-border bg-sidebar px-3 py-2 gap-1">
              {[
                { id: "team", icon: "👥", label: "Team" },
                { id: "agents", icon: "🤖", label: "Agents" },
                { id: "knowledge", icon: "📚", label: "KB" },
                { id: "activity", icon: "⏱️", label: "Activity" },
                { id: "analytics", icon: "📊", label: "Analytics" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setRightPanelTab(tab.id as any)}
                  className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1 ${
                    rightPanelTab === tab.id
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:bg-border"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-3">
              {rightPanelTab === "team" && (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-muted-foreground uppercase px-1">
                    Online Members
                  </div>
                  {[
                    {
                      name: "Alex",
                      status: "online",
                      avatar: "A",
                      color: "#22C55E",
                    },
                    {
                      name: "Sarah",
                      status: "online",
                      avatar: "S",
                      color: "#22C55E",
                    },
                    {
                      name: "David",
                      status: "idle",
                      avatar: "D",
                      color: "#F59E0B",
                    },
                    {
                      name: "Emma",
                      status: "offline",
                      avatar: "E",
                      color: "#6B7280",
                    },
                  ].map((member) => (
                    <div
                      key={member.name}
                      className="flex items-center gap-3 p-2 rounded hover:bg-border transition-colors cursor-pointer"
                    >
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-white">
                          {member.avatar}
                        </div>
                        <div
                          className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background"
                          style={{ backgroundColor: member.color }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">
                          {member.name}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {member.status}
                        </p>
                      </div>
                    </div>
                  ))}
                  <button className="w-full mt-3 py-2 px-3 rounded-lg bg-primary/20 text-primary text-xs font-medium hover:bg-primary/30 transition-colors">
                    + Invite Member
                  </button>
                </div>
              )}

              {rightPanelTab === "agents" && (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-muted-foreground uppercase px-1">
                    AI Agents
                  </div>
                  {[
                    {
                      name: "Coding Agent",
                      icon: "💻",
                      status: "Analyzing code",
                      memory: "245 MB",
                    },
                    {
                      name: "Research Agent",
                      icon: "📚",
                      status: "Idle",
                      memory: "128 MB",
                    },
                    {
                      name: "Documentation Agent",
                      icon: "📝",
                      status: "Generating docs",
                      memory: "189 MB",
                    },
                    {
                      name: "Reviewer Agent",
                      icon: "🔍",
                      status: "Idle",
                      memory: "92 MB",
                    },
                  ].map((agent) => (
                    <div
                      key={agent.name}
                      className="p-3 rounded-lg bg-border/30 border border-border/50 hover:bg-border/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg">{agent.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold">{agent.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {agent.status}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Memory: {agent.memory}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {rightPanelTab === "knowledge" && (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-muted-foreground uppercase px-1">
                    Recent Files
                  </div>
                  {[
                    {
                      name: "API Documentation.pdf",
                      size: "2.4 MB",
                      icon: "📄",
                    },
                    {
                      name: "Architecture Diagram.png",
                      size: "1.8 MB",
                      icon: "🖼️",
                    },
                    { name: "Database Schema.sql", size: "458 KB", icon: "🗄️" },
                    { name: "Frontend Specs.docx", size: "1.1 MB", icon: "📋" },
                  ].map((file) => (
                    <div
                      key={file.name}
                      className="p-2 rounded hover:bg-border transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{file.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium truncate">
                            {file.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {file.size}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button className="w-full mt-2 py-2 px-3 rounded-lg bg-border hover:bg-border/80 text-xs font-medium transition-colors">
                    + Upload File
                  </button>
                </div>
              )}

              {rightPanelTab === "activity" && (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-muted-foreground uppercase px-1">
                    Activity Timeline
                  </div>
                  {[
                    {
                      event: "Alex uploaded API.pdf",
                      time: "5 min ago",
                      icon: "📤",
                    },
                    {
                      event: "Sarah asked AI a question",
                      time: "8 min ago",
                      icon: "❓",
                    },
                    {
                      event: "Coding Agent generated code",
                      time: "12 min ago",
                      icon: "✨",
                    },
                    {
                      event: "Research Agent searched docs",
                      time: "15 min ago",
                      icon: "🔍",
                    },
                    {
                      event: "Reviewer Agent reviewed PR",
                      time: "20 min ago",
                      icon: "✅",
                    },
                  ].map((item, i) => (
                    <div key={i} className="p-2 text-xs space-y-1">
                      <div className="flex items-start gap-2">
                        <span className="text-lg mt-0.5">{item.icon}</span>
                        <div>
                          <p className="text-foreground">{item.event}</p>
                          <p className="text-muted-foreground text-xs">
                            {item.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {rightPanelTab === "analytics" && (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-muted-foreground uppercase px-1">
                    AI Analytics
                  </div>
                  {[
                    { label: "Tokens Used", value: "24,580", icon: "🔤" },
                    { label: "Response Time", value: "342ms", icon: "⚡" },
                    { label: "Messages Today", value: "156", icon: "💬" },
                    { label: "Documents Indexed", value: "2,341", icon: "📚" },
                    { label: "Active Users", value: "4", icon: "👥" },
                    { label: "Current Model", value: "GPT-5.5", icon: "🧠" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="p-3 rounded-lg bg-border/30 border border-border/50"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-lg">{stat.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-muted-foreground">
                            {stat.label}
                          </p>
                          <p className="text-sm font-bold text-primary mt-1">
                            {stat.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Prompt Composer */}
        <div className="px-6 py-4 border-t border-border bg-background">
          <div className="flex gap-3">
            <div className="flex-1 bg-border/50 border border-border rounded-2xl px-4 py-3 flex items-center gap-3 hover:bg-border/70 transition-colors focus-within:ring-2 focus-within:ring-primary/50">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSendMessage()
                }
                placeholder="Ask Orbit AI anything..."
                className="flex-1 bg-transparent outline-none text-sm placeholder-muted-foreground"
              />
              <div className="flex items-center gap-2 text-muted-foreground">
                <button
                  className="p-1 hover:bg-border rounded transition-colors"
                  title="Upload files"
                >
                  <Upload className="w-4 h-4" />
                </button>
                <button
                  className="p-1 hover:bg-border rounded transition-colors"
                  title="Voice input"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  className="p-1 hover:bg-border rounded transition-colors"
                  title="Mention user"
                >
                  <AtSign className="w-4 h-4" />
                </button>
                <button
                  className="p-1 hover:bg-border rounded transition-colors"
                  title="Slash commands"
                >
                  <Zap className="w-4 h-4" />
                </button>
                <button
                  className="p-1 hover:bg-border rounded transition-colors"
                  title="Emoji"
                >
                  <Smile className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
