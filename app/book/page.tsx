"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

// ── Config ────────────────────────────────────────────────────────────────────

const SUPABASE_URL = "https://vyvxvpxnhihlbhbvjwxy.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5dnh2cHhuaGlobGJoYnZqd3h5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY3MDc0MjksImV4cCI6MjA5MjA2NzQyOX0.56nAngQE_Jo7pfOBVnCT-CDzHDZrq8fG6Btyv4QWaAw";
const EDGE_BASE = `${SUPABASE_URL}/functions/v1`;
const MTN = "America/Denver";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Session {
  id: string;
  starts_at: string;
  capacity: number;
  enrolled: number;
}

interface Package {
  id: string;
  customer_email: string;
  customer_name: string;
  package_type: string;
  sessions_total: number | null;
  sessions_remaining: number | null;
  valid_through: string | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const PACKAGE_LABELS: Record<string, string> = {
  "group-4pack": "Group 4-Session Pack",
  "group-8pack": "Group 8-Session Pack",
  membership: "Monthly Membership",
  "summer-special": "Summer Special",
};

function dayChip(iso: string) {
  return new Date(iso)
    .toLocaleDateString("en-US", { weekday: "short", timeZone: MTN })
    .toUpperCase();
}

function sessionLabel(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    timeZone: MTN,
  });
}

function monthKey(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: MTN,
  });
}

function creditsText(pkg: Package) {
  if (pkg.sessions_remaining === null) return "Unlimited sessions included";
  const n = pkg.sessions_remaining;
  return `${n} session${n !== 1 ? "s" : ""} remaining`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function BookPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(true);

  const [mode, setMode] = useState<"individual" | "package">("individual");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Individual mode
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState<string | null>(null);

  // Package mode
  const [pkgEmail, setPkgEmail] = useState("");
  const [lookingUp, setLookingUp] = useState(false);
  const [foundPkg, setFoundPkg] = useState<Package | null>(null);
  const [pkgLookupError, setPkgLookupError] = useState<string | null>(null);
  const [pkgName, setPkgName] = useState("");
  const [pkgPhone, setPkgPhone] = useState("");
  const [registering, setRegistering] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // ── Load sessions ───────────────────────────────────────────────────────────

  useEffect(() => {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    (async () => {
      const now = new Date().toISOString();
      const { data: rows } = await supabase
        .from("blocksmiths_sessions")
        .select("id, starts_at, capacity")
        .eq("is_cancelled", false)
        .gt("starts_at", now)
        .order("starts_at")
        .limit(24);

      if (!rows?.length) {
        setLoadingSessions(false);
        return;
      }

      const ids = rows.map((r) => r.id);
      const { data: regs } = await supabase
        .from("blocksmiths_registrations")
        .select("session_id")
        .in("session_id", ids);

      const countMap = new Map<string, number>();
      for (const r of regs ?? []) {
        countMap.set(r.session_id, (countMap.get(r.session_id) ?? 0) + 1);
      }

      setSessions(
        rows.map((s) => ({ ...s, enrolled: countMap.get(s.id) ?? 0 }))
      );
      setLoadingSessions(false);
    })();
  }, []);

  // ── Derived ─────────────────────────────────────────────────────────────────

  const maxSelect =
    mode === "package" && foundPkg
      ? (foundPkg.sessions_remaining ?? Infinity)
      : Infinity;

  const grouped = sessions.reduce<Record<string, Session[]>>((acc, s) => {
    const k = monthKey(s.starts_at);
    if (!acc[k]) acc[k] = [];
    acc[k].push(s);
    return acc;
  }, {});

  // ── Handlers ─────────────────────────────────────────────────────────────────

  function switchMode(next: "individual" | "package") {
    setMode(next);
    setSelectedIds(new Set());
    setPayError(null);
    setRegisterError(null);
  }

  function toggleSession(id: string, isFull: boolean) {
    if (isFull && !selectedIds.has(id)) return;
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else if (next.size < maxSelect) {
        next.add(id);
      }
      return next;
    });
  }

  async function handlePayNow() {
    if (!name.trim() || !email.trim() || selectedIds.size === 0) return;
    setPaying(true);
    setPayError(null);
    try {
      const res = await fetch(`${EDGE_BASE}/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionIds: Array.from(selectedIds),
          customerEmail: email.trim().toLowerCase(),
          customerName: name.trim(),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Payment initiation failed");
      window.location.href = data.url!;
    } catch (err) {
      setPayError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setPaying(false);
    }
  }

  async function handleLookup() {
    if (!pkgEmail.trim()) return;
    setLookingUp(true);
    setPkgLookupError(null);
    setFoundPkg(null);
    setSelectedIds(new Set());

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const today = new Date().toISOString().split("T")[0];

    const { data: rows, error } = await supabase
      .from("blocksmiths_packages")
      .select("*")
      .eq("customer_email", pkgEmail.trim().toLowerCase())
      .order("created_at", { ascending: false });

    const data = (rows ?? []).find((pkg) =>
      (pkg.sessions_remaining === null || pkg.sessions_remaining > 0) &&
      (pkg.valid_through === null || pkg.valid_through >= today)
    ) ?? null;

    if (error) {
      setPkgLookupError(
        "Lookup failed — please try again or email coachcooper@mytrenches.com."
      );
    } else if (!data) {
      setPkgLookupError(
        "No active package found for this email. Double-check the address you used at checkout."
      );
    } else {
      setFoundPkg(data as Package);
      setPkgName((data as Package).customer_name);
    }
    setLookingUp(false);
  }

  async function handleRegister() {
    if (!foundPkg || !pkgName.trim() || selectedIds.size === 0) return;
    setRegistering(true);
    setRegisterError(null);
    try {
      const res = await fetch(`${EDGE_BASE}/redeem-package`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionIds: Array.from(selectedIds),
          packageId: foundPkg.id,
          customerEmail: foundPkg.customer_email,
          customerName: pkgName.trim(),
        }),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok) throw new Error(data.error ?? "Registration failed");
      setSuccess(true);
    } catch (err) {
      setRegisterError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Email coachcooper@mytrenches.com."
      );
      setRegistering(false);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────────

  const showGrid =
    !success &&
    (mode === "individual" || (mode === "package" && foundPkg !== null));

  const totalDollars = selectedIds.size * 30;

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundColor: "#F5F6F8" }}>
      {/* Nav */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: "#192B57", borderColor: "#0E5B8E" }}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded flex items-center justify-center text-white font-black text-sm"
              style={{ backgroundColor: "#25C0D5" }}
            >
              B
            </div>
            <span className="font-bold text-white tracking-wide text-lg">BLOCKSMITHS</span>
          </Link>
          <Link href="/" className="text-sm font-medium" style={{ color: "#8a9ab5" }}>
            ← Back to site
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div
        className="py-10 px-6 text-center"
        style={{ background: "linear-gradient(135deg, #192B57 0%, #0E5B8E 100%)" }}
      >
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Book Group Training</h1>
        <p className="text-blue-200">Tue &amp; Fri · 5:30–6:30 PM · $30 per session · Northern Colorado</p>
      </div>

      {/* Mode toggle */}
      <div className="bg-white border-b" style={{ borderColor: "#e2e8f0" }}>
        <div className="max-w-3xl mx-auto px-6 flex">
          {(["individual", "package"] as const).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              className="flex-1 py-4 text-sm font-bold border-b-2 transition-colors"
              style={{
                borderColor: mode === m ? "#25C0D5" : "transparent",
                color: mode === m ? "#192B57" : "#8a9ab5",
              }}
            >
              {m === "individual" ? "Pay Per Session ($30 each)" : "Use Package or Membership"}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-6 py-8 space-y-6">

        {/* Package: email lookup */}
        {mode === "package" && !success && (
          <div className="bg-white rounded-xl border p-6" style={{ borderColor: "#e2e8f0" }}>
            <h2 className="font-bold text-base mb-1" style={{ color: "#192B57" }}>
              Find your package
            </h2>
            <p className="text-sm mb-4" style={{ color: "#5a6478" }}>
              Enter the email you used when you purchased.
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                value={pkgEmail}
                onChange={(e) => setPkgEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLookup()}
                placeholder="your@email.com"
                className="flex-1 rounded-lg border px-4 py-2.5 text-sm outline-none"
                style={{ borderColor: "#e2e8f0", color: "#192B57" }}
              />
              <button
                onClick={handleLookup}
                disabled={lookingUp || !pkgEmail.trim()}
                className="px-5 py-2.5 rounded-lg text-sm font-bold transition-opacity disabled:opacity-50"
                style={{ backgroundColor: "#192B57", color: "white" }}
              >
                {lookingUp ? "Looking up…" : "Find Package"}
              </button>
            </div>
            {pkgLookupError && (
              <p className="text-sm mt-3" style={{ color: "#e53e3e" }}>
                {pkgLookupError}
              </p>
            )}
          </div>
        )}

        {/* Package: found */}
        {mode === "package" && foundPkg && !success && (
          <div
            className="rounded-xl p-5 border"
            style={{ backgroundColor: "#192B57", borderColor: "#0E5B8E" }}
          >
            <div className="flex items-start justify-between">
              <div>
                <div
                  className="text-xs font-bold tracking-widest uppercase mb-1"
                  style={{ color: "#25C0D5" }}
                >
                  {PACKAGE_LABELS[foundPkg.package_type] ?? foundPkg.package_type}
                </div>
                <div className="text-white font-bold">{creditsText(foundPkg)}</div>
                {foundPkg.valid_through && (
                  <div className="text-xs mt-0.5" style={{ color: "#8a9ab5" }}>
                    Valid through{" "}
                    {new Date(foundPkg.valid_through + "T12:00:00Z").toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                )}
              </div>
              <button
                onClick={() => { setFoundPkg(null); setSelectedIds(new Set()); }}
                className="text-xs"
                style={{ color: "#8a9ab5" }}
              >
                Change ×
              </button>
            </div>
            {foundPkg.sessions_remaining !== null && (
              <p className="text-xs mt-3" style={{ color: "#8a9ab5" }}>
                Select up to {foundPkg.sessions_remaining} session
                {foundPkg.sessions_remaining !== 1 ? "s" : ""} below.
              </p>
            )}
          </div>
        )}

        {/* Success */}
        {success && (
          <div
            className="bg-white rounded-xl border p-8 text-center"
            style={{ borderColor: "#e2e8f0" }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: "rgba(37,192,213,0.15)" }}
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#25C0D5" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-black mb-2" style={{ color: "#192B57" }}>
              You&apos;re registered.
            </h2>
            <p className="text-sm mb-1" style={{ color: "#5a6478" }}>
              {selectedIds.size} session{selectedIds.size !== 1 ? "s" : ""} locked in for {pkgName}.
            </p>
            <p className="text-sm mb-6" style={{ color: "#5a6478" }}>
              See you on the field.{" "}
              <a href="mailto:coachcooper@mytrenches.com" style={{ color: "#25C0D5" }}>
                coachcooper@mytrenches.com
              </a>
            </p>
            <Link href="/" className="text-sm font-semibold" style={{ color: "#25C0D5" }}>
              ← Back to Blocksmiths
            </Link>
          </div>
        )}

        {/* Session grid */}
        {showGrid && (
          <div className="space-y-6">
            {loadingSessions ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-24 rounded-xl animate-pulse"
                    style={{ backgroundColor: "#e2e8f0" }}
                  />
                ))}
              </div>
            ) : sessions.length === 0 ? (
              <p className="text-center py-12 text-sm" style={{ color: "#5a6478" }}>
                No upcoming sessions found. Email{" "}
                <a href="mailto:coachcooper@mytrenches.com" style={{ color: "#25C0D5" }}>
                  coachcooper@mytrenches.com
                </a>
              </p>
            ) : (
              Object.entries(grouped).map(([month, monthSessions]) => (
                <div key={month}>
                  <h3
                    className="text-xs font-bold tracking-widest uppercase mb-3"
                    style={{ color: "#8a9ab5" }}
                  >
                    {month}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {monthSessions.map((s) => {
                      const isFull = s.enrolled >= s.capacity;
                      const isSelected = selectedIds.has(s.id);
                      const atLimit = !isSelected && selectedIds.size >= maxSelect;
                      const disabled = isFull || atLimit;
                      return (
                        <button
                          key={s.id}
                          onClick={() => !disabled && toggleSession(s.id, isFull)}
                          disabled={disabled}
                          className="relative rounded-xl border-2 p-4 text-left transition-all duration-150"
                          style={{
                            borderColor: isSelected ? "#25C0D5" : "#e2e8f0",
                            backgroundColor: isSelected ? "rgba(37,192,213,0.07)" : "white",
                            opacity: disabled ? 0.45 : 1,
                            cursor: disabled ? "not-allowed" : "pointer",
                          }}
                        >
                          <div
                            className="text-xs font-bold mb-1"
                            style={{ color: isSelected ? "#25C0D5" : "#0E5B8E" }}
                          >
                            {dayChip(s.starts_at)}
                          </div>
                          <div
                            className="font-bold text-sm leading-tight mb-1"
                            style={{ color: "#192B57" }}
                          >
                            {sessionLabel(s.starts_at)}
                          </div>
                          <div
                            className="text-xs"
                            style={{ color: isFull ? "#e53e3e" : "#5a6478" }}
                          >
                            {isFull
                              ? "Full"
                              : `${s.capacity - s.enrolled} spot${s.capacity - s.enrolled !== 1 ? "s" : ""} left`}
                          </div>
                          {isSelected && (
                            <div
                              className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                              style={{ backgroundColor: "#25C0D5" }}
                            >
                              <svg
                                width="10"
                                height="10"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="white"
                                strokeWidth={3}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Individual: payment form */}
        {mode === "individual" && selectedIds.size > 0 && (
          <div className="bg-white rounded-xl border p-6" style={{ borderColor: "#e2e8f0" }}>
            <div className="flex items-center justify-between mb-5">
              <div className="font-bold" style={{ color: "#192B57" }}>
                {selectedIds.size} session{selectedIds.size !== 1 ? "s" : ""} selected
              </div>
              <div className="text-xl font-black" style={{ color: "#192B57" }}>
                ${totalDollars}
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label
                  className="block text-xs font-bold mb-1.5 uppercase tracking-wide"
                  style={{ color: "#5a6478" }}
                >
                  Athlete&apos;s name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First Last"
                  className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none"
                  style={{ borderColor: "#e2e8f0", color: "#192B57" }}
                />
              </div>
              <div>
                <label
                  className="block text-xs font-bold mb-1.5 uppercase tracking-wide"
                  style={{ color: "#5a6478" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none"
                  style={{ borderColor: "#e2e8f0", color: "#192B57" }}
                />
              </div>
            </div>
            {payError && (
              <p className="text-sm mb-3" style={{ color: "#e53e3e" }}>
                {payError}
              </p>
            )}
            <button
              onClick={handlePayNow}
              disabled={paying || !name.trim() || !email.trim()}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-opacity disabled:opacity-50"
              style={{ backgroundColor: "#25C0D5", color: "#192B57" }}
            >
              {paying ? "Redirecting to payment…" : `Pay $${totalDollars} → Secure Checkout`}
            </button>
            <p className="text-xs text-center mt-3" style={{ color: "#8a9ab5" }}>
              Powered by Stripe · No card data stored on this site
            </p>
            <p className="text-xs text-center mt-2 leading-relaxed" style={{ color: "#8a9ab5" }}>
              If you provide a phone number at checkout, you consent to receive booking confirmations via SMS. Msg &amp; data rates may apply. Reply STOP to opt out.{" "}
              <a href="/privacy" style={{ color: "#25C0D5" }}>Privacy Policy</a>
            </p>
          </div>
        )}

        {/* Package: confirm + register */}
        {mode === "package" && foundPkg && !success && selectedIds.size > 0 && (
          <div className="bg-white rounded-xl border p-6" style={{ borderColor: "#e2e8f0" }}>
            <div className="flex items-center justify-between mb-5">
              <div className="font-bold" style={{ color: "#192B57" }}>
                {selectedIds.size} session{selectedIds.size !== 1 ? "s" : ""} selected
              </div>
              {foundPkg.sessions_remaining !== null && (
                <div className="text-sm" style={{ color: "#5a6478" }}>
                  {foundPkg.sessions_remaining - selectedIds.size} credit
                  {foundPkg.sessions_remaining - selectedIds.size !== 1 ? "s" : ""} left after
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-xs font-bold mb-1.5 uppercase tracking-wide"
                style={{ color: "#5a6478" }}
              >
                Confirm athlete&apos;s name
              </label>
              <input
                type="text"
                value={pkgName}
                onChange={(e) => setPkgName(e.target.value)}
                placeholder="First Last"
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none"
                style={{ borderColor: "#e2e8f0", color: "#192B57" }}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-xs font-bold mb-1.5 uppercase tracking-wide"
                style={{ color: "#5a6478" }}
              >
                Phone number <span className="font-normal normal-case">— optional, for session reminders</span>
              </label>
              <input
                type="tel"
                value={pkgPhone}
                onChange={(e) => setPkgPhone(e.target.value)}
                placeholder="(970) 555-0100"
                className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none"
                style={{ borderColor: "#e2e8f0", color: "#192B57" }}
              />
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "#8a9ab5" }}>
                By providing your number, you consent to receive booking confirmations and session reminders via SMS from Blocksmiths. Msg &amp; data rates may apply. Reply STOP to opt out.{" "}
                <a href="/privacy" style={{ color: "#25C0D5" }}>Privacy Policy</a>
              </p>
            </div>
            {registerError && (
              <p className="text-sm mb-3" style={{ color: "#e53e3e" }}>
                {registerError}
              </p>
            )}
            <button
              onClick={handleRegister}
              disabled={registering || !pkgName.trim()}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-opacity disabled:opacity-50"
              style={{ backgroundColor: "#25C0D5", color: "#192B57" }}
            >
              {registering
                ? "Registering…"
                : `Register for ${selectedIds.size} Session${selectedIds.size !== 1 ? "s" : ""}`}
            </button>
          </div>
        )}

        {!success && (
          <p className="text-center text-sm pb-4" style={{ color: "#8a9ab5" }}>
            Questions?{" "}
            <a
              href="mailto:coachcooper@mytrenches.com"
              className="underline"
              style={{ color: "#25C0D5" }}
            >
              coachcooper@mytrenches.com
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
