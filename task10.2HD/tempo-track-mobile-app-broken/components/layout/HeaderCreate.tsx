import { Pressable, StyleSheet, View } from "react-native"
import Tt from "../ui/UIText"
import { router } from "expo-router";
import IconGeneral from "../icons/IconGeneral";
import { useCharacter } from "../providers/CharacterProvider";


interface HeaderCreateProps {
  title: string;
}

const HeaderCreate: React.FC<HeaderCreateProps> = ({ title }) => {
  const { setCharacter } = useCharacter();

  return (
    <View style={ss.wrapperHeader}>
      <Pressable onPress={() => { setCharacter(null); router.replace("/(app)/(tabs)") }}
        style={ss.btnCancel}>
        {({ pressed }) => (
          <IconGeneral type="arrow-back" fill={pressed ? '#FF3EB5' : 'hsl(0 0% 70%)'} size={28} />
        )}
      </Pressable>

      <Tt style={ss.title}>{title}</Tt>

      <View style={ss.btnCancel}>
        <IconGeneral type="arrow-back" fill="transparent" size={28} />
      </View>
    </View>
  );
};

export default HeaderCreate;

const ss = StyleSheet.create({
  wrapperHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 10, },
  title: { textAlign: 'center', color: '#FF3EB5', },
  btnCancel: { paddingVertical: 3, paddingHorizontal: 3 },
});
