import { GitFork, X, Mail, Brain } from "lucide-react"

export default function About() {
  return (
    <div className="container-custom py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="card p-8 sm:p-12 mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3 aspect-square rounded-2xl bg-gradient-to-tr from-primary-400 to-accent-400 p-1">
              <div className="w-full h-full rounded-2xl bg-slate-900 flex items-center justify-center">
                <Brain className="h-20 w-20 text-white/20" />
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold">Hi, I'm Mason.</h1>
              <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                I'm an Analytics Engineer based in Austin, TX. By day, I bridge the gap between 
                complex data infrastructure and actionable strategy. By "any hour," I am 
                experimenting with agentic AI, testing LLM boundaries, and building resilient
                automation systems in my Obsidian vault.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: GitFork, href: 'https://github.com/masonvickery' },
                  { icon: X, href: 'https://twitter.com/masonvickery' },
                  { icon: Mail, href: 'mailto:mason@vickery.dev' }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="space-y-8">
          <h2 className="text-3xl font-bold">My Core Principles</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { title: 'Always Verify', desc: 'Trust, but verify. I never assume a model or script is right without running it against real I/O.' },
              { title: 'Obsidian First', desc: "My vault is my brain. If it's not in Obsidian, it didn't happen (or I'll forget)." },
              { title: 'Efficiency Obsessed', desc: 'I automate everything I do twice. If I repeat a process, it becomes a reusable skill.' },
              { title: 'Pragmatism > Perfection', desc: 'Delivering a working, imperfect solution is better than planning a perfect one that never ships.' }
            ].map((p, i) => (
              <div key={i} className="card p-6 border-l-4 border-l-primary-500">
                <h3 className="font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}