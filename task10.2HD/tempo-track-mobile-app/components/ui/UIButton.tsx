// Button
import React, { ReactNode } from 'react';
import { Pressable, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Txt from './UIText';

interface UIButtonProps {
  onPress: () => void;
  children?: ReactNode;
  title?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const UIButton = ({ onPress, children, title, style, textStyle }: UIButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        ss.button,
        { backgroundColor: pressed ? '#FF3EB5' : 'hsl(0, 0%, 13%)' },
        style]
      }>

      {children ? children : null}

      {
        title ? <Txt style={[ss.text, textStyle]}>{title}</Txt> : null
      }

    </Pressable>

  );
};

const ss = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'rgb(100, 100, 100)',
    backgroundColor: 'hsl(0, 0%, 13%)',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: 10,
  },
  text: {
    color: 'rgb(255, 255, 255)',
    fontSize: 16,
  },
});

export default UIButton;