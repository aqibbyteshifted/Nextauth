import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-amber-300">Welcome to My Next.js App</h1>
      <p>This is a simple example of a Next.js application.</p>
      <Image
        src="/images/nextjs-logo.png"
        alt="Next.js Logo"
        width={200}
        height={200}
      />
      <p>Enjoy building your app!</p>

    </div>
  );
}
