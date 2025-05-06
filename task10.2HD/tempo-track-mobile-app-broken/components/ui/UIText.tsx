// UIText

import { Text, StyleSheet, StyleProp, TextStyle } from 'react-native';

interface TtProps {
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
  children?: any;
}

const Tt = ({ onPress, style = {}, children, ...props }: TtProps) => {
  return (
    <Text {...props} style={[ss.text, style]} onPress={onPress}>
      {children}
    </Text>
  );
};

const ss = StyleSheet.create({
  text: {
    color: 'rgb(255, 255, 255)',
    fontSize: 16,
    fontFamily: 'CallingCode',
  },
});

export default Tt;

