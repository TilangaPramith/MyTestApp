const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emailValidator = (email: string) => emailRegex.test(email)

export const passwordValidator = (password: string): boolean => {
  const minLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  return minLength && hasLetter && hasNumber && hasSpecialChar;
};