import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/Navbar'
import Provider from '@/components/ui/Provider'
import Footer from '@/components/Footer'

const inter = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YPursuit - Title',
  description: 'YPursuit - Description',
  keywords: [
    'Ynov',
    'jeu'
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          {children}
        </Provider>
        <Footer />
      </body>
    </html>
  )
}
