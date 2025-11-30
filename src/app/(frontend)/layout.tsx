import './globals.css'
import ThemeWrapper from '@/components/theme-wrapper'
import { Montserrat } from 'next/font/google'
import CustomCursor from '@/components/cursor'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-montserrat',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={montserrat.variable}>
      <head />
      <body className={montserrat.className}>
        <CustomCursor />
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  )
}
