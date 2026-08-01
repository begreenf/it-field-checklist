import { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import type { Site } from '../types';
import ProgressBar from '../components/ProgressBar';

interface Props {
    site: Site;
    onBack: () => void;
    onToggleItem: (itemId: string) => void;
    onAddItem: (label: string) => void;
    onCompleteVisit: () => void;
}

export default function SiteDetailScreen({
    site,
    onBack,
    onToggleItem,
    onAddItem,
    onCompleteVisit,
}: Props) {
    const [newLabel, setNewLabel] = useState('');
    const [justCompleted, setJustCompleted] = useState(false);

  const done = site.checklist.filter((c) => c.done).length;
    const total = site.checklist.length;
    const allDone = total > 0 && done === total;

  function handleAddItem() {
        if (!newLabel.trim()) return;
        onAddItem(newLabel.trim());
        setNewLabel('');
  }

  function handleComplete() {
        onCompleteVisit();
        setJustCompleted(true);
        setTimeout(() => setJustCompleted(false), 2500);
  }

  return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <TouchableOpacity onPress={onBack} style={styles.backRow}>
                          <Text style={styles.backText}>‹ All sites</Text>
                </TouchableOpacity>

                <Text style={styles.name}>{site.name}</Text>
                <Text style={styles.address}>{site.address}</Text>
                <Text style={styles.meta}>
                  {site.lastVisit ? `Last visit: ${site.lastVisit}` : 'Not visited yet'}
                </Text>

                <View style={styles.progressRow}>
                          <ProgressBar done={done} total={total} />
                          <Text style={styles.progressLabel}>
                            {done}/{total} done
                          </Text>
                </View>

                <Text style={styles.sectionTitle}>Checklist</Text>
          {site.checklist.map((item) => (
                  <TouchableOpacity
                              key={item.id}
                              style={styles.itemRow}
                              onPress={() => onToggleItem(item.id)}
                            >
                            <View style={[styles.checkbox, item.done && styles.checkboxChecked]}>
                              {item.done && <Text style={styles.checkmark}>✓</Text>}
                            </View>
                            <Text style={[styles.itemLabel, item.done && styles.itemLabelDone]}>
                              {item.label}
                            </Text>
                          </TouchableOpacity>
                ))}

                <View style={styles.addItemRow}>
                          <TextInput
                                      style={styles.addItemInput}
                                      placeholder="Add a checklist item..."
                                      placeholderTextColor="#9aa2ad"
                                      value={newLabel}
                                      onChangeText={setNewLabel}
                                      onSubmitEditing={handleAddItem}
                                    />
                          <TouchableOpacity style={styles.addItemButton} onPress={handleAddItem}>
                                      <Text style={styles.addItemButtonText}>Add</Text>
                          </TouchableOpacity>
                </View>

                <TouchableOpacity
                          style={[styles.completeButton, !allDone && styles.completeButtonDisabled]}
                          onPress={handleComplete}
                          disabled={!allDone}
                        >
                        <Text style={styles.completeButtonText}>
                          {allDone ? 'Mark visit complete' : `Complete all ${total} tasks to finish visit`}
                        </Text>
                      </TouchableOpacity>

          {justCompleted && (
                  <Text style={styles.completedBanner}>
                              Visit logged for today. Checklist reset for next visit.
                  </Text>
                )}
        </ScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
          flex: 1,
    },
    content: {
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 40,
    },
    backRow: {
          marginBottom: 12,
    },
    backText: {
          color: '#2f6fed',
          fontSize: 15,
          fontWeight: '600',
    },
    name: {
          fontSize: 22,
          fontWeight: '700',
          color: '#1a1d22',
    },
    address: {
          fontSize: 14,
          color: '#6b7280',
          marginTop: 2,
    },
    meta: {
          fontSize: 12,
          color: '#9aa2ad',
          marginTop: 4,
    },
    progressRow: {
          marginTop: 16,
          marginBottom: 20,
          gap: 6,
    },
    progressLabel: {
          fontSize: 12,
          color: '#6b7280',
    },
    sectionTitle: {
          fontSize: 15,
          fontWeight: '700',
          color: '#1a1d22',
          marginBottom: 8,
    },
    itemRow: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: '#eef0f3',
          gap: 12,
    },
    checkbox: {
          width: 22,
          height: 22,
          borderRadius: 6,
          borderWidth: 2,
          borderColor: '#c7cdd6',
          alignItems: 'center',
          justifyContent: 'center',
    },
    checkboxChecked: {
          backgroundColor: '#2e9e5b',
          borderColor: '#2e9e5b',
    },
    checkmark: {
          color: '#fff',
          fontSize: 13,
          fontWeight: '700',
    },
    itemLabel: {
          fontSize: 14,
          color: '#1a1d22',
          flex: 1,
    },
    itemLabelDone: {
          color: '#9aa2ad',
          textDecorationLine: 'line-through',
    },
    addItemRow: {
          flexDirection: 'row',
          gap: 8,
          marginTop: 16,
    },
    addItemInput: {
          flex: 1,
          backgroundColor: '#f3f5f8',
          borderWidth: 1,
          borderColor: '#dde1e7',
          borderRadius: 8,
          paddingHorizontal: 12,
          paddingVertical: 8,
          fontSize: 14,
          color: '#1a1d22',
    },
    addItemButton: {
          backgroundColor: '#1a1d22',
          borderRadius: 8,
          paddingHorizontal: 16,
          justifyContent: 'center',
    },
    addItemButtonText: {
          color: '#fff',
          fontWeight: '600',
          fontSize: 14,
    },
    completeButton: {
          backgroundColor: '#2e9e5b',
          borderRadius: 8,
          paddingVertical: 12,
          alignItems: 'center',
          marginTop: 24,
    },
    completeButtonDisabled: {
          backgroundColor: '#d7dbe1',
    },
    completeButtonText: {
          color: '#fff',
          fontWeight: '700',
          fontSize: 14,
    },
    completedBanner: {
          marginTop: 12,
          textAlign: 'center',
          color: '#2e9e5b',
          fontSize: 13,
          fontWeight: '600',
    },
});
