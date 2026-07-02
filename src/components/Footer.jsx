import { Link } from 'react-router-dom'
import { GitFork, X, Mail, Brain, Zap, Terminal, Gamepad2 } from 'lucide-react'

const socialLinks = [
  { href: 'https://github.com/masonvickery', label: 'GitHub', icon: GitFork },
  { href: 'https://twitter.com/masonvickery', label: 'Twitter', icon: X },
  { href: 'mailto:mason@vickery.dev', label: 'Email', icon: Mail },
]

const footerNav = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/ai-setup', label: 'AI Setup' },
  { path: '/pong', label: 'Pong' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-dark-950/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold gradient-text mb-4">
              <span className="relative flex h-8 w-8 items-center justify-center">
                <Brain className="h-5 w-5 text-primary-600 dark:text-primary-400" aria-hidden="true" />
              </span>
              <span>Mason Vickery</span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
              Analytics engineer building AI infrastructure. Helping people harness AI like I do.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Navigate</h3>
            <ul className="space-y-3">
              {footerNav.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">What I Do</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Zap className="h-5 w-5 text-primary-500 shrink-0" aria-hidden="true" />
                Analytics Engineering
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Terminal className="h-5 w-5 text-accent-500 shrink-0" aria-hidden="true" />
                AI Infrastructure
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Brain className="h-5 w-5 text-green-500 shrink-0" aria-hidden="true" />
                LLM Systems
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                <Gamepad2 className="h-5 w-5 text-amber-500 shrink-0" aria-hidden="true" />
                Creative Coding
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">Stack</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Python', 'SQL', 'dbt', 'Obsidian',
                'Hermes Agent', 'Nemotron 3 Ultra',
                'Gemini Flash', 'Claude Sonnet',
                'OpenRouter', 'Groq', 'Cerebras',
                'React', 'TypeScript', 'Tailwind',
              ].map((tech) => (
                <span key={tech} className="px-2 py-0.5 text-xs font-medium rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500 dark:text-slate-500">
              © {new Date().getFullYear()} Mason Vickery. Built with React, TypeScript, & a lot of ☕.
            </p>
            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
              <span className="font-mono">Deployed on GitHub Pages</span>
              <a
                href="https://github.com/masonvickery/react-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1"
              >
                <GitFork className="h-4 w-4" aria-hidden="true" />
                View Source
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}