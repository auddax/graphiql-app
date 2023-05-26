export type UserDataReg = {
  agreement: boolean;
  confirm: string;
  email: string;
  username: string;
  password: string;
};

export type UserDataLog = {
  email: string;
  password: string;
};

export interface IUserStore {
  email: string;
  password: string;
  nicknwame?: string;
  token?: string;
  id?: string;
}

export type SuccessUser = {
  email: string;
}

export type typeMessage = 'success' | 'error' | 'loading';

export type typeBtnAuth = 'login' | 'signup' | 'logout' | 'home'; 

export type MessageInfo = {
  isReady: boolean;
  type: typeMessage;
  content: string;
}

export type Person = { person: 'hell-llex' | 'auddax' | 'shalick' };