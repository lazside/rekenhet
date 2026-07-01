"use client";

import { useState, useCallback } from"react";
import { HardDrive, RotateCcw } from"lucide-react";
import { cn } from"@/lib/utils";
import {
 usePersistentProfile,
 type UserProfile,
} from"@/lib/profile/persistent-profile";

interface ProfileToggleProps {
 /** Current form values to save when user toggles ON */
 currentValues: Record<string, number | string>;
 /** Field → profile-key mapping for intelligent merging */
 fieldMapping: Record<string, keyof UserProfile>;
 /** Optional className */
 className?: string;
 /** Called after profile is loaded so the parent can overwrite its state */
 onProfileLoaded?: (profile: UserProfile) => void;
}

/**
 * ProfileToggle —"Onthoud mijn basisinstellingen"
 *
 * A styled toggle that saves/loads user baseline parameters to/from
 * localStorage. Placed near the form's primary action area.
 *
 * Privacy: 100% client-side. No data touches the server.
 */
export function ProfileToggle({
 currentValues,
 fieldMapping,
 className,
 onProfileLoaded,
}: ProfileToggleProps) {
 const { profile, saveFields, clearProfile, hasProfile } = usePersistentProfile();
 const [enabled, setEnabled] = useState(hasProfile);
 const [justLoaded, setJustLoaded] = useState(false);

 // On first mount: if a profile exists and a consumer provided onProfileLoaded
 // we fire it so the parent overwrites defaults.
 // This runs in a microtask to avoid React state-sync warnings.
 useState(() => {
 if (hasProfile && profile && onProfileLoaded && !justLoaded) {
 // Defer the callback — parent needs to be fully mounted first
 requestAnimationFrame(() => {
 onProfileLoaded(profile);
 setJustLoaded(true);
 });
 }
 });

 const handleToggle = useCallback(() => {
 if (enabled) {
 // Turning OFF → clear profile
 clearProfile();
 setEnabled(false);
 } else {
 // Turning ON → save current form values as profile
 const extracted: Partial<UserProfile> = {};
 for (const [fieldKey, profileKey] of Object.entries(fieldMapping)) {
 const val = currentValues[fieldKey];
 if (val !== undefined) {
 (extracted as any)[profileKey] = val;
 }
 }
 saveFields(extracted as UserProfile);
 setEnabled(true);
 }
 }, [enabled, currentValues, fieldMapping, saveFields, clearProfile]);

 const handleReset = useCallback(() => {
 clearProfile();
 setEnabled(false);
 }, [clearProfile]);

 return (
 <div
 className={cn(
"flex flex-wrap items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-sm",
"",
 className
 )}
 >
 {/* Toggle switch */}
 <button
 type="button"
 role="switch"
 aria-checked={enabled}
 aria-label="Onthoud mijn basisinstellingen"
 onClick={handleToggle}
 className={cn(
"relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200",
"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
 enabled ?"bg-indigo-600" :"bg-gray-200"
 )}
 >
 <span
 className={cn(
"pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow ring-0 transition-transform duration-200",
 enabled ?"translate-x-4" :"translate-x-0"
 )}
 />
 </button>

 {/* Label */}
 <span className="flex-1 text-xs font-medium text-gray-600">
 {enabled ? (
 <>
 <HardDrive className="mr-1 inline h-3 w-3 text-blue-500" />
 Basisinstellingen opgeslagen
 </>
 ) : (
"Onthoud mijn basisinstellingen"
 )}
 </span>

 {/* Reset button (only visible when enabled) */}
 {enabled && (
 <button
 type="button"
 onClick={handleReset}
 className="inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors :text-slate-300 :bg-slate-800"
 aria-label="Opgeslagen instellingen wissen"
 >
 <RotateCcw className="h-3 w-3" />
 Wissen
 </button>
 )}
 </div>
 );
}
