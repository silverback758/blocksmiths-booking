import { Suspense } from "react";
import ThankYouContent from "@/components/ThankYouContent";

export const metadata = {
  title: "You're In | Blocksmiths",
  description:
    "Welcome to Blocksmiths. Here's everything you need to know before your first session.",
};

export default function ThankYouPage() {
  return (
    <Suspense>
      <ThankYouContent />
    </Suspense>
  );
}
