'use client'

import React from 'react'
import Link from "next/link"
import { Search, MapPin, Home, FileQuestion, Phone, ArrowRight, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <main className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header with warning icon */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-900 p-8 flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-yellow-400 animate-pulse opacity-75"></div>
                <div className="relative bg-white rounded-full p-5">
                  <AlertTriangle size={64} className="text-red-600" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-blue-900">404 - Page Not Found</h1>

              <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl mx-auto">
                We're sorry, but the page you're looking for doesn't exist or has been moved. Let us help you find your
                way back.
              </p>              

              {/* Quick links */}
              <h2 className="text-xl font-semibold text-blue-900 mb-6 text-center">Popular Destinations</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                <Link href="/" className="group">
                  <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 group-hover:bg-blue-200 transition-all">
                      <Home className="h-5 w-5 text-blue-700" />
                    </div>
                    <span className="text-gray-700 group-hover:text-blue-700 transition-all">Home Page</span>
                  </div>
                </Link>

                <Link href="/apply-passport" className="group">
                  <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 group-hover:bg-blue-200 transition-all">
                      <ArrowRight className="h-5 w-5 text-blue-700" />
                    </div>
                    <span className="text-gray-700 group-hover:text-blue-700 transition-all">Apply for Passport</span>
                  </div>
                </Link>

                <Link href="/status" className="group">
                  <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 group-hover:bg-blue-200 transition-all">
                      <FileQuestion className="h-5 w-5 text-blue-700" />
                    </div>
                    <span className="text-gray-700 group-hover:text-blue-700 transition-all">Check Status</span>
                  </div>
                </Link>

                <Link href="/locations" className="group">
                  <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 group-hover:bg-blue-200 transition-all">
                      <MapPin className="h-5 w-5 text-blue-700" />
                    </div>
                    <span className="text-gray-700 group-hover:text-blue-700 transition-all">Office Locations</span>
                  </div>
                </Link>

                <Link href="/faq" className="group">
                  <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 group-hover:bg-blue-200 transition-all">
                      <FileQuestion className="h-5 w-5 text-blue-700" />
                    </div>
                    <span className="text-gray-700 group-hover:text-blue-700 transition-all">FAQ</span>
                  </div>
                </Link>

                <Link href="/contact" className="group">
                  <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all">
                    <div className="bg-blue-100 p-2 rounded-full mr-3 group-hover:bg-blue-200 transition-all">
                      <Phone className="h-5 w-5 text-blue-700" />
                    </div>
                    <span className="text-gray-700 group-hover:text-blue-700 transition-all">Contact Support</span>
                  </div>
                </Link>
              </div>

              {/* Site map link */}
              <div className="text-center">
                <p className="text-gray-600 mb-4">Looking for something specific?</p>
                <Link href="/site-map" className="inline-flex items-center text-blue-700 hover:text-blue-800 font-medium">
                  View our complete site map
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-gray-500">
            <p>
              If you believe this is an error, please contact our{" "}
              <Link href="/contact" className="text-blue-600 hover:underline">
                support team
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  )
} 