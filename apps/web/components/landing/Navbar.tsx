import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setShowNavbar(false);
          } else {
            setShowNavbar(true);
          }
          lastScrollY.current = currentScrollY > 0 ? currentScrollY : 0;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed left-1/2 top-5 transform -translate-x-1/2 z-50
        w-[90vw] max-w-7xl
        rounded-3xl
        border border-gray-200
        bg-gradient-to-r from-white/80 via-blue-50/60 to-green-50/80
        backdrop-blur-xl shadow-xl
        transition-transform duration-500 ease-in-out
        ${
          showNavbar
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-16 pointer-events-none"
        }
      `}
      style={{ willChange: "transform, opacity" }}
      aria-label="Primary Navigation"
    >
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold text-2xl text-gray-800 select-none"
          >
            <span className="text-green-500 mr-1">●</span>
            BetterUptime
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-2 ml-6 ">
          <li>
            <Link href="#monitoring-plans" className="text-gray-600 hover:text-green-500 text-1xl px-3 py-2 rounded-md hover:bg-gray-100/50 transition-colors">
              Monitoring Plans
            </Link>
          </li>
          <li>
            <Link href="#features" className="text-gray-600 hover:text-green-500 text-1xl px-3 py-2 rounded-md hover:bg-gray-100/50 transition-colors">
              Features
            </Link>
          </li>
          <li>
            <Link href="#about" className="text-gray-600 hover:text-green-500 text-1xl px-3 py-2 rounded-md hover:bg-gray-100/50 transition-colors">
              About
            </Link>
          </li>
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <Link href="/login">
            <Button variant="outline" className="border-green-400 text-green-500 hover:bg-green-500/90 hover:text-white">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="default" className="bg-green-500 text-white hover:bg-green-400">
              Sign Up
            </Button>
          </Link>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden ml-2">
              <Menu className="w-7 h-7 text-gray-600" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-white/95 border-l border-gray-100 px-8 py-10">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-xl font-bold mb-4 text-gray-800 select-none">
                BetterUptime
              </Link>
              <Link href="#monitoring-plans" className="w-full text-left text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100/50 transition-colors">
                Monitoring Plans
              </Link>
              <Link href="#features" className="w-full text-left text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100/50 transition-colors">
                Features
              </Link>
              <Link href="#about" className="w-full text-left text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100/50 transition-colors">
                About
              </Link>
              <div className="py-2" />
              <Link href="/login">
                <Button variant="outline" className="w-full border-green-400 text-green-500">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="default" className="w-full bg-green-500 text-white">
                  Sign Up
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
