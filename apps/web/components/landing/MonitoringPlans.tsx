import React from 'react';
import { Check, Star } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import Link from 'next/link';

const plans = [
  {
    name: 'Starter',
    price: '$9',
    period: '/month',
    description: 'Perfect for small projects',
    features: [
      '5 websites monitored',
      '1-minute check intervals',
      'Email & SMS alerts',
      'Basic status page',
      '7-day history'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: '$29',
    period: '/month',
    description: 'For growing businesses',
    features: [
      '25 websites monitored',
      '30-second check intervals',
      'All alert channels',
      'Custom status pages',
      '90-day history',
      'Team collaboration',
      'API access'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$99',
    period: '/month',
    description: 'For large organizations',
    features: [
      'Unlimited websites',
      '10-second check intervals',
      'Advanced integrations',
      'White-label status pages',
      'Unlimited history',
      'Priority support',
      'Custom SLAs'
    ],
    popular: false
  }
];

export function MonitoringPlans() {
  return (
    <section id="monitoring-plans" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">Choose Your Plan</h2>
          <p className="text-gray-400 text-lg">Start monitoring your websites with our flexible pricing plans</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-green-500/20 to-teal-500/20 border border-green-500/30' 
                  : 'bg-white/10 border border-gray-700/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400">{plan.period}</span>
                </div>
                <p className="text-gray-400 text-sm">{plan.description}</p>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-gray-300">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="text-center">
                {plan.popular ? (
                  <Link href="/signup">
                    <PrimaryButton className="w-full">
                      Start Free Trial
                    </PrimaryButton>
                  </Link>
                ) : (
                  <Link href="/signup">
                    <SecondaryButton className="w-full">
                      Get Started
                    </SecondaryButton>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            All plans include a 14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
} 