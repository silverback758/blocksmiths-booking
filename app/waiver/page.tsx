export const metadata = {
  title: "Liability Waiver & Policies | Blocksmiths",
  description:
    "Blocksmiths liability waiver, media release, and refund policy. Required for participation in all training sessions.",
};

export default function WaiverPage() {
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
            href="/#book"
            className="text-sm font-semibold px-4 py-2 rounded transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#25C0D5", color: "#192B57" }}
          >
            Book a Session
          </a>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 py-16 px-6">
        <div
          className="max-w-3xl mx-auto rounded-2xl border p-8 md:p-12"
          style={{ backgroundColor: "white", borderColor: "#e2e8f0" }}
        >
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#25C0D5" }}>
            Legal Agreement
          </p>
          <h1 className="text-2xl md:text-3xl font-black mb-2" style={{ color: "#192B57" }}>
            Liability Waiver &amp; Policies
          </h1>
          <p className="text-sm mb-10" style={{ color: "#5a6478" }}>
            Trenches, LLC, DBA Blocksmiths &mdash; Effective upon booking
          </p>

          <div className="space-y-10">
            {/* Section 1 */}
            <section>
              <h2
                className="text-xs font-black tracking-widest uppercase mb-4 pb-2 border-b"
                style={{ color: "#192B57", borderColor: "#e2e8f0" }}
              >
                Release of Liability, Indemnity, and Assumption of Risk
              </h2>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#374151" }}>
                <p>
                  Trenches, LLC, DBA Blocksmiths (&ldquo;Blocksmiths&rdquo;) provides youth football
                  training, position-specific skill development, strength and conditioning, and
                  related services (the &ldquo;Program&rdquo;). By completing a booking, the parent
                  or legal guardian (&ldquo;Guardian&rdquo;) of the participating athlete
                  (&ldquo;Athlete&rdquo;) acknowledges and agrees to the following.
                </p>
                <p>
                  Guardian represents that the Athlete is physically fit to participate in the
                  Blocksmiths Program and that, prior to participation, Guardian has consulted a
                  physician regarding any limitations or medical risks the Athlete may have in
                  relation to the Program, and certifies that the Athlete is free from any such
                  limitations and medical risks that would prevent safe participation.
                </p>
                <p>
                  Guardian understands and agrees that the Program involves physical exertion,
                  athletic drills, and strenuous physical activity, which entails certain risks.
                  Serious bodily injury and/or death may occur. Risks include but are not limited
                  to: physical contact with other participants, coaches, equipment, or surfaces
                  during training; outdoor conditions; and exertion-related injury. Training takes
                  place at various locations including outdoor fields and indoor facilities.
                </p>
                <p>
                  With full knowledge of these risks, Guardian voluntarily chooses to enroll the
                  Athlete in the Program and hereby:
                </p>
                <ol className="list-decimal pl-5 space-y-3">
                  <li>
                    Forever releases, covenants not to sue, discharges, and waives all liability
                    on behalf of Blocksmiths, Trenches, LLC, and their respective coaches,
                    employees, volunteers, agents, affiliates, owners, partners, assigns, facility
                    owners and lessees, and contractors (collectively, the &ldquo;Releasees&rdquo;)
                    for any bodily injury of any kind, property damage, or death suffered by the
                    Athlete as a result of participation in the Program, regardless of whether
                    such injury or death was due to the negligence of Blocksmiths or the
                    Releasees or otherwise;
                  </li>
                  <li>
                    Agrees to indemnify and hold harmless Blocksmiths and the Releasees from any
                    loss, liability, or cost arising out of or related to the Athlete&rsquo;s
                    participation in the Program, any communication, injury, or misconduct; and
                  </li>
                  <li>
                    Assumes full responsibility for any bodily injury, death, or property damage
                    arising out of or related to the Athlete&rsquo;s participation in the Program
                    and/or use of any training facility.
                  </li>
                </ol>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2
                className="text-xs font-black tracking-widest uppercase mb-4 pb-2 border-b"
                style={{ color: "#192B57", borderColor: "#e2e8f0" }}
              >
                Media Release
              </h2>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#374151" }}>
                <p>
                  Guardian hereby authorizes Trenches, LLC, DBA Blocksmiths
                  (&ldquo;Blocksmiths&rdquo;) to record the Athlete&rsquo;s name, likeness,
                  image, voice, and participation in photographs, video, film, or otherwise for
                  use in all Blocksmiths-related initiatives, including social media, marketing
                  materials, and promotional content.
                </p>
                <p>
                  Guardian agrees that all photo, video, and other production-related materials
                  may be edited and otherwise altered at the sole discretion of Blocksmiths and
                  used in whole or in part, whether for public or private use. Guardian further
                  agrees that neither Guardian nor Athlete shall have any rights to any
                  production related to Blocksmiths or any benefits derived therefrom.
                  Blocksmiths agrees to comply with all applicable privacy laws.
                </p>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2
                className="text-xs font-black tracking-widest uppercase mb-4 pb-2 border-b"
                style={{ color: "#192B57", borderColor: "#e2e8f0" }}
              >
                Refund Policy
              </h2>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#374151" }}>
                <p>
                  All session fees are non-refundable once payment is processed. This applies to
                  group sessions, Sunday sessions, 1:1 training, semi-private training, team
                  training, and training packages. No refunds will be provided due to participant
                  withdrawal, scheduling conflicts, medical issues, or other unforeseen
                  circumstances not caused by Blocksmiths.
                </p>
                <p>
                  <strong>Exception:</strong> Sunday sessions require a minimum of 3 registered
                  athletes to run. If the minimum is not met, registered athletes will be
                  notified in advance and fully refunded.
                </p>
                <p>
                  We encourage you to review all session details and confirm your commitment
                  before completing registration. For questions, contact{" "}
                  <a
                    href="mailto:coachcooper@mytrenches.com"
                    style={{ color: "#25C0D5" }}
                    className="font-semibold"
                  >
                    coachcooper@mytrenches.com
                  </a>
                  .
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2
                className="text-xs font-black tracking-widest uppercase mb-4 pb-2 border-b"
                style={{ color: "#192B57", borderColor: "#e2e8f0" }}
              >
                Acknowledgment
              </h2>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#374151" }}>
                <p>
                  By completing a booking with Blocksmiths, Guardian certifies that they have
                  read the foregoing, are the parent or legal guardian of the participating
                  Athlete, have the legal authority to enter into this agreement on behalf of
                  the Athlete, and understand that by agreeing, they are giving up certain legal
                  rights and remedies. This release is intended as a complete and unconditional
                  release of all liability on behalf of Blocksmiths and the Releasees to the
                  greatest extent permitted by law.
                </p>
              </div>
            </section>

            {/* Notice */}
            <div
              className="rounded-xl p-5 text-sm"
              style={{ backgroundColor: "#F5F6F8", color: "#5a6478" }}
            >
              <strong style={{ color: "#192B57" }}>Note to parents and guardians:</strong> This
              agreement is entered into on behalf of a minor athlete. Colorado law governs the
              enforceability of parental liability waivers. We recommend retaining a copy of
              this page for your records. Questions? Email{" "}
              <a href="mailto:coachcooper@mytrenches.com" style={{ color: "#25C0D5" }}>
                coachcooper@mytrenches.com
              </a>
              .
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="py-8 px-6 border-t"
        style={{ backgroundColor: "#192B57", borderColor: "#0E5B8E" }}
      >
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <span className="font-bold text-white text-sm tracking-wide">BLOCKSMITHS</span>
          <p className="text-xs" style={{ color: "#8a9ab5" }}>
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
