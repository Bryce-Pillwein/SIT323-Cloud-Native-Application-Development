// Back Navigation Header tsx
import { StyleSheet, View, Pressable } from 'react-native';
import { router } from 'expo-router';
// Components
import Txt from './ui/UIText';
import IconGeneral from './icons/IconGeneral';
import { useAwaitableModal } from '../archive/UseAwaitableModal';
import ModalYesNo from './modals/ModalYesNo';
import { useContextCharacterCreate } from './providers/ContextCharacterCreate';

interface BackNavigationHeaderProps {
  title: string,
}

const BackNavigationHeaderCreate: React.FC<BackNavigationHeaderProps> = ({ title }) => {
  const { setAccessibleSections } = useContextCharacterCreate();
  const { openModal: openModalYesNo, renderModal: renderModalYesNo } =
    useAwaitableModal((modal: any, params: any) => (
      <ModalYesNo modal={modal} params={params} />
    ));

  const exitCreateCharacter = async () => {
    try {
      const response = await openModalYesNo({ message: 'Quit Creating A New Character?' });
      if (response) {
        setAccessibleSections({
          'Class': false,
          'Origin': true,
          'Specialty': true,
          'Abilities': true,
          'Equipment': true,
          'Armaments': true,
          'Facets': true,
          'Review': true,
        });
        router.replace('/(tabs)/characters')
      }
    } catch (error) {
      console.error('Error exiting create character');
    }
  }

  return (
    <View style={ss.containerHeader}>
      {renderModalYesNo()}
      <Pressable style={ss.iconWrapper} onPress={() => exitCreateCharacter()}>
        <IconGeneral type='menu-back' fill='hsl(0 0% 70%)' />
      </Pressable>
      <Txt style={ss.headerTitle}>{title}</Txt>
    </View>
  );
}

const ss = StyleSheet.create({
  containerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 15
  },
  iconWrapper: {
    position: 'absolute',
    left: 25,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'FetTrumDsch'
  }

});

export default BackNavigationHeaderCreate;