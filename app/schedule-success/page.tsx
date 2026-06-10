"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import axiosServer from "@/lib/axiosServer";

export default function ScheduleSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [scheduleDetailes, setScheduleDetailes] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);

  const encryptedId = searchParams.get("id");

  const getScheduleSuccess = async () => {
    try {
      setLoading(true);

      const response = await axiosServer.get("/schedule-success", {
        params: {
          id: encryptedId,
        },
      });

      setScheduleId(response.data.schedule_id);
      setScheduleDetailes(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (encryptedId) {
      getScheduleSuccess();
    }
  }, [encryptedId]);

  const formattedDate = scheduleDetailes?.date
    ? new Date(scheduleDetailes?.date).toLocaleDateString("en-GB")
    : "";

  const formattedTime = (time24) => {
    if (!time24) return "";

    const [hours, minutes] = time24.split(":");

    const date = new Date();

    date.setHours(hours);
    date.setMinutes(minutes);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const selectedDate = formattedDate;
  const selectedTime = scheduleDetailes?.time;

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axiosServer.get("/schedule-cancel", {
        params: {
          id: scheduleId,
        },
      });

      if (response.data.success === true) {
        router.push(`/schedule-slot?id=${response.data.customer_id}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [1, 2, 3, 4, 5];

  const [current, setCurrent] = useState(0);

  const slides = [
    {
      image: "/schedule-slot/img12.png",
      title: "Passport Experts,\njust a click away!",
    },
    {
      image: "/schedule-slot/img12.png",
      title: "Fast & Secure\nPassport Assistance",
    },
    {
      image: "/schedule-slot/img12.png",
      title: "Trusted by\nThousands of Applicants",
    },
    {
      image: "/schedule-slot/img12.png",
      title: "Hassle-Free\nDocumentation Support",
    },
    {
      image: "/schedule-slot/img12.png",
      title: "Book Your Slot\nIn Minutes",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-muted/30 px-4 py-10 flex items-center justify-center">
      <Card className="w-full max-w-md rounded-3xl border-0 shadow-xl overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-navy to-teal" />

        <CardContent className="p-6 text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle2 className="h-9 w-9 text-green-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2">Congratulations! 🎉</h1>

          <p className="text-lg font-medium text-teal mb-2">
            Your Slot Is Confirmed!
          </p>

          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto mb-6">
            Our passport expert will connect with you at your preferred time to
            assist with your passport process.
          </p>

          <div className="flex items-center justify-center gap-6 mb-6 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4 text-teal" />

              <span>{selectedDate}</span>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium">
              <Clock className="h-4 w-4 text-teal" />

              <span>{formattedTime(selectedTime)}</span>
            </div>
          </div>

          <Button
            variant="outline"
            // onClick={() => router.push(`/schedule-slot?id=${encryptedId}`)}
            onClick={handleSubmit}
            className="rounded-xl px-8 modern-button hover:bg-gradient-to-r hover:from-navy hover:to-teal hover:text-white"
          >
            Reschedule
          </Button>

          <div className="relative overflow-visible">
            <div className="mb-10">
              <div>
                <div className="relative w-full flex flex-col items-center overflow-hidden">
                  <div className="relative w-full flex flex-col items-center mt-4">
                    <div className="relative w-full h-[320px] flex items-center justify-center overflow-hidden">
                      {cards.map((_, index) => {
                        const diff =
                          (index - current + cards.length) % cards.length;

                        let style = "";

                        if (diff === 0) {
                          style =
                            "translate-x-0 scale-100 opacity-100 z-50 rotate-0";
                        } else if (diff === 1) {
                          style =
                            "translate-x-[105px] scale-[0.88] opacity-40 z-40 rotate-[6deg]";
                        } else if (diff === cards.length - 1) {
                          style =
                            "-translate-x-[105px] scale-[0.88] opacity-40 z-40 -rotate-[6deg]";
                        } else if (diff === 2) {
                          style =
                            "translate-x-[180px] scale-[0.72] opacity-0 z-20 rotate-[10deg]";
                        } else if (diff === cards.length - 2) {
                          style =
                            "-translate-x-[180px] scale-[0.72] opacity-0 z-20 -rotate-[10deg]";
                        }

                        return (
                          <div
                            key={index}
                            className={`absolute transition-all duration-700 ease-out ${style}`}
                          >
                            <div className="relative w-[190px] h-[270px] rounded-[25px] overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.20)] bg-gradient-to-r from-navy to-teal">
                              {/* <div className="h-2 w-[190px] bg-gradient-to-r from-navy to-teal" /> */}

                              <Image
                                src="/schedule-slot/img12.png"
                                alt="Passport Assistance"
                                fill
                                className="object-cover mt-1"
                                priority
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* DOTS */}
                    <div className="flex items-center gap-2 mt-5">
                      {slides.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrent(index)}
                          className={`rounded-full transition-all duration-300 bg-gradient-to-r from-navy to-teal hover:opacity-90 modern-button ${
                            current === index ? "w-7 h-2" : "w-2 h-2"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-teal mb-1">
              Trusted by 2L+ Applicants
            </h3>

            <p className="text-lg font-semibold">
              for passport assistance — Your Turn Now!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
