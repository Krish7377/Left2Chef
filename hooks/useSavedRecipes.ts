import { useState, useEffect, useCallback } from 'react';
import { getSavedRecipeIds, saveRecipeId, removeRecipeId } from '../services/storage';
import { RECIPES, Recipe } from '../constants/recipes';

export function useSavedRecipes() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const ids = await getSavedRecipeIds();
    setSavedIds(ids);
    setSavedRecipes(RECIPES.filter((r) => ids.includes(r.id)));
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const save = useCallback(
    async (id: string) => {
      await saveRecipeId(id);
      await refresh();
    },
    [refresh]
  );

  const remove = useCallback(
    async (id: string) => {
      await removeRecipeId(id);
      await refresh();
    },
    [refresh]
  );

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds]
  );

  return { savedRecipes, savedIds, loading, save, remove, isSaved, refresh };
}
