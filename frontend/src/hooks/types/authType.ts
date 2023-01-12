export type authType = {
  currentUser: { name: string },
  setCurrentUser: React.Dispatch<React.SetStateAction<{ name: string; }>>,
  emailInputRef: React.RefObject<HTMLInputElement>,
  passwordInputRef: React.RefObject<HTMLInputElement>,
  login: (userName: string, password: string) => void,
  register: (userName: string, password: string) => void,
  logOut: () => void
}