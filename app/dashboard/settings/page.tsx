'use client'

import { Sidebar } from '@/components/dashboard/sidebar'
import { TopNavbar } from '@/components/dashboard/top-navbar'
import { RightPanel } from '@/components/dashboard/right-panel'
import { Button } from '@/components/ui/button'
import { Settings, Sliders, Lock, Bell, Zap, Users, CreditCard, LogOut, ChevronRight, Toggle } from 'lucide-react'
import { useState } from 'react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general')
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [slackNotifications, setSlackNotifications] = useState(false)
  const [aiSuggestions, setAiSuggestions] = useState(true)

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'workspace', label: 'Workspace', icon: Sliders },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'integrations', label: 'Integrations', icon: Zap }
  ]

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar />
        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="h-16 border-b border-border px-6 flex items-center">
              <h2 className="text-lg font-semibold text-foreground">Settings</h2>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto flex">
              {/* Sidebar */}
              <div className="w-48 border-r border-border px-4 py-6 bg-card/50">
                <nav className="space-y-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition text-sm font-medium ${
                          isActive
                            ? 'bg-primary/20 text-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-background'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    )
                  })}
                </nav>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-8">
                <div className="max-w-2xl">
                  {/* General Settings */}
                  {activeTab === 'general' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-6">Profile Settings</h3>
                        <div className="space-y-6">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                            <input
                              type="text"
                              defaultValue="Sarah Chen"
                              className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                            <input
                              type="email"
                              defaultValue="sarah@techcorp.com"
                              className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
                            <textarea
                              defaultValue="CTO at TechCorp. AI enthusiast. Building the future."
                              className="w-full px-4 py-2 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none h-24"
                            />
                          </div>
                          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Save Changes</Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Workspace Settings */}
                  {activeTab === 'workspace' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-6">Workspace Management</h3>
                        <div className="space-y-4">
                          <div className="p-4 rounded-lg bg-card border border-border">
                            <h4 className="font-semibold text-foreground mb-2">TechCorp Workspace</h4>
                            <p className="text-sm text-muted-foreground mb-4">Owner</p>
                            <Button variant="outline" className="border-border hover:bg-background text-foreground">Manage</Button>
                          </div>
                          <div className="p-4 rounded-lg bg-card border border-border">
                            <h4 className="font-semibold text-foreground mb-2">Invite Team Members</h4>
                            <p className="text-sm text-muted-foreground mb-4">Invite new members to collaborate</p>
                            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Send Invite</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Settings */}
                  {activeTab === 'security' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-6">Security</h3>
                        <div className="space-y-6">
                          <div className="p-4 rounded-lg bg-card border border-border">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-semibold text-foreground">Change Password</h4>
                                <p className="text-sm text-muted-foreground">Update your password regularly</p>
                              </div>
                              <Button variant="outline" className="border-border hover:bg-background text-foreground">Update</Button>
                            </div>
                          </div>
                          <div className="p-4 rounded-lg bg-card border border-border">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <h4 className="font-semibold text-foreground">Two-Factor Authentication</h4>
                                <p className="text-sm text-muted-foreground">Add extra layer of security</p>
                              </div>
                              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Enable</Button>
                            </div>
                          </div>
                          <div className="p-4 rounded-lg bg-card border border-border">
                            <h4 className="font-semibold text-foreground mb-4">Active Sessions</h4>
                            <div className="space-y-3">
                              {[
                                { device: 'MacBook Pro', location: 'San Francisco', time: 'Current' },
                                { device: 'iPhone 14', location: 'San Francisco', time: '2 hours ago' }
                              ].map((session, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-background rounded">
                                  <div>
                                    <p className="text-sm font-medium text-foreground">{session.device}</p>
                                    <p className="text-xs text-muted-foreground">{session.location} • {session.time}</p>
                                  </div>
                                  <button className="text-sm text-muted-foreground hover:text-red-500 transition">Revoke</button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications Settings */}
                  {activeTab === 'notifications' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-6">Notification Preferences</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                            <div>
                              <p className="font-medium text-foreground">Email Notifications</p>
                              <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                            </div>
                            <button
                              onClick={() => setEmailNotifications(!emailNotifications)}
                              className={`w-12 h-6 rounded-full transition ${emailNotifications ? 'bg-primary' : 'bg-muted'}`}
                            >
                              <div className={`w-5 h-5 rounded-full bg-background transition transform ${emailNotifications ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                            <div>
                              <p className="font-medium text-foreground">Slack Notifications</p>
                              <p className="text-sm text-muted-foreground">Send updates to Slack</p>
                            </div>
                            <button
                              onClick={() => setSlackNotifications(!slackNotifications)}
                              className={`w-12 h-6 rounded-full transition ${slackNotifications ? 'bg-primary' : 'bg-muted'}`}
                            >
                              <div className={`w-5 h-5 rounded-full bg-background transition transform ${slackNotifications ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                            </button>
                          </div>

                          <div className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                            <div>
                              <p className="font-medium text-foreground">AI Suggestions</p>
                              <p className="text-sm text-muted-foreground">Receive AI-powered suggestions</p>
                            </div>
                            <button
                              onClick={() => setAiSuggestions(!aiSuggestions)}
                              className={`w-12 h-6 rounded-full transition ${aiSuggestions ? 'bg-primary' : 'bg-muted'}`}
                            >
                              <div className={`w-5 h-5 rounded-full bg-background transition transform ${aiSuggestions ? 'translate-x-6' : 'translate-x-0.5'}`}></div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Billing Settings */}
                  {activeTab === 'billing' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-6">Billing & Subscription</h3>
                        <div className="space-y-4">
                          <div className="p-6 rounded-lg bg-card border border-border">
                            <div className="flex items-center justify-between mb-6">
                              <div>
                                <h4 className="text-lg font-semibold text-foreground">Professional Plan</h4>
                                <p className="text-sm text-muted-foreground">Billed monthly</p>
                              </div>
                              <span className="text-3xl font-bold text-primary">$99</span>
                            </div>
                            <div className="space-y-2 mb-6 pb-6 border-b border-border">
                              <p className="text-sm text-muted-foreground">✓ Unlimited workspaces</p>
                              <p className="text-sm text-muted-foreground">✓ Unlimited team members</p>
                              <p className="text-sm text-muted-foreground">✓ All AI models</p>
                              <p className="text-sm text-muted-foreground">✓ Priority support</p>
                            </div>
                            <div className="flex gap-3">
                              <Button variant="outline" className="border-border hover:bg-background text-foreground">Change Plan</Button>
                              <Button variant="outline" className="border-border hover:bg-background text-foreground">Manage Payment</Button>
                            </div>
                          </div>

                          <div className="p-4 rounded-lg bg-card border border-border">
                            <p className="text-sm text-muted-foreground mb-4">Last billing date: March 15, 2026</p>
                            <p className="text-sm text-muted-foreground mb-4">Next billing date: April 15, 2026</p>
                            <Button variant="outline" className="border-border hover:bg-background text-foreground">View Invoice History</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Integrations Settings */}
                  {activeTab === 'integrations' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-bold text-foreground mb-6">Connected Integrations</h3>
                        <div className="space-y-4">
                          {[
                            { name: 'Slack', status: 'connected', desc: 'Get Slack notifications' },
                            { name: 'GitHub', status: 'connected', desc: 'Sync repositories and PRs' },
                            { name: 'Jira', status: 'not-connected', desc: 'Link issues and tasks' },
                            { name: 'Linear', status: 'not-connected', desc: 'Track issues and roadmap' }
                          ].map((integration, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                              <div>
                                <p className="font-medium text-foreground">{integration.name}</p>
                                <p className="text-sm text-muted-foreground">{integration.desc}</p>
                              </div>
                              <Button
                                className={integration.status === 'connected' ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-card border border-border hover:bg-background text-foreground'}
                              >
                                {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
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
