// Button Add Minus
import React from 'react';
import { Pressable, PressableProps, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import IconGeneral from '../icons/IconGeneral';
import IconVault from '../icons/IconVault';

interface UIButtonAddMinusProps extends PressableProps {
  onPress: () => void;
  type: string;
  style?: StyleProp<ViewStyle>;
}

const UIButtonAddMinus: React.FC<UIButtonAddMinusProps> = ({ onPress, type, style, ...props }) => {
  return (
    <Pressable
      onPress={onPress}
      {...props}
      style={({ pressed }) => [{ backgroundColor: pressed ? '#FFE900' : 'hsl(0 0% 13%)' }, ss.button, style]}
    >
      {({ pressed }) => (
        type === 'plus-minus' ?
          <IconVault type='plus-minus' size={20} fill={pressed ? 'black' : 'hsl(0 0% 85%)'} />
          :
          <IconGeneral type={type} size={20} fill={pressed ? 'black' : 'hsl(0 0% 85%)'} />
      )}
    </Pressable>
  );
};

const ss = StyleSheet.create({
  button: {
    // backgroundColor: '#9c9230',//'hsl(55 100% 70%)', //'#FFE900',
    borderRadius: 5,
    paddingVertical: 3,
    paddingHorizontal: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE900'//'hsl(0 0% 50%)'
  },
});

export default UIButtonAddMinus;