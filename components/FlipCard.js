"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

let AnimatedBox = motion.div;


// Framer animations
const duration = 0.3;
const flipVariants = {
  shown: {
    rotateY: 0,
    scale: 1,
    perspective: 1000, 
    transition: {
      duration,
      ease: "easeInOut", // Adjust easing as desired
    },
  },
  frontFlipped: {
    rotateY: -180,
    scale: 1.2, // Adjust scale factor
    zIndex: 2000,
    perspective: 1000, // Adjust perspective strength
    transition: {
      duration,
      ease: "easeInOut", // Adjust easing as desired
    },
  },
  backFlipped: {
    rotateY: 180,
    scale: 1.2, // Adjust scale factor
    zIndex: 2000,
    perspective: 1000, // Adjust perspective strength
    transition: {
      duration,
      ease: "easeInOut", // Adjust easing as desired
    },
  },
};
export default function FlipCard({ children }) {
  return (
<>
        {children}
        </>

  );
}

export function FrontCard({ isCardFlipped, children }) {
  return (
    <AnimatedCardFace
      variants={flipVariants}
      animate={isCardFlipped ? 'frontFlipped' : 'shown'}
      className={`${isCardFlipped ? 'hidden' : ''}`}
    >
      {children}
    </AnimatedCardFace>
  );
}

export function BackCard({ isCardFlipped, children }) {
  return (
    <AnimatedCardFace
      variants={flipVariants}
      initial={{ rotateY: 180 }}
      animate={isCardFlipped ? 'shown' : 'backFlipped'}
      className={`${isCardFlipped ? '' : 'hidden'}`}
    >
      {children}
    </AnimatedCardFace>
  );
}

function AnimatedCardFace({ children, style, ...rest }) {
  return (
    <AnimatedBox

      {...rest}
    >
{children}

    </AnimatedBox>
  );
}