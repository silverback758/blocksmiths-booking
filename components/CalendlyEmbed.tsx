"use client";

import { useEffect } from "react";

// Replace this URL with your Calendly account URL after setting it up at calendly.com
const CALENDLY_URL = "https://calendly.com/coachcooper-blocksmiths";

export default function CalendlyEmbed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div
      className="calendly-inline-widget w-full rounded-2xl overflow-hidden border"
      data-url={CALENDLY_URL}
      style={{
        minHeight: "700px",
        borderColor: "#e2e8f0",
      }}
    />
  );
}
