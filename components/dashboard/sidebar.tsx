'use client'

import { Plus, MessageSquare, Users, BookOpen, Zap, FileText, Bookmark, History, Settings, ChevronDown, Zap as ZapIcon } from 'lucide-react'
import { useState } from 'react'

export function Sidebar() {
  const [expandedSection, setExpandedSection] = useState<string | null>('chats')

  const sections = [
    {
      id: 'chats',
      label: 'AI Chats',
      icon: MessageSquare,
      items: ['General Discussion', 'Code Review', 'Brainstorm Session']
    },
    {
      id: 'teams',
      label: 'Team Rooms',
      icon: Users,
      items: ['Engineering', 'Product', 'Design']
    },
    {
      id: 'knowledge',
      label: 'Knowledge Base',
      icon: BookOpen,
      items: []
    },
    {
      id: 'agents',
      label: 'AI Agents',
      icon: Zap,
      items: ['Coding Agent', 'Research Agent', 'Documentation']
    }
  ]

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <ZapIcon className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-bold text-sidebar-foreground">Orbit</span>
          </div>
          <button className="p-1 hover:bg-sidebar-accent rounded-lg transition">
            <ChevronDown className="w-4 h-4 text-sidebar-foreground" />
          </button>
        </div>
        <button className="w-full flex items-center gap-2 bg-sidebar-primary hover:bg-sidebar-primary/90 text-sidebar-primary-foreground font-medium py-2 px-3 rounded-lg transition text-sm">
          <Plus className="w-4 h-4" />
          New Chat
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {sections.map((section) => {
          const Icon = section.icon
          const isExpanded = expandedSection === section.id

          return (
            <div key={section.id}>
              <button
                onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                className="w-full flex items-center justify-between px-3 py-2 hover:bg-sidebar-accent rounded-lg transition text-sidebar-foreground text-sm font-medium group"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-sidebar-foreground/60" />
                  {section.label}
                </div>
                {section.items.length > 0 && (
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                )}
              </button>

              {isExpanded && section.items.length > 0 && (
                <div className="mt-2 space-y-1 ml-4">
                  {section.items.map((item, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left px-3 py-2 text-sidebar-foreground/70 text-sm hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition text-sm">
          <Bookmark className="w-4 h-4" />
          Bookmarks
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition text-sm">
          <History className="w-4 h-4" />
          History
        </button>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition text-sm">
          <Settings className="w-4 h-4" />
          Settings
        </button>
      </div>
    </div>
  )
}
