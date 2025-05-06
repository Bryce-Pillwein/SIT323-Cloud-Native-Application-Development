// UI Input tsx

import React, { useState } from "react";
import { TextInput, StyleSheet, View, StyleProp, TextStyle, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholderTextColor?: string;
  style?: StyleProp<TextStyle>;
}

const Input = ({ value, onChangeText, placeholderTextColor = "rgb(200, 200, 200)", style, ...props }: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);


  return (
    <TextInput
      value={value}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
      style={[styles.input, style, isFocused && styles.containerFocused,]}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      {...props}
    />
  );
};

export default Input;

const styles = StyleSheet.create({
  containerFocused: {
    borderColor: '#FF3EB5',
  },
  input: {
    fontSize: 16,
    fontFamily: 'CallingCode',
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: 'hsl(0 0% 18%)',
    borderWidth: 1,
    borderColor: 'hsl(0 0% 25%)',
    borderRadius: 5,
  },
});


