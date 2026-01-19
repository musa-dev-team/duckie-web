import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#090B0F] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        {/* 404 Display */}
        <div className="mb-8">
          <span className="text-8xl md:text-9xl font-bold text-white/10">404</span>
        </div>

        {/* Message */}
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
          Page not found
        </h1>
        <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have
          been moved or doesn&apos;t exist.
        </p>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium bg-white/10 text-white hover:bg-white/15 border border-white/10 hover:border-white/20 transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            Read our Blog
          </Link>
        </div>

        {/* Contact */}
        <p className="mt-12 text-sm text-zinc-500">
          Need help?{" "}
          <a
            href="mailto:hello@duckie.ai"
            className="text-[#FF6B35] hover:underline"
          >
            Contact us
          </a>
        </p>
      </div>
    </main>
  );
}
