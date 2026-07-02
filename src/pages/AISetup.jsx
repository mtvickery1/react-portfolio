import { Terminal, Brain, GitBranch, Zap, Copy } from 'lucide-react'

export default function AISetup() {
  const steps = [
    { title: '1. Setup Hermes', cmd: 'hermes setup', desc: 'Bootstrap your local agent environment.' },
    { title: '2. Configure Providers', cmd: 'hermes config set provider=...', desc: 'Plug in your API keys (Anthropic/OpenRouter).' },
    { title: '3. Enable Tools', cmd: 'hermes tools enable browser terminal', desc: 'Unlock powerful local capabilities.' },
    { title: '4. Persistent Memory', cmd: 'hermes memory add "..."', desc: 'Make the agent remember your workflow quirks.' }
  ]

  return (
    <div className="container-custom py-16 sm:py-24">
      <header className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">Master My Setup</h1>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
          Ready to scale your productivity? This is how I run Hermes locally.
          Copy my workflow, adopt my constraints, and start building.
        </p>
      </header>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <section className="space-y-8">
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Terminal className="text-primary-500" />
              Quickstart Steps
            </h2>
            <div className="space-y-6">
              {steps.map((step, i) => (
                <div key={i} className="relative pl-8 border-l-2 border-slate-200 dark:border-slate-800">
                  <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary-500" />
                  <h3 className="font-bold mb-1">{step.title}</h3>
                  <p className="text-sm text-slate-500 mb-2">{step.desc}</p>
                  <code className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-sm font-mono flex items-center justify-between">
                    {step.cmd}
                    <button className="text-primary-500 hover:text-primary-600">
                      <Copy className="h-4 w-4" />
                    </button>
                  </code>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-8">
          <div className="card p-8 bg-gradient-to-br from-indigo-900 to-slate-900 text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Brain className="text-accent-400" />
              Why This Works
            </h2>
            <ul className="space-y-4 text-slate-300">
              <li className="flex gap-3">
                <GitBranch className="h-5 w-5 text-accent-400 shrink-0" />
                <strong>Local-First:</strong> All my notes and context live in my vault, keeping everything durable and offline-capable.
              </li>
              <li className="flex gap-3">
                <Zap className="h-5 w-5 text-accent-400 shrink-0" />
                <strong>Agent Orchestration:</strong> By delegating subtasks to parallel agents, I solve complex problems in minutes, not hours.
              </li>
              <li className="flex gap-3">
                <Brain className="h-5 w-5 text-accent-400 shrink-0" />
                <strong>Persistent Skills:</strong> My agent keeps learning. Every fix is saved as a reusable skill, preventing the same bug twice.
              </li>
            </ul>
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-sm text-slate-400">
                Want to dive deeper? Check the official documentation:
              </p>
              <a href="https://hermes-agent.nousresearch.com/docs" className="text-primary-400 hover:text-primary-300 font-medium mt-2 inline-block">
                hermes-agent.nousresearch.com/docs →
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}