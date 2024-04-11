export interface LoginResponseInterface {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export interface CredentialsInterface {
  username: string;
  password: string;
}
