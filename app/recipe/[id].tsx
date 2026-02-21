import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { RECIPES } from "../../constants/recipes";
import { theme } from "../../constants/theme";
import { useSavedRecipes } from "../../hooks/useSavedRecipes";
import DietaryTag from "../../components/DietaryTag";
import Button from "../../components/Button";

export default function RecipeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isSaved, save, remove } = useSavedRecipes();
  const [saved, setSaved] = useState(false);

  const recipe = RECIPES.find((r) => r.id === id);

  useEffect(() => {
    if (id) {
      setSaved(isSaved(id));
    }
  }, [id, isSaved]);

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Recipe not found</Text>
          <Button
            title="Go Back"
            onPress={() => router.back()}
            variant="outline"
          />
        </View>
      </SafeAreaView>
    );
  }

  const handleSaveToggle = async () => {
    if (saved) {
      await remove(recipe.id);
      setSaved(false);
    } else {
      await save(recipe.id);
      setSaved(true);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Hero Image */}
      <View style={styles.imageContainer}>
        <Image source={recipe.image} style={styles.image} resizeMode="cover" />
        <View style={styles.imageOverlay} />
      </View>

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <DietaryTag type={recipe.dietaryType} />
          <Text style={styles.title}>{recipe.title}</Text>

          {/* Meta Row */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Text style={styles.metaEmoji}>⏱</Text>
              <Text style={styles.metaLabel}>{recipe.cookTime}</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Text style={styles.metaEmoji}>🍽</Text>
              <Text style={styles.metaLabel}>{recipe.servings} servings</Text>
            </View>
            <View style={styles.metaDivider} />
            <View style={styles.metaItem}>
              <Text style={styles.metaEmoji}>📊</Text>
              <Text style={styles.metaLabel}>{recipe.difficulty}</Text>
            </View>
          </View>
        </View>

        {/* Ingredients */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <Text style={styles.sectionSub}>
            {recipe.ingredients.length} items needed
          </Text>
          <View style={styles.ingredientGrid}>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientChip}>
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.sectionSub}>
            {recipe.instructions.length} steps
          </Text>
          {recipe.instructions.map((step, index) => (
            <View key={index} style={styles.step}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* Save Button */}
        <Button
          title={saved ? "Saved to Cookbook" : "Save Recipe"}
          onPress={handleSaveToggle}
          variant={saved ? "secondary" : "primary"}
          fullWidth
          style={styles.saveBtn}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  imageContainer: {
    height: 280,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  content: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: "800",
    marginTop: theme.spacing.sm,
    marginBottom: theme.spacing.md,
    lineHeight: 34,
    letterSpacing: -0.3,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  metaItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  metaEmoji: {
    fontSize: 18,
  },
  metaLabel: {
    color: theme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "500",
  },
  metaDivider: {
    width: 1,
    height: 30,
    backgroundColor: theme.colors.border,
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    color: theme.colors.text,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 2,
  },
  sectionSub: {
    color: theme.colors.textMuted,
    fontSize: 13,
    marginBottom: theme.spacing.md,
  },
  ingredientGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  ingredientChip: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radius.full,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  ingredientText: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: "500",
  },
  step: {
    flexDirection: "row",
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    marginTop: 1,
  },
  stepNumberText: {
    color: theme.colors.white,
    fontSize: 13,
    fontWeight: "700",
  },
  stepText: {
    flex: 1,
    color: theme.colors.textSecondary,
    fontSize: 15,
    lineHeight: 24,
  },
  saveBtn: {
    marginTop: theme.spacing.sm,
  },
  notFound: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.lg,
  },
  notFoundText: {
    color: theme.colors.text,
    fontSize: 18,
  },
});
