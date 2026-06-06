/**
 * GET /api/solar
 *
 * Proxies to the European Commission PVGIS API for solar yield calculations.
 * No API key required — PVGIS is free and unauthenticated.
 *
 * Query params:
 *   region  - Dutch region name (or lat/lon)
 *   panels  - number of panels
 *   wp      - watt-peak per panel (e.g., 400)
 *   pitch   - roof pitch in degrees (0-90)
 *   azimuth - orientation in degrees (0=N, 90=E, 180=S, 270=W)
 *
 * Response:
 *   { yearlyKwh, monthlyData, financial, region, source }
 */
import { NextRequest, NextResponse } from "next/server";
import { REGIONS } from "@/lib/solar/regions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PVGIS_URL = "https://re.jrc.ec.europa.eu/api/v5_2/PVcalc";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const regionName = searchParams.get("region") || "Nederland (centraal)";
  const panels = parseInt(searchParams.get("panels") || "10", 10);
  const wp = parseInt(searchParams.get("wp") || "400", 10);
  const pitch = parseInt(searchParams.get("pitch") || "35", 10);
  const azimuth = parseInt(searchParams.get("azimuth") || "180", 10);

  const region = REGIONS.find(
    (r) => r.name.toLowerCase() === regionName.toLowerCase()
  );
  if (!region) {
    return NextResponse.json({ error: `Onbekende regio: ${regionName}` }, { status: 400 });
  }

  const peakPower = panels * wp; // total Wp
  // Loss: 14% default, mounting: building, slope: pitch, azimuth: orientation
  const pvgisUrl = `${PVGIS_URL}?lat=${region.lat}&lon=${region.lon}&peakpower=${peakPower}&loss=14&mountingplace=building&slope=${pitch}&azimuth=${azimuth}&outputformat=json`;

  try {
    const res = await fetch(pvgisUrl, { signal: AbortSignal.timeout(15000) });
    if (!res.ok) {
      throw new Error(`PVGIS returned ${res.status}`);
    }

    const data = await res.json();
    const yearlyKwh = Math.round(data?.outputs?.totals?.fixed?.E_y || region.avgKwhPerKwp * peakPower / 1000);

    // Monthly data for chart
    const monthlyData: { month: string; kwh: number }[] = [];
    if (data?.outputs?.monthly?.fixed) {
      const months = ["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"];
      data.outputs.monthly.fixed.forEach((m: any, i: number) => {
        monthlyData.push({ month: months[i] || `m${i+1}`, kwh: Math.round(m.E_m) });
      });
    }

    // Financial projections
    const kWhPrijs = 0.25; // average Dutch electricity price 2026
    const savingsPerYear = Math.round(yearlyKwh * kWhPrijs);
    const panelCost = 700; // avg cost per panel installed
    const totalCost = panels * panelCost;
    const roi: { year: number; cumulative: number; remaining: number }[] = [];
    let cumulative = 0;
    for (let y = 1; y <= 15; y++) {
      cumulative += savingsPerYear;
      roi.push({ year: y, cumulative, remaining: Math.max(0, totalCost - cumulative) });
    }
    const paybackYears = totalCost / savingsPerYear;

    return NextResponse.json({
      data: {
        region: region.name,
        lat: region.lat,
        lon: region.lon,
        panels,
        totalWp: peakPower,
        pitch,
        azimuth,
      },
      yearlyKwh,
      monthlyData,
      financial: {
        totalCost,
        savingsPerYear,
        paybackYears: Math.round(paybackYears * 10) / 10,
        paybackMonths: Math.round(paybackYears * 12),
        roi,
      },
      source: "pvgis",
    });

  } catch (err: any) {
    // Fallback: use region average
    const peakPower = panels * wp;
    const yearlyKwh = Math.round(region.avgKwhPerKwp * peakPower / 1000);
    const savingsPerYear = Math.round(yearlyKwh * 0.25);
    const totalCost = panels * 700;
    const roi = [];
    let cumulative = 0;
    for (let y = 1; y <= 15; y++) { cumulative += savingsPerYear; roi.push({ year: y, cumulative, remaining: Math.max(0, totalCost - cumulative) }); }

    return NextResponse.json({
      data: { region: region.name, lat: region.lat, lon: region.lon, panels, totalWp: peakPower, pitch, azimuth },
      yearlyKwh,
      monthlyData: [],
      financial: { totalCost, savingsPerYear, paybackYears: Math.round((totalCost / savingsPerYear) * 10) / 10, paybackMonths: Math.round((totalCost / savingsPerYear) * 12), roi },
      source: "fallback",
    });
  }
}
