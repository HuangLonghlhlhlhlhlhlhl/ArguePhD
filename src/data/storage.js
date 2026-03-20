import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@favorites_quotes';

export const saveFavorite = async (quote) => {
  try {
    const existing = await getFavorites();
    if (!existing.includes(quote)) {
      const updated = [...existing, quote];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    console.error('Failed to save favorite.', e);
  }
};

export const getFavorites = async () => {
  try {
    const value = await AsyncStorage.getItem(FAVORITES_KEY);
    return value ? JSON.parse(value) : [];
  } catch (e) {
    console.error('Failed to get favorites.', e);
    return [];
  }
};

export const removeFavorite = async (quote) => {
  try {
    const existing = await getFavorites();
    const updated = existing.filter(q => q !== quote);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to remove favorite.', e);
  }
};
