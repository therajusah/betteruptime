import React from 'react';
import { Heart, Target, Users, Award } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { number: '10K+', label: 'Websites Monitored' },
  { number: '99.99%', label: 'Average Uptime' },
  { number: '50+', label: 'Global Locations' },
  { number: '24/7', label: 'Support Available' }
];

const values = [
  {
    icon: <Target className="w-8 h-8 text-green-400" />,
    title: 'Reliability First',
    description: 'We believe that every website deserves to be monitored with the highest level of reliability and precision.'
  },
  {
    icon: <Users className="w-8 h-8 text-blue-400" />,
    title: 'Customer Focused',
    description: 'Our customers are at the heart of everything we do. We build features based on real user needs and feedback.'
  },
  {
    icon: <Award className="w-8 h-8 text-yellow-400" />,
    title: 'Excellence',
    description: 'We strive for excellence in every aspect of our service, from monitoring accuracy to customer support.'
  },
  {
    icon: <Heart className="w-8 h-8 text-red-400" />,
    title: 'Passion',
    description: 'We\'re passionate about helping businesses keep their websites online and their customers happy.'
  }
];

export function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-6">About BetterUptime</h2>
          <p className="text-gray-400 text-lg max-w-4xl mx-auto leading-relaxed">
            We're on a mission to make website monitoring simple, reliable, and accessible to everyone. 
            Founded by developers who experienced the pain of website downtime, we built BetterUptime 
            to help businesses of all sizes keep their websites online and their customers happy.
          </p>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>


        <div className="mb-20">
          <h3 className="text-2xl font-light text-white text-center mb-12">Our Values</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="flex items-start gap-4 p-6 bg-white/5 backdrop-blur-sm rounded-xl">
                <div className="flex-shrink-0 p-3 bg-gray-800/50 rounded-lg">
                  {value.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">{value.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-light text-white mb-6">Our Story</h3>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                BetterUptime was born from frustration. Our founders were tired of complex, 
                expensive monitoring solutions that didn't work reliably. They wanted something 
                simple, affordable, and actually effective.
              </p>
              <p>
                What started as a side project quickly grew into a trusted service used by 
                thousands of developers and businesses worldwide. Today, we monitor over 
                10,000 websites and help prevent countless hours of downtime.
              </p>
              <p>
                We're still a small, passionate team focused on building the best website 
                monitoring service possible. Every feature we add, every improvement we make, 
                is driven by our customers' needs and feedback.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
              alt="Team collaboration"
              className="w-full h-80 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent rounded-2xl" />
          </div>
        </div>


        <div className="text-center mt-20">
          <h3 className="text-2xl font-light text-white mb-4">Join Thousands of Happy Customers</h3>
          <p className="text-gray-400 mb-8">
            Start monitoring your websites today and experience the difference that reliable uptime monitoring makes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <button className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 transition-all duration-300 text-white py-3 px-8 rounded-lg shadow-md font-semibold text-lg">
                Start Free Trial
              </button>
            </Link>
            <Link href="/contact">
              <button className="inline-flex items-center justify-center gap-2 text-gray-300 border border-gray-600 hover:border-gray-400 hover:bg-gray-800/60 transition-colors duration-300 py-3 px-8 rounded-lg font-medium">
                Contact Sales
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 