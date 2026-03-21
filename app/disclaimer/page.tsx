import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  FileText,
  Shield,
  Lock,
  Eye,
  Database,
  Globe,
  Clock,
  AlertTriangle,
} from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-heading pb-4">
                Disclaimer
              </h1>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Last Updated: March 21, 2026</span>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="rounded-xl border-0 shadow-lg overflow-hidden mb-8">
                <div className="h-1 w-full bg-gradient-to-r from-navy to-teal"></div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-5 w-5 text-navy" />
                    <CardTitle>Disclaimer Overview</CardTitle>
                  </div>
                  
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none">
                  <p>
                    This Disclaimer governs the access to and use of the website
                    operated under the name Passport Suvidha (“Website”). By
                    accessing, browsing, or using this Website or any services
                    made available herein, you expressly acknowledge that you
                    have read, understood, and agreed to be legally bound by the
                    terms of this Disclaimer.
                  </p>
                  <br/>
                  <p>
                    Passport Suvidha is a private, independent, non-governmental
                    consultancy and facilitation service provider. This Website
                    is not a government website and is not affiliated with,
                    authorized by, endorsed by, sponsored by, accredited by, or
                    connected in any manner whatsoever with the Government of
                    India, the Ministry of External Affairs (MEA), the Passport
                    Seva Kendra (PSK), the official Passport Seva Portal, or any
                    other governmental authority, department, statutory body, or
                    instrumentality. Nothing contained on this Website shall be
                    construed as constituting or implying any governmental
                    authority, representation, or official status.
                  </p>
                  <br/>
                  <p>
                    The services offered by Passport Suvidha are purely
                    informational, advisory, clerical, and facilitative in
                    nature. Such services may include general procedural
                    guidance relating to passport applications, assistance in
                    completing application forms strictly on the basis of
                    information provided by users, document checklist guidance,
                    and informational assistance relating to appointment
                    scheduling or publicly available application status.
                    Passport Suvidha does not issue passports, submit
                    applications to any government authority, conduct or
                    influence police verification, access confidential
                    government databases, exercise any statutory,
                    quasi-judicial, or decision-making authority, or provide any
                    assurance, warranty, or guarantee regarding passport
                    approval, issuance, Tatkal acceptance, processing timelines,
                    or outcomes.
                  </p>
                  <br/>
                  <p>
                    All matters relating to passport application submission,
                    scrutiny, verification, police verification, approval,
                    rejection, issuance, renewal, cancellation, and delivery are
                    carried out exclusively by the Government of India through
                    its authorized agencies and the official Passport Seva
                    system. Users bear sole and absolute responsibility for
                    final submission of applications through official government
                    portals and for compliance with all applicable laws, rules,
                    procedures, conditions, and governmental requirements.
                  </p>
                  <br/>
                  <p>
                    Any fees charged by Passport Suvidha constitute
                    consideration solely for professional consultancy and
                    facilitation services rendered. Statutory passport fees and
                    other government charges prescribed by the Government of
                    India are separate, mandatory, and payable directly to the
                    Government through official channels. Payment of Passport
                    Suvidha’s service fees does not confer any entitlement to
                    approval, issuance, priority, or expedited processing. Upon
                    initiation of services, all fees shall be non-refundable,
                    irrespective of application outcome, delay, rejection,
                    withdrawal, or any change in governmental policy or
                    procedure.
                  </p>
                  <br/>
                  <p>
                    While reasonable efforts are undertaken to ensure that
                    information made available on this Website is accurate and
                    current, passport laws, regulations, procedures,
                    documentation requirements, eligibility criteria, and fee
                    structures are subject to change at any time by competent
                    authorities without prior notice. Passport Suvidha expressly
                    disclaims any liability for inaccuracies, errors, omissions,
                    outdated information, or consequences arising from such
                    regulatory or procedural changes.
                  </p>
                  <br/>
                  <p>
                    To the fullest extent permitted under applicable law,
                    Passport Suvidha shall not be liable for any direct,
                    indirect, incidental, consequential, special, or punitive
                    losses or damages arising out of or in connection with the
                    use of this Website or services, including but not limited
                    to application rejection, delay, suspension, or
                    non-processing; changes in governmental rules, policies,
                    procedures, or fees; technical failures, downtime, or system
                    issues affecting government or third-party portals;
                    incorrect, incomplete, false, or misleading information
                    provided by users; or acts or omissions of governmental
                    authorities or third parties. Use of this Website and its
                    services is undertaken entirely at the user’s own risk and
                    discretion.
                  </p>
                  <br/>
                  <p>
                    This Website may contain links or references to third-party
                    or government websites for informational convenience only.
                    Passport Suvidha does not exercise control over, endorse, or
                    assume responsibility for the content, accuracy,
                    availability, privacy practices, or policies of such
                    external websites. Nothing contained herein shall be deemed
                    to create any agency, partnership, joint venture,
                    employment, fiduciary, or representative relationship
                    between Passport Suvidha and any user.
                  </p>
                  <br/>
                  <p>
                    Passport Suvidha shall not be held liable for any failure or
                    delay in the performance of its obligations arising from
                    events beyond its reasonable control, including but not
                    limited to acts of God, natural disasters, governmental
                    actions, changes in law, technical failures, system outages,
                    or other force majeure events.
                  </p>
                  <br/>
                  <p>
                    If any provision of this Disclaimer is determined by a court
                    of competent jurisdiction to be invalid, unlawful, or
                    unenforceable, such provision shall be severed, and the
                    remaining provisions shall remain valid, binding, and
                    enforceable to the fullest extent permitted by law.
                  </p>
                  <br/>
                  <p>
                    Passport Suvidha reserves the right to modify, amend, or
                    update this Disclaimer at any time without prior notice.
                    Continued access to or use of the Website following any such
                    modification shall constitute deemed acceptance of the
                    revised Disclaimer.
                  </p>
                  <br/>
                  <p>
                    By accessing, browsing, or using this Website, you expressly
                    confirm your informed consent to this Disclaimer and
                    irrevocably agree to be legally bound by its terms. This
                    Disclaimer shall be governed by and construed in accordance
                    with the laws of India, and all disputes arising out of or
                    relating to this Disclaimer or the use of the Website shall
                    be subject to the exclusive jurisdiction of the courts of
                    Surat.
                  </p>
                  <br/>
                </CardContent>
              </Card>


              <div className="mt-10 space-y-6">
                <div className="bg-navy/5 rounded-xl p-6 border border-navy/10">
                  <h3 className="text-xl font-medium text-navy mb-4">
                    Contact Us
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    If you have any questions, concerns, or requests regarding
                    this Privacy Policy or our data practices, please contact
                    our Data Protection Officer:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-navy" />
                      <span>support@passportsuvidha.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-5 w-5 text-navy" />
                      <span>7486046591 (Privacy Office)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-navy mt-0.5" />
                      <div>
                        <h4 className="font-medium text-teal">Main Office</h4>
                        <p className="text-muted-foreground">
                          Second Floor, Shop No. 227,
                        </p>
                        <p className="text-muted-foreground">Unique Square,</p>
                        <p className="text-muted-foreground">
                          Opposite Shubham K Mart,
                        </p>
                        <p className="text-muted-foreground">
                          Singanpore Road, Singanpore,
                        </p>
                        <p className="text-muted-foreground">
                          Surat, Gujarat - 395004
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className="bg-teal/5 rounded-xl p-6 border border-teal/10">
                  <h3 className="text-xl font-medium text-teal mb-4">Changes to This Privacy Policy</h3>
                  <p className="text-muted-foreground">
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date. We encourage you to review this policy periodically to stay informed about how we protect your personal information.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
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
  );
}

function MapPin({ className }: { className?: string }) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
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
  );
}
