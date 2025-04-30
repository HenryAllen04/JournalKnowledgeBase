import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function NewEntryScreen() {
  const colorScheme = useColorScheme();
  const [entryText, setEntryText] = useState('');

  const handleSaveEntry = () => {
    // TODO: Save entry to Supabase
    console.log('Saving entry:', entryText);
    setEntryText('');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
          New Entry
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            { color: Colors[colorScheme ?? 'light'].text,
              backgroundColor: Colors[colorScheme ?? 'light'].background }
          ]}
          value={entryText}
          onChangeText={setEntryText}
          placeholder="What's on your mind?"
          placeholderTextColor={Colors[colorScheme ?? 'light'].tabIconDefault}
          multiline
          autoFocus
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <IconSymbol size={24} name="mic.fill" color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <IconSymbol size={24} name="camera.fill" color={Colors[colorScheme ?? 'light'].text} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.saveButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} 
          onPress={handleSaveEntry}
          disabled={!entryText.trim()}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
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
  inputContainer: {
    flex: 1,
  },
  input: {
    flex: 1,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  iconButton: {
    padding: 12,
    borderRadius: 30,
  },
  saveButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
}); 