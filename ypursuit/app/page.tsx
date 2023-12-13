'using client';
import Image from 'next/image'
import Header from '../components/Header'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-28">
      <Header />
      <div className="overflow-hidden rounded-full border border-black p-6 transform transition-transform hover:rotate-360"
        style={{ transitionDuration: '2s' }}>
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert rounded-full"
          src="/ypursuit-logo-square-light.svg"
          alt="Next.js Logo"
          width={480}
          height={480}
          priority
        />
      </div>
    </main>
  )
}
