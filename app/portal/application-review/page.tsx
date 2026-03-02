"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FileText, ExternalLink, Download, Eye, Check, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";

interface ApplicationSummary {
  file_name: string;
  upload_date: string;
  is_approved: boolean;
  approved_date: string | null;
  customer_details: {
    name: string;
    date_of_birth: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
  };
}

export default function ApplicationReviewPage() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [showPreviewDialog, setShowPreviewDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<ApplicationSummary | null>(null);
  const [hasViewedApplication, setHasViewedApplication] = useState(false);

  const router = useRouter();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  // Fetch application summary on component mount
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/application-review/summary');
        setSummary(response.data.data);
        setIsVerified(response.data.data.is_approved);
      } catch (error) {        
        if (axios.isAxiosError(error) && error.response?.status === 404) {          
          router.push('/portal');
          return;
        }
        toast.error("Failed to fetch application summary");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, [router]);

  const handlePreview = async () => {
    try {
      const response = await axios.get('/api/application-review/preview', {
        responseType: 'blob'
      });
      
      // Create a blob URL for the PDF
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Open the PDF in a new window
      window.open(url, '_blank');
      setHasViewedApplication(true);
    } catch (error) {
      console.error('Error previewing application:', error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        toast.error("Application not found");
        router.push('/portal/dashboard');
        return;
      }
      toast.error("Failed to preview application");
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get('/api/application-review/download', {
        responseType: 'blob'
      });
      
      // Create a blob URL for the PDF
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Application_Summary.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      setHasViewedApplication(true);
    } catch (error) {
      console.error('Error downloading application:', error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        toast.error("Application not found");
        router.push('/portal/dashboard');
        return;
      }
      toast.error("Failed to download application");
    }
  };

  const handleVerify = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/application-review/verify', {
        is_verified: true
      });
      
      setIsVerified(true);
      toast.success("Application verified successfully");
    } catch (error) {
      console.error('Error verifying application:', error);
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        toast.error("Application not found");
        router.push('/portal/dashboard');
        return;
      }
      toast.error("Failed to verify application");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight text-navy">Application Review</h1>
        <p className="text-muted-foreground">Please review your passport application details for accuracy</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        <motion.div variants={itemVariants}>
          {/* Application PDF Section */}
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-3">                
                <div>
                  <CardTitle>Application Summary</CardTitle>
                  <CardDescription>Review your application details before proceeding</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 rounded-lg border border-border bg-muted/50">
                  <div className="flex items-center gap-4 mb-4 sm:mb-0">
                    <div className="rounded-full bg-navy/10 p-3">
                      <FileText className="h-6 w-6 text-navy" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-navy">
                        {summary?.file_name || 'Application_Summary.pdf'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Contains all your provided information for passport application
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 sm:flex-initial border-navy/20 hover:bg-navy/5"
                      onClick={handlePreview}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Eye className="h-4 w-4 mr-2" />
                      )}
                      Preview
                    </Button>
                    <Button
                      variant="outline"
                      size="sm" 
                      className="flex-1 sm:flex-initial border-navy/20 hover:bg-navy/5"
                      onClick={handleDownload}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4 mr-2" />
                      )}
                      Download
                    </Button>
                  </div>
                </div>

                {isVerified && (
                  <div className="flex flex-col gap-2 px-4 py-3 bg-green-50 text-green-700 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5" />
                      <p className="text-sm font-medium">You have verified your application details</p>
                    </div>
                    {summary?.approved_date && (
                      <p className="text-sm pl-7">
                        Verified on: {new Date(summary.approved_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <h4 className="font-medium text-amber-800 mb-2">Important Instructions</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    <li className="text-sm text-amber-700">
                      Please review all your personal details carefully in the application summary
                    </li>
                    <li className="text-sm text-amber-700">
                      Ensure your name, date of birth, and address are exactly as per your documents
                    </li>
                    <li className="text-sm text-amber-700">
                      Any discrepancy may lead to delays or rejection of your passport application
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Verification Declaration Section - Only show if not verified and data is loaded */}
          {!isLoading && !isVerified && (
            <Card className="overflow-hidden mt-6">
              <CardHeader>
                <div className="flex items-center gap-3">                
                  <div>
                    <CardTitle>Verification Declaration</CardTitle>
                    <CardDescription>Confirm the accuracy of your application details</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => {
                        if (checked && !hasViewedApplication) {
                          toast.error("Please preview or download the application before verifying");
                          return;
                        }
                        setTermsAccepted(checked as boolean);
                      }}
                      className="mt-1 border-navy/20 data-[state=checked]:bg-teal data-[state=checked]:border-teal"
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-navy"
                      >
                        I confirm that I have reviewed the application summary and all information is correct
                      </label>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="link" className="p-0 h-auto text-teal hover:text-teal/90">
                            View Full Declaration
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-white border-gray-200">
                          <DialogHeader>
                            <DialogTitle className="text-navy">Verification Declaration</DialogTitle>
                          </DialogHeader>
                          <div className="max-h-[60vh] overflow-y-auto space-y-4">
                            <p className="text-sm text-muted-foreground">
                              By proceeding with the verification, I confirm that:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
                              <li>I have thoroughly reviewed the application summary PDF</li>
                              <li>All personal details in the application are accurate and match my documents</li>
                              <li>I understand that this verification is final and cannot be changed after submission</li>
                              <li>I am aware that any false information may result in application rejection</li>
                              <li>I am submitting this verification of my own free will</li>
                            </ul>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4 pt-4">                  
                    <Button 
                      className="rounded-xl bg-gradient-to-r from-navy to-teal text-white hover:opacity-90"
                      disabled={!termsAccepted || isVerified || isLoading || !hasViewedApplication}
                      onClick={handleVerify}
                    >
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : null}
                      Verify
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
} 