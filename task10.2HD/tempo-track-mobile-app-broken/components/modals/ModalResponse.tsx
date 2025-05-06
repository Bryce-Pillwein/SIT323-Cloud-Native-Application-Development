// Modal Response tsx

import React, { useState } from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { useModalManager } from "../providers/ModalManagerProvider";
import Tt from "../ui/UIText";
import Input from "../ui/UIInput";
import PdBlk from "../ui/UIPaddingBlock";

interface ModalResponseProps {
  modalKey: string;
  isInput: boolean;
  message: string;
  acceptLabel: string;
  onAccept: (input: any) => void;
}

const ModalResponse: React.FC<ModalResponseProps> = ({ modalKey, isInput, message, acceptLabel, onAccept }) => {
  const { closeModal } = useModalManager();
  const [input, setInput] = useState<string>("");

  /**
   * Handle On Accept
   */
  const handleOnAccept = () => {
    onAccept(input);
    setInput("");
    closeModal(modalKey);
  }

  return (
    <Pressable onPress={() => closeModal(modalKey)} style={ss.overlay}>
      <View style={ss.modalContent} onStartShouldSetResponder={() => true}>

        <Tt style={ss.modalTitle}>{message}</Tt>

        {isInput && (
          <>
            <Input value={input} onChangeText={setInput} />
            <PdBlk pad={10} />
          </>
        )}

        <View style={ss.wrapperBtn}>
          <Pressable onPress={() => closeModal(modalKey)}
            style={({ pressed }) => [{ borderColor: pressed ? '#FF3EB5' : 'hsl(0 0% 13%)' }, ss.btn,]}>
            <Tt>Cancel</Tt>
          </Pressable>

          <Pressable onPress={handleOnAccept}
            style={({ pressed }) => [{ borderColor: pressed ? '#FF3EB5' : 'hsl(0 0% 13%)' }, ss.btn,]}>
            <Tt>{acceptLabel}</Tt>
          </Pressable>
        </View>

      </View>
    </Pressable>
  );
};

export default ModalResponse;

const ss = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: 'hsl(0 0% 13%)',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 5,
    width: '80%'
  },
  modalTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  wrapperBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  btn: {
    paddingVertical: 10, paddingHorizontal: 15,
    backgroundColor: 'hsl(0 0% 18%)',
    borderRadius: 5, borderWidth: 1
  },
});
