import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../contexts/AuthContext";

export default function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const [darkMode, setDarkMode] = useState(false);

  if (!user) return null;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={[styles.container, darkMode && styles.darkBg]}>

      {/* Botão voltar */}
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={[styles.backText, darkMode && styles.darkText]}>◀ Voltar</Text>
      </TouchableOpacity>

      <Text style={[styles.title, darkMode && styles.darkText]}>Meu Perfil</Text>

      {/* CARD ESTILOSO */}
      <View style={[styles.card, darkMode && styles.cardDark]}>
        <Text style={[styles.cardTitle, darkMode && styles.darkText]}>
          Informações da Conta
        </Text>

        <View style={styles.row}>
          <Ionicons name="person-circle-outline" size={24} color="#1069F6" />
          <View style={styles.infoBlock}>
            <Text style={[styles.label, darkMode && styles.darkSub]}>Nome</Text>
            <Text style={[styles.value, darkMode && styles.darkText]}>{user.name}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Ionicons name="mail-outline" size={24} color="#1069F6" />
          <View style={styles.infoBlock}>
            <Text style={[styles.label, darkMode && styles.darkSub]}>E-mail</Text>
            <Text style={[styles.value, darkMode && styles.darkText]}>{user.email}</Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Ionicons name="lock-closed-outline" size={24} color="#1069F6" />
          <View style={styles.infoBlock}>
            <Text style={[styles.label, darkMode && styles.darkSub]}>Senha</Text>
            <Text style={[styles.value, darkMode && styles.darkText]}>
              {"•".repeat(user.password?.length || 6)}
            </Text>
          </View>
        </View>

        <View style={styles.separator} />

        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={24} color="#1069F6" />
          <View style={styles.infoBlock}>
            <Text style={[styles.label, darkMode && styles.darkSub]}>Criado em</Text>
            <Text style={[styles.value, darkMode && styles.darkText]}>
              {user.createdAt ? formatDate(user.createdAt) : "—"}
            </Text>
          </View>
        </View>

      </View>

      {/* MENU */}
      <View style={styles.section}>
        <View style={[styles.item, darkMode && styles.cardDark]}>
          <Ionicons name="moon-outline" size={22} color="#1069F6" />
          <Text style={[styles.itemText, darkMode && styles.darkText]}>Modo Escuro</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>

        <TouchableOpacity
          style={[styles.item, darkMode && styles.cardDark]}
          onPress={() => {
            logout();
            navigation.replace("Login");
          }}
        >
          <Ionicons name="log-out-outline" size={22} color="#E53935" />
          <Text style={styles.exitText}>Sair da Conta</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F6F7FB" },
  darkBg: { backgroundColor: "#1e1e1e" },

  backBtn: { marginBottom: 10 },
  backText: { color: "#1069F6", fontSize: 16, fontWeight: "600" },

  title: {
    fontSize: 28,
    fontWeight: "800",
    alignSelf: "center",
    marginBottom: 20,
    color: "#1069F6",
  },
  darkText: { color: "#fff" },
  darkSub: { color: "#C9C9C9" },

  /* CARD */
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    marginBottom: 26,
  },
  cardDark: { backgroundColor: "#2A2A2A" },

  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 16,
    color: "#1069F6",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  infoBlock: { marginLeft: 10 },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1069F6",
  },
  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },

  separator: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },

  section: { gap: 14 },

  item: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    justifyContent: "space-between",
  },

  itemText: { fontSize: 16, fontWeight: "600", color: "#333" },

  exitText: { fontSize: 16, fontWeight: "700", color: "#E53935" },
});
