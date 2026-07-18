'use client'

import { Users, Zap, BookOpen, Activity, TrendingUp, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export function RightPanel() {
  const [activeTab, setActiveTab] = useState('members')

  const tabs = [
    { id: 'members', label: 'Members', icon: Users },
    { id: 'agents', label: 'Agents', icon: Zap },
    { id: 'knowledge', label: 'Knowledge', icon: BookOpen },
    { id: 'activity', label: 'Activity', icon: Activity },
  ]

  return (
    <div className="w-80 bg-card border-l border-border h-screen flex flex-col overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 p-4 flex items-center justify-center gap-2 transition text-sm font-medium border-b-2 ${
                activeTab === tab.id
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'members' && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-sm mb-4">Members Online (3)</h3>
            {[
              { name: 'Sarah Chen', role: 'Engineer', status: 'online' },
              { name: 'Marcus Johnson', role: 'Designer', status: 'online' },
              { name: 'Emma Rodriguez', role: 'Product', status: 'idle' }
            ].map((member, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-background transition">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex-shrink-0"></div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-sm mb-4">Active AI Agents</h3>
            {[
              { name: 'Coding Agent', status: 'idle' },
              { name: 'Research Agent', status: 'thinking' },
              { name: 'Documentation', status: 'idle' }
            ].map((agent, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-background hover:bg-border/50 transition cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">{agent.name}</p>
                  <span className={`text-xs font-semibold ${agent.status === 'thinking' ? 'text-primary' : 'text-muted-foreground'}`}>
                    {agent.status === 'thinking' ? '⚡ Active' : 'Ready'}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {agent.status === 'thinking' ? 'Processing request...' : 'Available for tasks'}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'knowledge' && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-sm mb-4">Knowledge Base</h3>
            {[
              { title: 'API Documentation', size: '2.4 MB', docs: 5 },
              { title: 'Design System', size: '1.1 MB', docs: 3 },
              { title: 'Code Guidelines', size: '456 KB', docs: 2 }
            ].map((doc, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-background hover:bg-border/50 transition cursor-pointer group">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition">{doc.title}</p>
                    <p className="text-xs text-muted-foreground">{doc.docs} documents • {doc.size}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-sm mb-4">Recent Activity</h3>
            {[
              { action: 'Sarah uploaded API docs', time: '5 min ago' },
              { action: 'Coding Agent analyzed code', time: '12 min ago' },
              { action: 'Marcus joined the workspace', time: '1 hour ago' }
            ].map((activity, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-background/50 border border-border/50">
                <p className="text-sm text-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-border bg-background/50">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Messages Today</span>
            <span className="text-sm font-semibold text-foreground">47</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Tokens Used</span>
            <span className="text-sm font-semibold text-primary">8,234 / 50,000</span>
          </div>
        </div>
      </div>
    </div>
  )
}
