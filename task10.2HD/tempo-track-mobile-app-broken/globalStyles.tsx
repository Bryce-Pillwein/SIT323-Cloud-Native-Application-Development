/**
 * Global Style Sheet (GSS)
 */

import { StyleSheet } from 'react-native';

const gss = StyleSheet.create({
    // Font Size
    fs12: { fontSize: 12 }, fs14: { fontSize: 14 }, fs16: { fontSize: 16 }, fs18: { fontSize: 18 },
    fs20: { fontSize: 20 }, fs24: { fontSize: 24 }, fs26: { fontSize: 26 }, fs28: { fontSize: 28 },
    fs30: { fontSize: 30 },

    // Font Family
    ffChomsky: { fontFamily: 'Chomsky' },
    ffAlegreya: { fontFamily: 'Alegreya' },
    ffDrukWide: { fontFamily: 'DrukWide' },
    ffCallingCode: { fontFamily: 'CallingCode' },
    ffOldNewspaperTypes: { fontFamily: 'OldNewspaperTypes' },
    ffFetTrumDsch: { fontFamily: 'FetTrumDsch' },
    ffOldEBoots: { fontFamily: 'OldEBoots' },

    // Colors
    cpink: { color: '#FF3EB5' },
    cyellow: { color: '#FFE900' },
    l5: { color: 'hsl(0 0% 5%)' }, l10: { color: 'hsl(0 0% 10%)' }, l13: { color: 'hsl(0 0% 13%)' },
    l15: { color: 'hsl(0 0% 15%)' }, l20: { color: 'hsl(0 0% 20%)' }, l25: { color: 'hsl(0 0% 25%)' },
    l30: { color: 'hsl(0 0% 30%)' }, l40: { color: 'hsl(0 0% 40%)' }, l50: { color: 'hsl(0 0% 50%)' },
    l60: { color: 'hsl(0 0% 60%)' }, l70: { color: 'hsl(0 0% 70%)' }, l80: { color: 'hsl(0 0% 80%)' },
    l90: { color: 'hsl(0 0% 90%)' }, l95: { color: 'hsl(0 0% 95%)' }, l100: { color: 'hsl(0 0% 100%)' },


    /**
     * UI Components
     */

    // Container
    appContainerScreen: {
        flex: 1,
        backgroundColor: 'hsl(0, 0%, 13%)',
    },
    appContainerContentFlex: {
        flex: 1,
        width: '90%',
        alignSelf: 'center',
    },
    appContainerContent: {
        width: '90%',
        alignSelf: 'center',
    },

    // Align Center
    textCenter: {
        textAlign: 'center',
    },


    // Flex Designs
    flexColumnCenter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flexRowCenter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    flexRowEven: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    flexRowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
});

export default gss;
