import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("Failed to save data", e);
  }
};

export const loadData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Failed to load data", e);
  }
  return null;
};

export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error("Failed to remove data", e);
  }
};

export const loadItemById = async (key, id) => {
  try {
    const data = await loadData(key);
    if (Array.isArray(data)) {
      return data.find((item) => item.id === id) || null;
    }
  } catch (e) {
    console.error(`Failed to load item by id (${id}) from ${key}`, e);
  }
  return null;
};
