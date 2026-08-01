import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ChecklistItem, Site } from './types';
import { sampleSites } from './data/sampleData';

const SITES_KEY = 'itfc_sites';

export async function loadSites(): Promise<Site[]> {
    try {
          const raw = await AsyncStorage.getItem(SITES_KEY);
          if (raw) {
                  const parsed = JSON.parse(raw);
                  if (Array.isArray(parsed)) return parsed as Site[];
          }
    } catch {
          // fall through to sample data if storage read/parse fails
    }
    return sampleSites;
}

export async function saveSites(sites: Site[]): Promise<void> {
    try {
          await AsyncStorage.setItem(SITES_KEY, JSON.stringify(sites));
    } catch {
          // best-effort persistence; ignore write failures for this demo
    }
}

function nextSequentialId(existingIds: string[], prefix: string): string {
    let max = 0;
    const pattern = new RegExp(`^${prefix}-(\\d+)$`);
    existingIds.forEach((id) => {
          const match = pattern.exec(id);
          if (match) max = Math.max(max, parseInt(match[1], 10));
    });
    return `${prefix}-${max + 1}`;
}

export function nextSiteId(sites: Site[]): string {
    return nextSequentialId(sites.map((s) => s.id), 'site');
}

export function nextItemId(items: ChecklistItem[]): string {
    return nextSequentialId(items.map((i) => i.id), 'item');
}
