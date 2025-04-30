import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

// Dummy data for demonstration purposes
const dummyResults = [
  { id: '1', title: 'First entry about something', date: '2023-09-15' },
  { id: '2', title: 'Some interesting thoughts', date: '2023-09-10' },
  { id: '3', title: 'Notes from meeting with team', date: '2023-08-28' },
  { id: '4', title: 'Ideas for the new project', date: '2023-08-15' },
];

export default function SearchScreen() {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(dummyResults);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    // TODO: Implement real search against Supabase/Pinecone
    if (!text.trim()) {
      setResults(dummyResults);
    } else {
      const filtered = dummyResults.filter(item => 
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setResults(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
          Search
        </Text>
      </View>
      <View style={[styles.searchContainer, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
        <IconSymbol size={20} name="magnifyingglass" color={Colors[colorScheme ?? 'light'].tabIconDefault} />
        <TextInput
          style={[styles.searchInput, { color: Colors[colorScheme ?? 'light'].text }]}
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search your knowledge base"
          placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
        />
      </View>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.resultItem, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <Text style={[styles.itemTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
              {item.title}
            </Text>
            <Text style={[styles.itemDate, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
              {item.date}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
              No results found
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  resultItem: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    fontSize: 16,
  },
}); 