export function calculateFine(speed: number, limit: number, isMotorway: boolean): number {
  const over = speed - limit;
  if (over <= 0) return 0;
  if (over <= 4) return 0; // tolerance
  if (isMotorway) {
    if (over <= 10) return 69;  if (over <= 20) return 114;
    if (over <= 30) return 189; if (over <= 40) return 289;
    if (over <= 50) return 409; if (over <= 60) return 549;
    return 700;
  }
  if (over <= 10) return 54;  if (over <= 20) return 89;
  if (over <= 30) return 144; if (over <= 40) return 224;
  if (over <= 50) return 329; if (over <= 60) return 449;
  return 600;
}
