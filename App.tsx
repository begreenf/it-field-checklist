import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import type { Site } from './src/types';
import { loadSites, saveSites, nextItemId, nextSiteId } from './src/storage';
import { DEFAULT_CHECKLIST_LABELS } from './src/data/sampleData';
import SiteListScreen from './src/screens/SiteListScreen';
import SiteDetailScreen from './src/screens/SiteDetailScreen';

export default function App() {
    const [sites, setSites] = useState<Site[]>([]);
    const [loaded, setLoaded] = useState(false);
    const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
    const hasLoaded = useRef(false);

  useEffect(() => {
        loadSites().then((data) => {
                setSites(data);
                setLoaded(true);
                hasLoaded.current = true;
        });
  }, []);

  useEffect(() => {
        if (!hasLoaded.current) return;
        saveSites(sites);
  }, [sites]);

  function addSite(name: string, address: string) {
        const newSite: Site = {
                id: nextSiteId(sites),
                name,
                address: address || 'No address on file',
                lastVisit: '',
                checklist: DEFAULT_CHECKLIST_LABELS.map((label, i) => ({
                          id: `item-${i + 1}`,
                          label,
                          done: false,
                })),
        };
        setSites([newSite, ...sites]);
  }

  function toggleItem(itemId: string) {
        if (!selectedSiteId) return;
        setSites(
                sites.map((s) =>
                          s.id === selectedSiteId
                                    ? {
                                                    ...s,
                                                    checklist: s.checklist.map((c) =>
                                                                      c.id === itemId ? { ...c, done: !c.done } : c
                                                                                             ),
                                    }
                            : s
                                )
              );
  }

  function addChecklistItem(label: string) {
        if (!selectedSiteId) return;
        setSites(
                sites.map((s) =>
                          s.id === selectedSiteId
                                    ? {
                                                    ...s,
                                                    checklist: [...s.checklist, { id: nextItemId(s.checklist), label, done: false }],
                                    }
                            : s
                                )
              );
  }

  function completeVisit() {
        if (!selectedSiteId) return;
        const today = new Date().toISOString().slice(0, 10);
        setSites(
                sites.map((s) =>
                          s.id === selectedSiteId
                                    ? {
                                                    ...s,
                                                    lastVisit: today,
                                                    checklist: s.checklist.map((c) => ({ ...c, done: false })),
                                    }
                            : s
                                )
              );
  }

  const selectedSite = sites.find((s) => s.id === selectedSiteId) ?? null;

  return (
        <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff"/>
    {!loaded ? (
            <View style={styles.loading}>
                        <ActivityIndicator size="large" color="#2f6fed"/>
                        <Text style={styles.loadingText}>Loading your sites...</Text>
            </View>
                ) : selectedSite ? (
                  <SiteDetailScreen
                              site={selectedSite}
                              onBack={() => setSelectedSiteId(null)}
                              onToggleItem={toggleItem}
                              onAddItem={addChecklistItem}
                              onCompleteVisit={completeVisit}
                            />
                ) : (
                  <SiteListScreen
                              sites={sites}
                              onSelectSite={setSelectedSiteId}
                              onAddSite={addSite}
                            />
                )}
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
    safeArea: {
          flex: 1,
          backgroundColor: '#fff',
    },
    loading: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
    },
    loadingText: {
          color: '#6b7280',
          fontSize: 14,
    },
});
