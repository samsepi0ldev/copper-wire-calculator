import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Script from 'next/script'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  authors: [{ name: 'Elivelton Santos' }],
  description:
    'Calculadora gratuita de fios de cobre: converta AWG para mm, calcule peso por metro, custo total e muito mais. Ferramenta profissional para eletricistas e engenheiros.',
  icons: {
    icon: '/ic_launcher.png',
  },
  keywords: [
    'calculadora fio cobre',
    'awg para mm',
    'peso fio cobre',
    'calculadora eletricista',
    'bitola fio cobre',
  ],
  openGraph: {
    description:
      'Calcule rapidamente o custo e as conversões de fios de cobre com base no diâmetro, quantidade e preço unitário.',
    title: 'Calculadora de Fios de Cobre',
    type: 'website',
  },
  title: 'Calculadora de Fios de Cobre — AWG, Peso, Custo',
}

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      lang="en"
    >
      <body className="bg-sidebar">
        {children}
        <Script
          async
          crossOrigin="anonymous"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8400309603550897"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
