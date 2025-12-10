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
      {/* Top Bar */}
      <View style={styles.topbar}>
        <Text style={styles.appTitle}>Lembra Pet</Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("CreateReminder")}
        >
          <Text style={styles.addButtonText}>＋</Text>
        </TouchableOpacity>
      </View>

      {/* Painel de boas-vindas */}
      <View style={styles.welcomeCard}>
        <Text style={{ color: "#707582" }}>Olá! Você tem</Text>
        <Text style={styles.bigNumber}>{pending}</Text>
        <Text style={{ color: "#707582" }}>lembretes pendentes</Text>
      </View>

      {/* Lista de Lembretes */}
      <ScrollView contentContainerStyle={styles.listContainer}>
        {reminders.length === 0 ? (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyText}>Nenhum lembrete ainda 😺</Text>
            <Text style={styles.emptySub}>
              Toque no botão + para adicionar um novo lembrete.
            </Text>
          </View>
        ) : (
          reminders.map((r) => (
            <ReminderCard
              key={r.id}
              item={r}
              onToggle={toggle}
              onEdit={(id) => navigation.navigate("EditReminder", { id })}
              onRemove={remove}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F7FB" },

  topbar: {
    height: 88,
    backgroundColor: "#125C0B",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 20,
  },
  appTitle: { color: "#fff", fontSize: 22, fontWeight: "700" },

  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    fontSize: 26,
    color: "#125C0B",
    marginTop: -2,
  },

  welcomeCard: {
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    elevation: 3,
  },
  bigNumber: {
    fontSize: 34,
    fontWeight: "800",
    color: "#1069F6",
    marginVertical: 4,
  },

  listContainer: { padding: 16 },

  emptyBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  emptySub: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
  },
});
