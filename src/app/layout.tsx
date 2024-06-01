import Providers from '@/utils/Providers'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import AuthHandler from '@/components/AuthHandler'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'VAC TRACKER',
  description:
    'VAC TRACKER is an app for tracking suspects and cheaters VAC/ban status in Counter-Strike: Global Offensive'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
          <AuthHandler />
        </Providers>
      </body>
    </html>
  )
}
