"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Eye, EyeOff, LogIn, CheckCircle } from 'lucide-react';
import api from '@/config/axios';

interface AuthPageProps {
  mode: 'login' | 'signup';
}

export default function AuthPage({ mode }: AuthPageProps) {
  const router = useRouter();
  const islogin = mode === 'login';
  
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const validateForm = () => {
    if (islogin) {
      if (!formData.username.trim() || !formData.password) {
        setError('Please fill in all fields');
        return false;
      }
    } else {
      if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
        setError('Please fill in all required fields');
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError('Please enter a valid email address');
        return false;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      if (islogin) {
        // Sign in
        const res = await api.post('/user/login', {
          username: formData.username,
          password: formData.password
        });

        localStorage.setItem('token', res.data.token);
        router.push('/dashboard');
      } else {
        // Sign up
        const res = await api.post('/user/signup', {
          name: formData.name,
          username: formData.email,
          password: formData.password
        });

        // Auto sign in after signup
        const loginRes = await api.post('/user/login', {
          username: formData.email, 
          password: formData.password
        });

        localStorage.setItem('token', loginRes.data.token);
        router.push('/dashboard');
      }
    } catch (error: any) {
      if (error.response?.status === 403) {
        setError(islogin ? 'Invalid credentials' : 'Username already exists');
      } else {
        setError(error.response?.data?.message || `${islogin ? 'Sign in' : 'Sign up'} failed`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const benefits = islogin ? [
    { title: 'Access Your Dashboard', description: 'Monitor all your websites from one place' },
    { title: 'View Analytics', description: 'Check uptime reports and performance data' },
    { title: 'Manage Alerts', description: 'Configure notifications and team settings' }
  ] : [
    { title: '14-Day Free Trial', description: 'No credit card required to get started' },
    { title: '99.99% Uptime Monitoring', description: 'Monitor your websites from 50+ global locations' },
    { title: 'Instant Alerts', description: 'Get notified via SMS, email, Slack, and more' },
    { title: 'Beautiful Dashboard', description: 'Monitor all your sites from one intuitive interface' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-900 text-white font-sans">
      <div className="flex min-h-screen">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Back to Home */}
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                {islogin ? 'Welcome Back' : 'Create Your Account'}
              </h1>
              <p className="text-gray-400">
                {islogin ? 'Sign in to your BetterUptime account' : 'Start monitoring your websites in minutes'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Name field - only for signup */}
              {!islogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
              )}

              {/* Username/Email field */}
              <div>
                <label htmlFor={islogin ? "username" : "email"} className="block text-sm font-medium text-gray-300 mb-2">
                  {islogin ? 'Username' : 'Email Address'}
                </label>
                <input
                  type={islogin ? "text" : "email"}
                  id={islogin ? "username" : "email"}
                  name={islogin ? "username" : "email"}
                  value={islogin ? formData.username : formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                  placeholder={islogin ? "Enter your username" : "Enter your email"}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors pr-12"
                    placeholder={islogin ? "Enter your password" : "Create a password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password - only for signup */}
              {!islogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors pr-12"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-400 hover:to-teal-400 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {islogin ? 'loging In...' : 'Creating Account...'}
                  </>
                ) : (
                  <>
                    {islogin ? <LogIn className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
                    {islogin ? 'Sign In' : 'Create Account'}
                  </>
                )}
              </button>
            </form>

            {/* Switch Mode Link */}
            <p className="mt-8 text-center text-gray-400">
              {islogin ? "Don't have an account? " : "Already have an account? "}
              <Link 
                href={islogin ? "/signup" : "/login"} 
                className="text-green-400 hover:text-green-300 transition-colors"
              >
                {islogin ? 'Sign up' : 'Sign in'}
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Benefits */}
        <div className="hidden lg:flex flex-1 bg-gray-800/30 items-center justify-center p-12">
          <div className="max-w-md">
            <h2 className="text-2xl font-bold text-white mb-6">
              {islogin ? 'Welcome Back!' : 'Why Choose BetterUptime?'}
            </h2>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 text-green-400 mt-0.5 flex-shrink-0">✓</div>
                  <div>
                    <h3 className="font-semibold text-white">{benefit.title}</h3>
                    <p className="text-gray-400 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 




