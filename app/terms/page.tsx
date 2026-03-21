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
  AlertCircle,
  FileCheck,
  RefreshCw,
  Scale,
} from "lucide-react";

export default function TermsCondition() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <main className="flex-1">
        <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl gradient-heading pb-4">
                Terms and Conditions
              </h1>
              {/* <p className="text-muted-foreground md:text-xl">
                How we collect, use, and protect your personal information
              </p> */}
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
                    <CardTitle>Terms and Conditions Overview</CardTitle>
                  </div>
                  {/* <CardDescription>
                    PassportSuvidha is committed to protecting your privacy and ensuring the security of your personal information.
                  </CardDescription> */}
                </CardHeader>
                <CardContent className="prose prose-slate max-w-none">
                  <p>
                    These Terms and Conditions (“Terms”) constitute a legally
                    binding agreement governing the use of services and the
                    website provided by Passport Suvidha (“Company”, “we”, or
                    “our”) by any individual or entity (“User” or “you”). By
                    accessing, using, or availing our services in any manner,
                    you acknowledge that you have read, understood, and agree to
                    be bound by these Terms. If you do not agree to these Terms,
                    you must immediately discontinue use of the services.
                  </p>
                  {/* <p>
                    We take your privacy seriously and are committed to maintaining the confidentiality and security of your personal information. This policy is designed to help you understand what information we collect, why we collect it, and how you can update, manage, and delete your information.
                  </p> */}
                  {/* <div className="bg-navy/5 p-4 rounded-lg my-6 flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-navy mt-0.5" />
                    <div>
                      <h4 className="text-navy font-medium mb-1">
                        Important Notice
                      </h4>
                      <p className="text-sm text-muted-foreground m-0">
                        PassportSuvidha processes sensitive personal information
                        as required for passport applications. This information
                        is handled with the utmost care and in compliance with
                        all applicable privacy laws and regulations.
                      </p>
                    </div>
                  </div> */}
                </CardContent>
              </Card>

              <Accordion type="single" collapsible className="w-full space-y-4">
                <AccordionItem
                  value="item-1"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Database className="h-5 w-5 text-navy flex-shrink-0" />
                      <span className="font-medium">
                        Definitions and Interpretation
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <h4 className="text-lg font-medium text-navy">
                        Services
                      </h4>
                      <p>
                        Services shall mean facilitation, consultancy, and
                        administrative assistance in relation to passport
                        applications and allied processes.{" "}
                      </p>

                      <h4 className="text-lg font-medium text-navy">User</h4>
                      <p>
                        User includes any individual acting on their own behalf
                        or on behalf of another person.
                      </p>
                      <p>
                        Headings are for convenience only and shall not affect
                        interpretation.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Eye className="h-5 w-5 text-teal flex-shrink-0" />
                      <span className="font-medium">Nature of Services</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        The Service Provider acts only as facilitation support
                        agency to assist applicants in{" "}
                      </p>
                      <ul>
                        <li>
                          Filing and submitting Passport Application forms.
                        </li>
                        <li>Document Verification Support.</li>
                        <li>Appointment booking Assistance.</li>
                        <li>
                          {" "}
                          General Guidance regarding Passport Seva Procedures.
                        </li>
                      </ul>

                      <p>
                        The Service Provider is not a government authority,
                        Passport Office, Passport Seva Kendra nor an authorized
                        issuing authority.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Globe className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">
                        No Guarantee of Passport Issuance:
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>The Service Provider does not guarantee:</p>
                      <ul>
                        <li>Approval of Passport Application.</li>
                        <li>Grant of Passport</li>
                        <li>Timely Issuance of Passport</li>
                        <li>Police Verification Clearance.</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-4"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Lock className="h-5 w-5 text-navy flex-shrink-0" />
                      <span className="font-medium">User Responsibility</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>The User Shall Provide</p>
                      <ul>
                        <li>True, Correct and Complete information.</li>
                        <li>Submit genuine, valid and lawful documents.</li>
                        <li>Ensure accuracy of personal and legal details.</li>
                        <li>
                          Attend appointments and police verification as
                          required.
                        </li>
                      </ul>

                      <p>
                        The Service Provider shall not be liable for any
                        consequences arising from false, incorrect or incomplete
                        information.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-5"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Clock className="h-5 w-5 text-teal flex-shrink-0" />
                      <span className="font-medium">
                        Nature of Relationship
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        Nothing contained herein shall be deemed to create any
                        partnership, agency, employment, or fiduciary
                        relationship between the Company and the User.
                      </p>
                      <p>
                        The Company acts solely as an independent service
                        provider.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-6"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Shield className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">
                        Scope and Limitation of Services
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        The Services are strictly limited to non-governmental
                        facilitation and advisory assistance.
                      </p>
                      <ul>
                        <li>
                          The Company does not exercise, claim, or imply any
                          statutory, regulatory, or sovereign authority.
                        </li>
                        <li>
                          The Company shall not be responsible for the final
                          outcome of any passport application.
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-7"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Shield className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">
                        Absolute User Representations and Warranties
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>The User irrevocably represents and warrants that:</p>
                      <ul>
                        <li>
                          All information and documents provided are true,
                          accurate, complete, and lawful
                        </li>
                        <li>
                          No forged, altered, or misleading documents are
                          submitted
                        </li>
                        <li>
                          The User has full legal authority to submit the
                          documents
                        </li>
                        <li>
                          The User is legally competent to enter into this
                          Agreement
                        </li>
                      </ul>
                      <p>
                        Any breach shall render these Terms voidable at the
                        Company’s sole discretion.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-8"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Shield className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">
                        User Covenants and Obligations
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <ul>
                        <li>
                          The User shall independently verify all application
                          details prior to submission.
                        </li>
                        <li>
                          The User shall comply with all applicable laws, rules,
                          and regulations.
                        </li>
                        <li>
                          The User accepts sole responsibility for the
                          consequences of incorrect or incomplete information.
                        </li>
                      </ul>
                      <p>
                        The Company shall bear no responsibility for errors
                        attributable to the User.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-9"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <FileText className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">
                        Fees, Charges, and Payment Terms
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <ul>
                        <li>
                          Fees are charged exclusively for professional services
                          rendered.
                        </li>
                        <li>
                          Government fees and statutory charges are separate and
                          payable directly or indirectly by the User.
                        </li>
                        <li>
                          All payments are non-refundable, non-transferable, and
                          non-adjustable once Services commence.
                        </li>
                        <li>
                          The Company reserves the unilateral right to revise
                          fees.
                        </li>
                      </ul>
                      <p>
                        The Company shall bear no responsibility for errors
                        attributable to the User.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-10"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <AlertCircle className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">
                        No Right of Cancellation
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        Once Services have commenced, the User shall have no
                        right to cancel, withdraw, or seek refund under any
                        circumstances whatsoever.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-11"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Clock className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">Service Timelines</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        Any timelines communicated are indicative only and shall
                        not constitute contractual commitments.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-12"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <AlertCircle className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">
                        Suspension and Termination
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        The Company may suspend or terminate Services
                        immediately, without notice or liability, if:
                      </p>
                      <ul>
                        <li>Misrepresentation or fraud is suspected</li>
                        <li>Legal or compliance risks arise</li>
                        <li>The User breaches these Terms</li>
                      </ul>
                      <p>
                        Termination shall not entitle the User to any refund or
                        compensation.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-13"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Shield className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">
                        Limitation and Exclusion of Liability
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        To the maximum extent permitted by law, the Company
                        shall not be liable for:
                      </p>
                      <ul>
                        <li>Passport rejection, delay, or non-processing</li>
                        <li>Acts or omissions of Government Authorities</li>
                        <li>Technical or system failures</li>
                        <li>
                          The Company’s aggregate liability, if any, shall be
                          strictly limited to the fees actually received.
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-14"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Shield className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">Indemnity</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        The User shall fully indemnify, defend, and hold
                        harmless the Company, its directors, employees, and
                        agents against all claims, damages, losses, penalties,
                        legal costs, and proceedings arising from:
                      </p>
                      <ul>
                        <li>False information or documents</li>
                        <li>Violation of law</li>
                        <li>Misuse of Services</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-15"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Lock className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">
                        Confidentiality and Data Handling
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <ul>
                        <li>
                          User data shall be processed solely for service
                          delivery and compliance purposes.
                        </li>
                        <li>
                          The Company shall implement reasonable security
                          measures.
                        </li>
                        <li>
                          Disclosure may occur as required by law or competent
                          authority.
                        </li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-16"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <FileCheck className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">
                        Intellectual Property Rights
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        All intellectual property, including content,
                        trademarks, logos, and materials, are the exclusive
                        property of the Company. Unauthorized use shall attract
                        civil and criminal liability.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-17"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <AlertCircle className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">Force Majeure</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        The Company shall not be liable for failure or delay due
                        to events beyond its reasonable control, including acts
                        of God, governmental actions, or system failures.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-18"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <RefreshCw className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">Waiver</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        Failure by the Company to enforce any provision shall
                        not constitute a waiver of its rights.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-19"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Scale className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">Severability</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        If any provision is held invalid or unenforceable, the
                        remaining provisions shall remain valid and enforceable.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-20"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <Database className="h-5 w-5 text-navy flex-shrink-0" />
                      <span className="font-medium">
                        Governing Law and Dispute Resolution
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <h4 className="text-lg font-medium text-navy">
                        Applicable Law
                      </h4>
                      <p>
                        These Terms and Conditions shall be governed by,
                        construed, and enforced in accordance with the laws of
                        India, without regard to conflict of law principles.
                      </p>

                      <h4 className="text-lg font-medium text-navy">
                        Jurisdiction
                      </h4>
                      <p>
                        Any disputes, controversies, or claims arising out of or
                        relating to these Terms, or the breach, termination, or
                        invalidity thereof, shall be subject to the exclusive
                        jurisdiction of the competent courts located in Surat in
                        Gujarat.
                      </p>

                      <h4 className="text-lg font-medium text-navy">
                        Dispute Resolution
                      </h4>
                      <p>
                        The parties agree to attempt amicable resolution of
                        disputes through good-faith negotiations before
                        initiating formal legal proceedings.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-21"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <RefreshCw className="h-5 w-5 text-navy flex-shrink-0" />
                      <span className="font-medium">
                        Amendments And Modifications
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <h4 className="text-lg font-medium text-navy">
                        Right to Modify
                      </h4>
                      <p>
                        The Company reserves the right to amend, modify, update,
                        or replace these Terms and Conditions at any time, with
                        or without prior notice.
                      </p>

                      <h4 className="text-lg font-medium text-navy">
                        Notification
                      </h4>
                      <p>
                        Material changes may be communicated through our website
                        or other reasonable means. However, it is the User's
                        responsibility to regularly review these Terms.
                      </p>

                      <h4 className="text-lg font-medium text-navy">
                        Continued Use
                      </h4>
                      <p>
                        Continued access to or use of our services following any
                        modifications constitutes your acceptance of the revised
                        Terms.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-22"
                  className="border rounded-xl shadow-sm overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-2 text-left">
                      <FileText className="h-5 w-5 text-burgundy flex-shrink-0" />
                      <span className="font-medium">Entire Agreement</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 pt-0">
                    <div className="prose prose-slate max-w-none">
                      <p>
                        These Terms constitute the entire agreement between the
                        parties and supersede all prior communications,
                        representations, or agreements.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

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
                      <span>7486046591</span>
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
