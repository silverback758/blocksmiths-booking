export default function TermsAndConditions() {
  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#F5F6F8" }}>
      <header
        className="border-b"
        style={{ backgroundColor: "#192B57", borderColor: "#0E5B8E" }}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-3">
          <a href="/" className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center text-white font-black text-sm"
              style={{ backgroundColor: "#25C0D5" }}
            >
              B
            </div>
            <span className="font-bold text-white tracking-wide text-lg">BLOCKSMITHS</span>
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 w-full">
        <h1 className="text-3xl font-black mb-2" style={{ color: "#192B57" }}>Terms &amp; Conditions</h1>
        <p className="text-sm mb-10" style={{ color: "#8a9ab5" }}>Effective date: April 24, 2026</p>

        <div className="space-y-10 text-sm leading-relaxed" style={{ color: "#3d4a5c" }}>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>Agreement</h2>
            <p>
              By booking or purchasing a training session or package from Blocksmiths, you agree to
              these Terms &amp; Conditions. These terms apply to all training services provided by
              Eric Cooper (Blocksmiths), a sole proprietorship operating in Northern Colorado.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>Services</h2>
            <p className="mb-3">Blocksmiths provides in-person youth football training for athletes ages 8–18, including:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Group sessions (Tuesday &amp; Friday, 5:30–6:30 PM)</li>
              <li>Sunday sessions (indoor, Lasorda Legacy Sports Academy, Johnstown, CO)</li>
              <li>1:1 and semi-private training (by appointment)</li>
              <li>Team training (by appointment)</li>
            </ul>
            <p className="mt-3">
              Session content, location, and scheduling are subject to change. You will be notified
              of material changes in advance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>Payment</h2>
            <p>
              All payments are processed securely through Stripe. By completing a purchase, you
              authorize the stated charge. Blocksmiths does not store payment card information.
            </p>
            <p className="mt-3">
              Training packages are paid in full at time of purchase. Package sessions must be used
              within 12 months of purchase date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>Refund Policy</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="font-semibold">Group and 1:1 sessions:</span> No refunds after
                booking is confirmed. If you need to reschedule, contact us at least 24 hours in
                advance.
              </li>
              <li>
                <span className="font-semibold">Sunday sessions:</span> If a session does not meet
                the 3-athlete minimum, registered athletes will be contacted and fully refunded.
              </li>
              <li>
                <span className="font-semibold">Training packages:</span> No refunds on package
                purchases. Unused sessions may be rescheduled within the 12-month window.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>Cancellation &amp; Rescheduling</h2>
            <p>
              Cancellations or reschedule requests must be submitted at least 24 hours before the
              scheduled session. Contact{" "}
              <a href="mailto:coachcooper@mytrenches.com" style={{ color: "#25C0D5" }}>
                coachcooper@mytrenches.com
              </a>{" "}
              or use the Calendly link in your confirmation email. Same-day cancellations forfeit
              the session.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>SMS Consent</h2>
            <p>
              By providing your mobile phone number and completing a purchase, you consent to receive
              transactional SMS messages from Blocksmiths. These messages include purchase
              confirmation, session scheduling links, and session reminders.
            </p>
            <p className="mt-3">
              Message frequency varies. Message and data rates may apply. To opt out, reply{" "}
              <span className="font-semibold">STOP</span> to any message. For help, reply{" "}
              <span className="font-semibold">HELP</span> or email coachcooper@mytrenches.com.
            </p>
            <p className="mt-3">
              Full SMS and data practices are described in our{" "}
              <a href="/privacy" style={{ color: "#25C0D5" }}>Privacy Policy</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>Liability &amp; Risk</h2>
            <p>
              Athletic training involves physical activity and inherent risk of injury. By enrolling
              an athlete in Blocksmiths training, the parent or guardian acknowledges these risks and
              agrees to the terms of the{" "}
              <a href="/waiver" style={{ color: "#25C0D5" }}>Liability Waiver</a>, which is
              incorporated by reference into these Terms.
            </p>
            <p className="mt-3">
              Blocksmiths is not liable for injuries resulting from pre-existing conditions, failure
              to follow coach instructions, or risks inherent to athletic training.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>Media Release</h2>
            <p>
              By participating in Blocksmiths training, you grant Blocksmiths permission to use
              photos and videos taken during sessions for marketing and promotional purposes. If you
              do not consent, notify us in writing before your first session.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of Colorado. Any disputes will be
              resolved in the courts of Weld County, Colorado.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>Contact</h2>
            <p>
              Eric Cooper — Blocksmiths<br />
              Northern Colorado<br />
              <a href="mailto:coachcooper@mytrenches.com" style={{ color: "#25C0D5" }}>
                coachcooper@mytrenches.com
              </a>
            </p>
          </section>

        </div>
      </main>

      <footer
        className="py-8 px-6 border-t"
        style={{ backgroundColor: "#192B57", borderColor: "#0E5B8E" }}
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-bold text-white text-sm tracking-wide">BLOCKSMITHS</span>
          <div className="flex gap-6 text-xs" style={{ color: "#8a9ab5" }}>
            <a href="/privacy" style={{ color: "#25C0D5" }}>Privacy Policy</a>
            <a href="/terms" style={{ color: "#25C0D5" }}>Terms &amp; Conditions</a>
            <a href="/waiver" style={{ color: "#25C0D5" }}>Waiver</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
