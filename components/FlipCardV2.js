"use client"
import { useState } from "react";
import { motion } from "framer-motion";



export default function CardV2 ({FrontCard, BackCard}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  function handleFlip() {
    if (!isAnimating) {
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  }
  return (
    <div className="bg-red-500 h-[50px] w-full cursor-pointer absolute">
      <div
        className="flip-card w-full h-full rounded-md"
        onClick={handleFlip}
      >
        <motion.div
          className="flip-card-inner w-[100%] h-[100%]"
          initial={false}
          animate={{ rotateY: isFlipped ? 180 : 360 }}
          transition={{ duration: 0.6, animationDirection: "normal" }}
          onAnimationComplete={() => setIsAnimating(false)}
        >
          <div
            className="flip-card-front w-full h-auto"

          >
            {FrontCard}
          </div>

          <div
            className="flip-card-back w-[100%] h-[100%] bg-cover border-[1px] text-white rounded-lg p-4"
          >
            {BackCard}
          </div>
        </motion.div>
      </div>
      </div>
  );
};
