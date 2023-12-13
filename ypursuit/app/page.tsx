'using client';
import Image from 'next/image'
import Header from '../components/Header'
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-r from-blue-500 to-teal-400 p-28">
      <Header />
      <div className="overflow-hidden rounded-full border border-black p-3 transform transition-transform hover:rotate-360"
        style={{ transitionDuration: '2s' }}>
          <Link href="login">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert rounded-full"
          src="/ypursuit-logo-square-light.svg"
          alt="Next.js Logo"
          width={480}
          height={480}
          priority
        />
        </Link>
      </div>
    </main>
  )
}
