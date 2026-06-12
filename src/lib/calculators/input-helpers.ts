/**
 * Input helper utilities — voorkomt leading zero bugs.
 *
 * Gebruik in ALLE hand-rolled number inputs:
 *
 *   <input type="text" inputMode="numeric" pattern="[0-9]*"
 *     value={numState}
 *     onChange={(e) => setNumState(numOnChange(e.target.value))}
 *   />
 *
 * Of als je onChange combineert met een setter:
 *
 *   onChange={(e) => setMyNum(numOnChange(e.target.value))}
 *
 * NumConvert: Converteer pas bij berekening:
 *   const result = computeFunction(numConvert(myNum));
 */

/** Strip alles behalve cijfers/punt/komma, strip leading zeros */
export function numOnChange(raw: string): string {
  let v = raw.replace(/[^0-9.,]/g, "");
  // Leading zeros strippen (behalve "0" of "0." / "0,")
  if (v.length > 1 && v.startsWith("0") && v[1] !== "." && v[1] !== ",") {
    v = v.replace(/^0+/, "") || "0";
  }
  return v;
}

/** Converteer string naar number voor berekening */
export function numConvert(v: string): number {
  if (v === "" || v === "-") return 0;
  return Number(v.replace(",", ".")) || 0;
}
