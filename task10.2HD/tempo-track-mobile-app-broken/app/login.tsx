// Login Page

import { useState } from "react";
import { StyleSheet, View, Dimensions, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import Txt from '@/components/ui/UIText';
import { resendVerificationEmail, sendPasswordReset, signInWithEmail } from '@/services';
import AppSafeAreaContentWrapper from '@/components/safeAreaWrappers/AppSafeAreaContentWrapper';
import Input from '@/components/ui/UIInput';
import Tt from '@/components/ui/UIText';
import PdBlk from '@/components/ui/UIPaddingBlock';
import { useNotification } from "@/components/providers/NotificationProvider";
import { useModalManager } from "@/components/providers/ModalManagerProvider";
import IconGeneral from "@/components/icons/IconGeneral";

export default function LoginPage() {
  const { addNotification } = useNotification();
  const { openModal } = useModalManager();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const screenWidth = Dimensions.get("window").width;

  /**
   * Sign In
   * @returns 
   */
  const signIn = async () => {
    const validEmail = email.trim().toLowerCase();
    const validPassword = password.trim();

    if (!validEmail || !validPassword) {
      setErrorMessage("Enter a valid Email and Password");
      return;
    }

    try {
      const status = await signInWithEmail(validEmail, validPassword);
      if ("success" in status && !status.success) {
        setErrorMessage(status.message!);
        if (status.message === "Please verify your email before logging in.") openModal('warningVerifyEmail');
        return;
      }

      router.replace("/(app)/(tabs)");
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  /**
   * Send Password Reset Email
   */
  const resetPasswordWithEmail = async () => {
    const validEmail = email.trim().toLowerCase();

    if (!validEmail) {
      addNotification("Enter a valid Email", "e");
      return;
    }

    try {
      await sendPasswordReset(validEmail);
      addNotification("An Email Has Been Sent", "s");
    } catch (error) {
      console.error("Error Sending Password Reset Email:", error);
      addNotification("Error Sending Reset Email", "e");
    }
  };

  return (
    <AppSafeAreaContentWrapper>
      <View style={ss.wrapperContent}>

        <Tt style={ss.title}>Tempo Track</Tt>

        {errorMessage && <Txt style={ss.errorTxt}>{errorMessage}</Txt>}

        <Input value={email} onChangeText={setEmail} placeholder='Email' style={ss.input} />

        <View style={ss.wrapperPassword}>
          <Input value={password} onChangeText={setPassword} placeholder='Password' secureTextEntry={showPassword} />
          <Pressable onPress={() => setShowPassword(!showPassword)}
            style={({ pressed }) => [{ borderColor: pressed ? '#FF3EB5' : 'hsl(0 0% 13%)' }, ss.btnVis,]}>
            <IconGeneral type={showPassword ? "visible-off" : "visible"} fill="white" />
          </Pressable>
        </View>

        <Pressable onPress={signIn}
          style={({ pressed }) => [{ backgroundColor: pressed ? 'hsl(0 0% 13%)' : '#FFE900' }, ss.btn,]}>
          {({ pressed }) => (
            <Tt style={[{ color: pressed ? '#FFE900' : 'black' }, ss.btnTxt]}>Login</Tt>
          )}
        </Pressable>

        <PdBlk pad={15} />

        <Tt style={ss.txtSmall}>Don't have an account? <Link href='/register'
          style={{ textDecorationLine: 'underline' }}>Register</Link>
        </Tt>
      </View>

      {errorMessage && (
        <View style={ss.wrapperReset}>
          <Tt>Forgot your password?</Tt>
          <Pressable onPress={resetPasswordWithEmail}
            style={({ pressed }) => [{ backgroundColor: pressed ? 'hsl(0 0% 13%)' : '#FFE900' }, ss.btn]}>
            {({ pressed }) => (
              <Tt style={[{ color: pressed ? '#FFE900' : 'black' }, ss.btnTxt]}>Reset Password</Tt>
            )}
          </Pressable>
        </View>
      )}
    </AppSafeAreaContentWrapper>
  );
};

const ss = StyleSheet.create({
  wrapperContent: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '80%',
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'DrukWide'
  },
  input: {
    marginVertical: 10,
  },
  wrapperPassword: {
    position: 'relative',
    width: '100%',
  },
  btnVis: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -12 }],
    right: 10,
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
  },

  errorTxt: {
    color: 'red',
    marginBottom: 10,
    alignSelf: 'center'
  },

  btn: {
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 5, borderWidth: 1, borderColor: '#FFE900',
  },
  btnTxt: {
    textAlign: 'center',
  },
  txtSmall: {
    textAlign: 'center',
    fontSize: 12,
  },
  wrapperReset: {
    marginVertical: 30,
  },

});