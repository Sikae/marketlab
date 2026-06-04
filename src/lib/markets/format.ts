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
