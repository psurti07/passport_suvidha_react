"use client";

import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface FeeData {
  service_gov_amount: number;
  service_charges: number;
  service_gst: number;
  service_total_amount: number;
}

interface FormData {
  applicationType: string;
  serviceType: string;
  ageGroup: string;
  bookletPages: string;
  validity: string;
  scheme: string;
}

const feeConfig = {
  "18_above": {
    "36": { NP: 1500, TP: 3500 },
    "60": { NP: 2000, TP: 4000 },
  },

  "15_18": {
    "5_year": {
      NP: 1000,
      TP: 3000,
    },

    till_18: {
      "36": { NP: 1500, TP: 3500 },
      "60": { NP: 2000, TP: 4000 },
    },
  },

  below_15: {
    NP: 1000,
    TP: 3000,
  },
} as const;

const ageOptions = [
  { value: "18_above", label: "18 Years & Above" },
  { value: "15_18", label: "15–18 Years" },
  { value: "below_15", label: "Below 15 Years" },
];

const bookletOptions = [
  { value: "36", label: "36 Pages" },
  { value: "60", label: "60 Pages" },
];

const validityOptions = [
  {
    value: "5_year",
    label: "5 Years Validity / Till Age 18",
  },
  {
    value: "till_18",
    label: "10 Years Validity",
  },
];

const schemeOptions = [
  { value: "NP", label: "Normal" },
  { value: "TP", label: "Tatkal" },
];

export default function FeeCalculatorPage() {
  const initialState: FormData = {
    applicationType: "",
    serviceType: "",
    ageGroup: "",
    bookletPages: "",
    validity: "",
    scheme: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [fee, setFeeData] = useState<FeeData | null>(null);

  // ---------------- THEME ----------------
  const fieldHeight = "h-[52px] px-5 flex items-center gap-3";

  const radioCard =
    "flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:border-[#14b8a6] hover:bg-teal-50";

  const selectedCard = "border-[#14b8a6] bg-teal-50 ring-2 ring-teal-200";

  const tealGradient = "bg-gradient-to-r from-[#14b8a6] to-[#0d9488]";
  const [error, setError] = useState("");

  const ageType = useMemo(() => {
    if (formData.ageGroup === "18_above") return "adult";
    if (formData.ageGroup === "15_18") return "teen";
    if (formData.ageGroup === "below_15") return "child";
    return "";
  }, [formData.ageGroup]);

  const showServiceType = formData.applicationType === "passport";
  const showAge = !!formData.serviceType;

  const showValidity = formData.ageGroup === "15_18";

  const showBooklet =
    formData.ageGroup === "18_above" ||
    (formData.ageGroup === "15_18" && formData.validity === "till_18");

  const showScheme = useMemo(() => {
    if (formData.ageGroup === "18_above") {
      return !!formData.bookletPages;
    }

    if (formData.ageGroup === "15_18") {
      return formData.validity === "till_18"
        ? !!formData.bookletPages
        : !!formData.validity;
    }

    return formData.ageGroup === "below_15";
  }, [formData]);

  const canCalculate = useMemo(() => {
    if (
      !formData.applicationType ||
      !formData.serviceType ||
      !formData.ageGroup
    ) {
      return false;
    }

    if (formData.ageGroup === "18_above") {
      return !!formData.bookletPages && !!formData.scheme;
    }

    if (formData.ageGroup === "15_18") {
      if (formData.validity === "5_year") {
        return !!formData.scheme;
      }

      return (
        !!formData.validity && !!formData.bookletPages && !!formData.scheme
      );
    }

    if (formData.ageGroup === "below_15") {
      return !!formData.scheme;
    }

    return false;
  }, [formData]);

  const updateField = (key: keyof FormData, value: string) => {
    setFeeData(null);

    setFormData((prev) => {
      const updated = { ...prev, [key]: value };

      switch (key) {
        case "applicationType":
          updated.serviceType = "";
          updated.ageGroup = "";
          updated.bookletPages = "";
          updated.validity = "";
          updated.scheme = "";
          break;

        case "serviceType":
          updated.ageGroup = "";
          updated.bookletPages = "";
          updated.validity = "";
          updated.scheme = "";
          break;

        case "ageGroup":
          updated.bookletPages = "";
          updated.validity = "";
          updated.scheme = "";
          break;

        case "validity":
          updated.bookletPages = "";
          updated.scheme = "";
          break;

        case "bookletPages":
          updated.scheme = "";
          break;
      }

      return updated;
    });
  };

  const getFeeAmount = () => {
    const { ageGroup, validity, bookletPages, scheme } = formData;

    if (!scheme) return 0;

    switch (ageGroup) {
      case "18_above":
        return feeConfig["18_above"][
          bookletPages as keyof (typeof feeConfig)["18_above"]
        ]?.[scheme as "NP" | "TP"];

      case "15_18":
        if (validity === "5_year") {
          return feeConfig["15_18"]["5_year"][scheme as "NP" | "TP"];
        }

        return feeConfig["15_18"]["till_18"][bookletPages as "36" | "60"]?.[
          scheme as "NP" | "TP"
        ];

      case "below_15":
        return feeConfig["below_15"][scheme as "NP" | "TP"];

      default:
        return 0;
    }
  };

  const clearAll = () => {
    setFeeData(null);
    setFormData(initialState);
  };

  const handleSubmit = () => {
    const amount = getFeeAmount();

    if (!amount) {
      setError("Invalid fee selection");
      return;
    }

    setFeeData({
      service_gov_amount: amount,
      service_charges: 0,
      service_gst: 0,
      service_total_amount: amount,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdfa] via-white to-[#ecfeff] py-10 px-4">
      {/* HEADER */}

      <div className="flex flex-col items-center justify-center space-y-4 text-center relative  mb-12">
        <div className="inline-block rounded-full bg-navy/5 px-4 py-1.5 text-sm text-navy">
          <span>Government of India • Passport Services</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl gradient-heading">
            Passport Fee Calculator
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Instantly calculate applicable passport fees based on applicant
            details and service type
          </p>
        </div>
      </div>

      {/* CARD */}
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl border-0 rounded-2xl">
          <CardContent className="p-5 space-y-5">
            {/* TOP FIELDS */}
            <div className="grid md:grid-cols-2 gap-6">
              {error && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-red-600">
                  {error}
                </div>
              )}
              {/* Application Type */}
              <div className="space-y-2">
                <Label className="text-[#0b1f3a] font-medium">
                  Application Type <span className="text-red-500">*</span>
                </Label>

                <Select
                  value={formData.applicationType}
                  onValueChange={(v) => updateField("applicationType", v)}
                >
                  <SelectTrigger className={fieldHeight}>
                    <SelectValue placeholder="Select Application Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">Passport</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Service Type */}
              {showServiceType && (
                <div className="space-y-2">
                  <Label className="text-[#0b1f3a] font-medium">
                    Type of Service <span className="text-red-500">*</span>
                  </Label>

                  <Select
                    value={formData.serviceType}
                    onValueChange={(v) => updateField("serviceType", v)}
                  >
                    <SelectTrigger className={fieldHeight}>
                      <SelectValue placeholder="Select Service Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fresh">Fresh Passport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <Separator />

            {/* AGE */}
            {showAge && (
              <div>
                <Label className="block mb-4 font-semibold text-[#0b1f3a]">
                  Applicant Age <span className="text-red-500">*</span>
                </Label>

                <RadioGroup
                  value={formData.ageGroup}
                  onValueChange={(v) => updateField("ageGroup", v)}
                  className="grid md:grid-cols-3 gap-4"
                >
                  {ageOptions.map((item) => (
                    <Label
                      key={item.value}
                      htmlFor={item.value}
                      className="cursor-pointer"
                    >
                      <div
                        className={`${radioCard} ${
                          formData.ageGroup === item.value ? selectedCard : ""
                        }`}
                      >
                        <RadioGroupItem value={item.value} id={item.value} />
                        <span className="text-[#0b1f3a] font-medium">
                          {item.label}
                        </span>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* BOOKLET */}
            {showBooklet && (
              <div>
                <Label className="block mb-4 font-semibold text-[#0b1f3a]">
                  Number of Pages <span className="text-red-500">*</span>
                </Label>

                <RadioGroup
                  value={formData.bookletPages}
                  onValueChange={(v) => updateField("bookletPages", v)}
                  className="grid md:grid-cols-2 gap-4"
                >
                  {bookletOptions.map((item) => (
                    <Label
                      key={item.value}
                      htmlFor={item.value}
                      className="cursor-pointer"
                    >
                      <div
                        className={`${radioCard} ${
                          formData.bookletPages === item.value
                            ? selectedCard
                            : ""
                        }`}
                      >
                        <RadioGroupItem value={item.value} id={item.value} />
                        <span className="text-[#0b1f3a]">{item.label}</span>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* VALIDITY */}
            {showValidity && (
              <div>
                <Label className="block mb-4 font-semibold text-[#0b1f3a]">
                  Validity <span className="text-red-500">*</span>
                </Label>

                <RadioGroup
                  value={formData.validity}
                  onValueChange={(v) => updateField("validity", v)}
                  className="grid md:grid-cols-2 gap-4"
                >
                  {validityOptions.map((item) => (
                    <Label
                      key={item.value}
                      htmlFor={item.value}
                      className="cursor-pointer"
                    >
                      <div
                        className={`${radioCard} ${
                          formData.validity === item.value ? selectedCard : ""
                        }`}
                      >
                        <RadioGroupItem value={item.value} id={item.value} />
                        <span className="text-[#0b1f3a]">{item.label}</span>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* SCHEME */}
            {showScheme && (
              <div>
                <Label className="block mb-4 font-semibold text-[#0b1f3a]">
                  Scheme <span className="text-red-500">*</span>
                </Label>

                <RadioGroup
                  value={formData.scheme}
                  onValueChange={(v) => updateField("scheme", v)}
                  className="grid md:grid-cols-2 gap-4"
                >
                  {schemeOptions.map((item) => (
                    <Label
                      key={item.value}
                      htmlFor={item.value}
                      className="cursor-pointer"
                    >
                      <div
                        className={`${radioCard} ${
                          formData.scheme === item.value ? selectedCard : ""
                        }`}
                      >
                        <RadioGroupItem value={item.value} id={item.value} />
                        <span className="text-[#0b1f3a]">{item.label}</span>
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex gap-3 w-[300px] m-auto">
              <Button
                disabled={!canCalculate}
                onClick={handleSubmit}
                className="flex-1 h-[52px] bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl modern-button"
              >
                Calculate Fee
              </Button>

              <Button
                onClick={clearAll}
                variant="outline"
                className="h-[52px] px-6 text-[#0b1f3a] hover:opacity-90 rounded-xl modern-button"
              >
                Clear
              </Button>
            </div>
            {fee && (
              <div className="mt-6 p-4 rounded-xl bg-green-50 text-bold border border-green-200 text-green-900 text-sm ">
                <p>
                  Fee Amount (in Rs.): ₹
                  {fee.service_gov_amount.toLocaleString("en-IN")}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* NOTE SECTION */}
      {/* <div className="max-w-4xl mx-auto mt-6">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <h3 className="text-sm font-semibold text-amber-900">
              Important Information
            </h3>
          </div>

          <div className="space-y-3 text-sm text-amber-900 leading-relaxed">
            <p>
              A <b>10% discount</b> on passport fee for{" "}
              <b>fresh applications</b> (not re-issue) is applicable for:
            </p>

            <div className="pl-4 border-l-2 border-amber-200 space-y-1">
              <p>
                • Minors up to <b>8 years of age</b>
              </p>
              <p>
                • Senior citizens (above <b>60 years</b>)
              </p>
            </div>

            <p className="pt-2">
              • <b>ATM facility</b> is available at PSKs for all bank cards.
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}
