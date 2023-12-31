import './globals.css'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Weather Channel',
  description: 'An Ai intergrated weather application!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
