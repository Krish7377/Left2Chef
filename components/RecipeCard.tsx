import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Recipe } from "../constants/recipes";
import { theme } from "../constants/theme";
import DietaryTag from "./DietaryTag";

/**
 * RecipeCard Component
 * A visually engaging card used to display recipe previews,
 * featuring dynamic match percentages and dietary labels.
 */

interface RecipeCardProps {
  recipe: Recipe & { matchPercentage?: number };
  compact?: boolean;
}

export default function RecipeCard({
  recipe,
  compact = false,
}: RecipeCardProps) {
  const router = useRouter();

  const getPercentageColor = (pct: number) => {
    if (pct >= 75) return "#4CAF50";
    if (pct >= 50) return "#FF9800";
    return "#FF5252";
  };

  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.compact]}
      onPress={() => router.push(`/recipe/${recipe.id}`)}
      activeOpacity={0.85}
    >
      <Image source={recipe.image} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <View style={styles.topRow}>
          <DietaryTag type={recipe.dietaryType} small />
          <View style={styles.rightBadges}>
            {recipe.matchPercentage !== undefined &&
              recipe.matchPercentage > 0 && (
                <View
                  style={[
                    styles.percentageBadge,
                    {
                      backgroundColor: getPercentageColor(
                        recipe.matchPercentage,
                      ),
                    },
                  ]}
                >
                  <Text style={styles.percentageText}>
                    {recipe.matchPercentage}% match
                  </Text>
                </View>
              )}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{recipe.difficulty}</Text>
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <Text style={styles.title} numberOfLines={2}>
            {recipe.title}
          </Text>
          <View style={styles.meta}>
            <Text style={styles.metaText}>⏱ {recipe.cookTime}</Text>
            <Text style={styles.metaText}>🍽 {recipe.servings} servings</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.lg,
    overflow: "hidden",
    height: 220,
    marginBottom: theme.spacing.md,
  },
  compact: {
    height: 170,
    marginBottom: theme.spacing.sm,
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  content: {
    flex: 1,
    padding: theme.spacing.md,
    justifyContent: "space-between",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  rightBadges: {
    alignItems: "flex-end",
    gap: 4,
  },
  percentageBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.radius.full,
  },
  percentageText: {
    color: theme.colors.white,
    fontSize: 11,
    fontWeight: "700",
  },
  badge: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.radius.full,
  },
  badgeText: {
    color: theme.colors.white,
    fontSize: 11,
    fontWeight: "600",
  },
  bottom: {},
  title: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    lineHeight: 24,
  },
  meta: {
    flexDirection: "row",
    gap: 12,
  },
  metaText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "500",
  },
});
