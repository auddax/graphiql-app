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

export interface ITypeField {
  name: string;
  description: string;
  type: {
    name: string;
    __typename: string;
  }
  __typename: string;
}

export interface IType {
  data: {
    __type: {
      fields: ITypeField[];
      __typename: string;
    }  
  }
}

export interface IArg {
  name: string;
  __typename: string;
}

export interface IField {
  name: string;
  description: string;
  type: {
    name: string;
    __typename: string;
  }
  args: IArg[];
}

export interface ISchema {
  data: {
    __schema: {
      queryType: {
        fields: IField[];
      }
    },
    __typename: string;
  }
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

export type Person = 'hell-llex' | 'auddax' | 'shalick' ;