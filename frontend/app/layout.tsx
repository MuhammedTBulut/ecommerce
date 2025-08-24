import type { Metadata } from 'next'
import './globals.css'
import { MainLayout } from '@/components/layout/main-layout'

export const metadata: Metadata = {
  title: 'Modern E-Commerce',
  description: 'A modern e-commerce application built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  )
}