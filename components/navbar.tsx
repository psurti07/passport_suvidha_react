"use client"

import { FileText, Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isActive = (path: string) => {
    if (path === "/" && pathname !== "/") return false
    return pathname?.startsWith(path)
  }

  const navLinks = [
    { href: "/", label: "Home", ariaLabel: "Go to home page" },
    { href: "/services", label: "Services", ariaLabel: "View our services" },
    { href: "/requirements", label: "Requirements", ariaLabel: "Check passport requirements" },
    { href: "/locations", label: "Locations", ariaLabel: "Find passport offices" },
    { href: "/about", label: "About Us", ariaLabel: "Learn about us" }    
  ]

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "glass-nav-scrolled backdrop-blur-md bg-navy/80" 
          : "glass-nav"
      )}
    >
      <div className="container flex h-16 sm:h-20 items-center justify-between">
        <Link 
          href="/"
          className="flex items-center gap-2 sm:gap-3 transition-opacity hover:opacity-90"
          aria-label="Passport Suvidha Home"
        >
          <div className="relative">
            <Image 
              src="/logo/ps-logo-1.png"
              alt="Passport Suvidha" 
              width={180}
              height={40}
              priority
              className="h-12 w-auto sm:h-10 md:h-16"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" role="navigation" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-label={link.ariaLabel}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "text-sm font-medium transition-all duration-200 relative py-1.5",
                isActive(link.href)
                  ? "text-gold"
                  : "text-white/80 hover:text-gold"
              )}
            >
              {link.label}
              <span 
                className={cn(
                  "absolute -bottom-1.5 left-0 w-full h-0.5 bg-gradient-to-r from-gold to-gold/80 rounded-full transform origin-left transition-transform duration-200",
                  isActive(link.href) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4">
          <Button
            variant="outline"
            className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-gold rounded-full text-sm transition-all duration-200"
            asChild
          >
            <Link href="/signin" aria-label="Sign in to your account">Sign In</Link>
          </Button>
          <Button
            className="bg-gradient-to-r from-gold to-gold/80 text-navy hover:opacity-90 rounded-full modern-button text-sm transition-all duration-200 transform hover:scale-105"
            asChild
          >
            <Link href="/apply-passport" aria-label="Start passport application">Apply Now</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost" 
              className="md:hidden relative group ml-auto bg-transparent hover:bg-transparent" // Added bg-transparent
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
                <div className="flex flex-col items-center justify-center gap-1.5 transition-all duration-300">
                  <span className={cn(
                    "block h-0.5 w-5 bg-white rounded-full transform transition-all duration-300",
                    isOpen ? "rotate-45 translate-y-2" : ""
                  )} />
                  <span className={cn(
                    "block h-0.5 w-5 bg-white rounded-full transition-all duration-300",
                    isOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                  )} />
                  <span className={cn(
                    "block h-0.5 w-5 bg-white rounded-full transform transition-all duration-300",
                    isOpen ? "-rotate-45 -translate-y-2" : ""
                  )} />
                </div>
            </Button>            
          </SheetTrigger>
          <SheetContent 
            side="right" 
            className="w-full bg-navy/95 backdrop-blur-lg border-none p-6"
          >
            <SheetHeader>
              <SheetTitle className="text-white">Passport Suvidha</SheetTitle>
              <SheetDescription className="text-white/60">
                Access all pages and features
              </SheetDescription>
            </SheetHeader>
            <nav 
              className="flex flex-col space-y-4 mt-6" 
              role="navigation" 
              aria-label="Mobile navigation"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-label={link.ariaLabel}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "text-base font-medium transition-all duration-200 relative group p-2 rounded-lg",
                    isActive(link.href)
                      ? "text-gold bg-white/5"
                      : "text-white/80 hover:text-gold hover:bg-white/5"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="flex items-center">
                    {link.label}
                    {isActive(link.href) && (
                      <span className="ml-2 h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                    )}
                  </span>
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <Link 
                  href="/signin"
                  onClick={() => setIsOpen(false)}
                  aria-label="Sign in to your account"
                >
                  <Button
                    variant="outline"
                    className="w-full bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-gold rounded-full transition-all duration-200"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link 
                  href="/apply-passport"
                  onClick={() => setIsOpen(false)}
                  aria-label="Start passport application"
                >
                  <Button
                    className="w-full bg-gradient-to-r from-gold to-gold/80 text-navy hover:opacity-90 rounded-full modern-button transform hover:scale-105 transition-all duration-200"
                  >
                    Apply Now
                  </Button>
                </Link>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      {/* <div className="flex w-full">
        <div className="flag-stripe bg-navy"></div>
        <div className="flag-stripe bg-burgundy"></div>
        <div className="flag-stripe bg-gold"></div>
      </div> */}
    </header>
  )
}