// Index (tabs) tsx

import Header from "@/components/layout/Header";
import { useModalManager } from "@/components/providers/ModalManagerProvider";
import AppSafeAreaWrapper from "@/components/safeAreaWrappers/AppSafeAreaWrapper";
import Tt from "@/components/ui/UIText";
import gss from "@/globalStyles";
import { signOutUser } from "@/services";
import { Pressable, StyleSheet, View } from "react-native";

export default function Index() {
  const { openModal } = useModalManager();


  return (
    <AppSafeAreaWrapper>

      <Pressable onPress={() => signOutUser()}>
        <Tt>Sign out</Tt>
      </Pressable>
      <View style={gss.appContainerContent}>
        <Header />


      </View>


    </AppSafeAreaWrapper>
  );
}

const ss = StyleSheet.create({
  titleEditWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  btnEditor: {
    marginLeft: 15,
    paddingHorizontal: 5, paddingVertical: 5,
    borderRadius: 5,
  },

  containerCharacter: {
    marginTop: 5,
    marginBottom: 40,
  },
  btnMore: {
    paddingHorizontal: 5, paddingVertical: 5,
    flexShrink: 0,
  },

  btn: {
    width: '80%',
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: 7,
    paddingVertical: 10, paddingHorizontal: 15,
    backgroundColor: 'hsl(0 0% 18%)',
    borderRadius: 5, borderWidth: 1
  },
  btnTxt: {
    textAlign: 'center',
    color: 'hsl(0 0% 90%)',
  },

  statContainer: {
    width: '80%',
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: 10,
    gap: 40,
  },
  statWrapper: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
});