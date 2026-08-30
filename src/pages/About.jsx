const stack = [
  { name: 'React 19', desc: 'UI framework modern dengan hooks dan component-based architecture.' },
  { name: 'React Router v7', desc: 'Client-side routing dengan protected routes dan nested routes.' },
  { name: 'Tailwind CSS v4', desc: 'Utility-first CSS framework untuk desain yang konsisten dan responsif.' },
  { name: 'DummyJSON API', desc: 'REST API dummy untuk simulasi data user, auth, dan CRUD operations.' },
]

function About() {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
          Tentang
        </span>
        <h1 className="text-4xl font-black text-blue-900 mb-4">Tentang Feb LMS</h1>
        <p className="text-slate-500 text-lg leading-relaxed">
          Aplikasi Learning Management System sederhana yang dibangun dengan React untuk mempelajari
          konsep API integration, autentikasi, dan state management modern.
        </p>
      </div>

      {/* Tech Stack */}
      <h2 className="text-xl font-bold text-blue-900 mb-4">Tech Stack</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        {stack.map((s) => (
          <div key={s.name} className="bg-white rounded-2xl shadow-md border border-slate-100 p-5 flex gap-4">
            <div className="w-2 rounded-full bg-amber-500 flex-shrink-0" />
            <div>
              <p className="font-bold text-blue-900 text-sm">{s.name}</p>
              <p className="text-slate-500 text-sm mt-1 leading-relaxed">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Features */}
      <h2 className="text-xl font-bold text-blue-900 mb-4">Fitur yang Dibangun</h2>
      <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6">
        <ul className="space-y-3">
          {[
            'CRUD Users dengan DummyJSON API',
            'Pagination dengan limit & skip query params',
            'Halaman detail user dengan data lengkap',
            'Autentikasi login & register',
            'Protected Routes berbasis token',
            'Role-based Authorization (admin)',
            'Reusable components (Button, Card, Navbar)',
            'Responsive design untuk desktop & mobile',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-slate-600 text-sm">
              <span className="mt-0.5 text-amber-500 font-bold">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default About
