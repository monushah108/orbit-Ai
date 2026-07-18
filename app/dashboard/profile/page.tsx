'use client'

import { Sidebar } from '@/components/dashboard/sidebar'
import { TopNavbar } from '@/components/dashboard/top-navbar'
import { RightPanel } from '@/components/dashboard/right-panel'
import { Button } from '@/components/ui/button'
import { Settings, Edit, Trophy, TrendingUp, MessageSquare, Share2, Clock, Calendar } from 'lucide-react'
import { useState } from 'react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-8">
              {/* Profile Header */}
              <div className="mb-8 p-8 rounded-2xl bg-card border border-border">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg"></div>
                    <div className="pt-2">
                      <h1 className="text-3xl font-bold text-foreground mb-2">Sarah Chen</h1>
                      <p className="text-foreground text-lg mb-2">CTO at TechCorp</p>
                      <p className="text-muted-foreground text-sm">San Francisco, CA • Joined March 2025</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setIsEditing(!isEditing)}
                      variant="outline"
                      className="border-border hover:bg-background text-foreground gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit Profile
                    </Button>
                    <Button
                      variant="outline"
                      className="border-border hover:bg-background text-foreground gap-2"
                    >
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-foreground mb-4">AI enthusiast. Building the future with teams. Coffee addict.</p>

                {/* Social Links */}
                <div className="flex gap-3">
                  <a href="#" className="text-primary hover:text-primary/80 text-sm transition">Twitter</a>
                  <a href="#" className="text-primary hover:text-primary/80 text-sm transition">GitHub</a>
                  <a href="#" className="text-primary hover:text-primary/80 text-sm transition">LinkedIn</a>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Chats Started', value: '287', icon: MessageSquare },
                  { label: 'Documents Shared', value: '156', icon: Share2 },
                  { label: 'Agents Deployed', value: '12', icon: TrendingUp },
                  { label: 'Current Streak', value: '45 days', icon: Trophy }
                ].map((stat, idx) => {
                  const Icon = stat.icon
                  return (
                    <div key={idx} className="p-6 rounded-2xl bg-card border border-border">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    </div>
                  )
                })}
              </div>

              {/* Recent Chats */}
              <div className="mb-8 p-8 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Recent Chats</h2>
                <div className="space-y-4">
                  {[
                    {
                      title: 'React Performance Optimization',
                      date: '2 hours ago',
                      messages: 23,
                      agents: ['Coding Agent']
                    },
                    {
                      title: 'API Design Review',
                      date: 'Yesterday',
                      messages: 45,
                      agents: ['Code Reviewer', 'Documentation']
                    },
                    {
                      title: 'Database Schema Planning',
                      date: '3 days ago',
                      messages: 67,
                      agents: ['Research Agent', 'Coding Agent']
                    }
                  ].map((chat, idx) => (
                    <button
                      key={idx}
                      className="w-full text-left p-4 rounded-lg bg-background hover:border-primary/50 border border-border transition group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition">{chat.title}</h3>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {chat.date}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-2">
                          {chat.agents.map((agent, idx) => (
                            <span key={idx} className="text-xs px-2 py-1 rounded bg-primary/20 text-primary">
                              {agent}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{chat.messages} messages</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-8 p-8 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Achievements</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: '🚀', title: 'Early Adopter', desc: 'Joined Orbit AI in the first month' },
                    { icon: '⭐', title: 'Top Contributor', desc: 'Shared 50+ documents with team' },
                    { icon: '🎯', title: 'Consistency King', desc: 'Active for 45+ consecutive days' },
                    { icon: '🤖', title: 'AI Master', desc: 'Deployed and trained 10+ AI agents' },
                    { icon: '📚', title: 'Knowledge Expert', desc: 'Built comprehensive knowledge base' },
                    { icon: '🎓', title: 'Mentor', desc: 'Helped 5+ team members get started' }
                  ].map((achievement, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-background border border-border hover:border-primary/50 transition text-center"
                    >
                      <p className="text-3xl mb-2">{achievement.icon}</p>
                      <p className="font-semibold text-foreground text-sm mb-1">{achievement.title}</p>
                      <p className="text-xs text-muted-foreground">{achievement.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="p-8 rounded-2xl bg-card border border-border">
                <h2 className="text-2xl font-bold text-foreground mb-6">Activity Timeline</h2>
                <div className="space-y-6">
                  {[
                    {
                      time: 'March 15, 2026',
                      events: [
                        'Started 3 new chats',
                        'Deployed Coding Agent',
                        'Uploaded API documentation'
                      ]
                    },
                    {
                      time: 'March 14, 2026',
                      events: [
                        'Reviewed 5 code submissions',
                        'Shared design system document',
                        'Invited 2 team members'
                      ]
                    },
                    {
                      time: 'March 13, 2026',
                      events: [
                        'Created new workspace',
                        'Sent first message',
                        'Joined Orbit AI'
                      ]
                    }
                  ].map((timeline, idx) => (
                    <div key={idx} className="border-l-2 border-primary/30 pl-6 pb-6">
                      <p className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {timeline.time}
                      </p>
                      <div className="space-y-2">
                        {timeline.events.map((event, eventIdx) => (
                          <p key={eventIdx} className="text-sm text-muted-foreground">
                            • {event}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <RightPanel />
        </div>
      </div>
    </div>
  )
}
