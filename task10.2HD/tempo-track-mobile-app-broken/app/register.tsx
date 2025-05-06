// Register Page

import { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { router, Link } from 'expo-router';
import { registerWithEmail } from '@/services';
import AppSafeAreaContentWrapper from '@/components/safeAreaWrappers/AppSafeAreaContentWrapper';
import Input from '@/components/ui/UIInput';
import Tt from '@/components/ui/UIText';
import PdBlk from '@/components/ui/UIPaddingBlock';

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");


  /**
   * Register
   * @returns 
   */
  const register = async () => {
    const validFirstName = firstName.trim();
    const validLastName = lastName.trim();
    const validEmail = email.trim().toLowerCase();
    const validPassword = password.trim();
    const validConfirmPassword = confirmPassword.trim();

    if (!validFirstName || !validLastName || !validEmail || !validPassword || !validConfirmPassword) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (validPassword !== validConfirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }

    try {
      await registerWithEmail(validFirstName, validLastName, validEmail, validPassword);
      router.replace('/login');
    } catch (error: any) {
      console.error(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMessage("This email is already in use.");
          break;
        case "auth/weak-password":
          setErrorMessage("Password must be stronger.");
          break;
        case "auth/invalid-email":
          setErrorMessage("Invalid email format.");
          break;
        default:
          setErrorMessage("Registration failed. Please try again.");
          break;
      }
    }
  };

  return (
    <AppSafeAreaContentWrapper>
      <View style={ss.wrapperContent}>

        <Tt style={ss.title}>Tempo Track</Tt>

        {errorMessage && <Tt style={ss.errorTxt}>{errorMessage}</Tt>}
        <Input value={firstName} onChangeText={setFirstName} placeholder='First Name' style={ss.input} />
        <Input value={lastName} onChangeText={setLastName} placeholder='Last Name' style={ss.input} />
        <Input value={email} onChangeText={setEmail} placeholder='Email' style={ss.input} />
        <Input value={password} onChangeText={setPassword} placeholder='Password' style={ss.input} secureTextEntry={true} />
        <Input value={confirmPassword} onChangeText={setConfirmPassword} placeholder='Confirm Password' style={ss.input} secureTextEntry={true} />

        <Pressable onPress={register}
          style={({ pressed }) => [{ backgroundColor: pressed ? 'hsl(0 0% 13%)' : '#FFE900' }, ss.btn,]}>
          {({ pressed }) => (
            <Tt style={[{ color: pressed ? '#FFE900' : 'black' }, ss.btnTxt]}>Register</Tt>
          )}
        </Pressable>

        <PdBlk pad={15} />

        <Tt style={ss.txtSmall}>Already have an account? <Link href='/login'
          style={{ textDecorationLine: 'underline' }}>Sign In</Link>
        </Tt>

      </View>
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

  textMain: {
    color: 'hsl(0 0% 5%)',
    textAlign: 'center',
  },
  txtSmall: {
    textAlign: 'center',
    fontSize: 12,
  }
});