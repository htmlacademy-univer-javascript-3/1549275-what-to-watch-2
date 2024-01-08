import { User } from '../types/user';

export interface AuthorizationReducerState {
  user: User | null;
  authorizationStatus: string;
}
