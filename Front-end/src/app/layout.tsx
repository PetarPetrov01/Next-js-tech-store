import type { Metadata } from 'next'

import './styles/globals.css'
import 'swiper/css'

import { Playfair_Display, PT_Serif, Source_Sans_3 } from 'next/font/google'

import { AuthProvider } from '@/contexts/AuthProvider'

import Footer from './components/ui/footer'
import Header from './components/ui/header'

export const ptSerif = PT_Serif({ weight: ['400'], subsets: ['latin'] })
export const sourseSans = Source_Sans_3({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-source-sans',
})
export const playfairDisplay = Playfair_Display({
  weight: ['400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-playfair-display',
})

export const metadata: Metadata = {
  title: {
    template: '%s | Tech Store',
    default: 'Tech Store',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourseSans.className} ${playfairDisplay.variable} ${sourseSans.variable} flex flex-col min-h-[100vh]`}
      >
        <AuthProvider>
          <Header />
          <main className="bg-new-darkblue flex-1 flex justify-center">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
