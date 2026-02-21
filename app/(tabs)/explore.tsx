import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RECIPES, DietaryType } from "../../constants/recipes";
import { theme } from "../../constants/theme";
import RecipeCard from "../../components/RecipeCard";
import FilterModal from "../../components/FilterModal";
import { Image } from "react-native";

export default function Explore() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<DietaryType[]>([]);
  const [filterVisible, setFilterVisible] = useState(false);

  const filtered = useMemo(() => {
    return RECIPES.filter((r) => {
      const matchesSearch =
        search.trim() === "" ||
        r.title.toLowerCase().includes(search.toLowerCase()) ||
        r.ingredients.some((i) =>
          i.toLowerCase().includes(search.toLowerCase()),
        );
      const matchesFilter =
        filters.length === 0 || filters.includes(r.dietaryType);
      return matchesSearch && matchesFilter;
    });
  }, [search, filters]);

  const toggleFilter = (f: DietaryType) => {
    setFilters((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search recipes or ingredients..."
          placeholderTextColor={theme.colors.textMuted}
          autoCapitalize="none"
        />
        <TouchableOpacity
          style={[styles.filterBtn, filters.length > 0 && styles.filterActive]}
          onPress={() => setFilterVisible(true)}
          activeOpacity={0.8}
        >
          <Image
            source={require("../../assets/filter.png")}
            style={[
              styles.filterIcon,
              filters.length > 0 && { tintColor: theme.colors.primary },
            ]}
            resizeMode="contain"
          />
          {filters.length > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{filters.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.countRow}>
        <Text style={styles.count}>{filtered.length} recipes</Text>
        {filters.length > 0 && (
          <TouchableOpacity onPress={() => setFilters([])}>
            <Text style={styles.clearFilters}>Clear filters</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <RecipeCard recipe={item} />
          </View>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Image
              source={require("../../assets/emptySearch.png")}
              style={styles.emptyIcon}
              resizeMode="contain"
            />
            <Text style={styles.emptyText}>No recipes found</Text>
            <Text style={styles.emptySub}>
              Try a different search or remove filters
            </Text>
          </View>
        }
      />

      <FilterModal
        visible={filterVisible}
        selectedFilters={filters}
        onToggleFilter={toggleFilter}
        onClose={() => setFilterVisible(false)}
        onClear={() => setFilters([])}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  searchRow: {
    flexDirection: "row",
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  searchInput: {
    flex: 1,
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 12,
    color: theme.colors.text,
    fontSize: 15,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterBtn: {
    width: 46,
    height: 46,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: theme.colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  filterIcon: {
    width: 20,
    height: 20,
    tintColor: "#5C3D2E",
  },
  filterActive: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary + "20",
  },
  filterBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  filterBadgeText: {
    color: theme.colors.white,
    fontSize: 10,
    fontWeight: "700",
  },
  countRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.sm,
  },
  count: {
    color: theme.colors.textMuted,
    fontSize: 13,
  },
  clearFilters: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: "600",
  },
  list: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  cardWrapper: {},
  empty: {
    alignItems: "center",
    paddingTop: 60,
  },
  emptyIcon: {
    width: 44,
    height: 44,
    tintColor: "#A0714F", // softer warm brown
    marginBottom: theme.spacing.md,
    opacity: 0.9,
  },
  emptyText: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 6,
  },
  emptySub: {
    color: theme.colors.textSecondary,
    fontSize: 14,
  },
});
