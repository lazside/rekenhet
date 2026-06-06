import { calculateNetSalary } from "./bruto-netto-2026";

export function netVakantiegeld(brutoJaar: number, algemeneHK: boolean, arbeidskorting: boolean) {
  const vakBasis = brutoJaar * 0.08;
  const net = calculateNetSalary({ brutoJaar: brutoJaar + vakBasis, vakantiegeldInbegrepen: true, bijtellingPercentage: 0, catalogusWaarde: 0, algemeneHeffingskorting: algemeneHK, arbeidskorting });
  const netZonder = calculateNetSalary({ brutoJaar, vakantiegeldInbegrepen: true, bijtellingPercentage: 0, catalogusWaarde: 0, algemeneHeffingskorting: algemeneHK, arbeidskorting });
  const nettoVak = net.nettoJaar - netZonder.nettoJaar;
  return { brutoVakantiegeld: Math.round(vakBasis * 100) / 100, nettoVakantiegeld: Math.round(nettoVak * 100) / 100, belastingEnPremies: Math.round((vakBasis - nettoVak) * 100) / 100 };
}
