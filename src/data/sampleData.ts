import type { ChecklistItem, Site } from '../types';

export const DEFAULT_CHECKLIST_LABELS: string[] = [
    'Verify network connectivity',
    'Check backup job status',
    'Inspect physical asset tags',
    'Test printer / scanner',
    'Confirm user access & permissions',
    'Update ticket notes',
  ];

export function buildChecklist(labels: string[], doneIndexes: number[] = []): ChecklistItem[] {
    return labels.map((label, i) => ({
          id: `item-${i + 1}`,
          label,
          done: doneIndexes.includes(i),
    }));
}

export const sampleSites: Site[] = [
  {
        id: 'site-1',
        name: 'Downtown Office',
        address: '123 Main St, Suite 400',
        lastVisit: '2026-07-18',
        checklist: buildChecklist(DEFAULT_CHECKLIST_LABELS, [0, 1, 2]),
  },
  {
        id: 'site-2',
        name: 'Warehouse B',
        address: '87 Industrial Pkwy',
        lastVisit: '2026-07-02',
        checklist: buildChecklist(DEFAULT_CHECKLIST_LABELS, [0, 1, 2, 3, 4, 5]),
  },
  {
        id: 'site-3',
        name: 'North Branch',
        address: '450 Cedar Ave',
        lastVisit: '',
        checklist: buildChecklist(DEFAULT_CHECKLIST_LABELS, []),
  },
  ];
