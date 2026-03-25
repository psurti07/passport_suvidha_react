import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Eye, Keyboard, MousePointer, Monitor, Volume2, MessageSquare, CheckCircle } from 'lucide-react'

export default function Accessibility() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">     
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-heading mb-4">
                Accessibility Statement
              </h1>
              <p className="text-muted-foreground md:text-xl">
                Our commitment to digital accessibility for all users
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="rounded-xl border-0 shadow-lg overflow-hidden mb-8">
                <div className="h-1 w-full bg-gradient-to-r from-navy to-teal"></div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Eye className="h-5 w-5 text-navy" />
                    <CardTitle>Our Commitment to Accessibility</CardTitle>
                  </div>
                  <CardDescription>
                    PassportSuvidha is committed to ensuring digital accessibility for people with disabilities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none">
                  <p>
                    PassportSuvidha is dedicated to providing an accessible experience for all users, including those with disabilities. We strive to ensure that our website and services comply with the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards and Section 508 of the Rehabilitation Act.
                  </p>
                  <p>
                    We believe that everyone should have equal access to passport services, regardless of ability. Our team continuously works to enhance the accessibility and usability of our digital platforms to provide an inclusive experience for all visitors.
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                <Card className="rounded-xl border-0 shadow-lg overflow-hidden h-full">
                  <div className="h-1 w-full bg-navy"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Monitor className="h-5 w-5 text-navy" />
                      <CardTitle className="text-xl">Visual Accessibility</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Our website includes features to enhance visual accessibility:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-navy mt-0.5 flex-shrink-0" />
                        <span>High contrast color schemes for better readability</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-navy mt-0.5 flex-shrink-0" />
                        <span>Resizable text that works with browser zoom functions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-navy mt-0.5 flex-shrink-0" />
                        <span>Alt text for all informative images</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-navy mt-0.5 flex-shrink-0" />
                        <span>Clear, readable fonts and adequate text spacing</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-navy mt-0.5 flex-shrink-0" />
                        <span>Focus indicators for keyboard navigation</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-0 shadow-lg overflow-hidden h-full">
                  <div className="h-1 w-full bg-teal"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Keyboard className="h-5 w-5 text-teal" />
                      <CardTitle className="text-xl">Navigation & Input</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      We've implemented features to ensure our site is navigable for all users:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-teal mt-0.5 flex-shrink-0" />
                        <span>Full keyboard accessibility for all functions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-teal mt-0.5 flex-shrink-0" />
                        <span>Skip navigation links for screen reader users</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-teal mt-0.5 flex-shrink-0" />
                        <span>Logical tab order for intuitive navigation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-teal mt-0.5 flex-shrink-0" />
                        <span>Form labels and instructions for all input fields</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-teal mt-0.5 flex-shrink-0" />
                        <span>Error identification and suggestions for correction</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-0 shadow-lg overflow-hidden h-full">
                  <div className="h-1 w-full bg-burgundy"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Volume2 className="h-5 w-5 text-burgundy" />
                      <CardTitle className="text-xl">Screen Reader Compatibility</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      Our website is optimized for screen reader technology:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-burgundy mt-0.5 flex-shrink-0" />
                        <span>ARIA landmarks for improved navigation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-burgundy mt-0.5 flex-shrink-0" />
                        <span>Descriptive link text that makes sense out of context</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-burgundy mt-0.5 flex-shrink-0" />
                        <span>Proper heading structure for logical content organization</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-burgundy mt-0.5 flex-shrink-0" />
                        <span>Accessible tables with proper headers and captions</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-burgundy mt-0.5 flex-shrink-0" />
                        <span>Compatibility with popular screen readers like JAWS, NVDA, and VoiceOver</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-0 shadow-lg overflow-hidden h-full">
                  <div className="h-1 w-full bg-gold"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <MousePointer className="h-5 w-5 text-navy" />
                      <CardTitle className="text-xl">Additional Accommodations</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                      We've implemented additional features to enhance accessibility:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-navy mt-0.5 flex-shrink-0" />
                        <span>Responsive design that works on all devices and screen sizes</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-navy mt-0.5 flex-shrink-0" />
                        <span>No content that flashes more than three times per second</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-navy mt-0.5 flex-shrink-0" />
                        <span>Sufficient time to read and interact with content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-navy mt-0.5 flex-shrink-0" />
                        <span>Alternative methods for completing time-sensitive tasks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-navy mt-0.5 flex-shrink-0" />
                        <span>Multiple ways to find information (search, navigation, site map)</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8 mb-10">
                <Card className="rounded-xl border-0 shadow-lg overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-navy to-teal"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="h-5 w-5 text-navy" />
                      <CardTitle>Accessibility Support</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      We welcome your feedback on the accessibility of the PassportSuvidha website. If you encounter any barriers or have suggestions for improvement, please contact our accessibility team:
                    </p>
                    <div className="bg-navy/5 p-4 rounded-lg space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-5 w-5 text-navy" />
                        <span>accessibility@PassportSuvidha.gov</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-5 w-5 text-navy" />
                        <span>7486046591 (Accessibility Helpline)</span>
                      </div>
                    </div>
                    <p>
                      If you need assistance with any part of our website or have specific accessibility requirements, our support team is available to help. We can provide information in alternative formats upon request.
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-0 shadow-lg overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-teal to-burgundy"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-teal" />
                      <CardTitle>Compliance Status</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      The PassportSuvidha website has been designed to comply with:
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-teal mt-0.5 flex-shrink-0" />
                        <span>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-teal mt-0.5 flex-shrink-0" />
                        <span>Section 508 of the Rehabilitation Act</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-teal mt-0.5 flex-shrink-0" />
                        <span>Americans with Disabilities Act (ADA)</span>
                      </li>
                    </ul>
                    <p>
                      Our website undergoes regular accessibility audits and testing by both automated tools and manual testers, including users with disabilities. While we strive for perfect compliance, we recognize that some content may not be fully accessible. We are committed to addressing these issues as quickly as possible.
                    </p>
                  </CardContent>
                </Card>

                <Card className="rounded-xl border-0 shadow-lg overflow-hidden">
                  <div className="h-1 w-full bg-gradient-to-r from-gold to-navy"></div>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="h-5 w-5 text-navy" />
                      <CardTitle>Customizing Your Experience</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>
                      Most browsers provide built-in features that can enhance your browsing experience:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <h3 className="font-medium text-navy">Zoom</h3>
                        <p className="text-sm text-muted-foreground">
                          To increase text size, press <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl</kbd> + <kbd className="px-2 py-1 bg-muted rounded text-xs">+</kbd> (Windows/Linux) or <kbd className="px-2 py-1 bg-muted rounded text-xs">Command</kbd> + <kbd className="px-2 py-1 bg-muted rounded text-xs">+</kbd> (Mac)
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium text-navy">Keyboard Navigation</h3>
                        <p className="text-sm text-muted-foreground">
                          Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Tab</kbd> to navigate between elements and <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter</kbd> to activate links and buttons
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium text-navy">Screen Readers</h3>
                        <p className="text-sm text-muted-foreground">
                          Our site works with screen readers like JAWS, NVDA (Windows), VoiceOver (Mac/iOS), and TalkBack (Android)
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-medium text-navy">Browser Extensions</h3>
                        <p className="text-sm text-muted-foreground">
                          Consider accessibility extensions like Dark Reader, Readability, or Text-to-Speech tools
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-navy/5 rounded-xl p-6 border border-navy/10 mb-8">
                <h3 className="text-xl font-medium text-navy mb-4">Continuous Improvement</h3>
                <p className="text-muted-foreground mb-4">
                  PassportSuvidha is committed to ongoing accessibility improvements. Our approach includes:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-navy mt-0.5 flex-shrink-0" />
                    <span>Regular accessibility audits and testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-navy mt-0.5 flex-shrink-0" />
                    <span>Staff training on digital accessibility best practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-navy mt-0.5 flex-shrink-0" />
                    <span>Incorporating accessibility from the beginning of design and development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-navy mt-0.5 flex-shrink-0" />
                    <span>Engaging with users who have disabilities for feedback and testing</span>
                  </li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  This accessibility statement was last updated on March 27, 2025 and will be reviewed and updated regularly as our website evolves.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function Mail({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function Phone({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function Settings({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}