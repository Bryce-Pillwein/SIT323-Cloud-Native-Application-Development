// App Safe Area Content Wrapper
import { ReactNode } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View } from 'react-native';
import gss from '@/globalStyles';

interface AppSafeAreaContentWrapperProps {
  children: ReactNode;
}

const AppSafeAreaContentWrapper: React.FC<AppSafeAreaContentWrapperProps> = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[gss.appContainerScreen, {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    }]}>
      <View style={gss.appContainerContentFlex}>
        {children}
      </View>
    </View>
  );
};

export default AppSafeAreaContentWrapper;