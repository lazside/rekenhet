/**
 * GET /api/route-distance
 *
 * Queries the free OSRM routing API for distance & duration between two Dutch postcodes.
 * No API key required.
 *
 * Query params:
 *   from - Dutch postcode (e.g., "3011" or "3011AB")
 *   to   - Dutch postcode
 *
 * Response:
 *   { from, to, fromName, toName, distanceKm, durationMin }
 */
import { NextRequest, NextResponse } from "next/server";
import coordsData from "@/data/postcode-coords.json";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OSRM_BASE = "https://router.project-osrm.org/route/v1/driving";

function getCoordsForPostcode(raw: string): { lat: number; lon: number; name: string } | null {
  const digits = raw.replace(/[^0-9]/g, "").slice(0, 2);
  const areas = (coordsData as { areas: { prefix: string; name: string; lat: number; lon: number }[] }).areas;
  const match = areas.find((a) => a.prefix === digits);
  if (!match) return null;
  return { lat: match.lat, lon: match.lon, name: match.name };
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fromRaw = searchParams.get("from") || "";
  const toRaw = searchParams.get("to") || "";

  if (!fromRaw || !toRaw) {
    return NextResponse.json({ error: "Parameter 'from' en 'to' zijn verplicht" }, { status: 400 });
  }

  const from = getCoordsForPostcode(fromRaw);
  const to = getCoordsForPostcode(toRaw);
  if (!from) return NextResponse.json({ error: `Onbekende postcode: ${fromRaw}` }, { status: 400 });
  if (!to) return NextResponse.json({ error: `Onbekende postcode: ${toRaw}` }, { status: 400 });

  // OSRM uses lon,lat order
  const osrmUrl = `${OSRM_BASE}/${from.lon},${from.lat};${to.lon},${to.lat}?overview=false`;

  try {
    const res = await fetch(osrmUrl, { signal: AbortSignal.timeout(10000) });
    if (!res.ok) throw new Error(`OSRM returned ${res.status}`);

    const data = await res.json();
    if (!data?.routes?.[0]) {
      throw new Error("Geen route gevonden");
    }

    const distanceKm = Math.round((data.routes[0].distance / 1000) * 10) / 10;
    const durationMin = Math.round(data.routes[0].duration / 60);

    return NextResponse.json({
      from: fromRaw.toUpperCase(),
      to: toRaw.toUpperCase(),
      fromName: from.name,
      toName: to.name,
      distanceKm,
      durationMin,
      source: "osrm",
    });

  } catch (err: any) {
    // Fallback: straight-line distance approximation (Haversine)
    const R = 6371;
    const dLat = ((to.lat - from.lat) * Math.PI) / 180;
    const dLon = ((to.lon - from.lon) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((from.lat * Math.PI) / 180) *
        Math.cos((to.lat * Math.PI) / 180) *
        Math.sin(dLon / 2) ** 2;
    const straightKm = Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
    const roadKm = Math.round(straightKm * 1.3 * 10) / 10; // ~30% longer via road

    return NextResponse.json({
      from: fromRaw.toUpperCase(),
      to: toRaw.toUpperCase(),
      fromName: from.name,
      toName: to.name,
      distanceKm: roadKm,
      durationMin: Math.round(roadKm * 1.5),
      source: "fallback",
    });
  }
}
