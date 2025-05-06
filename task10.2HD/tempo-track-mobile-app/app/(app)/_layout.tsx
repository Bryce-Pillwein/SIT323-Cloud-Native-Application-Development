// _layout (app) tsx

import { useAuth } from '@/components/providers/AuthProvider';
import { Stack, router } from 'expo-router';
import { useEffect } from 'react';
import Loading from '../(misc)/loading';

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
