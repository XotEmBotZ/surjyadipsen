import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortProjects<
  T extends { entry: { dateRange?: { start: string; end?: string | null } } },
>(projects: T[]): T[] {
  return [...projects].sort((a, b) => {
    const isOngoingA = !a.entry.dateRange?.end;
    const isOngoingB = !b.entry.dateRange?.end;

    if (isOngoingA && !isOngoingB) return -1;
    if (!isOngoingA && isOngoingB) return 1;

    const dateA = a.entry.dateRange?.start
      ? new Date(a.entry.dateRange.start).getTime()
      : 0;
    const dateB = b.entry.dateRange?.start
      ? new Date(b.entry.dateRange.start).getTime()
      : 0;
    return dateB - dateA;
  });
}
