import { NewUser } from "./NewUser";

export interface AuthState {
  user: NewUser | null;
  login: (user: NewUser) => void;
  logout: () => void;
  setUser: (user: NewUser) => void;
}