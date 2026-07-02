import { Link } from 'react-router-dom'
import { Brain, Zap, Terminal, ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 pt-16">
      <section className="relative flex flex-col items-center text-center space-y-8 mb-24 sm:mb-32">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
          </span>
          Analytics Engineer & AI Builder
        </div>
        
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight max-w-4xl">
          I build <span className="gradient-text">AI infrastructure</span> <br /> that works <span className="italic font-light">for</span> you.
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
          I'm Mason Vickery. I live in the command line, bridge data with analytics engineering, 
          and help teams harness the power of LLMs like Hermes Agent.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/about" className="btn-primary text-lg px-8 py-4">
            Learn About Me <ArrowRight className="h-5 w-5" />
          </Link>
          <Link to="/ai-setup" className="btn-secondary text-lg px-8 py-4">
            Copy My Setup
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-8 mb-24 sm:mb-32">
        {[
          { icon: Brain, title: 'AI Engineering', desc: 'Deep knowledge of LLMs, agentic workflows, and protocol-first integration.' },
          { icon: Zap, title: 'Analytics', desc: 'Turning messy data streams into clean, actionable intelligence via dbt & modern stacks.' },
          { icon: Terminal, title: 'Automated Dev', desc: 'Building self-improving agent workflows for dev, QA, and content pipelines.' }
        ].map((item, i) => (
          <div key={i} className="card p-8 group">
            <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 mb-6 group-hover:scale-110 transition-transform">
              <item.icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      <section className="card p-12 bg-gradient-to-br from-primary-950 to-dark-950 text-white relative overflow-hidden max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">Let's build something intelligent.</h2>
          <p className="text-slate-300 mb-8 text-lg">
            Whether you want a deep dive into my agentic AI setup or need help with a custom analytics pipeline, 
            I'm happy to help.
          </p>
          <a href="mailto:mason@vickery.dev" className="btn-accent px-8 py-4 text-lg">
            Get in Touch
          </a>
        </div>
      </section>
    </div>
  )
}