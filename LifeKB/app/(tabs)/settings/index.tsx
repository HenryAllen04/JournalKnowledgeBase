import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [nightMode, setNightMode] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false); // This would be determined by checking auth state

  // Check if user is signed in
  React.useEffect(() => {
    const checkAuth = async () => {
      const session = await supabase.auth.getSession();
      setIsSignedIn(!!session.data.session);
    };
    
    checkAuth();
    
    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsSignedIn(!!session);
    });
    
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  const handleSignIn = () => {
    // Navigate to sign in screen
    router.push('/(auth)');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // This would need to call a server function to delete account data
              console.log('Account deletion requested');
              await supabase.auth.signOut();
            } catch (error) {
              console.error('Error deleting account:', error);
              Alert.alert('Error', 'Failed to delete account. Please try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>
          Settings
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Account
        </Text>
        {isSignedIn ? (
          <>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
              onPress={handleSignOut}
            >
              <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].text }]}>
                Sign Out
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
              onPress={handleDeleteAccount}
            >
              <Text style={[styles.buttonText, { color: 'red' }]}>
                Delete Account
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}
            onPress={handleSignIn}
          >
            <Text style={[styles.buttonText, { color: 'white' }]}>
              Sign In
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          Preferences
        </Text>
        <View style={[styles.preference, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
          <Text style={[styles.preferenceText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Notifications
          </Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
            trackColor={{ false: '#767577', true: Colors[colorScheme ?? 'light'].tint }}
            thumbColor={'#f4f3f4'}
          />
        </View>
        <View style={[styles.preference, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
          <Text style={[styles.preferenceText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Night Mode
          </Text>
          <Switch
            value={nightMode}
            onValueChange={setNightMode}
            trackColor={{ false: '#767577', true: Colors[colorScheme ?? 'light'].tint }}
            thumbColor={'#f4f3f4'}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
          About
        </Text>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
        >
          <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
        >
          <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].text }]}>
            Terms of Service
          </Text>
        </TouchableOpacity>
        <Text style={[styles.version, { color: Colors[colorScheme ?? 'light'].tabIconDefault }]}>
          Version 1.0.0
        </Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  button: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  preference: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
  },
  preferenceText: {
    fontSize: 16,
    fontWeight: '500',
  },
  version: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
}); 