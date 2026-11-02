"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Use Badge for status
import { Separator } from "@/components/ui/separator"; // Use Separator for visual breaks
import { Skeleton } from "@/components/ui/skeleton"; // Use Skeleton for loading state
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Use Alert for errors
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Info,
  MessageSquare,
  User,
  Calendar,
  Clock,
  ArrowLeft,
} from "lucide-react"; // Icons

// Interface for a single remark
interface Remark {
  id: number;
  comment: string;
  user_name: string;
  created_at: string;
}

// Updated interface matching the API response structure (nested under data)
interface TicketData {
  id: number;
  ticket_number: string;
  subject: string;
  message: string;
  status: string;
  user_name: string;
  user_email: string;
  created_at: string;
  updated_at: string;
  remarks: Remark[];
}

// Interface for the overall API response which wraps the ticket data
interface ApiResponse {
  data: TicketData;
}

export default function TicketDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const ticket_number = params.ticket_number as string;
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ticket_number) {
      setLoading(false);
      setError("Ticket number not found in URL.");
      return;
    }

    const fetchTicket = async () => {
      setLoading(true);
      setError(null);
      setTicket(null); // Reset ticket on new fetch
      try {
        const response = await fetch(`/api/support/tickets/${ticket_number}`);

        if (!response.ok) {
          let errorMessage = `Failed to fetch ticket (${response.status})`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (jsonError) {
            // Ignore
          }
          // Handle specific 404 from our API route
          if (response.status === 404) {
            errorMessage = `Ticket #${ticket_number} not found.`;
          }
          throw new Error(errorMessage);
        }

        const result: ApiResponse = await response.json();

        if (!result || !result.data) {
          throw new Error("Invalid ticket data received from server.");
        }

        setTicket(result.data);
      } catch (e: any) {
        setError(
          e.message || "An unknown error occurred while fetching ticket data."
        );
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [ticket_number]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch (e) {
      return dateString;
    }
  };

  // Consistent Loading State using Skeletons
  if (loading) {
    return (
      <div className="space-y-8 p-4 md:p-6">
        <Skeleton className="h-8 w-3/4" />
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Separator />
            <Skeleton className="h-4 w-1/4 mb-2" />
            <Skeleton className="h-20 w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-1/4" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  // Consistent Error State using Alert
  if (error) {
    return (
      <div className="p-4 md:p-6">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Ticket</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  // Consistent Not Found State using Alert
  if (!ticket) {
    return (
      <div className="p-4 md:p-6">
        <Alert variant="default">
          <Info className="h-4 w-4" />
          <AlertTitle>Ticket Not Found</AlertTitle>
          <AlertDescription>
            The requested ticket could not be found or loaded.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Status Badge Component
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "open":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-300"
          >
            Open
          </Badge>
        );
      case "in_progress":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-300"
          >
            In Progress
          </Badge>
        );
      case "closed":
        return <Badge variant="secondary">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-8 p-4 md:p-6">     

      {/* Page Header - Consistent with support page */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-navy">
            Ticket Details: #{ticket.ticket_number}
          </h1>
          <p className="text-muted-foreground">
            Review the details and remarks for your support ticket.
          </p>
        </div>
        {/* Back Button - Added here */}
        <Link href="/portal/support?tab=tickets" passHref legacyBehavior>
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Support Tickets
          </Button>
        </Link>
      </div>

      {/* Ticket Details Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Subject: {ticket.subject}</span>
            {getStatusBadge(ticket.status)}
          </CardTitle>
          <CardDescription>
            Submitted by {ticket.user_name} ({ticket.user_email}) on{" "}
            {formatDate(ticket.created_at)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Separator for visual clarity */}
          <Separator />

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-1">
              Message
            </h3>
            <p className="text-base bg-gray-50 p-3 rounded border whitespace-pre-wrap">
              {ticket.message}
            </p>
          </div>

          <div className="text-sm text-muted-foreground flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>Last Updated: {formatDate(ticket.updated_at)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Remarks Section Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-navy" /> Remarks
          </CardTitle>
          <CardDescription>
            Conversation history for this ticket.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {ticket.remarks && ticket.remarks.length > 0 ? (
            <ul className="space-y-4">
              {ticket.remarks
                // Sort remarks by date, newest first if needed (adjust based on API sort order)
                // .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                .map((remark) => (
                  <li
                    key={remark.id}
                    className="p-4 bg-gray-50 rounded-md border border-gray-200 space-y-2"
                  >
                    <p className="text-gray-800">{remark.comment}</p>
                    <div className="text-sm text-muted-foreground flex items-center justify-between">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <strong>{remark.user_name}</strong>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(remark.created_at)}
                      </span>
                    </div>
                  </li>
                ))}
            </ul>
          ) : (
            <div className="text-center text-muted-foreground py-4">
              <Info className="mx-auto h-6 w-6 mb-2" />
              No remarks have been added to this ticket yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
