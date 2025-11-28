import { Inter, MuseoModerno } from 'next/font/google'
import './globals.css'
import type { Metadata } from 'next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const museoModerno = MuseoModerno({
  subsets: ['latin'],
  variable: '--font-museo',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vanlab - Artisan No Code & Low Code Software Developer',
  description: 'Vanlab is a premium software developer agency specializing in artisan no-code and low-code solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${museoModerno.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter)' }}>
        {children}
      </body>
    </html>
  )
}
