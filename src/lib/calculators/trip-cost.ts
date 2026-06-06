export function calculateTripCost(
  distance: number,     // km
  consumption: number,  // km per liter
  fuelPrice: number,    // EUR per liter
  tolls: number,        // EUR
  parking: number       // EUR
) {
  const fuelCost = (distance / consumption) * fuelPrice;
  const total = fuelCost + tolls + parking;
  const co2Kg = distance * 0.15; // avg 150g/km
  return { fuelCost: Math.round(fuelCost * 100) / 100, total: Math.round(total * 100) / 100, co2Kg: Math.round(co2Kg) };
}
