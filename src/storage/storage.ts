
import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@lembrapet:reminders";

export async function saveReminder(reminder: any): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const arr = raw ? JSON.parse(raw) : [];
    arr.push(reminder);
    await AsyncStorage.setItem(KEY, JSON.stringify(arr));
    console.log("Saved to AsyncStorage:", reminder);
  } catch (err) {
    console.warn("saveReminder failed:", err);
    // swallow to avoid throwing to UI
  }
}

export async function getReminders(): Promise<any[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.warn("getReminders failed:", err);
    return [];
  }
}
