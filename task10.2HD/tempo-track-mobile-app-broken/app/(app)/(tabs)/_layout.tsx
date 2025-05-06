import IconGeneral from '@/components/icons/IconGeneral';
import { Tabs } from 'expo-router';
import { Pressable } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: 'white',
      tabBarLabelStyle: {
        fontSize: 10,
        fontFamily: 'CallingCode',
        color: 'hsl(0 0% 70%)'
      },
      tabBarStyle: {
        borderTopWidth: 0,
        backgroundColor: 'hsl(0 0% 13%)',
      },

      // Disbale Ripple Effect
      tabBarButton: (props) => (
        <Pressable {...props} android_ripple={null} />
      ),
    }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Run',
          tabBarIcon: ({ color }) => <IconGeneral type='die20' size={30} fill={color} />
        }}
      />
    </Tabs>
  );
}
