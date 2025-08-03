import { Activity, BarChart3, Shield, AlertTriangle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 py-16 select-none">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2 flex flex-col gap-5">
          <span className="flex items-center gap-3 text-white text-3xl font-bold relative select-text">
            <Activity className="w-7 h-7 text-green-400" />
            BetterUptime
            <span className="ml-3 text-green-400 text-xs bg-gray-800 px-3 rounded-full animate-pulse select-none">
              99.99% Uptime
            </span>
          </span>
          <p className="text-gray-400 leading-relaxed text-sm max-w-md">
            Monitor, analyze, and secure your web presence. Ultimate reliability, instant alerts, and beautiful dashboards.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-5 text-white tracking-wide uppercase">Product</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="flex items-center gap-2 hover:text-green-400 cursor-pointer transition-colors">
              <BarChart3 className="w-5 h-5" />
              Uptime Monitoring
            </li>
            <li className="flex items-center gap-2 hover:text-green-400 cursor-pointer transition-colors">
              <Shield className="w-5 h-5" />
              Status Pages
            </li>
            <li className="flex items-center gap-2 hover:text-green-400 cursor-pointer transition-colors">
              <AlertTriangle className="w-5 h-5" />
              Incident Management
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-5 text-white tracking-wide uppercase">Company</h4>
          <ul className="space-y-3 text-gray-400 text-sm">
            <li className="hover:text-green-400 cursor-pointer transition-colors">About</li>
            <li className="hover:text-green-400 cursor-pointer transition-colors">Blog</li>
            <li className="hover:text-green-400 cursor-pointer transition-colors">Careers</li>
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-6">
          <div>
            <h4 className="text-sm font-semibold mb-4 text-white tracking-wide uppercase">Stay Updated</h4>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex rounded-md overflow-hidden border border-gray-700"
              aria-label="Subscribe to newsletter"
            >
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-500 flex-grow outline-none"
                required
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-400 px-5 py-2 text-white font-semibold transition-colors"
                aria-label="Subscribe"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="flex gap-6 items-center text-gray-400">
            <a href="#" aria-label="Twitter" className="hover:text-green-400 transition-colors">
              Twitter
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-green-400 transition-colors">
              LinkedIn
            </a>
            <a href="#" aria-label="GitHub" className="hover:text-green-400 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="text-center pt-8 mt-12 border-t border-gray-800 text-gray-500 text-xs select-text">
        &copy; 2025 BetterUptime. All rights reserved.
      </div>
    </footer>
  );
}