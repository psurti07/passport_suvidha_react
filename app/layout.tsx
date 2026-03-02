import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster as SonnerToaster } from "sonner"

import ScrollProgress from "@/components/ui/top-scroll"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PassportSuvidha - Passport Application Services",
  description: "Streamline your passport application process with PassportSuvidha. Fast, reliable, and professional passport services.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollProgress />
        {children}
        <SonnerToaster richColors position="top-right" />
      </body>
    </html>
  )
}


import './globals.css'