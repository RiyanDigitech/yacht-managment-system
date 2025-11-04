import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-sky-50 to-white p-6">
      <div className="max-w-4xl w-full bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Illustration */}
        <section className="flex items-center justify-center p-8 bg-gradient-to-b from-sky-100 to-white">
          <div className="w-full max-w-md">
            {/* Yacht + waves SVG */}
            <div className="mx-auto mb-4" aria-hidden>
              <svg viewBox="0 0 600 400" className="w-full h-auto">
                <defs>
                  <linearGradient id="skyGrad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#e0f2ff" />
                    <stop offset="100%" stopColor="#ffffff" />
                  </linearGradient>
                </defs>

                <rect x="0" y="0" width="600" height="400" fill="url(#skyGrad)" />

                {/* Waves */}
                <g className="wave" opacity="0.95">
                  <path d="M0 320 C 120 280 240 360 360 320 C 480 280 600 360 720 320 V400 H0 Z" fill="#dbeffe" transform="translate(-60,0)">
                    <animateTransform attributeName="transform" attributeType="XML" type="translate" from="-60 0" to="0 0" dur="6s" repeatCount="indefinite" />
                  </path>
                  <path d="M0 340 C 120 300 240 380 360 340 C 480 300 600 380 720 340 V400 H0 Z" fill="#bfe3ff" transform="translate(0,0)">
                    <animateTransform attributeName="transform" attributeType="XML" type="translate" from="0 0" to="-60 0" dur="8s" repeatCount="indefinite" />
                  </path>
                </g>

                {/* Yacht */}
                <g transform="translate(120,160) scale(0.9)">
                  <g className="float" style={{ transformOrigin: '200px 100px' }}>
                    <animateTransform attributeName="transform" attributeType="XML" type="translate" values="0 0; 0 6; 0 0" dur="3s" repeatCount="indefinite" />

                    <rect x="20" y="90" width="360" height="40" rx="14" fill="#0f172a" opacity="0.9" />
                    <rect x="40" y="60" width="320" height="40" rx="8" fill="#ffffff" />
                    <polygon points="260,60 260,10 340,40" fill="#0284c7" />
                    <circle cx="80" cy="80" r="16" fill="#ffffff" opacity="0.9" />
                  </g>
                </g>
              </svg>
            </div>

            <p className="text-xs text-sky-600 text-center font-medium">Yacht Booking</p>
            <h3 className="text-center text-sm text-slate-500">404 • Page Not Found</h3>
          </div>
        </section>

        {/* Right: Message & actions */}
        <section className="p-8 flex flex-col justify-center gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">404</h1>
            <p className="mt-2 text-lg text-slate-600">The page you were looking for has sailed away.</p>
            <p className="mt-2 text-sm text-slate-500">Possible reasons: incorrect URL, moved content, or temporary unavailability.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg shadow-md font-medium text-white bg-sky-600 hover:bg-sky-700 transition"
            >
              Go Back Home
            </button>

            {/* <button
              onClick={() => navigate('/yachts')}
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition"
            >
              Browse Yachts
            </button> */}
          </div>

          {/* <form
            onSubmit={(e) => {
              e.preventDefault();
              const q = (e.currentTarget.querySelector('input') as HTMLInputElement).value;
              navigate(q ? `/search?query=${encodeURIComponent(q)}` : '/yachts');
            }}
            className="mt-4"
            aria-label="Search yachts"
          >
            <label className="block text-xs text-slate-500 mb-2">Search yachts or destinations</label>
            <div className="flex gap-2">
              <input
                name="q"
                placeholder="Example: Luxury, 2 hours, Karachi"
                className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
              />
              <button className="px-4 py-3 rounded-lg bg-sky-500 text-white font-medium">Search</button>
            </div>
          </form> */}

          <p className="mt-4 text-xs text-slate-400">If you believe this is an error, please <button onClick={() => navigate('/contact')} className="underline">contact us</button>.</p>
        </section>
      </div>
    </main>
  );
}
