import type { MarketStatus } from "@/lib/markets/types";

const STATUS_LABELS: Record<MarketStatus, string> = {
  open: "Open",
  closed: "Closed",
  resolved_yes: "Resolved Yes",
  resolved_no: "Resolved No",
};

export function formatMarketStatus(status: string): string {
  if (status in STATUS_LABELS) {
    return STATUS_LABELS[status as MarketStatus];
  }
  return status;
}

export function statusBadgeClass(status: string): string {
  switch (status) {
    case "open":
      return "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";
    case "closed":
      return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
    case "resolved_yes":
      return "bg-sky-500/10 text-sky-700 dark:text-sky-400";
    case "resolved_no":
      return "bg-violet-500/10 text-violet-700 dark:text-violet-400";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export function formatCloseDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) {
    return iso;
  }
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
