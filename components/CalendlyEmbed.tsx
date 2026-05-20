"use client";

import { useEffect, useRef } from "react";

const BASE_CALENDLY_URL = "https://calendly.com/coachcooper-mytrenches";
const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

interface CalendlyEmbedProps {
  url?: string;
}

declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (opts: { url: string; parentElement: HTMLElement }) => void;
    };
  }
}

export default function CalendlyEmbed({ url }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const resolvedUrl =
    url?.startsWith("https://calendly.com/coachcooper-mytrenches") ? url : BASE_CALENDLY_URL;

  useEffect(() => {
    const init = () => {
      if (containerRef.current && window.Calendly) {
        window.Calendly.initInlineWidget({
          url: resolvedUrl,
          parentElement: containerRef.current,
        });
      }
    };

    if (window.Calendly) {
      init();
      return;
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", init);
      return () => existing.removeEventListener("load", init);
    }

    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    script.onload = init;
    document.head.appendChild(script);
  }, [resolvedUrl]);

  return (
    <div
      ref={containerRef}
      className="w-full rounded-2xl overflow-hidden border"
      style={{ borderColor: "#e2e8f0", minHeight: "700px" }}
    />
  );
}
