'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; 

export default function SignInComponent() {
  const router = useRouter();

  interface SignInProvider {
    (provider: string): void;
  }

  const handleSignIn: SignInProvider = (provider: string) => {
    signIn(provider, { callbackUrl: "/dashboard" }); // Redirect to dashboard after sign-in
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign In</h1>
                <button
                  onClick={() => handleSignIn("google")}
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
                >
                  Sign In with Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}