"use client";

import { useEffect } from "react";

const BASE_CALENDLY_URL = "https://calendly.com/coachcooper-mytrenches";

interface CalendlyEmbedProps {
  // Pass a specific Calendly event URL to deep-link to a session type.
  // Defaults to the main scheduling page if omitted.
  url?: string;
}

export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
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
      className="calendly-inline-widget w-full rounded-2xl overflow-hidden border min-h-[630px] md:min-h-[700px]"
      data-url={url ?? BASE_CALENDLY_URL}
      style={{ borderColor: "#e2e8f0" }}
    />
  );
}
