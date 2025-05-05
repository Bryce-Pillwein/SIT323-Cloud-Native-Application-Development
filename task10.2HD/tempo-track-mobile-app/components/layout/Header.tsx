// Header tsx

import { View, StyleSheet, Animated } from "react-native";


const Header = () => {

  return (
    <View style={[ss.header]}>

    </View>
  );
}

const ss = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
});

export default Header;