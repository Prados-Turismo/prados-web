export interface IFormPassword {
  password: string;
  password2: string;
}

export interface IValidatePassword {
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setValidPassword: React.Dispatch<React.SetStateAction<boolean>>;
}
