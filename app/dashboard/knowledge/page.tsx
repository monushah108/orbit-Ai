'use client'

import { Sidebar } from '@/components/dashboard/sidebar'
import { TopNavbar } from '@/components/dashboard/top-navbar'
import { RightPanel } from '@/components/dashboard/right-panel'
import { Button } from '@/components/ui/button'
import { Upload, File, Image, Code, FileText, Trash2, Download, Search, Filter, Plus, Clock, FileSize } from 'lucide-react'
import { useState } from 'react'

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [hoveredDoc, setHoveredDoc] = useState<string | null>(null)

  const documents = [
    {
      id: 'doc1',
      name: 'API Documentation',
      type: 'pdf',
      icon: FileText,
      size: '2.4 MB',
      uploadedDate: '2 days ago',
      color: '#6366F1',
      aiSummary: 'Comprehensive API reference with 50+ endpoints, authentication methods, and usage examples.',
      indexed: true
    },
    {
      id: 'doc2',
      name: 'Design System',
      type: 'pdf',
      icon: FileText,
      size: '1.8 MB',
      uploadedDate: '5 days ago',
      color: '#8B5CF6',
      aiSummary: 'Complete design guidelines including components, colors, typography, and spacing rules.',
      indexed: true
    },
    {
      id: 'doc3',
      name: 'Code Guidelines',
      type: 'code',
      icon: Code,
      size: '456 KB',
      uploadedDate: '1 week ago',
      color: '#22C55E',
      aiSummary: 'Best practices for code organization, naming conventions, and project structure.',
      indexed: true
    },
    {
      id: 'doc4',
      name: 'Architecture Diagram',
      type: 'image',
      icon: Image,
      size: '892 KB',
      uploadedDate: '1 week ago',
      color: '#F59E0B',
      aiSummary: 'System architecture overview showing microservices, databases, and integrations.',
      indexed: true
    },
    {
      id: 'doc5',
      name: 'Database Schema',
      type: 'code',
      icon: Code,
      size: '234 KB',
      uploadedDate: '2 weeks ago',
      color: '#06B6D4',
      aiSummary: 'SQL schema definitions for all tables, indexes, and relationships.',
      indexed: true
    },
    {
      id: 'doc6',
      name: 'Security Policies',
      type: 'pdf',
      icon: FileText,
      size: '567 KB',
      uploadedDate: '2 weeks ago',
      color: '#EF4444',
      aiSummary: 'Security guidelines, compliance requirements, and data protection policies.',
      indexed: false
    }
  ]

  const filteredDocs = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || doc.type === selectedFilter
    return matchesSearch && matchesFilter
  })

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
                <h2 className="text-lg font-semibold text-foreground">Knowledge Base</h2>
                <p className="text-sm text-muted-foreground">Upload and organize documents for AI reference</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                <Upload className="w-4 h-4" />
                Upload Document
              </Button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto">
                {/* Upload Area */}
                <div className="mb-8 p-12 rounded-2xl border-2 border-dashed border-border hover:border-primary transition bg-card/50">
                  <div className="text-center">
                    <Upload className="w-8 h-8 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Upload Documents</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop your files here, or click to browse. Supports PDF, images, code files.
                    </p>
                    <Button variant="outline" className="border-border hover:bg-background text-foreground">
                      Browse Files
                    </Button>
                  </div>
                </div>

                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search documents..."
                      className="w-full pl-10 pr-4 py-2 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition text-sm"
                    />
                  </div>
                  <div className="flex gap-2">
                    {['all', 'pdf', 'code', 'image'].map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedFilter(type)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                          selectedFilter === type
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-card border border-border hover:border-primary/50 text-foreground'
                        }`}
                      >
                        {type === 'all' ? 'All' : type.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Documents Grid */}
                <div className="space-y-3">
                  {filteredDocs.map((doc) => {
                    const Icon = doc.icon
                    const isHovered = hoveredDoc === doc.id

                    return (
                      <div
                        key={doc.id}
                        onMouseEnter={() => setHoveredDoc(doc.id)}
                        onMouseLeave={() => setHoveredDoc(null)}
                        className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
                      >
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: `${doc.color}20` }}
                          >
                            <Icon className="w-6 h-6" style={{ color: doc.color }} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="font-semibold text-foreground group-hover:text-primary transition">{doc.name}</h3>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                  <div className="flex items-center gap-1">
                                    <FileSize className="w-3 h-3" />
                                    {doc.size}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {doc.uploadedDate}
                                  </div>
                                  {doc.indexed && (
                                    <span className="px-2 py-0.5 rounded bg-primary/20 text-primary font-medium">Indexed</span>
                                  )}
                                </div>
                              </div>

                              {/* Actions */}
                              {isHovered && (
                                <div className="flex gap-2 flex-shrink-0">
                                  <button className="p-2 hover:bg-background rounded-lg transition text-muted-foreground hover:text-foreground">
                                    <Download className="w-4 h-4" />
                                  </button>
                                  <button className="p-2 hover:bg-background rounded-lg transition text-muted-foreground hover:text-red-500">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </div>

                            {/* AI Summary */}
                            <p className="text-sm text-muted-foreground mt-3">{doc.aiSummary}</p>

                            {/* Progress Bar */}
                            <div className="mt-3 h-1 bg-background rounded-full overflow-hidden">
                              <div className="h-full w-full bg-gradient-to-r from-primary to-secondary"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {filteredDocs.length === 0 && (
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                    <p className="text-muted-foreground">No documents found. Try uploading or adjusting your filters.</p>
                  </div>
                )}

                {/* Stats */}
                <div className="mt-12 p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-semibold text-foreground mb-4">Knowledge Base Statistics</h3>
                  <div className="grid md:grid-cols-4 gap-4">
                    {[
                      { label: 'Total Documents', value: documents.length },
                      { label: 'Indexed Documents', value: documents.filter(d => d.indexed).length },
                      { label: 'Total Size', value: '8.4 GB' },
                      { label: 'AI Comprehension', value: '98.5%' }
                    ].map((stat, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-background">
                        <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      </div>
                    ))}
                  </div>
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
