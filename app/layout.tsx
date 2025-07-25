import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"
import Script from "next/dist/client/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  metadataBase: new URL('https://motionpixindia.com'),
  title: {
    
    default: 'Motionpix | 3D Visuals & AR Experiences',
    template: '%s | Motionpix',
  },
  description:
    'Motionpix blends creativity and technology to craft cinematic 3D visuals, immersive animations, and AR/VR experiences for modern industries. Based in Pune, India.',
  keywords: [
    'MotionpixIndia', 'Motionpix India Pvt Ltd', 'Motionpix Studio', 'Motionpix',
    '3D animation company in Pune', '3D animation studio in Pune',
    '3D animation services India', 'motion graphics Pune', 'industrial animation',
    'AR/VR experiences', 'immersive visualizations', 'interactive training visuals',
    'digital SOP animations', 'plant walkthroughs', '3D plant simulations',
    'AR/VR for industry', 'visual effects India', 'video production company Pune',
    'virtual plant tours', 'interactive industrial presentations', 'E-learning visuals',
  ],
  openGraph: {
    title: 'Motionpix | 3D Visuals & AR Experiences',
    description:
      'Cinematic visuals, immersive animations, and AR-powered storytelling — crafted for industrial excellence.',
    url: 'https://motionpixindia.com',
    siteName: 'Motionpix',
    images: [
      {
        url: 'https://motionpixindia.com/Banner.png', // 👈 Absolute URL preferred for OG
        width: 1200,
        height: 630,
        alt: 'Motionpix Visuals Banner',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motionpix | 3D Visuals & AR Experiences',
    description:
      'Cinematic visuals, immersive animations, and AR-powered storytelling — crafted by Motionpix.',
    images: ['https://motionpixindia.com/Banner.png'],
    creator: '@motionpix', // 👈 Optional if you have a Twitter handle
  },
  icons: {
    icon: '/Logo.png',                 
    shortcut: '/Logo.png',           
    apple: '/Logo.png',      
    other: [
      { rel: 'icon', url: '/Logo.png' },
      { rel: 'apple-touch-icon', url: '/Logo.png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
other: {
  'geo.placename': 'Pune',
  'geo.position': '18.5204;73.8567',
  'ICBM': '18.5204, 73.8567',
  'geo.region': 'IN-MH',
  'language': 'English',
},
};

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'AnimationStudio',
  name: 'Motionpix India',
  url: 'https://motionpixindia.com',
  logo: 'https://motionpixindia.com/logo-schema.png',
  foundingDate: '2017',
  founder: {
    '@type': 'Person',
    name: 'Founder Name'
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: '54/A, Rakshalekha Society,Dhanakawadi',
    addressLocality: 'Pune',
    postalCode: '411043',
    addressCountry: 'IN'
  },
  serviceArea: ['India', 'Middle East', 'Global'],
  knowsAbout: [
    '3D Industrial Animation',
    'Augmented Reality',
    'Manufacturing Visualizations'
  ],
  sameAs: [
    'https://www.linkedin.com/in/motionpix-india-615579375/',
    'https://twitter.com/MotionpixIndia'
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
/>

      </head>
      <body className={inter.className}>
        <Suspense
          fallback={
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                <h2 className="text-xl font-semibold mb-2">LOADING MOTIONPIX</h2>
                <p className="text-white/60">Preparing your Motionpix experience...</p>
              </div>
            </div>
          }
        >
          {children}
        </Suspense>
      </body>
    </html>
  )
}
