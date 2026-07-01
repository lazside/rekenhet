import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "info" | "outline";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-all",
        {
          "bg-gray-100 text-gray-700": variant === "default",
          "bg-emerald-100 text-emerald-700": variant === "success",
          "bg-amber-100 text-amber-700": variant === "warning",
          "bg-indigo-100 text-indigo-700": variant === "info",
          "border border-indigo-200 bg-blue-50 text-blue-700": variant === "outline",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
