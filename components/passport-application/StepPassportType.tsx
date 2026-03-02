import React from "react";
import { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreditCard, FileText, Clock, Check, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface StepPassportTypeProps {
  formData: any;
  handlePassportTypeChange: (value: "normal" | "tatkal") => void;
  handleBookSizeChange: (value: "36" | "60") => void;
  animatePrice: boolean;
  prevStep: () => void;
  completePayment: () => Promise<void>;
  loading: boolean;
  errorMessage?: string;
  itemVariants: any;
  windowSize: { width: number; height: number };
}

interface PassportTypeCardProps {
  title: string;
  price: string;
  description: string;
  features: { icon: React.ReactNode; text: string }[];
  selected: boolean;
  badge?: string;
  onClick: () => void;
  children?: React.ReactNode;
}

const PassportTypeCard = ({
  title,
  price,
  description,
  features,
  selected,
  badge,
  onClick,
  children,
}: PassportTypeCardProps) => (
  <motion.div
    className={`relative overflow-hidden p-6 md:p-8 rounded-2xl cursor-pointer transition-all duration-300 group ${
      selected
        ? "bg-gradient-to-br from-navy/10 via-teal/5 to-navy/10 border-navy"
        : "bg-white hover:bg-gradient-to-br hover:from-navy/[0.02] hover:via-teal/[0.01] hover:to-navy/[0.02] border-gray-200"
    } border-2 hover:border-navy/30 hover:shadow-xl`}
    onClick={onClick}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="absolute top-0 right-0 p-2 m-4 rounded-full bg-navy/5">
      <FileText className="h-5 w-5 text-navy" />
    </div>
    <div className="relative z-10">
      {badge && (
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-navy/5 text-navy text-sm font-medium mb-4">
          {badge}
        </div>
      )}
      <h3 className="text-xl md:text-2xl font-bold text-navy mb-2">{title}</h3>
      <div className="flex items-baseline gap-1 mb-1">
        <span className="text-3xl md:text-4xl font-bold text-navy">{price}</span>
        <span className="text-sm text-muted-foreground">/passport</span>
      </div>
      <p className="text-sm text-muted-foreground mb-6">{description}</p>
      <div className="space-y-4">
        {features.map((feature, idx) => (
          <div className="flex items-center gap-3 text-sm" key={idx}>
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-navy/10">
              {feature.icon}
            </div>
            <span className="text-muted-foreground">{feature.text}</span>
          </div>
        ))}
      </div>
      {children}
    </div>
    {selected && (
      <motion.div
        className="absolute top-4 right-4 w-8 h-8 bg-navy rounded-full flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <Check className="h-5 w-5 text-white" />
        </motion.div>
      </motion.div>
    )}
  </motion.div>
);

const passportTypes = [
  {
    key: "normal-36",
    passportType: "normal",
    bookSize: "36",
    title: "Normal 36-Page",
    price: "₹2,680",
    description: "Perfect for occasional travelers",
    badge: "Most Popular",
    features: [
      { icon: <Clock className="h-3.5 w-3.5 text-navy" />, text: "30-45 days processing" },
      { icon: <FileText className="h-3.5 w-3.5 text-navy" />, text: "36 pages capacity" },
      { icon: <Check className="h-3.5 w-3.5 text-navy" />, text: "Most economical choice" },
    ],
  },
  {
    key: "normal-60",
    passportType: "normal",
    bookSize: "60",
    title: "Normal 60-Page",
    price: "₹3,180",
    description: "Ideal for frequent travelers",
    badge: "Extra Capacity",
    features: [
      { icon: <Clock className="h-3.5 w-3.5 text-navy" />, text: "30-45 days processing" },
      { icon: <FileText className="h-3.5 w-3.5 text-navy" />, text: "60 pages capacity" },
      { icon: <Check className="h-3.5 w-3.5 text-navy" />, text: "Extra space for visas" },
    ],
  },
  {
    key: "tatkal-36",
    passportType: "tatkal",
    bookSize: "36",
    title: "Tatkal 36-Page",
    price: "₹4,680",
    description: "For urgent travel needs",
    badge: "Express Service",
    features: [
      { icon: <Clock className="h-3.5 w-3.5 text-navy" />, text: "1-3 days processing" },
      { icon: <FileText className="h-3.5 w-3.5 text-navy" />, text: "36 pages capacity" },
      { icon: <Check className="h-3.5 w-3.5 text-navy" />, text: "Priority verification" },
    ],
  },
  {
    key: "tatkal-60",
    passportType: "tatkal",
    bookSize: "60",
    title: "Tatkal 60-Page",
    price: "₹5,180",
    description: "Ultimate express package",
    badge: "Premium Service",
    features: [
      { icon: <Clock className="h-3.5 w-3.5 text-navy" />, text: "1-3 days processing" },
      { icon: <FileText className="h-3.5 w-3.5 text-navy" />, text: "60 pages capacity" },
      { icon: <Check className="h-3.5 w-3.5 text-navy" />, text: "Premium processing" },
    ],
  },
];

const StepPassportType = ({
  formData,
  handlePassportTypeChange,
  handleBookSizeChange,
  animatePrice,
  prevStep,
  completePayment,
  loading,
  errorMessage,
  itemVariants,
  windowSize,
}: StepPassportTypeProps) => (
  <>
    {windowSize.width >= 768 ? (
      // Desktop/Tablet Layout
      <>
        <CardHeader className="pb-6">
          <motion.div variants={itemVariants}>
            <CardTitle className="text-xl md:text-3xl flex items-center gap-3 text-navy">
              <div className="p-2 rounded-full bg-navy/5">
                <Clock className="h-6 w-6 md:h-7 md:w-7" />
              </div>
              Choose Your Passport
            </CardTitle>
          </motion.div>
          <motion.div variants={itemVariants}>
            <CardDescription className="text-sm md:text-base mt-3">
              Select the passport type that best matches your travel requirements and timeline
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-8">
          {errorMessage && (
            <motion.div
              variants={itemVariants}
              className="p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-sm text-red-600">{errorMessage}</p>
            </motion.div>
          )}
          
          {/* Passport Type Selection Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {passportTypes.map((type) => (
              <PassportTypeCard
                key={type.key}
                title={type.title}
                price={type.price}
                description={type.description}
                features={type.features}
                badge={type.badge}
                selected={formData.passportType === type.passportType && formData.bookSize === type.bookSize}
                onClick={() => {
                  handlePassportTypeChange(type.passportType as "normal" | "tatkal");
                  handleBookSizeChange(type.bookSize as "36" | "60");
                }}
              />
            ))}
          </motion.div>
          {/* Price Breakdown */}
          <motion.div
            variants={itemVariants}
            className="max-w-xl mt-8 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-navy/[0.03] to-teal/[0.03] border border-navy/10"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-full bg-navy/5">
                <CreditCard className="h-5 w-5 text-navy" />
              </div>
              <h3 className="text-lg md:text-xl font-semibold text-navy">
                Price Breakdown
              </h3>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
                <span className="text-base text-muted-foreground">
                  Government Fees
                </span>
                <span className="text-base font-medium text-navy">
                  ₹
                  {formData.passportType === "normal"
                    ? formData.bookSize === "36"
                      ? "1,500"
                      : "2,000"
                    : formData.bookSize === "36"
                    ? "3,500"
                    : "4,000"}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
                <span className="text-base text-muted-foreground">
                  Service Charge
                </span>
                <span className="text-base font-medium text-navy">
                  ₹1,000
                </span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-white/50">
                <span className="text-base text-muted-foreground">
                  GST (18%)
                </span>
                <span className="text-base font-medium text-navy">
                  ₹180
                </span>
              </div>
              <div className="flex justify-between items-center p-4 mt-2 rounded-lg bg-navy/5 border border-navy/10">
                <span className="text-lg font-semibold text-navy">
                  Total Amount
                </span>
                <motion.span
                  animate={
                    animatePrice
                      ? {
                          scale: [1, 1.1, 1],
                          color: ["#003366", "#008080", "#003366"],
                        }
                      : {}
                  }
                  transition={{ duration: 0.5 }}
                  className="text-xl font-bold text-navy"
                >
                  ₹
                  {formData.passportType === "normal"
                    ? formData.bookSize === "36"
                      ? "2,680"
                      : "3,180"
                    : formData.bookSize === "36"
                    ? "4,680"
                    : "5,180"}
                </motion.span>
              </div>
            </div>
          </motion.div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t pt-6">
          <motion.div variants={itemVariants} className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto rounded-xl border-navy/20 hover:bg-navy/5 text-base font-medium"
              onClick={prevStep}
              disabled={loading}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Step
            </Button>
          </motion.div>
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto"
          >
            <Button
              className="w-full sm:w-auto bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl text-base font-medium shadow-lg"
              onClick={completePayment}
              disabled={!formData.passportType || !formData.bookSize || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Complete Application
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </motion.div>
        </CardFooter>
      </>
    ) : (
      // Mobile Layout
      <>
        <CardHeader className="pb-4">
          <motion.div variants={itemVariants}>
            <CardTitle className="text-lg md:text-2xl flex items-center gap-2 text-navy">
              <Clock className="h-5 w-5" />
              Select Your Passport Type
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              Choose between normal and tatkal processing
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="space-y-6">
          {errorMessage && (
            <motion.div
              variants={itemVariants}
              className="p-3 bg-red-50 border border-red-200 rounded-lg"
            >
              <p className="text-sm text-red-600">{errorMessage}</p>
            </motion.div>
          )}
          
          <motion.div variants={itemVariants}>
            {/* Passport Type Selection */}
            <div className="grid grid-cols-2 gap-4">
              {["normal", "tatkal"].map((type) => (
                <div
                  key={type}
                  className={`rounded-lg cursor-pointer transition-all duration-300 ${
                    formData.passportType === type
                      ? "bg-gradient-to-br from-navy/10 via-teal/5 to-navy/10 border-navy shadow-lg"
                      : "bg-white hover:bg-gradient-to-br hover:from-navy/[0.02] hover:via-teal/[0.01] hover:to-navy/[0.02] hover:border-navy/30"
                  } border-2 p-4`}
                  onClick={() => handlePassportTypeChange(type as "normal" | "tatkal")}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        formData.passportType === type
                          ? "border-navy bg-navy"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.passportType === type && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-navy">{type.charAt(0).toUpperCase() + type.slice(1)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Page Selection */}
            {formData.passportType && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 mt-6"
              >
                <h3 className="text-lg font-semibold text-navy">
                  Select Number of Pages
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {["36", "60"].map((size) => (
                    <div
                      key={size}
                      className={`rounded-lg cursor-pointer transition-all duration-300 ${
                        formData.bookSize === size
                          ? "bg-gradient-to-br from-navy/10 via-teal/5 to-navy/10 border-navy shadow-lg"
                          : "bg-white hover:bg-gradient-to-br hover:from-navy/[0.02] hover:via-teal/[0.01] hover:to-navy/[0.02] hover:border-navy/30"
                      } border-2 p-4`}
                      onClick={() => handleBookSizeChange(size as "36" | "60")}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                            formData.bookSize === size
                              ? "border-navy bg-navy"
                              : "border-gray-300"
                          }`}
                        >
                          {formData.bookSize === size && (
                            <Check className="h-3 w-3 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-navy">{size} Pages</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Benefits and Price Breakdown */}
            {formData.passportType && formData.bookSize && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 space-y-6 border-2 rounded-xl p-6"
              >
                {/* Reuse PassportTypeCard for summary */}
                <PassportTypeCard
                  title={
                    passportTypes.find(
                      (t) =>
                        t.passportType === formData.passportType &&
                        t.bookSize === formData.bookSize
                    )?.title || ""
                  }
                  price={
                    passportTypes.find(
                      (t) =>
                        t.passportType === formData.passportType &&
                        t.bookSize === formData.bookSize
                    )?.price || ""
                  }
                  description={
                    passportTypes.find(
                      (t) =>
                        t.passportType === formData.passportType &&
                        t.bookSize === formData.bookSize
                    )?.description || ""
                  }
                  features={
                    passportTypes.find(
                      (t) =>
                        t.passportType === formData.passportType &&
                        t.bookSize === formData.bookSize
                    )?.features || []
                  }
                  badge={
                    passportTypes.find(
                      (t) =>
                        t.passportType === formData.passportType &&
                        t.bookSize === formData.bookSize
                    )?.badge
                  }
                  selected={true}
                  onClick={() => {}}
                >
                  {/* Price Breakdown */}
                  <div className="space-y-3 pt-4 border-t border-navy/10">
                    <h3 className="text-lg font-semibold text-navy mb-3">
                      Price Breakdown
                    </h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Government Fees
                      </span>
                      <span className="text-sm font-medium text-navy">
                        ₹
                        {formData.passportType === "normal"
                          ? formData.bookSize === "36"
                            ? "1,500"
                            : "2,000"
                          : formData.bookSize === "36"
                          ? "3,500"
                          : "4,000"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Service Charge
                      </span>
                      <span className="text-sm font-medium text-navy">
                        ₹1,000
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        GST (18%)
                      </span>
                      <span className="text-sm font-medium text-navy">
                        ₹180
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-navy/10">
                      <span className="font-medium text-navy">
                        Total Amount
                      </span>
                      <motion.span
                        animate={
                          animatePrice
                            ? {
                                scale: [1, 1.1, 1],
                                color: ["#003366", "#008080", "#003366"],
                              }
                            : {}
                        }
                        transition={{ duration: 0.5 }}
                        className="text-lg font-bold text-navy"
                      >
                        ₹
                        {formData.passportType === "normal"
                          ? formData.bookSize === "36"
                            ? "2,680"
                            : "3,180"
                          : formData.bookSize === "36"
                          ? "4,680"
                          : "5,180"}
                      </motion.span>
                    </div>
                  </div>
                  <Button
                    className="w-full mt-4 bg-gradient-to-r from-navy to-teal text-white hover:opacity-90 rounded-xl"
                    onClick={completePayment}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Complete Application
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </PassportTypeCard>
              </motion.div>
            )}
          </motion.div>
        </CardContent>
      </>
    )}
  </>
);

export default StepPassportType; 