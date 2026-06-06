import { calculateNetSalary } from "./bruto-netto-2026";

export function hourlyToMonthly(hourlyRate: number, hoursPerWeek: number) {
  const brutoJaar = hourlyRate * hoursPerWeek * 52;
  const net = calculateNetSalary({ brutoJaar, vakantiegeldInbegrepen: true, bijtellingPercentage: 0, catalogusWaarde: 0, algemeneHeffingskorting: true, arbeidskorting: true });
  return { brutoMaand: Math.round((brutoJaar / 12) * 100) / 100, nettoMaand: Math.round((net.nettoJaar / 12) * 100) / 100, brutoJaar, nettoJaar: net.nettoJaar };
}
