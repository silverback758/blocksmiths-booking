"use client";

import { useSearchParams } from "next/navigation";

// Update this address when the outdoor Tue/Fri location is confirmed
const GROUP_LOCATION = "Traverse Park, Fort Collins, CO";
const SUNDAY_LOCATION = "Lasorda Legacy Sports Academy\nJohnstown, CO";

function nextDate(targetDays: number[]): string {
  const now = new Date();
  const today = now.getDay();
  let minDiff = 7;
  for (const day of targetDays) {
    const diff = (day - today + 7) % 7 || 7;
    if (diff < minDiff) minDiff = diff;
  }
  const next = new Date(now);
  next.setDate(now.getDate() + minDiff);
  return next.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

type SessionInfo = {
  nextDate?: string;
  time?: string;
  location?: string;
  scheduleNote?: string;
};

function getSessionInfo(type: string | null): SessionInfo {
  switch (type) {
    case "group":
      return {
        nextDate: nextDate([2, 5]), // Tuesday, Friday
        time: "5:30 – 6:30 PM",
        location: GROUP_LOCATION,
      };
    case "sunday":
      return {
        nextDate: nextDate([0]), // Sunday
        time: "2:00 – 3:00 PM",
        location: SUNDAY_LOCATION,
      };
    case "1on1":
      return {
        scheduleNote:
          "Your session is confirmed. Coach Cooper will follow up to confirm your schedule.",
      };
    case "semi":
      return {
        scheduleNote:
          "Your session is confirmed. Coach Cooper will follow up to confirm your schedule.",
      };
    case "group-individual":
      return {
        scheduleNote:
          "Your sessions are locked in. We'll see you on the field.",
      };
    case "group-pack":
      return {
        scheduleNote:
          "Your session pack is purchased. Check your email — you'll get a link to blocksmiths.mytrenches.com/book to select your sessions.",
      };
    case "membership":
      return {
        scheduleNote:
          "Your monthly membership is active. Check your email — you'll get a link to blocksmiths.mytrenches.com/book to select your sessions.",
      };
    case "summer-special":
      return {
        scheduleNote:
          "Your Summer Special is locked in. Check your email — you'll get a link to blocksmiths.mytrenches.com/book to select your sessions through July 31.",
      };
    case "package-1on1":
      return {
        scheduleNote:
          "Your 1:1 package is locked in. Check your email for the Calendly scheduling link to book your first session whenever you're ready.",
      };
    case "package-team":
      return {
        scheduleNote:
          "Your team package is locked in. Check your email for the Calendly scheduling link to coordinate your first session.",
      };
    default:
      return {
        scheduleNote:
          "Head back to the site to explore sessions and get booked.",
      };
  }
}

const prepItems = [
  { text: "Cleats", essential: false },
  { text: "Athletic gear", essential: false },
  { text: "Water bottle", essential: true },
  { text: "Work ethic", essential: false },
  { text: "Willingness to learn", essential: false },
];

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const session = getSessionInfo(type);

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#F5F6F8" }}>
      {/* Nav */}
      <header
        className="border-b"
        style={{ backgroundColor: "#192B57", borderColor: "#0E5B8E" }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center text-white font-black text-sm"
              style={{ backgroundColor: "#25C0D5" }}
            >
              B
            </div>
            <span className="font-bold text-white tracking-wide text-lg">BLOCKSMITHS</span>
          </a>
          <a
            href="/"
            className="text-sm font-semibold px-4 py-2 rounded transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#25C0D5", color: "#192B57" }}
          >
            Back to Home
          </a>
        </div>
      </header>

      <main className="flex-1 py-12 px-6">
        <div className="max-w-2xl mx-auto space-y-6">

          {/* Hero */}
          <div className="rounded-2xl p-8 md:p-12" style={{ backgroundColor: "#192B57" }}>
            <p
              className="text-xs font-black tracking-widest uppercase mb-3"
              style={{ color: "#25C0D5" }}
            >
              Welcome to Blocksmiths
            </p>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-3">
              You&rsquo;re In.
            </h1>
            <p className="text-lg font-semibold" style={{ color: "#8a9ab5" }}>
              Time to get to work.
            </p>
          </div>

          {/* Session details */}
          {session.nextDate ? (
            <div
              className="rounded-2xl border p-6 md:p-8"
              style={{ backgroundColor: "white", borderColor: "#e2e8f0" }}
            >
              <p
                className="text-xs font-black tracking-widest uppercase mb-4"
                style={{ color: "#25C0D5" }}
              >
                Your Next Session
              </p>
              <p className="text-2xl font-black mb-1" style={{ color: "#192B57" }}>
                {session.nextDate}
              </p>
              <p className="text-sm font-semibold mb-4" style={{ color: "#5a6478" }}>
                {session.time}
              </p>
              <div className="flex items-start gap-2">
                <span className="text-sm" style={{ color: "#25C0D5" }}>📍</span>
                <p
                  className="text-sm whitespace-pre-line leading-relaxed"
                  style={{ color: "#374151" }}
                >
                  {session.location}
                </p>
              </div>
            </div>
          ) : (
            <div
              className="rounded-2xl border p-6 md:p-8"
              style={{ backgroundColor: "white", borderColor: "#e2e8f0" }}
            >
              <p
                className="text-xs font-black tracking-widest uppercase mb-4"
                style={{ color: "#25C0D5" }}
              >
                Next Step
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                {session.scheduleNote}
              </p>
            </div>
          )}

          {/* What to bring */}
          <div
            className="rounded-2xl border p-6 md:p-8"
            style={{ backgroundColor: "white", borderColor: "#e2e8f0" }}
          >
            <p
              className="text-xs font-black tracking-widest uppercase mb-5"
              style={{ color: "#192B57" }}
            >
              What to Bring
            </p>
            <ul className="space-y-4">
              {prepItems.map((item) => (
                <li key={item.text} className="flex items-center gap-3">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-black"
                    style={{ backgroundColor: "#25C0D5", color: "#192B57" }}
                  >
                    ✓
                  </span>
                  <span className="text-sm" style={{ color: "#252525" }}>
                    {item.text}
                    {item.essential && (
                      <span
                        className="ml-2 text-xs font-black px-2 py-0.5 rounded uppercase tracking-wide"
                        style={{ backgroundColor: "#25C0D5", color: "#192B57" }}
                      >
                        Essential
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div
            className="rounded-2xl border p-6 md:p-8"
            style={{ backgroundColor: "white", borderColor: "#e2e8f0" }}
          >
            <p
              className="text-xs font-black tracking-widest uppercase mb-2"
              style={{ color: "#192B57" }}
            >
              Questions Before Then?
            </p>
            <p className="text-sm mb-5" style={{ color: "#5a6478" }}>
              Reach out to Coach Cooper directly.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:coachcooper@mytrenches.com"
                className="flex items-center gap-3 text-sm font-semibold transition-opacity hover:opacity-75"
                style={{ color: "#192B57" }}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base"
                  style={{ backgroundColor: "#F5F6F8" }}
                >
                  ✉
                </span>
                coachcooper@mytrenches.com
              </a>
              <a
                href="tel:9702953232"
                className="flex items-center gap-3 text-sm font-semibold transition-opacity hover:opacity-75"
                style={{ color: "#192B57" }}
              >
                <span
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base"
                  style={{ backgroundColor: "#F5F6F8" }}
                >
                  ☎
                </span>
                970-295-3232
              </a>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-8 px-6 border-t mt-6"
        style={{ backgroundColor: "#192B57", borderColor: "#0E5B8E" }}
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="font-bold text-white text-sm tracking-wide">BLOCKSMITHS</span>
          <p className="text-xs" style={{ color: "#8a9ab5" }}>
            Coach clarity. Forge toughness. Live mastery.
          </p>
          <a
            href="mailto:coachcooper@mytrenches.com"
            className="text-xs"
            style={{ color: "#25C0D5" }}
          >
            coachcooper@mytrenches.com
          </a>
        </div>
      </footer>
    </div>
  );
}
