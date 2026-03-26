// src/components/SearchBar.js
// A reusable search bar component
// Props:
//   value      — the current text in the search box
//   onChange   — function called when the user types something

import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';

export default function SearchBar({ value, onChange }) {
  return (
    <View style={styles.container}>
      {/* Search icon */}
      <Text style={styles.icon}>🔍</Text>

      <TextInput
        style={styles.input}
        placeholder="Search coins..."
        placeholderTextColor="#666688"
        value={value}
        onChangeText={onChange}  // fires every time the user types a character
        autoCapitalize="none"    // don't auto-capitalize letters
        autoCorrect={false}      // don't auto-correct crypto names
      />

      {/* If there is text, show a clear (✕) button */}
      {value.length > 0 && (
        <Text style={styles.clearBtn} onPress={() => onChange('')}>
          ✕
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',       // Icon + input side by side
    alignItems: 'center',
    backgroundColor: '#1e1e2e',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: '#2a2a3d',
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,                    // Take remaining space
    color: '#ffffff',
    fontSize: 15,
  },
  clearBtn: {
    color: '#666688',
    fontSize: 16,
    paddingLeft: 8,
  },
});
