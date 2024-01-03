import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/ui/Layout/Navbar'
import Provider from '@/components/ui/Layout/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'YPursuit - Description',
  description: 'A jeu de ...',
  keywords: [
    'YNov',
    'jeu'
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  )
}
