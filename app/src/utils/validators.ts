export const validatePassword = (password: string): string | null => {
  if (password.length < 6) {
    return "A senha deve ter no mínimo 6 caracteres.";
  }
  if (!/[a-z]/.test(password)) {
    return "A senha deve conter pelo menos uma letra minúscula.";
  }
  if (!/[A-Z]/.test(password)) {
    return "A senha deve conter pelo menos uma letra maiúscula.";
  }
  if (!/\d/.test(password)) {
    return "A senha deve conter pelo menos um número.";
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return "A senha deve conter pelo menos um símbolo (ex: !@#$).";
  }
  return null;
};