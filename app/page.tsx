'use client'

import { Button } from '@/components/ui/button'
import { ChevronDown, MessageSquare, Zap, Share2, FileText, Code, Users, TrendingUp, Github, PlayCircle } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function LandingPage() {
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const features = [
    {
      icon: MessageSquare,
      title: 'Real-time Collaboration',
      description: 'Chat, brainstorm, and work together with team members and AI agents simultaneously.',
      color: '#6366F1'
    },
    {
      icon: Zap,
      title: 'AI Agents',
      description: 'Deploy specialized AI agents for coding, research, documentation, and design tasks.',
      color: '#8B5CF6'
    },
    {
      icon: Share2,
      title: 'Shared Knowledge Base',
      description: 'Upload and organize documents for AI to learn from and reference in conversations.',
      color: '#22C55E'
    },
    {
      icon: FileText,
      title: 'Document Intelligence',
      description: 'Extract insights from PDFs, code, and documents with advanced AI understanding.',
      color: '#F59E0B'
    },
    {
      icon: Code,
      title: 'Code Workspace',
      description: 'Write, review, and collaborate on code with AI-powered suggestions and explanations.',
      color: '#8B5CF6'
    },
    {
      icon: TrendingUp,
      title: 'Multi-model AI',
      description: 'Access multiple AI models optimized for different tasks and use cases.',
      color: '#6366F1'
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Orbit AI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition">Features</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition">Pricing</a>
            <a href="#docs" className="text-muted-foreground hover:text-foreground transition">Docs</a>
            <Link href="https://github.com" className="text-muted-foreground hover:text-foreground transition">GitHub</Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-foreground hover:bg-card">Sign In</Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
                Collaborate with AI. <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Together.</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                The next-generation AI workspace where teams chat, build, code, and think together in real time.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                  Start for Free
                </Button>
                <Button size="lg" variant="outline" className="border-border hover:bg-card text-foreground">
                  <PlayCircle className="w-4 h-4 mr-2" /> Watch Demo
                </Button>
              </div>

              <div className="mt-12 flex items-center gap-6">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary to-primary border-2 border-background"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-primary border-2 border-background"></div>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground font-semibold">10,000+</span> teams already collaborating
                </p>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-2xl"></div>
                <img 
                  src="/hero-dashboard.png" 
                  alt="Orbit AI Dashboard" 
                  className="relative rounded-2xl w-full h-auto shadow-2xl border border-border"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Premium Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need to collaborate with AI at scale</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="group p-8 rounded-2xl bg-background border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
                >
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-all duration-300"
                    style={{ backgroundColor: `${feature.color}20`, color: feature.color }}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Get started in minutes with these simple steps</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: 1, title: 'Create Workspace', description: 'Set up your AI workspace in seconds' },
              { step: 2, title: 'Invite Team', description: 'Add team members and collaborate together' },
              { step: 3, title: 'Upload Documents', description: 'Share documents for AI to reference' },
              { step: 4, title: 'Collaborate with AI', description: 'Start building amazing things' },
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-lg">{item.step}</span>
                  </div>
                  <div className="pt-2">
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-6 -right-8 text-primary">
                    <ChevronDown className="w-6 h-6 rotate-90" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-card/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Loved by Teams</h2>
            <p className="text-xl text-muted-foreground">See what our users are saying</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: 'Orbit AI transformed how our team works with AI. It\'s like having multiple AI experts in one interface.',
                author: 'Sarah Chen',
                role: 'CTO at TechCorp'
              },
              {
                quote: 'The real-time collaboration features are incredible. We shipped faster than ever before.',
                author: 'Marcus Johnson',
                role: 'Lead Engineer at StartupXYZ'
              },
              {
                quote: 'Best investment we made for our development team. The productivity gains are undeniable.',
                author: 'Emma Rodriguez',
                role: 'VP Product at InnovateCo'
              }
            ].map((testimonial, index) => (
              <div key={index} className="p-8 rounded-2xl bg-background border border-border">
                <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div>
                  <p className="font-bold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Simple Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that works for you</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Starter',
                price: '$29',
                description: 'Perfect for individuals',
                features: ['1 Workspace', '5 Team Members', 'Basic AI Models', 'Community Support']
              },
              {
                name: 'Professional',
                price: '$99',
                description: 'For growing teams',
                features: ['Unlimited Workspaces', 'Unlimited Members', 'All AI Models', 'Priority Support', 'Advanced Analytics'],
                highlighted: true
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'For large organizations',
                features: ['Everything in Pro', 'Custom Integrations', 'Dedicated Support', 'SLA Guarantee', 'Advanced Security']
              }
            ].map((plan, index) => (
              <div 
                key={index}
                className={`p-8 rounded-2xl border transition-all duration-300 ${
                  plan.highlighted
                    ? 'border-primary bg-gradient-to-b from-primary/10 to-secondary/10 transform scale-105 shadow-xl shadow-primary/20'
                    : 'border-border bg-background hover:border-primary/50'
                }`}
              >
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                <div className="mb-8">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-muted-foreground">/month</span>}
                </div>
                <Button className="w-full mb-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                  Get Started
                </Button>
                <div className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl transform -translate-x-1/2"></div>
        </div>

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Ready to Transform Your Workflow?</h2>
          <p className="text-xl text-muted-foreground mb-8">Join thousands of teams already using Orbit AI to collaborate smarter.</p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
            Start Free Trial - No Credit Card Required
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">Orbit AI</span>
              </div>
              <p className="text-sm text-muted-foreground">The next-generation AI workspace for teams.</p>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">About</a></li>
                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-muted-foreground">&copy; 2026 Orbit AI. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition">GitHub</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
