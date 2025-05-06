// Loading tsx

import AppSafeAreaContentWrapper from '@/components/safeAreaWrappers/AppSafeAreaContentWrapper';
import Txt from "@/components/ui/UIText";
import { StyleSheet, View } from "react-native";

export default function Loading() {

  return (
    <AppSafeAreaContentWrapper>
      <View style={ss.content}>
        <Txt>Loading...</Txt>
      </View>
    </AppSafeAreaContentWrapper>
  );
}

const ss = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});