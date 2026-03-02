import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  step: number;
  stepTitles: { [key: number]: string };
  progressWidth: number;
  windowSize: { width: number; height: number };
}

const ProgressBar = ({ step, stepTitles, progressWidth, windowSize }: ProgressBarProps) => (
  <div className="relative px-2 md:px-0 mb-4 md:mb-8">
    <div className="relative flex justify-between items-center">
      {Object.entries(stepTitles).map(([stepNum, title], index) => (
        <div
          key={stepNum}
          className={`flex flex-col items-center transition-all duration-300 ${
            parseInt(stepNum) === step ? "scale-110" : ""
          }`}
        >
          <div
            className={`relative w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center mb-2 z-20
              ${
                parseInt(stepNum) < step
                  ? "bg-gradient-to-r from-navy to-teal text-white"
                  : parseInt(stepNum) === step
                  ? "bg-gradient-to-r from-navy via-teal to-navy text-white ring-4 ring-white"
                  : "bg-white text-gray-400 border-2 border-gray-200"
              }
              ${parseInt(stepNum) === step ? "shadow-lg" : ""}
            `}
          >
            {parseInt(stepNum) < step ? (
              <Check className="w-4 h-4 md:w-5 md:h-5" />
            ) : (
              <span className="text-sm md:text-base font-semibold">
                {stepNum}
              </span>
            )}
            {parseInt(stepNum) === step && (
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.2, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(0,51,102,0.2) 0%, rgba(0,128,128,0) 70%)",
                }}
              />
            )}
          </div>
          <span
            className={`text-[10px] md:text-xs text-center transition-colors duration-300 max-w-[80px] md:max-w-[100px] line-clamp-2 z-20
            ${
              parseInt(stepNum) <= step
                ? "text-navy font-medium"
                : "text-gray-400"
            }
          `}
          >
            {title}
          </span>
          {index < Object.entries(stepTitles).length - 1 && (
            <div
              className={`absolute top-4 md:top-5 left-[calc(50%+20px)] right-[calc(50%+20px)] h-[2px] -z-10
                ${
                  parseInt(stepNum) < step
                    ? "bg-gradient-to-r from-navy to-teal"
                    : "bg-gray-200"
                }
              `}
            />
          )}
        </div>
      ))}
      <div className="absolute top-4 md:top-5 left-10 md:left-12 h-[3px] md:h-[5px] right-10 md:right-12 bg-gray-100 -z-20"></div>
      <div
        className="absolute top-4 md:top-5 left-10 md:left-12 h-[3px] md:h-[5px] bg-gradient-to-r from-navy via-teal to-navy transition-all duration-500 -z-10"
        style={{
          width: `calc(${progressWidth}% - ${
            windowSize.width >= 768 ? "5rem" : "4rem"
          })`,
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.3)_50%,transparent_100%)] shimmer-effect"></div>
      </div>
    </div>
  </div>
);

export default ProgressBar; 