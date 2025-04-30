import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  // Get the initial route based on authentication status
  useEffect(() => {
    const checkAuth = async () => {
      if (loaded) {
        try {
          const { data } = await supabase.auth.getSession();
          setInitialRoute(data.session ? '(tabs)' : '(auth)');
          await SplashScreen.hideAsync();
        } catch (error) {
          console.error('Error checking auth:', error);
          setInitialRoute('(auth)');
          await SplashScreen.hideAsync();
        }
      }
    };

    checkAuth();
  }, [loaded]);

  if (!loaded || initialRoute === null) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack initialRouteName={initialRoute}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
