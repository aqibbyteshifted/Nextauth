'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading
    if (!session) router.push("/sign-in"); // Redirect if not authenticated
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Welcome to Dashboard!</h1>
                <div className="space-y-2">
                  <p><strong>Name:</strong> {session.user?.name}</p>
                  <p><strong>Email:</strong> {session.user?.email}</p>
                  <p><strong>User ID:</strong> {session.user?.id}</p>
                </div>
                <div className="pt-4">
                  <Image
                    src={session.user?.image || '/default-avatar.png'}
                    width={64}
                    height={64}
                    alt="Profile"
                    className="w-16 h-16 rounded-full mx-auto"
                  />
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/sign-in' })}
                  className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}