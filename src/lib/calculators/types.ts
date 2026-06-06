export interface CalcResult {
  label: string;
  value: string;
  type: "success" | "warning" | "info" | "default" | "highlight";
}

export interface CalcField {
  id: string;
  label: string;
  type: "number" | "select" | "toggle" | "radio";
  defaultValue: number | string | boolean;
  options?: { value: string | number; label: string }[];
  min?: number;
  max?: number;
  step?: number;
}
