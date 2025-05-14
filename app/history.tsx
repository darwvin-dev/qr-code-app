// app/history.tsx
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

interface HistoryItem {
  value: string;
  date: string;
}

export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const loadHistory = async () => {
      const data = await AsyncStorage.getItem("history");
      if (data) {
        setHistory(JSON.parse(data));
      }
    };
    loadHistory();
  }, []);

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <View style={styles.card}>
      <Text style={styles.value}>{item.value}</Text>
      <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🕒 QR History</Text>
      {history.length === 0 ? (
        <Text style={styles.empty}>No history yet</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0a0a0a" },
  title: {
    fontSize: 24,
    color: "#00f0ff",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: "#1a1a1a",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  value: { color: "#fff", fontSize: 16, marginBottom: 6 },
  date: { color: "#888", fontSize: 12 },
  empty: { color: "#aaa", textAlign: "center", marginTop: 50 },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    padding: 10,
  },
  backText: {
    color: "#00f0ff",
    fontSize: 16,
  },
});