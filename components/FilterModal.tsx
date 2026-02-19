import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { DietaryType } from '../constants/recipes';
import { theme } from '../constants/theme';

interface FilterModalProps {
  visible: boolean;
  selectedFilters: DietaryType[];
  onToggleFilter: (filter: DietaryType) => void;
  onClose: () => void;
  onClear: () => void;
}

const FILTERS: { type: DietaryType; label: string; emoji: string; color: string }[] = [
  { type: 'veg', label: 'Vegetarian', emoji: '🌿', color: theme.colors.veg },
  { type: 'non-veg', label: 'Non-Vegetarian', emoji: '🍖', color: theme.colors.nonVeg },
  { type: 'vegan', label: 'Vegan', emoji: '🌱', color: theme.colors.vegan },
];

export default function FilterModal({
  visible,
  selectedFilters,
  onToggleFilter,
  onClose,
  onClear,
}: FilterModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />
      <View style={styles.sheet}>
        <View style={styles.handle} />
        <Text style={styles.title}>Filter Recipes</Text>
        <Text style={styles.subtitle}>Dietary Preferences</Text>

        {FILTERS.map((filter) => {
          const selected = selectedFilters.includes(filter.type);
          return (
            <TouchableOpacity
              key={filter.type}
              style={[
                styles.option,
                selected && { borderColor: filter.color, backgroundColor: filter.color + '15' },
              ]}
              onPress={() => onToggleFilter(filter.type)}
              activeOpacity={0.8}
            >
              <Text style={styles.emoji}>{filter.emoji}</Text>
              <Text style={[styles.optionLabel, selected && { color: filter.color }]}>
                {filter.label}
              </Text>
              <View style={[styles.checkbox, selected && { backgroundColor: filter.color, borderColor: filter.color }]}>
                {selected && <Text style={styles.checkmark}>✓</Text>}
              </View>
            </TouchableOpacity>
          );
        })}

        <View style={styles.actions}>
          <TouchableOpacity style={styles.clearBtn} onPress={onClear}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyBtn} onPress={onClose}>
            <Text style={styles.applyText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  sheet: {
    backgroundColor: theme.colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: theme.spacing.lg,
    paddingBottom: 40,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.border,
    alignSelf: 'center',
    marginBottom: theme.spacing.lg,
  },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: theme.colors.textMuted,
    fontSize: 13,
    marginBottom: theme.spacing.lg,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.sm,
    backgroundColor: theme.colors.surfaceElevated,
  },
  emoji: {
    fontSize: 20,
    marginRight: 12,
  },
  optionLabel: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '500',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    color: theme.colors.white,
    fontSize: 12,
    fontWeight: '700',
  },
  actions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  clearBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  clearText: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
  applyBtn: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
  },
  applyText: {
    color: theme.colors.white,
    fontSize: 15,
    fontWeight: '600',
  },
});
