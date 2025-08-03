import React from 'react';
import { 
  Activity, 
  Bell, 
  BarChart3, 
  Globe, 
  Shield, 
  Zap, 
  Users, 
  Code,
  Clock,
  AlertTriangle,
  Smartphone,
  Webhook
} from 'lucide-react';

const features = [
  {
    icon: <Activity className="w-8 h-8 text-green-400" />,
    title: 'Real-time Monitoring',
    description: 'Monitor your websites 24/7 with check intervals as fast as 10 seconds from our global network of monitoring locations.',
    category: 'Core'
  },
  {
    icon: <Bell className="w-8 h-8 text-yellow-400" />,
    title: 'Instant Alerts',
    description: 'Get notified immediately via SMS, email, Slack, Discord, webhooks, and more when issues are detected.',
    category: 'Core'
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-blue-400" />,
    title: 'Advanced Analytics',
    description: 'Comprehensive uptime reports, response time analytics, and performance insights to optimize your websites.',
    category: 'Analytics'
  },
  {
    icon: <Globe className="w-8 h-8 text-purple-400" />,
    title: 'Global Coverage',
    description: 'Monitor from 50+ locations worldwide to ensure your sites are accessible from anywhere on the planet.',
    category: 'Infrastructure'
  },
  {
    icon: <Shield className="w-8 h-8 text-indigo-400" />,
    title: 'SSL Certificate Monitoring',
    description: 'Automatically monitor SSL certificate expiration and get alerts before they expire to prevent security issues.',
    category: 'Security'
  },
  {
    icon: <Zap className="w-8 h-8 text-orange-400" />,
    title: 'Lightning Fast',
    description: 'Ultra-fast monitoring with response times under 30 seconds and instant alert delivery to minimize downtime.',
    category: 'Performance'
  },
  {
    icon: <Users className="w-8 h-8 text-pink-400" />,
    title: 'Team Collaboration',
    description: 'Invite team members, assign roles, and collaborate effectively with shared dashboards and reports.',
    category: 'Team'
  },
  {
    icon: <Code className="w-8 h-8 text-cyan-400" />,
    title: 'API Access',
    description: 'Full REST API access to integrate monitoring data into your existing tools and workflows.',
    category: 'Integration'
  },
  {
    icon: <Clock className="w-8 h-8 text-emerald-400" />,
    title: 'Historical Data',
    description: 'Access unlimited historical data to track performance trends and identify patterns over time.',
    category: 'Analytics'
  },
  {
    icon: <AlertTriangle className="w-8 h-8 text-red-400" />,
    title: 'Incident Management',
    description: 'Track and manage incidents with detailed timelines, status updates, and resolution tracking.',
    category: 'Operations'
  },
  {
    icon: <Smartphone className="w-8 h-8 text-teal-400" />,
    title: 'Mobile App',
    description: 'Monitor your sites on the go with our mobile app for iOS and Android with push notifications.',
    category: 'Accessibility'
  },
  {
    icon: <Webhook className="w-8 h-8 text-violet-400" />,
    title: 'Webhook Integrations',
    description: 'Connect with your favorite tools like PagerDuty, OpsGenie, and custom webhooks for seamless workflows.',
    category: 'Integration'
  }
];

const categories = ['Core', 'Analytics', 'Infrastructure', 'Security', 'Performance', 'Team', 'Integration', 'Operations', 'Accessibility'];

export function Features() {
  return (
    <section id="features" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Powerful Features</h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Everything you need to monitor, alert, and maintain your websites with enterprise-grade reliability
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-gray-700/30 hover:border-gray-600/50"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-gray-800/50 rounded-lg group-hover:bg-gray-700/50 transition-colors duration-300">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <span className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full">
                      {feature.category}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <div className="inline-flex flex-wrap justify-center gap-4">
            {categories.map((category, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-gray-700/50 text-gray-300 text-sm rounded-full hover:bg-gray-600/50 transition-colors duration-300 cursor-default"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 