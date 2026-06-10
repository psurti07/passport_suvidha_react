"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Phone, Calendar, Clock, Languages } from "lucide-react";
import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import axiosServer from "@/lib/axiosServer";

const languages = ["English", "Hindi", "Gujarati"];

// ------------------ FIXED SLOTS ------------------
const fixedSlots = [
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
];

export default function ScheduleSlotPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // encrypted customer id from url
  const encryptedId = searchParams.get("id");

  const [dates, setDates] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);

  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const [selectedDate, setSelectedDate] = useState<any>(null);

  const [selectedSlot, setSelectedSlot] = useState("");

  const [loading, setLoading] = useState(false);

  const [customer, setCustomer] = useState<any>(null);

  const customerId = useMemo(() => {
    if (!encryptedId) return "";

    try {
      return decodeURIComponent(encryptedId);
    } catch {
      return encryptedId;
    }
  }, [encryptedId]);

  // ------------------ CHECK TODAY ------------------
  const isToday = (dateString: string) => {
    const today = new Date();

    const compareDate = new Date(dateString);

    return today.toDateString() === compareDate.toDateString();
  };

  // ------------------ GENERATE DATES ------------------
  const generateDates = () => {
    const tempDates = [];

    const today = new Date();

    let count = 0;
    let i = 0;

    while (count < 4) {
      const currentDate = new Date();

      currentDate.setDate(today.getDate() + i);

      const day = currentDate.getDay();

      // Skip Sunday (0) & Saturday (6)
      if (day !== 0 && day !== 6) {
        let label = "";

        const diffDays = Math.floor(
          (currentDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
        );

        if (diffDays === 0) {
          label = "Today";
        } else if (diffDays === 1) {
          label = "Tomorrow";
        } else {
          label = currentDate.toLocaleDateString("en-US", {
            weekday: "short",
          });
        }

        tempDates.push({
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

    setDates(tempDates);

    // Auto select first date
    if (tempDates.length > 0) {
      setSelectedDate(tempDates[0]);
    }
  };

  // ------------------ GENERATE SLOTS ------------------
  const generateSlots = (dateObj: any) => {
    if (!dateObj) return;

    const now = new Date();

    const availableSlots: any[] = [];

    fixedSlots.forEach((time) => {
      const [h, m] = time.split(":").map(Number);

      const slotDate = new Date(dateObj.fullDate);

      slotDate.setHours(h, m, 0, 0);

      // Skip past slots for today
      if (isToday(dateObj.fullDate) && slotDate <= now) {
        return;
      }

      // Convert to 12-hour
      const hour12 = h % 12 || 12;

      const ampm = h < 12 ? "AM" : "PM";

      const formatted = `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;

      availableSlots.push({
        label: formatted,
        value: time,
      });
    });

    setSlots(availableSlots);

    // Auto select first available slot
    if (availableSlots.length > 0) {
      setSelectedSlot(availableSlots[0].label);
    } else {
      setSelectedSlot("");
    }
  };

  // ------------------ GET CUSTOMER ------------------
  const getScheduleDetails = async () => {
    try {
      setLoading(true);

      const response = await axiosServer.get("/schedule-slot", {
        params: { id: encryptedId },
      });

      if (response.data.already_scheduled === true) {
        router.push(`/schedule-success?id=${response.data.schedule_id}`);

        return;
      }

      setCustomer(response.data.customer);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ------------------ INIT ------------------
  useEffect(() => {
    generateDates();
  }, []);

  // ------------------ DATE CHANGE ------------------
  useEffect(() => {
    if (selectedDate) {
      generateSlots(selectedDate);
    }
  }, [selectedDate]);

  // ------------------ GET CUSTOMER DETAILS ------------------
  useEffect(() => {
    if (encryptedId) {
      getScheduleDetails();
    }
  }, [encryptedId]);

  // ------------------ CONVERT TIME ------------------
  const convert24Hour = (time12h: string) => {
    const [time, modifier] = time12h.split(" ");

    let [hours, minutes] = time.split(":");

    if (hours === "12") {
      hours = "00";
    }

    if (modifier === "PM") {
      hours = (parseInt(hours, 10) + 12).toString();
    }

    return `${hours.padStart(2, "0")}:${minutes}:00`;
  };

  // ------------------ SUBMIT ------------------
  const handleSubmit = async () => {
    try {
      if (!selectedLanguage || !selectedDate || !selectedSlot) {
        alert("Please select language, date and slot");

        return;
      }

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

            {/* HERO */}
            <div className="rounded-2xl bg-muted/60 p-4 flex items-center justify-between mb-6">
              <div className="max-w-[60%]">
                <div className="inline-flex items-center rounded-lg bg-green-700 text-white text-xs px-3 py-1 font-medium mb-3">
                  FREE CALL
                </div>

                <h3 className="leading-snug text-base">
                  Get One Step Closer to Your Travel Dreams
                </h3>
              </div>

              <div className="h-24 w-24 rounded-xl bg-white shadow-sm overflow-hidden">
                <Image
                  src="/schedule-slot/img1.png"
                  alt="Passport"
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

                <h3 className="font-semibold text-base md:text-lg">
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

                <h3 className="font-semibold text-base md:text-lg">
                  Choose Date
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {dates.map((item) => (
                  <button
                    key={item.fullDate}
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

            {/* SLOTS */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-burgundy" />

                <h3 className="font-semibold text-base md:text-lg">
                  Choose Time Slot
                </h3>
              </div>

              {slots.length > 0 ? (
                <div className="grid md:grid-cols-3 grid-cols-2 gap-3">
                  {slots.map((slot) => (
                    <button
                      key={slot.value}
                      onClick={() => setSelectedSlot(slot.label)}
                      className={`h-10 rounded-xl border text-sm font-medium transition-all modern-button
                      ${
                        selectedSlot === slot.label
                          ? "bg-teal/15 border-teal/20 text-teal"
                          : "bg-background hover:bg-teal/5 hover:text-teal"
                      }`}
                    >
                      {slot.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-red-500">
                  No slots available for selected date
                </div>
              )}
            </div>

            {/* SOCIAL */}
            <div className="rounded-2xl bg-muted/50 p-5 grid grid-cols-1 md:grid-cols-2 items-center gap-3 mb-6">
              <div className="flex -space-x-3">
                <div className="h-12 w-12 rounded-full border-2 border-white overflow-hidden">
                  <Image
                    src="/schedule-slot/img2.png"
                    alt="Passport Application Process"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="h-12 w-12 rounded-full border-2 border-white overflow-hidden">
                  <Image
                    src="/schedule-slot/img3.png"
                    alt="Passport Assistance"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="h-12 w-12 rounded-full border-2 border-white overflow-hidden">
                  <Image
                    src="/schedule-slot/img4.png"
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
                  Passport Dreams Turned Into Reality — Now It’s Your Turn.
                </p>
              </div>
            </div>

            {/* BUTTON */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full h-14 bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl text-base"
            >
              {loading ? "Schedule..." : "CLAIM YOUR SPOT"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
