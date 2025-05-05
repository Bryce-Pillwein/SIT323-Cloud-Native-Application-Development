// Root Layout

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Slot } from "expo-router";
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as NavigationBar from 'expo-navigation-bar';
import * as SystemUI from 'expo-system-ui';
import Providers from '@/components/providers/AllProviders';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Chomsky': require('@/assets/fonts/Chomsky.otf'),
    'Alegreya': require('@/assets/fonts/Alegreya-VariableFont_wght.ttf'),
    'DrukWide': require('@/assets/fonts/DrukWide-Medium-Trial.otf'),
    'CallingCode': require('@/assets/fonts/CallingCode-Regular.ttf'),
    'FetTrumDsch': require('@/assets/fonts/FetteTrumpDeutsch.ttf'),
    'OldEBoots': require('@/assets/fonts/Old_Englished_Boots.ttf'),
    'OldNewspaperTypes': require('@/assets/fonts/OldNewspaperTypes.ttf'),
  });

  /**
   * Set Default Colors
   */
  useEffect(() => {
    const setDefaultColors = async () => {
      // Set Navigation Bar
      await NavigationBar.setBackgroundColorAsync('hsl(0, 0%, 13%)');

      // Set Background Color
      // Affects switching between pages
      await SystemUI.setBackgroundColorAsync("hsl(0 0% 13%)");
    };

    setDefaultColors();
  }, []);

  /**
   * Load Fonts
   */
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;


  return (
    <Providers>
      <SafeAreaProvider>
        <Slot />
        <StatusBar style="light" hidden={false} translucent={true} />
      </SafeAreaProvider>
    </Providers>
  );
}
