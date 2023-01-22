export type authType = {
  currentUser: { userName: string },
  setCurrentUser: React.Dispatch<React.SetStateAction<{ userName: string; }>>,
  emailInputRef: React.RefObject<HTMLInputElement>,
  passwordInputRef: React.RefObject<HTMLInputElement>,
  login: (userName: string, password: string) => void,
  logOut: () => void
}