'use client'

import { Sidebar } from '@/components/dashboard/sidebar'
import { TopNavbar } from '@/components/dashboard/top-navbar'
import { RightPanel } from '@/components/dashboard/right-panel'
import { Button } from '@/components/ui/button'
import { Send, Paperclip, Mic, Plus, Code, MessageCircle } from 'lucide-react'
import { useState } from 'react'

export default function DashboardPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: 'You',
      content: 'Can you help me review this React component?',
      timestamp: '10:30 AM',
      isUser: true
    },
    {
      id: 2,
      author: 'Coding Agent',
      content: 'I\'ll analyze your component and provide feedback on performance, best practices, and potential improvements.',
      timestamp: '10:31 AM',
      isUser: false,
      isStreaming: true
    }
  ])
  const [inputValue, setInputValue] = useState('')

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        author: 'You',
        content: inputValue,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUser: true
      }])
      setInputValue('')
    }
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navbar */}
        <TopNavbar />

        {/* Chat Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Chat */}
          <div className="flex-1 flex flex-col bg-background">
            {/* Chat Header */}
            <div className="h-16 border-b border-border px-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-foreground">General Discussion</h2>
                <p className="text-sm text-muted-foreground">3 members online</p>
              </div>
              <button className="p-2 hover:bg-card rounded-lg transition text-muted-foreground hover:text-foreground">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md lg:max-w-xl ${message.isUser ? 'order-2' : 'order-1'}`}>
                    <div className={`flex items-end gap-3 ${message.isUser ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 ${
                        message.isUser
                          ? 'bg-gradient-to-br from-primary to-secondary'
                          : 'bg-gradient-to-br from-secondary to-primary'
                      }`}></div>
                      <div>
                        <p className={`text-xs font-medium mb-2 ${message.isUser ? 'text-right' : ''} ${
                          message.isUser ? 'text-muted-foreground' : 'text-muted-foreground'
                        }`}>
                          {message.author} • {message.timestamp}
                        </p>
                        <div className={`rounded-2xl px-4 py-3 ${
                          message.isUser
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card border border-border text-foreground'
                        }`}>
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          {message.isStreaming && (
                            <div className="flex gap-1 mt-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40 animate-bounce"></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-1.5 h-1.5 rounded-full bg-current opacity-40 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-6">
              <div className="max-w-4xl mx-auto">
                {/* Quick Actions */}
                <div className="flex gap-2 mb-4">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:border-primary/50 text-foreground text-sm transition hover:bg-background">
                    <Code className="w-4 h-4" />
                    Code Review
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:border-primary/50 text-foreground text-sm transition hover:bg-background">
                    <MessageCircle className="w-4 h-4" />
                    Brainstorm
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:border-primary/50 text-foreground text-sm transition hover:bg-background">
                    <Plus className="w-4 h-4" />
                    Create Plan
                  </button>
                </div>

                {/* Input */}
                <div className="flex gap-3">
                  <div className="flex-1">
                    <div className="relative">
                      <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                            e.preventDefault()
                            handleSend()
                          }
                        }}
                        placeholder="Ask anything... (Shift+Enter for new line)"
                        className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none max-h-32"
                        rows={1}
                      />
                      <div className="absolute right-3 bottom-3 flex items-center gap-2">
                        <button className="p-1.5 hover:bg-background rounded-lg transition text-muted-foreground hover:text-foreground">
                          <Paperclip className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-background rounded-lg transition text-muted-foreground hover:text-foreground">
                          <Mic className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-2 text-center">
                  This demo is for visualization. In production, messages would be sent to your AI backend.
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <RightPanel />
        </div>
      </div>
    </div>
  )
}
