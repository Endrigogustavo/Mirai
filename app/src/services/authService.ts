import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  UserCredential,
} from 'firebase/auth';
import { auth } from '../config/firebaseConfig';

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export const signUpUser = async ({ name, email, password }: SignUpData): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });

    return userCredential;
  } catch (error: any) {
    let friendlyMessage = "Ocorreu um erro desconhecido ao criar a conta.";
    if (error.code === 'auth/email-already-in-use') {
      friendlyMessage = "Este e-mail já está em uso por outra conta.";
    } else if (error.code === 'auth/invalid-email') {
      friendlyMessage = "O formato do e-mail é inválido.";
    } else if (error.code === 'auth/weak-password') {
      friendlyMessage = "A senha fornecida é muito fraca.";
    }
    throw new Error(friendlyMessage);
  }
};


interface SignInData {
  email: string;
  password: string;
}

export const signInUser = async ({ email, password }: SignInData): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    let friendlyMessage = "Ocorreu um erro desconhecido ao tentar fazer login.";
    if (
      error.code === 'auth/user-not-found' ||
      error.code === 'auth/wrong-password' ||
      error.code === 'auth/invalid-credential'
    ) {
      friendlyMessage = "E-mail ou senha inválidos.";
    } else if (error.code === 'auth/invalid-email') {
      friendlyMessage = "O formato do e-mail é inválido.";
    }
    throw new Error(friendlyMessage);
  }
};
