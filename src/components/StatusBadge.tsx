import { cn } from "@/lib/utils";

type DocumentStatus = "valid" | "expiring" | "expired";

interface StatusBadgeProps {
  status: DocumentStatus;
  className?: string;
}

const statusConfig: Record<DocumentStatus, { label: string; className: string }> = {
  valid: { label: "Valid", className: "status-valid" },
  expiring: { label: "Expiring Soon", className: "status-expiring" },
  expired: { label: "Expired", className: "status-expired" },
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold",
        config.className,
        className
      )}
    >
      {status === "valid" && "✓"}
      {status === "expiring" && "⚠"}
      {status === "expired" && "✕"}
      {" " + config.label}
    </span>
  );
};

export default StatusBadge;
export type { DocumentStatus };
