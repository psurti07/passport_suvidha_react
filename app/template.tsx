'use client'

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { usePathname } from 'next/navigation'

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // List of paths where we don't want to show navbar and footer
  const noNavbarPaths = ['/signin', '/apply-passport', '/test', '/test-apply-passport']
  
  // Check if path starts with /portal
  if (noNavbarPaths.includes(pathname) || pathname.startsWith('/portal')) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
} 