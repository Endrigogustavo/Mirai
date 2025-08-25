import {
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential,
} from "firebase/auth";
import { auth, db } from "../config/firebaseConfig";
import { collection, getDocs, query, where, writeBatch } from "firebase/firestore";

interface SignUpData {
  name: string;
  email: string;
  password: string;
}

export const signUpUser = async ({
  name,
  email,
  password,
}: SignUpData): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });

    return userCredential;
  } catch (error: any) {
    let friendlyMessage = "Ocorreu um erro desconhecido ao criar a conta.";
    if (error.code === "auth/email-already-in-use") {
      friendlyMessage = "Este e-mail já está em uso por outra conta.";
    } else if (error.code === "auth/invalid-email") {
      friendlyMessage = "O formato do e-mail é inválido.";
    } else if (error.code === "auth/weak-password") {
      friendlyMessage = "A senha fornecida é muito fraca.";
    }
    throw new Error(friendlyMessage);
  }
};

interface SignInData {
  email: string;
  password: string;
}

export const signInUser = async ({
  email,
  password,
}: SignInData): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    let friendlyMessage = "Ocorreu um erro desconhecido ao tentar fazer login.";
    if (
      error.code === "auth/user-not-found" ||
      error.code === "auth/wrong-password" ||
      error.code === "auth/invalid-credential"
    ) {
      friendlyMessage = "E-mail ou senha inválidos.";
    } else if (error.code === "auth/invalid-email") {
      friendlyMessage = "O formato do e-mail é inválido.";
    }
    throw new Error(friendlyMessage);
  }
};

export const signOutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Erro ao sair:", error);
    throw new Error("Ocorreu um erro ao tentar sair. Tente novamente.");
  }
};

export const deleteCurrentUserAccount = async (): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error("Nenhum usuário encontrado para excluir.");
  }
  try {
    const resultsQuery = query(
      collection(db, "results"),
      where("userId", "==", user.uid)
    );
    const querySnapshot = await getDocs(resultsQuery);
    if (!querySnapshot.empty) {
      const batch = writeBatch(db);
      querySnapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      await batch.commit();
      console.log("Dados do usuário no Firestore foram excluídos.");
    }

    await deleteUser(user);
    console.log("Conta de usuário do Authentication foi excluída.");
  } catch (error: any) {
    console.error("Erro ao excluir conta:", error.code, error.message);
    if (error.code === "auth/requires-recent-login") {
      throw new Error(
        "Sua sessão expirou. Por favor, faça login novamente para poder excluir sua conta."
      );
    }

    throw new Error("Ocorreu um erro ao excluir sua conta. Tente novamente.");
  }
};
