"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Phone, Calendar, Clock, Languages } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import axiosServer from "@/lib/axiosServer";
import { useRouter } from "next/navigation";

const languages = ["English", "Hindi", "Gujarati"];

const generateDates = () => {
  const dates = [];

  const today = new Date();

  let count = 0;
  let i = 0;

  while (count < 4) {
    const currentDate = new Date();

    currentDate.setDate(today.getDate() + i);

    const day = currentDate.getDay();

    // Skip Saturday (6) & Sunday (0)
    if (day !== 0 && day !== 6) {
      let label = "";

      if (count === 0) {
        label = "Today";
      } else if (count === 1) {
        label = "Tomorrow";
      } else {
        label = currentDate.toLocaleDateString("en-US", {
          weekday: "short",
        });
      }

      dates.push({
        day: label,

        date: currentDate.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
        }),

        fullDate: currentDate.toISOString().split("T")[0],
      });

      count++;
    }

    i++;
  }

  return dates;
};

const dates = generateDates();

const slots = [
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
];

export default function ScheduleSlotPage() {
  const searchParams = useSearchParams();

  // encrypted customer id from url
  const encryptedId = searchParams.get("id");

  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedSlot, setSelectedSlot] = useState("4:00 PM");

  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(null);
  const [alreadySchedule, setalreadySchedule] = useState(false);
  const [scheduleId, setScheduleId] = useState("");
  const router = useRouter();

  const customerId = useMemo(() => {
    if (!encryptedId) return "";

    try {
      return decodeURIComponent(encryptedId);
    } catch {
      return encryptedId;
    }
  }, [encryptedId]);

  const getScheduleDetails = async () => {
    try {
      setLoading(true);

      const response = await axiosServer.get("/schedule-slot", {
        params: { id: encryptedId },
      });

      if (response.data.already_scheduled === true) {
        router.push(`/schedule-success?id=${response.data.schedule_id}`);
      }

      setCustomer(response.data.customer);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (encryptedId) {
      getScheduleDetails();
    }
  }, [encryptedId]);

  const convert24Hour = (time12h) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours.toString().padStart(2, "0")}:${minutes}:00`;
  };

  const handleSubmit = async () => {
    try {
      const data = {
        customerId,
        language: selectedLanguage,
        date: selectedDate.fullDate,
        slot: convert24Hour(selectedSlot),
      };

      setLoading(true);
      const response = await axiosServer.post("/schedule-slot", data);

      if (response.data.success === true) {
        router.push(`/schedule-success?id=${response.data.schedule_id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-10 px-4">
      <div className="max-w-md mx-auto">
        {/* TOP CARD */}
        <Card className="rounded-3xl border-0 shadow-xl overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-navy to-teal" />

          <CardContent className="p-6">
            {/* HEADER */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold tracking-tight py-1">
                  Hi, {customer?.first_name} 👋
                </h1>

                <p className="text-sm text-muted-foreground mt-1 py-1">
                  Schedule your passport assistance call
                </p>
              </div>

              <div className="flex items-center md:justify-end gap-2 text-sm font-medium py-1 md:mt-6">
                <Phone className="h-4 w-4 text-teal" />
                <span>{customer?.mobile_number}</span>
              </div>
            </div>

            {/* HERO BANNER */}
            <div className="rounded-2xl bg-muted/60 p-4 flex items-center justify-between mb-6">
              <div className="max-w-[60%]">
                <div className="inline-flex items-center rounded-lg bg-green-700 text-white text-xs px-3 py-1 font-medium mb-3">
                  FREE CALL
                </div>

                <h3 className="leading-snug text-base">
                  Take the First Step to a Healthier, Happier You
                </h3>
              </div>
              <div className="h-24 w-24 rounded-xl bg-white shadow-sm overflow-hidden">
                <Image
                  src="/4.jpg"
                  alt="Passport Application Process"
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* LANGUAGE */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Languages className="h-5 w-5 text-teal" />

                <h3 className="font-semibold text-based md:text-lg">
                  Choose Preferred Language
                </h3>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                We will try to arrange your call in your preferred language
              </p>

              <div className="grid grid-cols-3 gap-3">
                {languages.map((language) => (
                  <button
                    key={language}
                    onClick={() => setSelectedLanguage(language)}
                    className={`h-10 rounded-xl border text-sm font-medium transition-all modern-button
                      ${
                        selectedLanguage === language
                          ? "bg-teal/15 border-teal/20 text-teal"
                          : "bg-background hover:bg-teal/5 hover:text-teal"
                      }`}
                  >
                    {language}
                  </button>
                ))}
              </div>
            </div>

            {/* DATE */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-navy" />

                <h3 className="font-semibold text-based md:text-lg">
                  Choose Date
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {dates.map((item) => (
                  <button
                    key={item.day}
                    onClick={() => setSelectedDate(item)}
                    className={`rounded-2xl border py-4 transition-all modern-button
                    ${
                      selectedDate?.fullDate === item.fullDate
                        ? "bg-teal/15 border-teal/20 text-teal"
                        : "bg-background hover:bg-teal/5 hover:text-teal"
                    }`}
                  >
                    <p className="font-semibold">{item.day}</p>

                    <p className="text-sm mt-1">{item.date}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* TIME SLOT */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-burgundy" />

                <h3 className="font-semibold text-based md:text-lg">
                  Choose Time Slot
                </h3>
              </div>

              <div className="grid md:grid-cols-3 gap-3 grid-cols-2">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`h-10 rounded-xl border text-sm font-medium transition-all modern-button
                    ${
                      selectedSlot === slot
                        ? "bg-teal/15 border-teal/20 text-teal"
                        : "bg-background hover:bg-teal/5 hover:text-teal"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* SOCIAL PROOF */}
            <div className="rounded-2xl bg-muted/50 p-5 grid grid-cols-1 md:grid-cols-2 items-center gap-3 mb-6">
              <div className="flex -space-x-3">
                <div className="h-12 w-12 rounded-full border-2 border-white overflow-hidden">
                  <Image
                    src="/3.jpg"
                    alt="Passport Application Process"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="h-12 w-12 rounded-full border-2 border-white overflow-hidden">
                  <Image
                    src="/4.jpg"
                    alt="Passport Assistance"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="h-12 w-12 rounded-full border-2 border-white overflow-hidden">
                  <Image
                    src="/hero.png"
                    alt="Passport Support"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div>
                <h4 className="text-2xl font-bold text-teal">5k+</h4>

                <p className="text-sm text-muted-foreground">
                  Transformations successfully delivered — Now it’s your turn.
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <Button
              onClick={handleSubmit}
              //   className="w-full h-14 rounded-2xl text-lg font-semibold bg-green-900 hover:bg-green-800"
              className="w-full h-14 bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button h-12 px-6 flex items-center gap-2 text-base md:text-md "
            >
              {loading ? "Schedule..." : <>CLAIM YOUR SPOT</>}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
