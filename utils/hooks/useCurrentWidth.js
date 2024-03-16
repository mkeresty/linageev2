"use client";

import React, { useState, useEffect } from 'react';

export function useCurrentWidth() {
  // Initialize state with current window width
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width to state
      setWidth(window.innerWidth);
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return width;
}