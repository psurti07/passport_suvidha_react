'use client';

import { motion } from 'framer-motion';

const AnimatedVectors = () => {
  return (
    <>
      {/* Floating Circles */}
      <motion.div
        className="absolute top-20 right-20 w-8 h-8 rounded-full bg-gold/30 backdrop-blur-sm"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-12 h-12 rounded-full bg-teal/30 backdrop-blur-sm"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Animated Lines */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-32 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-1/3 left-1/4 w-32 h-[1px] bg-gradient-to-r from-transparent via-teal/50 to-transparent"
        animate={{
          scaleX: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      {/* Animated Dots */}
      <motion.div
        className="absolute top-1/2 right-32 flex gap-2"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-gold/50"
            style={{
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Passport Icon Animation */}
      <motion.div
        className="absolute top-1/4 left-1/4 bg-white/10 backdrop-blur-md rounded-xl p-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: [0, 1, 0],
          scale: [0.8, 1, 0.8],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold"
        >
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="12" cy="12" r="3" />
          <path d="M3 12h18" />
        </svg>
      </motion.div>
    </>
  );
};

export default AnimatedVectors;