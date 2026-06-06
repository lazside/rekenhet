/**
 * GET /api/vehicle/[licenseplate]
 *
 * Fetches Dutch vehicle data from RDW Open Data, calculates MRB and bijtelling.
 *
 * Response:
 *   200 { data: RdwVehicleData, mrb, bijtelling, mrbTariffs, source }
 *   404 { error: "Kenteken niet gevonden" }
 *   400 { error: "Ongeldig kentekenformaat" }
 */
import { NextRequest, NextResponse } from "next/server";
import { fetchVehicleData } from "@/lib/vehicle/rdw";
import { calculateMrb, calculateBijtelling, getProvincies } from "@/lib/vehicle/mrb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ licenseplate: string }> }
) {
  const { licenseplate } = await params;
  const { data, error, source } = await fetchVehicleData(licenseplate);

  if (error) {
    const status = error.includes("Ongeldig kentekenformaat") || error.includes("voer een Nederlands") ? 400 : error.includes("niet bereikbaar") || error.includes("geen verbinding") ? 503 : 404;
    return NextResponse.json({ error }, { status });
  }

  if (!data) {
    return NextResponse.json({ error: "Kenteken niet gevonden" }, { status: 404 });
  }

  const isEv = data.brandstof_omschrijving?.toLowerCase().includes("elektrisch");
  const isPhev =
    !isEv && (data.brandstof_omschrijving?.toLowerCase().includes("hybride") || data.zuinigheidslabel === "A");
  const firstRegYear = data.datum_eerste_toelating
    ? parseInt(data.datum_eerste_toelating.substring(0, 4), 10)
    : undefined;
  const vehicleAge = firstRegYear ? new Date().getFullYear() - firstRegYear : undefined;
  const isOldtimer = vehicleAge !== undefined && vehicleAge >= 35;

  // Fijnstoftoeslag: dieselvoertuigen van vóór ~2011 (oude roetfilter-eis)
  const isDiesel = data.brandstof_omschrijving?.toLowerCase().includes("diesel");
  const hasFijnstoftoeslag = !!isDiesel && (firstRegYear === undefined || firstRegYear < 2011);

  // Calculate MRB for all provinces
  const provincies = getProvincies();
  const mrbResults = provincies.map((p) =>
    calculateMrb(
      data.massa_ledig_voertuig,
      data.brandstof_omschrijving,
      p.slug,
      hasFijnstoftoeslag,
      !!isEv,
      !!isPhev,
      !!isOldtimer,
    )
  );

  // Calculate bijtelling (if catalogusprijs > 0)
  const bijtelling = data.catalogusprijs > 0
    ? calculateBijtelling(data.catalogusprijs, data.co2_uitstoot_gecombineerd, !!isEv)
    : null;

  return NextResponse.json({
    data: {
      kenteken: data.kenteken,
      merk: data.merk,
      model: data.handelsbenaming,
      gewicht: data.massa_ledig_voertuig,
      catalogusprijs: data.catalogusprijs,
      brandstof: data.brandstof_omschrijving,
      co2: data.co2_uitstoot_gecombineerd,
      eersteToelating: data.datum_eerste_toelating,
      zuinigheidslabel: data.zuinigheidslabel,
      apkVervaldatum: data.apkVervaldatum || null,
      isEv: !!isEv,
      isPhev: !!isPhev,
      isOldtimer,
      vehicleAge,
    },
    mrb: mrbResults,
    bijtelling,
    source,
  });
}
