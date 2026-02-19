import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DietaryType } from '../constants/recipes';
import { theme } from '../constants/theme';

interface DietaryTagProps {
  type: DietaryType;
  small?: boolean;
}

const labels: Record<DietaryType, string> = {
  veg: '🌿 Veg',
  'non-veg': '🍖 Non-Veg',
  vegan: '🌱 Vegan',
};

const colors: Record<DietaryType, string> = {
  veg: theme.colors.veg,
  'non-veg': theme.colors.nonVeg,
  vegan: theme.colors.vegan,
};

export default function DietaryTag({ type, small = false }: DietaryTagProps) {
  return (
    <View
      style={[
        styles.tag,
        { backgroundColor: colors[type] + '20', borderColor: colors[type] + '60' },
        small && styles.small,
      ]}
    >
      <Text style={[styles.text, { color: colors[type] }, small && styles.smallText]}>
        {labels[type]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.radius.full,
    borderWidth: 1,
  },
  small: {
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  smallText: {
    fontSize: 10,
  },
});
