"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Profile shape ────────────────────────────────────────────

export interface UserProfile {
  /** Geselecteerde provincie (MRB, belastingen) */
  defaultProvince?: string;
  /** Man / Vrouw (gezondheid, BMI) */
  geslacht?: "man" | "vrouw";
  /** Leeftijd in jaren (hartslag, pensioen) */
  leeftijd?: number;
  /** Postcode (gemeentelijke belastingen) */
  postcode?: string;
  /** Huishouden-type (toeslagen) */
  householdType?: "alleenstaand" | "samen" | "gezin";
  /** Jaarlijkse zakelijke kosten (ZZP, ondernemen) */
  annualBusinessExpenses?: number;
  /** Laatst bekende timestamp */
  _savedAt?: number;
}

const STORAGE_KEY = "rekenhet-user-profile";

// ─── Read / write helpers (SSR-safe) ──────────────────────────

function readProfile(): UserProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UserProfile;
    // Basic shape validation — must be an object with at least one real key
    if (parsed && typeof parsed === "object" && Object.keys(parsed).some((k) => !k.startsWith("_"))) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

function writeProfile(profile: UserProfile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...profile, _savedAt: Date.now() }));
  } catch {
    // localStorage quota exceeded or disabled — silent failure
  }
}

function clearProfile(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

// ─── Hook ─────────────────────────────────────────────────────

export interface UsePersistentProfileReturn {
  /** Saved profile (null if never saved or cleared) */
  profile: UserProfile | null;
  /** Merge new fields into the stored profile */
  saveFields: (fields: Partial<UserProfile>) => void;
  /** Replace the entire profile */
  saveProfile: (profile: UserProfile) => void;
  /** Delete the stored profile entirely */
  clearProfile: () => void;
  /** Whether a saved profile exists */
  hasProfile: boolean;
}

/**
 * usePersistentProfile — localStorage-backed user profile.
 *
 * Stores common Dutch calculator baseline variables entirely
 * in the browser. NEVER sends data to the server — fully
 * GDPR-compliant by design.
 *
 * Usage:
 *   const { profile, saveFields, hasProfile } = usePersistentProfile();
 *
 *   // On calc mount: hydrate defaults from profile
 *   useEffect(() => {
 *     if (profile?.geslacht) setGeslacht(profile.geslacht);
 *   }, [profile]);
 *
 *   // On "save my defaults" click:
 *   saveFields({ geslacht: "man", leeftijd: 35 });
 */
export function usePersistentProfile(): UsePersistentProfileReturn {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [ready, setReady] = useState(false);

  // Hydrate on mount (client-side only)
  useEffect(() => {
    setProfile(readProfile());
    setReady(true);
  }, []);

  const saveFields = useCallback((fields: Partial<UserProfile>) => {
    setProfile((prev) => {
      const merged: UserProfile = { ...(prev || {}), ...fields };
      writeProfile(merged);
      return merged;
    });
  }, []);

  const saveProfile = useCallback((newProfile: UserProfile) => {
    writeProfile(newProfile);
    setProfile(newProfile);
  }, []);

  const resetProfile = useCallback(() => {
    clearProfile();
    setProfile(null);
  }, []);

  return {
    profile,
    saveFields,
    saveProfile,
    clearProfile: resetProfile,
    hasProfile: ready && profile !== null,
  };
}

// ─── Profile-aware defaults helper ────────────────────────────

export type FormValue = Record<string, number | string>;

/**
 * Override field defaults with values from a saved profile and a
 * field-to-profile-key mapping.
 *
 * @param formDefaults — the calculator's raw field defaults
 * @param profile — the saved UserProfile (or null)
 * @param mapping — { fieldKey: "profileKey" } e.g. { provincie: "defaultProvince" }
 * @returns merged defaults (profile values win where available)
 */
export function mergeProfileDefaults(
  formDefaults: FormValue,
  profile: UserProfile | null,
  mapping: Record<string, keyof UserProfile>
): FormValue {
  if (!profile) return formDefaults;
  const merged = { ...formDefaults };
  for (const [fieldKey, profileKey] of Object.entries(mapping)) {
    const pval = profile[profileKey];
    if (pval !== undefined && pval !== null) {
      merged[fieldKey] = pval as string | number;
    }
  }
  return merged;
}
