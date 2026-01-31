import Link from 'next/link'

export function Footer() {
  const projects = [
    { name: 'Aeon', url: 'https://aeon.com.br' },
    { name: 'Fortsense', url: 'https://fortsense.net' },
    { name: 'Future Baby Vision', url: 'https://futurebabyvision.com' }
  ]

  return (
    <footer className="glass-strong mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00B0F0] to-[#001E50] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">VW</span>
            </div>
            <span className="text-xl font-bold text-white">
              Fan <span className="text-[#00B0F0]">Wiki</span>
            </span>
          </div>

          <p className="text-white/60 text-sm max-w-md text-center md:text-left">
            A comprehensive wiki for Volkswagen enthusiasts. 
            Explore models, production years, and detailed specifications.
          </p>

          <div className="md:ml-auto text-center md:text-right">
            <p className="text-white/40 text-xs mb-2">Other Projects</p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              {projects.map(project => (
                <Link
                  key={project.url}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#00B0F0] transition-colors text-sm"
                >
                  {project.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-6 pt-4">
          <div className="text-center">
            <span className="text-white/40 text-xs">
              Made with{' '}
              <span className="text-red-400">love</span>
              {' '}by{' '}
              <Link
                href="https://marcusbtc.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00B0F0] hover:text-white transition-colors"
              >
                Marcus Barbosa
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
