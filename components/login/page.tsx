'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInComponent() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'oauth' | 'credentials' | 'passwordless'>('oauth');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleOAuthSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: "/dashboard" });
  };

  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setMessage('Invalid email or password');
      } else if (result?.ok) {
        router.push('/dashboard');
      }
    } catch (error) {
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordlessSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const result = await signIn('email', {
        email,
        redirect: false,
      });

      if (result?.ok) {
        setMessage('Check your email for the magic link!');
      } else {
        setMessage('Failed to send magic link');
      }
    } catch (error) {
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">Sign In</h1>
            
            {/* Tab Navigation */}
            <div className="flex mb-6 border-b">
              <button
                onClick={() => setActiveTab('oauth')}
                className={`flex-1 py-2 px-4 text-sm font-medium ${
                  activeTab === 'oauth'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Social Login
              </button>
              <button
                onClick={() => setActiveTab('credentials')}
                className={`flex-1 py-2 px-4 text-sm font-medium ${
                  activeTab === 'credentials'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Email & Password
              </button>
              <button
                onClick={() => setActiveTab('passwordless')}
                className={`flex-1 py-2 px-4 text-sm font-medium ${
                  activeTab === 'passwordless'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Magic Link
              </button>
            </div>

            {message && (
              <div className={`mb-4 p-3 rounded ${
                message.includes('Check your email') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}

            {/* OAuth Tab */}
            {activeTab === 'oauth' && (
              <div className="space-y-4">
                <button
                  onClick={() => handleOAuthSignIn("google")}
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign In with Google
                </button>
                <button
                  onClick={() => handleOAuthSignIn("github")}
                  className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign In with GitHub
                </button>
              </div>
            )}

            {/* Credentials Tab */}
            {activeTab === 'credentials' && (
              <form onSubmit={handleCredentialsSignIn} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </button>
                <p className="text-sm text-center text-gray-600">
                  Do not have an account?{' '}
                  <button
                    type="button"
                    onClick={() => router.push('/sign-up')}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            )}

            {/* Passwordless Tab */}
            {activeTab === 'passwordless' && (
              <form onSubmit={handlePasswordlessSignIn} className="space-y-4">
                <div>
                  <label htmlFor="magic-email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="magic-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your email for magic link"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Magic Link'}
                </button>
                <p className="text-sm text-gray-600 text-center">
                  We will send you a secure link to sign in without a password
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}