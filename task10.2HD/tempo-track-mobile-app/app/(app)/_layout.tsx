// _layout (app) tsx

import { useEffect } from 'react';
import { Stack, router } from 'expo-router';
import Loading from '../(misc)/loading';
import { useAuth } from '@/components/providers/AuthProvider';

export default function AppLayout() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user]);

  if (loading) return <Loading />;

  if (!user) {
    return null;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{}} />
    </Stack>
  );
}
