import React from 'react';
import { Activity, Bell, BarChart3, CheckCircle } from 'lucide-react';

const monitoringFeatures = [
  {
    icon: <Activity className="w-6 h-6 text-green-400" />,
    title: 'Real-time Monitoring',
    description: '24/7 checks every 30 seconds'
  },
  {
    icon: <Bell className="w-6 h-6 text-yellow-400" />,
    title: 'Instant Alerts',
    description: 'SMS, email, Slack notifications'
  },
  {
    icon: <BarChart3 className="w-6 h-6 text-blue-400" />,
    title: 'Analytics',
    description: 'Performance insights & reports'
  },
  {
    icon: <CheckCircle className="w-6 h-6 text-green-400" />,
    title: 'Global Coverage',
    description: '50+ monitoring locations'
  }
];

export function CompactMonitoringPlan() {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-light text-white mb-2">Complete Monitoring Solution</h2>
          <p className="text-gray-400 text-sm">Everything you need to keep your sites online</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {monitoringFeatures.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-colors duration-300">
              <div className="mb-3">{feature.icon}</div>
              <h3 className="text-sm font-medium text-white mb-1">{feature.title}</h3>
              <p className="text-xs text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 