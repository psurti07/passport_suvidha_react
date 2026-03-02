"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { notFound } from "next/navigation"

interface NavigationWrapperProps {
  children: ReactNode
}

export default function NavigationWrapper({ children }: NavigationWrapperProps) {
  const pathname = usePathname()
  
  // List of valid paths in your application
  const validPaths = [
    '/',
    '/services',
    '/requirements',
    '/locations',
    '/about-us',
    '/contact',
    '/signin',
    '/signup',
    '/apply-passport',
    '/status',
    '/faq',
    '/site-map'
  ]

  // If the path is not in our valid paths list, show the 404 page
  if (!validPaths.includes(pathname)) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
} 