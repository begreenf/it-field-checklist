export interface ChecklistItem {
    id: string;
    label: string;
    done: boolean;
}

export interface Site {
    id: string;
    name: string;
    address: string;
    lastVisit: string; // ISO date string, e.g. "2026-07-18", or "" if never visited
  checklist: ChecklistItem[];
}
