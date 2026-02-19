import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { useSavedRecipes } from '../../hooks/useSavedRecipes';
import { theme } from '../../constants/theme';
import RecipeCard from '../../components/RecipeCard';
import { Recipe } from '../../constants/recipes';

export default function Saved() {
  const { savedRecipes, loading, remove, refresh } = useSavedRecipes();

  useFocusEffect(
    React.useCallback(() => {
      refresh();
    }, [refresh])
  );

  const handleRemove = (recipe: Recipe) => {
    Alert.alert(
      'Remove Recipe',
      `Remove "${recipe.title}" from saved?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => remove(recipe.id),
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <FlatList
        data={savedRecipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <RecipeCard recipe={item} />
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => handleRemove(item)}
              activeOpacity={0.8}
            >
              <Text style={styles.removeBtnText}>🗑 Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>❤️</Text>
            <Text style={styles.emptyTitle}>No Saved Recipes</Text>
            <Text style={styles.emptyText}>
              Explore recipes and tap "Save Recipe" to save your favorites here.
            </Text>
          </View>
        }
        ListHeaderComponent={
          savedRecipes.length > 0 ? (
            <Text style={styles.header}>
              {savedRecipes.length} Saved Recipe{savedRecipes.length > 1 ? 's' : ''}
            </Text>
          ) : null
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  loadingText: {
    color: theme.colors.textSecondary,
    fontSize: 16,
  },
  list: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    color: theme.colors.textSecondary,
    fontSize: 14,
    marginBottom: theme.spacing.md,
    fontWeight: '500',
  },
  cardContainer: {
    marginBottom: 4,
  },
  removeBtn: {
    backgroundColor: theme.colors.error + '15',
    borderRadius: theme.radius.md,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.error + '30',
  },
  removeBtnText: {
    color: theme.colors.error,
    fontSize: 13,
    fontWeight: '600',
  },
  empty: {
    alignItems: 'center',
    paddingTop: 80,
    paddingHorizontal: theme.spacing.xl,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: theme.spacing.lg,
  },
  emptyTitle: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 8,
  },
  emptyText: {
    color: theme.colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 24,
  },
});
