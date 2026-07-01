/**
 * Content Page Registry — Index
 *
 * Import all content page files to register them.
 * Then export the lookup functions.
 */
import "./pages/afstand-tussen-punten";
import "./pages/annuiteiten-lasten";
import "./pages/aow-leeftijd";
import "./pages/auto-motor-omrekenen";
import "./pages/autokosten-bijtelling";
import "./pages/bloeddruk";
import "./pages/bmi";
import "./pages/bonus-netto";
import "./pages/box3";
import "./pages/break-even-analyse";
import "./pages/breuk-vereenvoudigen";
import "./pages/bruto-netto-salaris-2026";
import "./pages/btw";
import "./pages/btw-incl-excl";
import "./pages/btw-privegebruik";
import "./pages/calorie-verbruik-activiteit";
import "./pages/caloriebehoefte";
import "./pages/cirkel-berekenen";
import "./pages/compound-interest";
import "./pages/costplus-prijs";
import "./pages/dagen-tot-datum";
import "./pages/data-omrekenen";
import "./pages/datum-optellen";
import "./pages/datum-verschil";
import "./pages/decimaal-naar-breuk";
import "./pages/dertiende-maand";
import "./pages/dividend";
import "./pages/driehoek-oppervlakte";
import "./pages/eigen-risico-zorg";
import "./pages/eindejaarsuitkering";
import "./pages/energie-omrekenen";
import "./pages/energielabel";
import "./pages/enkelvoudige-interest";
import "./pages/extra-aflossen";
import "./pages/fietsvermogen";
import "./pages/fire";
import "./pages/gewicht-omrekenen";
import "./pages/ggd-berekenen";
import "./pages/hardlooppace";
import "./pages/hartslagzones";
import "./pages/huurtoeslag";
import "./pages/huurverhoging";
import "./pages/ideaal-gewicht";
import "./pages/ideale-lengte-kind";
import "./pages/inflatie-calculator";
import "./pages/investeringsaftrek";
import "./pages/isde-subsidie";
import "./pages/kenteken-check";
import "./pages/kgv-berekenen";
import "./pages/kinderalimentatie";
import "./pages/kinderbijslag";
import "./pages/koken-omrekenen";
import "./pages/krediettermijn";
import "./pages/kwadratische-vergelijking";
import "./pages/leeftijd-berekenen";
import "./pages/lengte-omrekenen";
import "./pages/lichaamsoppervlakte";
import "./pages/lichaamsvet-percentage";
import "./pages/lineaire-aflossing";
import "./pages/machtsverheffen";
import "./pages/maximale-hypotheek";
import "./pages/netto-vakantiegeld";
import "./pages/omzetbelasting";
import "./pages/ontslagvergoeding";
import "./pages/oppervlakte";
import "./pages/oppervlakte-omrekenen";
import "./pages/overuren";
import "./pages/overwaarde";
import "./pages/parttime-factor";
import "./pages/parttime-salaris-berekenen";
import "./pages/procenten";
import "./pages/reiskosten-woonwerk";
import "./pages/richtingscoefficient";
import "./pages/ritkosten";
import "./pages/schenkbelasting";
import "./pages/schrikkeljaar";
import "./pages/snelheidsboete";
import "./pages/spaardoel";
import "./pages/studieschuld-terugbetalen";
import "./pages/thuiswerkvergoeding";
import "./pages/tijdrekenen";
import "./pages/uurtarief";
import "./pages/uurtarief-kostprijs";
import "./pages/vakantiedagen";
import "./pages/vakantiegeld-berekenen";
import "./pages/verhuiskosten";
import "./pages/vermogensbelasting-box3";
import "./pages/vof-winstverdeling";
import "./pages/wandeltempo";
import "./pages/waterbehoefte";
import "./pages/weeknummer";
import "./pages/werkdagen-tellen";
import "./pages/winst-verlies";
import "./pages/worteltrekken";
import "./pages/ww-uitkering";
import "./pages/zelfstandigenaftrek";
import "./pages/ziektewet-uitkering";
import "./pages/zwangerschap";
import "./pages/zzp-tarief";

export {
  registerPages,
  getContentPage,
  getContentPageForCalculator,
  getAllContentSlugs,
  getAllContentPages,
} from "./types";
export type { SeoContentPage } from "./types";
