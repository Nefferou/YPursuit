import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Provider from '@/components/ui/Provider'
import HeaderClassic from '@/components/HeaderClassic'
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
                <HeaderClassic />
                <Provider>
                    {children}
                </Provider>
                <Footer />
            </body>
        </html>
    )
}
