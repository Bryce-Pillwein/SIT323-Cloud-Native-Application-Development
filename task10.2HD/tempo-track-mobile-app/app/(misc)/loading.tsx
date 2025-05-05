// Loading tsx

import { View } from "react-native";
import AppSafeAreaContentWrapper from '@/components/safeAreaWrappers/AppSafeAreaContentWrapper';
// Components
import Txt from "@/components/ui/UIText";
// Style
import gss from "@/globalStyles";


export default function Loading() {

  return (
    <AppSafeAreaContentWrapper>
      <View style={[gss.alCnt, gss.jstCnt, { flex: 1 }]}>
        <Txt>Loading...</Txt>
      </View>
    </AppSafeAreaContentWrapper>
  );
}
