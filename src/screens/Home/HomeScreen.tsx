import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useReminders } from "../contexts/RemindersContext";
import ReminderCard from "../components/ReminderCard";

export default function HomeScreen({ navigation }: any) {
  const { reminders, toggle, remove } = useReminders();

  const pending = reminders.filter((r) => !r.done).length;

  return (
    <View style={styles.container}>
      <View style={styles.topbar}>
        <Text style={styles.appTitle}>Lembra Pet</Text>

        {/* Botão para criar lembrete */}
        <TouchableOpacity
          onPress={() => navigation.navigate("CreateReminder")}
        >
          <Text style={styles.icon}>📝</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.welcomeCard}>
        <Text style={{ color: "#707582" }}>Olá! Você tem</Text>
        <Text style={styles.bigNumber}>{pending}</Text>
        <Text style={{ color: "#707582" }}>lembretes pendentes</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {reminders.map((r) => (
          <ReminderCard
            key={r.id}
            item={r}
            onToggle={toggle}
            onEdit={(id) => navigation.navigate("EditReminder", { id })}
            onRemove={remove}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F7FB" },
  topbar: {
    height: 88,
    backgroundColor: "#125c0bff",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appTitle: { color: "#fff", fontSize: 22, fontWeight: "700" },
  icon: { fontSize: 22, color: "#fff" },

  welcomeCard: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  bigNumber: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1069F6",
    marginVertical: 4,
  },
});
