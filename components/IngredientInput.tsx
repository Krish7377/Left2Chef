import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { theme } from '../constants/theme';

interface IngredientInputProps {
  ingredients: string[];
  onIngredientsChange: (ingredients: string[]) => void;
}

export default function IngredientInput({ ingredients, onIngredientsChange }: IngredientInputProps) {
  const [inputText, setInputText] = useState('');

  const addIngredient = (text: string) => {
    const parts = text
      .split(',')
      .map((p) => p.trim().toLowerCase())
      .filter((p) => p.length > 0);
    const unique = parts.filter((p) => !ingredients.includes(p));
    if (unique.length > 0) {
      onIngredientsChange([...ingredients, ...unique]);
    }
    setInputText('');
  };

  const removeIngredient = (index: number) => {
    const updated = ingredients.filter((_, i) => i !== index);
    onIngredientsChange(updated);
  };

  const handleSubmitEditing = () => {
    if (inputText.trim()) addIngredient(inputText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Type an ingredient and press +"
          placeholderTextColor={theme.colors.textMuted}
          onSubmitEditing={handleSubmitEditing}
          returnKeyType="done"
          blurOnSubmit={false}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => inputText.trim() && addIngredient(inputText)}
          activeOpacity={0.8}
        >
          <Text style={styles.addBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {ingredients.length > 0 && (
        <>
          <Text style={styles.chipLabel}>Tap to remove:</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.chipsScroll}
            contentContainerStyle={styles.chips}
          >
            {ingredients.map((ingredient, index) => (
              <TouchableOpacity
                key={index}
                style={styles.chip}
                onPress={() => removeIngredient(index)}
                activeOpacity={0.7}
              >
                <Text style={styles.chipText}>{ingredient}</Text>
                <Text style={styles.chipRemove}>✕</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}

      {ingredients.length === 0 && (
        <View style={styles.suggestions}>
          <Text style={styles.suggestLabel}>Quick add:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.suggestRow}>
              {['poha', 'rice', 'potato', 'onion', 'besan', 'eggs', 'rava', 'dal'].map((s) => (
                <TouchableOpacity
                  key={s}
                  style={styles.suggestChip}
                  onPress={() => onIngredientsChange([...ingredients, s])}
                >
                  <Text style={styles.suggestText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
    color: theme.colors.text,
    fontSize: 15,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: theme.colors.white,
    fontSize: 24,
    fontWeight: '300',
    lineHeight: 26,
  },
  chipLabel: {
    color: theme.colors.textMuted,
    fontSize: 11,
    fontWeight: '500',
  },
  chipsScroll: {
    maxHeight: 50,
  },
  chips: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary + '20',
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: theme.radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  chipText: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  chipRemove: {
    color: theme.colors.primary,
    fontSize: 10,
    opacity: 0.7,
  },
  suggestions: {
    gap: 6,
  },
  suggestLabel: {
    color: theme.colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  suggestRow: {
    flexDirection: 'row',
    gap: 8,
  },
  suggestChip: {
    backgroundColor: theme.colors.primary + '15',
    borderRadius: theme.radius.full,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: theme.colors.primary + '40',
  },
  suggestText: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: '500',
  },
});