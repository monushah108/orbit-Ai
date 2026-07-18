'use client'

import { Button } from '@/components/ui/button'
import { Search, Bell, Moon, Sun, Settings, User } from 'lucide-react'
import { useState } from 'react'

export function TopNavbar() {
  const [isDark, setIsDark] = useState(true)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  return (
    <div className="h-16 bg-background border-b border-border flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search chats, documents..."
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-4">
        <button className="p-2 hover:bg-card rounded-lg transition text-muted-foreground hover:text-foreground relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
        </button>

        <button
          onClick={() => setIsDark(!isDark)}
          className="p-2 hover:bg-card rounded-lg transition text-muted-foreground hover:text-foreground"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="w-px h-6 bg-border"></div>

        <button
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-2 p-2 hover:bg-card rounded-lg transition group relative"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
          <span className="text-sm font-medium text-foreground hidden md:block">You</span>

          {showProfileMenu && (
            <div className="absolute right-0 top-12 w-48 bg-card border border-border rounded-lg shadow-xl">
              <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-background transition text-sm text-foreground">
                <User className="w-4 h-4" />
                Profile
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 hover:bg-background transition text-sm text-foreground">
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button className="w-full px-4 py-2 hover:bg-background transition text-sm text-muted-foreground text-left border-t border-border">
                Sign out
              </button>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}
