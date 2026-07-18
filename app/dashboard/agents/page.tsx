'use client'

import { Sidebar } from '@/components/dashboard/sidebar'
import { TopNavbar } from '@/components/dashboard/top-navbar'
import { RightPanel } from '@/components/dashboard/right-panel'
import { Button } from '@/components/ui/button'
import { Code, BookOpen, Search, Zap, CheckCircle, Play, Settings, MoreHorizontal, Plus, BarChart3 } from 'lucide-react'
import { useState } from 'react'

export default function AgentsPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null)

  const agents = [
    {
      id: 'coding',
      name: 'Coding Agent',
      description: 'Specialized in code review, refactoring, and generation',
      icon: Code,
      status: 'active',
      currentTask: 'Reviewing React component performance',
      memory: '2,456 KB',
      recentActions: ['Code analysis', 'Refactoring suggestion', 'Documentation'],
      metrics: { tasksCompleted: 156, accuracy: 98.2 }
    },
    {
      id: 'research',
      name: 'Research Agent',
      description: 'Finds and synthesizes information from documents',
      icon: Search,
      status: 'idle',
      currentTask: 'Ready for new task',
      memory: '1,234 KB',
      recentActions: ['Document analysis', 'Data extraction', 'Summary generation'],
      metrics: { tasksCompleted: 89, accuracy: 96.5 }
    },
    {
      id: 'documentation',
      name: 'Documentation Agent',
      description: 'Creates and maintains project documentation',
      icon: BookOpen,
      status: 'active',
      currentTask: 'Generating API docs',
      memory: '892 KB',
      recentActions: ['API documentation', 'Code comments', 'Guide creation'],
      metrics: { tasksCompleted: 234, accuracy: 99.1 }
    },
    {
      id: 'reviewer',
      name: 'Code Reviewer',
      description: 'Performs thorough code quality reviews',
      icon: CheckCircle,
      status: 'idle',
      currentTask: 'Ready for new task',
      memory: '567 KB',
      recentActions: ['Quality assessment', 'Best practice check', 'Security scan'],
      metrics: { tasksCompleted: 321, accuracy: 97.8 }
    }
  ]

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="h-16 border-b border-border px-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">AI Agents</h2>
                <p className="text-sm text-muted-foreground">Manage and monitor your AI agents</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Plus className="w-4 h-4" />
                Deploy Agent
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-6xl mx-auto">
                {/* Summary Stats */}
                <div className="grid md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: 'Active Agents', value: '2', icon: Zap },
                    { label: 'Total Agents', value: '4', icon: Settings },
                    { label: 'Tasks Today', value: '127', icon: BarChart3 },
                    { label: 'Avg. Accuracy', value: '97.9%', icon: CheckCircle }
                  ].map((stat, idx) => {
                    const Icon = stat.icon
                    return (
                      <div key={idx} className="p-6 rounded-2xl bg-card border border-border">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-sm text-muted-foreground">{stat.label}</p>
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                    )
                  })}
                </div>

                {/* Agents Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {agents.map((agent) => {
                    const Icon = agent.icon
                    const isSelected = selectedAgent === agent.id

                    return (
                      <div
                        key={agent.id}
                        onClick={() => setSelectedAgent(isSelected ? null : agent.id)}
                        className={`rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-primary bg-primary/10 shadow-lg shadow-primary/20'
                            : 'border-border bg-card hover:border-primary/50'
                        }`}
                      >
                        <div className="p-6">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                                <Icon className="w-6 h-6 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h3 className="font-bold text-foreground text-lg">{agent.name}</h3>
                                <p className="text-sm text-muted-foreground">{agent.description}</p>
                              </div>
                            </div>
                            <button className="p-2 hover:bg-background rounded-lg transition text-muted-foreground hover:text-foreground">
                              <MoreHorizontal className="w-5 h-5" />
                            </button>
                          </div>

                          {/* Status & Memory */}
                          <div className="space-y-3 mb-4 pb-4 border-b border-border">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Status</span>
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${agent.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                                <span className="text-sm font-medium text-foreground capitalize">{agent.status}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Current Task</span>
                              <span className="text-sm font-medium text-foreground">{agent.currentTask}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-muted-foreground">Memory</span>
                              <span className="text-sm font-medium text-foreground">{agent.memory}</span>
                            </div>
                          </div>

                          {/* Expandable Content */}
                          {isSelected && (
                            <div className="space-y-4 pt-4 border-t border-border">
                              {/* Metrics */}
                              <div>
                                <h4 className="text-sm font-semibold text-foreground mb-3">Performance Metrics</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="p-3 rounded-lg bg-background">
                                    <p className="text-xs text-muted-foreground mb-1">Tasks Completed</p>
                                    <p className="text-lg font-bold text-foreground">{agent.metrics.tasksCompleted}</p>
                                  </div>
                                  <div className="p-3 rounded-lg bg-background">
                                    <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                                    <p className="text-lg font-bold text-primary">{agent.metrics.accuracy}%</p>
                                  </div>
                                </div>
                              </div>

                              {/* Recent Actions */}
                              <div>
                                <h4 className="text-sm font-semibold text-foreground mb-3">Recent Actions</h4>
                                <div className="space-y-2">
                                  {agent.recentActions.map((action, idx) => (
                                    <div key={idx} className="flex items-center gap-2 p-2 rounded bg-background text-sm text-foreground">
                                      <CheckCircle className="w-3 h-3 text-primary" />
                                      {action}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Actions */}
                              <div className="flex gap-2 pt-4 border-t border-border">
                                <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground gap-2 text-sm">
                                  <Play className="w-3 h-3" />
                                  Assign Task
                                </Button>
                                <Button variant="outline" className="flex-1 border-border hover:bg-card text-foreground gap-2 text-sm">
                                  <Settings className="w-3 h-3" />
                                  Configure
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
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
