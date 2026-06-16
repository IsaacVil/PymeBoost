"use client";
// PymeBoost landing — faithful port of prototype/app/auth.jsx (AuthScreen):
// above-the-fold auth split-screen + informational sections (features, process,
// pricing, CTA). Login/register are wired to the real backend.
import { useState } from "react";

import { AuthHero } from "@/features/auth/components/AuthHero";
import {
  LandingCTA,
  LandingFeatures,
  LandingPricing,
  LandingProcess,
} from "@/features/auth/components/landing/LandingSections";

type Tab = "login" | "register";
type Role = "pyme" | "advisor";

export default function LandingPage() {
  const [tab, setTab] = useState<Tab>("login");
  const [regType, setRegType] = useState<Role>("pyme");

  // Pricing / CTA buttons jump to the register form at the top.
  const onSignup = (role: Role) => {
    setRegType(role);
    setTab("register");
    document.getElementById("auth-top")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--paper)" }}>
      <AuthHero tab={tab} setTab={setTab} regType={regType} setRegType={setRegType} />
      <LandingFeatures />
      <LandingProcess />
      <LandingPricing onSignup={onSignup} />
      <LandingCTA onSignup={onSignup} />
    </div>
  );
}
