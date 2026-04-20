import CalendlyEmbed from "@/components/CalendlyEmbed";

const sessions = [
  {
    title: "Group Session",
    schedule: "Tue & Fri · 5:30–6:30 PM",
    price: "$30",
    unit: "per athlete",
    description:
      "Small-group training focused on footwork, hand technique, leverage, and competitive reps. Ideal for consistent development.",
    spots: "Limited spots",
    accent: "#25C0D5",
  },
  {
    title: "Sunday Session",
    schedule: "Sundays · 2:00–3:00 PM",
    price: "$50",
    unit: "per athlete",
    description:
      "Indoor facility session at Lasorda Legacy Sports Academy, Johnstown, CO. Minimum 3 athletes required for session to run.",
    spots: "Min 3 athletes",
    accent: "#0E5B8E",
  },
  {
    title: "1:1 Training",
    schedule: "By appointment",
    price: "$90",
    unit: "per session",
    description:
      "Fully individualized coaching. One athlete, full focus. We address exactly what your lineman needs — nothing generic.",
    spots: "1 athlete",
    accent: "#25C0D5",
  },
  {
    title: "Semi-Private",
    schedule: "By appointment",
    price: "$65",
    unit: "per athlete",
    description:
      "Bring 2–3 athletes for focused, affordable coaching. Same expert attention, split across a small group.",
    spots: "2–3 athletes",
    accent: "#0E5B8E",
  },
  {
    title: "Team Training",
    schedule: "By appointment",
    price: "$300",
    unit: "per session",
    description:
      "Bring your O-line or D-line unit. Full position group training — technique, communication, and competitive install.",
    spots: "Up to 10 athletes",
    accent: "#192B57",
    packages: [
      { label: "5-Session Pack", price: "$1,250" },
      { label: "10-Session Pack", price: "$2,000" },
    ],
  },
];

const pillars = [
  { label: "Footwork", detail: "Kick slide, lateral movement, angle steps" },
  { label: "Hand Technique", detail: "Strike, reset, control — every rep" },
  { label: "Leverage & Pad Level", detail: "The foundation of every block and rush" },
  { label: "Explosiveness", detail: "First-step quickness and power delivery" },
  { label: "Strength Base", detail: "Age-appropriate force development" },
  { label: "Position IQ", detail: "Reading keys, alignment, and assignments" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: "#192B57", borderColor: "#0E5B8E" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center text-white font-black text-sm"
              style={{ backgroundColor: "#25C0D5" }}
            >
              B
            </div>
            <span className="font-bold text-white tracking-wide text-lg">
              BLOCKSMITHS
            </span>
          </div>
          <a
            href="#book"
            className="text-sm font-semibold px-4 py-2 rounded transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#25C0D5", color: "#192B57" }}
          >
            Book a Session
          </a>
        </div>
      </header>

      {/* Hero */}
      <section
        className="relative overflow-hidden py-24 px-6"
        style={{
          background: "linear-gradient(135deg, #192B57 0%, #0E5B8E 60%, #192B57 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)",
            }}
          />
        </div>
        <div className="relative max-w-4xl mx-auto text-center">
          <div
            className="inline-block text-xs font-bold tracking-widest uppercase mb-6 px-3 py-1 rounded"
            style={{ backgroundColor: "rgba(37,192,213,0.15)", color: "#25C0D5" }}
          >
            Youth Football · Ages 8–18
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6">
            Guided by mastery.
            <br />
            <span style={{ color: "#25C0D5" }}>Forged in the trenches.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-200 max-w-2xl mx-auto mb-10 leading-relaxed">
            Position-specific training for offensive and defensive linemen.
            Built for the athletes most coaches ignore — and the parents who
            won&apos;t settle for generic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#book"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded font-bold text-lg transition-transform hover:scale-105"
              style={{ backgroundColor: "#25C0D5", color: "#192B57" }}
            >
              Book a Session
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#sessions"
              className="inline-flex items-center justify-center px-8 py-4 rounded font-semibold text-lg border transition-colors hover:bg-white/10"
              style={{ borderColor: "rgba(255,255,255,0.3)", color: "white" }}
            >
              See Session Types
            </a>
          </div>
        </div>
      </section>

      {/* What We Train */}
      <section className="py-20 px-6" style={{ backgroundColor: "#F5F6F8" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black mb-3" style={{ color: "#192B57" }}>
              What We Train
            </h2>
            <p className="text-base" style={{ color: "#5a6478" }}>
              Every session is built around the six pillars that define a dominant lineman.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {pillars.map((p) => (
              <div
                key={p.label}
                className="rounded-xl p-5 border"
                style={{ backgroundColor: "white", borderColor: "#e2e8f0" }}
              >
                <div className="w-2 h-6 rounded mb-3" style={{ backgroundColor: "#25C0D5" }} />
                <div className="font-bold text-sm uppercase tracking-wide mb-1" style={{ color: "#192B57" }}>
                  {p.label}
                </div>
                <div className="text-sm" style={{ color: "#5a6478" }}>
                  {p.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Session Types */}
      <section id="sessions" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black mb-3" style={{ color: "#192B57" }}>
              Session Types &amp; Pricing
            </h2>
            <p className="text-base" style={{ color: "#5a6478" }}>
              Choose the format that fits your athlete&apos;s situation and goals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {sessions.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border p-7 flex flex-col"
                style={{
                  borderColor: "#e2e8f0",
                  borderTopColor: s.accent,
                  borderTopWidth: "3px",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-black text-xl" style={{ color: "#192B57" }}>
                      {s.title}
                    </h3>
                    <p className="text-sm font-medium mt-0.5" style={{ color: s.accent }}>
                      {s.schedule}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black" style={{ color: "#192B57" }}>
                      {s.price}
                    </div>
                    <div className="text-xs" style={{ color: "#5a6478" }}>
                      {s.unit}
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "#5a6478" }}>
                  {s.description}
                </p>
                <div
                  className="flex items-center justify-between mt-auto pt-4 border-t"
                  style={{ borderColor: "#f0f4f8" }}
                >
                  <span
                    className="text-xs font-semibold px-2 py-1 rounded"
                    style={{ backgroundColor: `${s.accent}18`, color: s.accent }}
                  >
                    {s.spots}
                  </span>
                  {s.packages && (
                    <div className="flex gap-4">
                      {s.packages.map((pkg) => (
                        <div key={pkg.label} className="text-right">
                          <div className="text-xs font-bold" style={{ color: "#192B57" }}>
                            {pkg.price}
                          </div>
                          <div className="text-xs" style={{ color: "#5a6478" }}>
                            {pkg.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Coach */}
      <section className="py-20 px-6" style={{ backgroundColor: "#192B57" }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div
              className="w-32 h-32 md:w-40 md:h-40 rounded-2xl flex-shrink-0 flex items-center justify-center text-5xl font-black"
              style={{ backgroundColor: "#0E5B8E", color: "#25C0D5" }}
            >
              EC
            </div>
            <div>
              <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#25C0D5" }}>
                Coach Cooper
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4">
                Expert line coaching.
                <br />
                No generic reps.
              </h2>
              <p className="text-blue-200 leading-relaxed mb-4">
                Most youth football training treats linemen as an afterthought.
                Blocksmiths is built specifically for O-line and D-line
                development — from the footwork fundamentals every lineman needs
                at age 8 to the advanced technique and IQ work that separates
                athletes at the high school level.
              </p>
              <p className="text-blue-200 leading-relaxed">
                Every session is intentional. Every rep has a purpose. Your
                athlete will know why they&apos;re doing what they&apos;re doing
                — and so will you.
              </p>
              <div className="mt-6">
                <a
                  href="mailto:coachcooper@mytrenches.com"
                  className="text-sm font-semibold"
                  style={{ color: "#25C0D5" }}
                >
                  coachcooper@mytrenches.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking */}
      <section id="book" className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black mb-3" style={{ color: "#192B57" }}>
              Book a Session
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "#5a6478" }}>
              Select your session type, pick a time, and pay securely. No chasing
              confirmations — your spot is locked the moment you book.
            </p>
          </div>
          <CalendlyEmbed />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6" style={{ backgroundColor: "#F5F6F8" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12" style={{ color: "#192B57" }}>
            Common Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "What age range do you train?",
                a: "Athletes ages 8–18. Current group sessions primarily serve ages 8–12, with individualized programming available for older athletes.",
              },
              {
                q: "What positions do you work with?",
                a: "Offensive linemen (centers, guards, tackles) and defensive linemen (nose guards, defensive ends). Position-specific training, not generic athletics.",
              },
              {
                q: "What should my athlete bring?",
                a: "Cleats or athletic shoes, water, and a willingness to work. No pads required for technique sessions.",
              },
              {
                q: "What if the Sunday session doesn't hit the minimum?",
                a: "Sunday sessions require a minimum of 3 athletes to run. If we don't hit the minimum, you'll be contacted and fully refunded.",
              },
              {
                q: "Can I book a 30-minute 1:1?",
                a: "Standard 1:1 sessions are 60 minutes. If a 30-minute format fits your situation, reach out directly and we'll figure it out.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-xl p-6 border"
                style={{ backgroundColor: "white", borderColor: "#e2e8f0" }}
              >
                <h3 className="font-bold mb-2" style={{ color: "#192B57" }}>
                  {item.q}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#5a6478" }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-10 px-6 border-t"
        style={{ backgroundColor: "#192B57", borderColor: "#0E5B8E" }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-6 h-6 rounded flex items-center justify-center text-white font-black text-xs"
              style={{ backgroundColor: "#25C0D5" }}
            >
              B
            </div>
            <span className="font-bold text-white text-sm tracking-wide">BLOCKSMITHS</span>
          </div>
          <p className="text-xs text-center" style={{ color: "#8a9ab5" }}>
            Coach clarity. Forge toughness. Live mastery.
          </p>
          <a href="mailto:coachcooper@mytrenches.com" className="text-xs" style={{ color: "#25C0D5" }}>
            coachcooper@mytrenches.com
          </a>
        </div>
      </footer>
    </div>
  );
}
