"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  Activity,
  Bell,
  BarChart3,
  Clock,
  Play,
  CheckCircle,

} from 'lucide-react';
import { Footer } from '@/components/footer/page';
import { StatCard } from '../components/landing/StatCard';
import { PrimaryButton } from '../components/landing/PrimaryButton';
import { SecondaryButton } from '../components/landing/SecondaryButton';
import { SectionHeader } from '../components/landing/SectionHeader';

import { IconText } from '../components/landing/IconText';
import { HoverStat } from '../components/landing/HoverStat';
import { TestimonialCarousel } from '../components/landing/TestimonialCarousel';
import { Navbar } from '@/components/landing/Navbar';
import { CompactMonitoringPlan } from '../components/landing/CompactMonitoringPlan';
import { MonitoringPlans } from '../components/landing/MonitoringPlans';
import { Features } from '../components/landing/Features';
import { About } from '../components/landing/About';

function App() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const testimonialInterval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => {
      clearInterval(testimonialInterval);
    };
  }, []);

  const testimonials = [
    {
      name: 'Alex Thompson',
      role: 'DevOps Engineer',
      content: 'BetterUptime saved us from multiple outages. The alerts are instant and accurate.',
      rating: 5,
      image:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      name: 'Sarah Kim',
      role: 'CTO',
      content: 'Finally, uptime monitoring that actually works. Clean interface, reliable alerts.',
      rating: 5,
      image:
        'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Site Reliability Engineer',
      content: "The most comprehensive monitoring solution we've used. Highly recommended.",
      rating: 5,
      image:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    },
  ];



  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white font-sans selection:bg-green-500 selection:text-white">
      <Navbar />
      <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden px-6 text-center">
        <svg
          className="absolute top-0 left-1/4 w-[600px] h-[600px] opacity-20 animate-blob"
          viewBox="0 0 600 600"
          xmlns="http://www.w3.org/2000/svg"
          fill="url(#paint0)"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="paint0" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(300 300) rotate(90) scale(300)">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="300" />
        </svg>

        <svg
          className="absolute bottom-20 right-10 w-[400px] h-[400px] opacity-15 animate-blob animation-delay-3000"
          viewBox="0 0 600 600"
          xmlns="http://www.w3.org/2000/svg"
          fill="url(#paint1)"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="paint1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(300 300) rotate(90) scale(300)">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="300" cy="300" r="300" />
        </svg>

        <div
          className={`relative z-10 max-w-4xl w-full transition-all duration-[1200ms] ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h1 className="text-6xl md:text-7xl font-extralight tracking-tight mb-6 select-none">
            Better
            <span className="font-black bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent ml-2">
              Uptime
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light mb-12">
            The most reliable uptime monitoring. Get instant alerts when your websites go down.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center mb-14 cursor-default select-none">
            <StatCard icon={<Activity />} label="Average Uptime" value="99.99%" color="green" />
            <StatCard icon={<Shield />} label="Sites Monitored" value={1247} color="blue" />
            <StatCard icon={<Bell />} label="Alerts Sent" value={847} color="yellow" />
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/signup">
              <PrimaryButton>
                Start Monitoring Free <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
              </PrimaryButton>
            </Link>
            <SecondaryButton>
              <Play className="w-5 h-5 mr-2" />
              View Demo
            </SecondaryButton>
          </div>
        </div>
      </section>

      <CompactMonitoringPlan />

      <Features />

      <MonitoringPlans />

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-extralight text-white mb-6">Beautiful Dashboard</h2>
            <p className="text-gray-400 mb-8 font-light leading-relaxed">
              Monitor all your websites from a single, intuitive dashboard. Get detailed insights into performance, uptime
              history, and response times.
            </p>
            <div className="space-y-5">
              <IconText icon={<CheckCircle className="text-green-400 w-5 h-5" />} text="Real-time status updates" />
              <IconText icon={<BarChart3 className="text-blue-400 w-5 h-5" />} text="Performance analytics" />
              <IconText icon={<Clock className="text-yellow-400 w-5 h-5" />} text="Historical data & reports" />
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden shadow-2xl">
            <img
              src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
              alt="Monitoring dashboard"
              className="w-full h-80 object-cover transition duration-500 hover:opacity-100 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
            <div className="absolute top-4 left-4 bg-gray-900/70 backdrop-blur-sm rounded px-3 py-1 text-xs flex items-center gap-2 text-green-400 font-semibold select-none">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              All Systems Operational
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <HoverStat number="99.99%" label="Average Uptime" />
          <HoverStat number="&lt;30s" label="Alert Response Time" />
          <HoverStat number={50} label="Global Locations" />
        </div>
      </section>
              
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader title="Trusted by Developers" />
          <TestimonialCarousel
            testimonials={testimonials}
            current={currentTestimonial}
            setCurrent={setCurrentTestimonial}
          />
        </div>
      </section>
      <About />
      <Footer />
    </div>
  );
}




export default App;
