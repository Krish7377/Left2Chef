import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_RECIPES_KEY = '@left2chef_saved_recipes';

export const getSavedRecipeIds = async (): Promise<string[]> => {
  try {
    const json = await AsyncStorage.getItem(SAVED_RECIPES_KEY);
    return json ? JSON.parse(json) : [];
  } catch {
    return [];
  }
};

export const saveRecipeId = async (id: string): Promise<void> => {
  try {
    const current = await getSavedRecipeIds();
    if (!current.includes(id)) {
      await AsyncStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify([...current, id]));
    }
  } catch (e) {
    console.error('Error saving recipe:', e);
  }
};

export const removeRecipeId = async (id: string): Promise<void> => {
  try {
    const current = await getSavedRecipeIds();
    const updated = current.filter((rid) => rid !== id);
    await AsyncStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error removing recipe:', e);
  }
};

export const isRecipeSaved = async (id: string): Promise<boolean> => {
  const ids = await getSavedRecipeIds();
  return ids.includes(id);
};
