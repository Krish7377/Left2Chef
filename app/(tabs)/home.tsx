import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { matchRecipes, RECIPES, Recipe } from "../../constants/recipes";
import { theme } from "../../constants/theme";
import IngredientInput from "../../components/IngredientInput";
import RecipeCard from "../../components/RecipeCard";

/**
 * Home Component
 * The central dashboard for the recipe application.
 * Handles ingredient state management, recipe matching logic,
 * and displays randomized daily specials to the user.
 */

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [results, setResults] = useState<Recipe[]>([]);
  const [showInput, setShowInput] = useState(false);
  const router = useRouter();

  function getRandomRecipes(count: number): Recipe[] {
    const shuffled = [...RECIPES].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
  useEffect(() => {
    if (ingredients.length === 0) {
      setResults([]);
      return;
    }
    const matched = matchRecipes(ingredients);
    setResults(matched);
  }, [ingredients]);

  const [dailySpecials, setDailySpecials] = useState<Recipe[]>([]);

  useEffect(() => {
    setDailySpecials(getRandomRecipes(3));
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.headerTitle}>KITCHEN</Text>
            <Text style={styles.headerSub}>What shall we cook today?</Text>
          </View>
          <View style={styles.avatar}>
            <Image
              source={require("../../assets/profileDefault.png")}
              style={styles.avatarImage}
              resizeMode="contain"
            />
          </View>
        </View>

        <Text style={styles.sectionLabel}>ADD INGREDIENTS</Text>
        <View style={styles.tilesRow}>
          <TouchableOpacity
            style={styles.tile}
            onPress={() => setShowInput(!showInput)}
            activeOpacity={0.8}
          >
            <Image
              source={require("../../assets/manualInput.png")}
              style={styles.tileIconImage}
              resizeMode="contain"
            />
            <Text style={styles.tileLabel}>MANUAL</Text>
          </TouchableOpacity>
        </View>

        {showInput && (
          <View style={styles.inputCard}>
            <IngredientInput
              ingredients={ingredients}
              onIngredientsChange={setIngredients}
            />
          </View>
        )}

        {ingredients.length > 0 && results.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>
              MATCHED RECIPES ({results.length})
            </Text>
            {results.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </View>
        )}

        {ingredients.length > 0 && results.length === 0 && (
          <View style={styles.noMatchCard}>
            <Text style={styles.noMatchText}>No recipes match yet</Text>
          </View>
        )}

        {ingredients.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>DAILY SPECIALS</Text>
            {dailySpecials.map((recipe) => (
              <TouchableOpacity
                key={recipe.id}
                style={styles.specialCard}
                onPress={() => router.push(`/recipe/${recipe.id}`)}
                activeOpacity={0.8}
              >
                <Image
                  source={recipe.image}
                  style={styles.specialImage}
                  resizeMode="cover"
                />
                <View style={styles.specialInfo}>
                  <Text style={styles.specialTitle}>{recipe.title}</Text>
                  <Text style={styles.specialMeta}>
                    ⏱ {recipe.cookTime} • {recipe.difficulty}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0EBE3",
  },
  scroll: {
    paddingBottom: theme.spacing.lg,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    marginBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: "#D4C4B4",
    backgroundColor: "#F0EBE3",
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#2C1810",
    letterSpacing: 1,
  },
  headerSub: {
    fontSize: 13,
    color: "#8B6B52",
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E8D5C0",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#D4B896",
  },
  avatarImage: {
    width: 26,
    height: 26,
    tintColor: "#5C3D2E",
  },
  avatarText: {
    fontSize: 22,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#A0714F",
    letterSpacing: 1.5,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.xs,
    paddingHorizontal: theme.spacing.lg,
  },
  tileIconImage: {
    width: 32,
    height: 32,
    tintColor: "#5C3D2E",
  },
  tilesRow: {
    flexDirection: "row",
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  tile: {
    flex: 1,
    backgroundColor: "#E8DDD3",
    borderRadius: theme.radius.xl,
    paddingVertical: theme.spacing.xl,
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing.sm,
    borderWidth: 1,
    borderColor: "#D4C4B4",
    shadowColor: "#8B4513",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  tileIcon: {
    fontSize: 36,
  },
  tileLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#5C3D2E",
    letterSpacing: 1,
  },
  inputCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: theme.radius.xl,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    borderWidth: 1,
    borderColor: "#E0D0C0",
    shadowColor: "#8B4513",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  section: {
    marginBottom: theme.spacing.lg,
    paddingHorizontal: theme.spacing.lg,
  },
  specialCard: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 100,
    backgroundColor: "#E8DDD3",
    borderRadius: theme.radius.lg,
    marginBottom: theme.spacing.sm,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#D4C4B4",
    shadowColor: "#8B4513",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  specialImage: {
    width: 96,
    height: 96,
  },
  specialInfo: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  specialTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2C1810",
    marginBottom: 4,
  },
  specialMeta: {
    fontSize: 12,
    color: "#8B6B52",
  },
  noMatchCard: {
    backgroundColor: "#E8DDD3",
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D4C4B4",
    marginBottom: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
  },
  noMatchText: {
    color: "#8B6B52",
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
});
