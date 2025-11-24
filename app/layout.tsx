import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'Simple weather app with city search',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className="bg-gradient-to-br from-blue-400 to-blue-600 min-h-screen">
        {children}
      </body>
    </html>
  )
}
