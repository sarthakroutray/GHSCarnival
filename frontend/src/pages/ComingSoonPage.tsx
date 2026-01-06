export default function ComingSoonPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#fafafa] px-4 text-slate-900">
      <div className="absolute inset-0">
        {/* Soft gradient blurs */}
        <div aria-hidden className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-gradient-to-br from-orange-300/40 to-orange-200/30 blur-3xl" />
        <div aria-hidden className="absolute top-10 -right-32 h-80 w-80 rounded-full bg-gradient-to-bl from-orange-300/30 to-orange-200/20 blur-3xl" />
        <div aria-hidden className="absolute bottom-32 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-orange-300/35 to-amber-200/25 blur-3xl" />
        <div aria-hidden className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-gradient-to-tl from-purple-300/30 to-violet-200/20 blur-3xl" />
        
        {/* Subtle geometric shapes */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" x="0" y="0" width="120" height="104" patternUnits="userSpaceOnUse">
              <path d="M30 0 L90 0 L120 52 L90 104 L30 104 L0 52 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <div className="relative flex min-h-screen items-center justify-center py-14">
        <div className="mx-auto w-full max-w-2xl text-center font-kdam">
          <img
            src="/ghs-carnival-logo.png"
            alt="GHS Carnival"
            className="mx-auto w-[min(520px,92vw)] select-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
            draggable={false}
            decoding="async"
          />

          <h1 className="mt-8 text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              We Are Cooking
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base font-medium leading-7 text-slate-600 sm:text-lg">
            We are going to launch our website very soon.
            <span className="block">Stay tuned.</span>
          </p>

          <p className="mx-auto mt-8 max-w-sm text-center text-xs leading-5 text-slate-500">
            Thanks for your patience. Check back soon.
          </p>
        </div>
      </div>
    </main>
  )
}
