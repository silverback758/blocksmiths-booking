export default function PrivacyPolicy() {
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
        <h1 className="text-3xl font-black mb-2" style={{ color: "#192B57" }}>Privacy Policy</h1>
        <p className="text-sm mb-10" style={{ color: "#8a9ab5" }}>Effective date: April 24, 2026</p>

        <div className="space-y-10 text-sm leading-relaxed" style={{ color: "#3d4a5c" }}>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>Who We Are</h2>
            <p>
              Blocksmiths is a youth football training company based in Northern Colorado, operated
              by Eric Cooper (sole proprietor). We provide in-person training sessions for offensive
              and defensive linemen ages 8–18. Contact:{" "}
              <a href="mailto:coachcooper@mytrenches.com" style={{ color: "#25C0D5" }}>
                coachcooper@mytrenches.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>Information We Collect</h2>
            <p className="mb-3">When you purchase a training session or package through our website, we collect:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Payment information (processed and stored by Stripe — we do not store card data)</li>
            </ul>
            <p className="mt-3">
              We also collect booking information through Calendly when you schedule a session.
              Calendly&apos;s privacy policy governs data collected on their platform.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To confirm and fulfill your training session purchase</li>
              <li>To send scheduling information and session reminders</li>
              <li>To send transactional SMS notifications related to your booking (see SMS section below)</li>
              <li>To respond to questions or support requests</li>
              <li>To communicate material changes to sessions, scheduling, or pricing</li>
            </ul>
            <p className="mt-3">We do not sell your personal information. We do not use your data for advertising.</p>
          </section>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>SMS Communications</h2>
            <p className="mb-3">
              By providing your mobile phone number at checkout and completing a purchase, you consent
              to receive transactional SMS messages from Blocksmiths. These messages are limited to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Purchase confirmation</li>
              <li>Session scheduling links</li>
              <li>Session reminders or schedule changes</li>
            </ul>
            <p className="mt-3">
              Message frequency varies by purchase. Message and data rates may apply.
            </p>
            <p className="mt-3 font-semibold" style={{ color: "#192B57" }}>
              To opt out: Reply STOP to any SMS from Blocksmiths. You will receive no further messages.
              To opt back in, reply START. For help, reply HELP or email coachcooper@mytrenches.com.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services to operate our business:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="font-semibold">Stripe</span> — payment processing. Stripe&apos;s privacy policy applies to all payment data.</li>
              <li><span className="font-semibold">Calendly</span> — session scheduling. Calendly&apos;s privacy policy applies to booking data.</li>
              <li><span className="font-semibold">Twilio</span> — SMS delivery. Phone numbers are transmitted to Twilio solely to deliver messages you have consented to receive.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>Data Retention</h2>
            <p>
              We retain your contact information for as long as necessary to fulfill your sessions
              and for up to 2 years after your last purchase for records purposes. You may request
              deletion of your data at any time by emailing{" "}
              <a href="mailto:coachcooper@mytrenches.com" style={{ color: "#25C0D5" }}>
                coachcooper@mytrenches.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Request access to the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of SMS communications at any time by replying STOP</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact{" "}
              <a href="mailto:coachcooper@mytrenches.com" style={{ color: "#25C0D5" }}>
                coachcooper@mytrenches.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-black mb-3" style={{ color: "#192B57" }}>Changes to This Policy</h2>
            <p>
              We may update this policy as our services change. Material changes will be communicated
              via email to active customers. Continued use of our services after changes constitutes
              acceptance of the updated policy.
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
