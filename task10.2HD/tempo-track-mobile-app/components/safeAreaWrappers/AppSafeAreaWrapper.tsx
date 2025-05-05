// App Safe Area Wrapper

import { ReactNode } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import gss from '@/globalStyles';

interface AppSafeAreaWrapperProps {
  children: ReactNode;
}

const AppSafeAreaWrapper: React.FC<AppSafeAreaWrapperProps> = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[gss.appContainerScreen, {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }]}>
      {children}
    </View>
  );
};

export default AppSafeAreaWrapper;